import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "../styles/adminCss.css";

const labels = [
  "12am",
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "12am",
];

const rangeList = ["Last month", "Last week", "Last 90 days", "Since launched"];
const ADMIN_SESSION_TIMEOUT = 3 * 60 * 1000;

const getStoredAdminSession = () => {
  const raw = localStorage.getItem("adminUser");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.username) return null;
    return parsed;
  } catch (error) {
    return null;
  }
};

const refreshAdminSession = () => {
  const currentUser = getStoredAdminSession();
  if (!currentUser) return false;

  const updatedSession = {
    ...currentUser,
    expiresAt: Date.now() + ADMIN_SESSION_TIMEOUT,
  };

  localStorage.setItem("adminUser", JSON.stringify(updatedSession));
  return true;
};

const clearAdminSession = () => {
  localStorage.removeItem("adminUser");
};

const getVisitDate = (value) => {
  if (!value) return null;

  if (value.toDate) return value.toDate();
  if (value.seconds) return new Date(value.seconds * 1000);
  if (value instanceof Date) return value;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getHourBucket = (hour) => {
  if (hour >= 0 && hour < 2) return 0;
  if (hour >= 2 && hour < 4) return 1;
  if (hour >= 4 && hour < 6) return 2;
  if (hour >= 6 && hour < 8) return 3;
  if (hour >= 8 && hour < 10) return 4;
  if (hour >= 10 && hour < 12) return 5;
  if (hour >= 12 && hour < 14) return 6;
  if (hour >= 14 && hour < 16) return 7;
  if (hour >= 16 && hour < 18) return 8;
  if (hour >= 18 && hour < 20) return 9;
  if (hour >= 20 && hour < 22) return 10;
  return 11;
};

const buildAnalyticsStats = (entries, activeRange) => {
  if (!entries || entries.length === 0) {
    return {
      total: 0,
      avg: 0,
      peak: "N/A",
      hours: Array(12).fill(0),
    };
  }

  const now = new Date();
  const filtered = entries.filter((entry) => {
    const date = getVisitDate(entry.createdAt || entry.timestamp || entry.date);
    if (!date) return false;

    if (activeRange === "Since launched") return true;

    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (activeRange === "Last month") return diffInDays <= 30;
    if (activeRange === "Last week") return diffInDays <= 7;
    if (activeRange === "Last 90 days") return diffInDays <= 90;

    return true;
  });

  const total = filtered.length;
  const dayCount =
    activeRange === "Since launched"
      ? Math.max(
          1,
          Math.ceil(
            (now -
              getVisitDate(
                filtered[filtered.length - 1]?.createdAt ||
                  filtered[0]?.createdAt ||
                  new Date(),
              )) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : activeRange === "Last month"
        ? 30
        : activeRange === "Last week"
          ? 7
          : 90;

  const avg = Math.round(total / Math.max(dayCount, 1));

  const hours = Array(12).fill(0);
  filtered.forEach((entry) => {
    const date = getVisitDate(entry.createdAt || entry.timestamp || entry.date);
    if (!date) return;

    const hour = date.getHours();
    const bucket = getHourBucket(hour);
    hours[bucket] += 1;
  });

  const peakHourIndex = hours.indexOf(Math.max(...hours));
  const peak = labels[peakHourIndex] || "N/A";

  return {
    total,
    avg,
    peak,
    hours,
  };
};

function AdminPg() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeRange, setActiveRange] = useState("Last month");
  const [galleryItems, setGalleryItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [analytics, setAnalytics] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const adminUser = getStoredAdminSession();
  const initials =
    `${adminUser?.name?.[0] || "A"}${adminUser?.surname?.[0] || "D"}`.toUpperCase();

  useEffect(() => {
    const validateSession = () => {
      const currentUser = getStoredAdminSession();

      if (!currentUser || !currentUser.expiresAt) {
        clearAdminSession();
        navigate("/admin");
        return false;
      }

      if (Date.now() > Number(currentUser.expiresAt)) {
        clearAdminSession();
        navigate("/admin");
        return false;
      }

      return true;
    };

    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGalleryItems(items);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const analyticsQuery = query(
          collection(db, "analytics"),
          orderBy("createdAt", "asc"),
        );
        const analyticsSnapshot = await getDocs(analyticsQuery);
        const entries = analyticsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnalytics(entries);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    const logPageVisit = async () => {
      try {
        await addDoc(collection(db, "analytics"), {
          createdAt: serverTimestamp(),
          page: "admin-dashboard",
          type: "visit",
        });
      } catch (error) {
        console.error("Error logging analytics visit:", error);
      }
    };

    if (!validateSession()) {
      return;
    }

    let timeoutId;
    const resetSession = () => {
      if (!validateSession()) return;
      refreshAdminSession();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clearAdminSession();
        navigate("/admin");
      }, ADMIN_SESSION_TIMEOUT);
    };

    resetSession();

    const activityEvents = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
    ];
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetSession);
    });

    fetchGallery();
    fetchAnalytics();
    logPageVisit();

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetSession);
      });
    };
  }, [navigate]);

  const stats = useMemo(
    () => buildAnalyticsStats(analytics, activeRange),
    [activeRange, analytics],
  );
  const maxHour = Math.max(...stats.hours, 1);

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin");
  };

  const uploadSelectedFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setUploadMessage("Please select an image file.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const fileRef = ref(storage, `gallery/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      const docRef = await addDoc(collection(db, "gallery"), {
        imageUrl,
        name: file.name,
        createdAt: serverTimestamp(),
      });

      setGalleryItems((prev) => [
        { id: docRef.id, imageUrl, name: file.name },
        ...prev,
      ]);
      setUploadMessage("Image uploaded successfully.");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadSelectedFile(file);
    event.target.value = "";
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    await uploadSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="admin-dashboard-shell">
      <aside className="admin-sidebar">
        <div className="brand-block">
          <div className="brand-mark">{initials}</div>
          <div>
            <h3>Admin Panel</h3>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Gallery</button>
          <button className="nav-item">Members</button>
          <button className="nav-item">Donations</button>
          <button className="nav-item">Settings</button>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main-panel">
        <header className="admin-topbar">
          <div>
            <p className="topbar-label">Dashboard</p>
            <h1>Admin Dashboard</h1>
          </div>

          <div className="admin-profile-box">
            <div className="admin-avatar">{initials}</div>
            <div>
              <strong>
                {adminUser?.name || "Admin"} {adminUser?.surname || "User"}
              </strong>
              <p>Administrator</p>
            </div>
          </div>
        </header>

        <section className="stats-row">
          <div className="stat-card accent-card">
            <span>Total visits</span>
            <strong>{stats.total.toLocaleString()}</strong>
            <small>Across selected period</small>
          </div>
          <div className="stat-card">
            <span>Average/day</span>
            <strong>{stats.avg}</strong>
            <small>Daily average</small>
          </div>
          <div className="stat-card">
            <span>Peak hour</span>
            <strong>{stats.peak}</strong>
            <small>Most active time</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel large-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Traffic</p>
                <h2>Visits</h2>
              </div>

              <div className="range-switcher">
                {rangeList.map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={
                      activeRange === range ? "range-btn active" : "range-btn"
                    }
                    onClick={() => setActiveRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="chart-area">
              {stats.hours.map((value, index) => {
                const height = (value / maxHour) * 100;
                const opacity = 0.25 + (value / maxHour) * 0.75;

                return (
                  <div className="bar-group" key={`${labels[index]}-${value}`}>
                    <div className="bar-wrap">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${height}%`,
                          opacity: opacity,
                        }}
                        title={`${labels[index]}: ${value} visits`}
                      />
                    </div>
                    <span>{labels[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel upload-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Media</p>
                <h2>Upload to Gallery</h2>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleUpload}
            />

            <div
              className={isDragging ? "upload-box is-dragging" : "upload-box"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-icon">+</div>
              <p>{uploading ? "Uploading..." : "Drag & drop files here"}</p>
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload image"}
              </button>
            </div>

            {uploadMessage && <p className="upload-message">{uploadMessage}</p>}

            <div className="gallery-preview">
              {galleryItems.length > 0 ? (
                galleryItems
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="gallery-card"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      title={item.name || "Uploaded image"}
                    />
                  ))
              ) : (
                <>
                  <div className="gallery-card gallery-one"></div>
                  <div className="gallery-card gallery-two"></div>
                  <div className="gallery-card gallery-three"></div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminPg;
