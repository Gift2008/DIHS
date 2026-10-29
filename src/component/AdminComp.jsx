import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/adminCss.css";

const defaultRegister = {
  username: "",
  name: "",
  surname: "",
  password: "",
  confirmPassword: "",
};

const defaultLogin = {
  username: "",
  password: "",
};

const ADMIN_SESSION_TIMEOUT = 3 * 60 * 1000;

const saveAdminSession = (user) => {
  const sessionData = {
    ...user,
    expiresAt: Date.now() + ADMIN_SESSION_TIMEOUT,
  };

  localStorage.setItem("adminUser", JSON.stringify(sessionData));
};

const clearAdminSession = () => {
  localStorage.removeItem("adminUser");
};

function AdminComp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState(defaultRegister);
  const [loginForm, setLoginForm] = useState(defaultLogin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "null");

  useEffect(() => {
    if (location.pathname === "/admin/dashboard" && !adminUser) {
      navigate("/admin");
    }
  }, [adminUser, location.pathname, navigate]);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    const username = registerForm.username.trim();
    const name = registerForm.name.trim();
    const surname = registerForm.surname.trim();

    if (!username || !name || !surname || !registerForm.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const cleanUsername = username.toLowerCase();
    setLoading(true);

    try {
      const userRef = doc(db, "admins", cleanUsername);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError("This username is already taken.");
        setLoading(false);
        return;
      }

      await setDoc(userRef, {
        username: cleanUsername,
        name,
        surname,
        password: registerForm.password,
        createdAt: serverTimestamp(),
      });

      saveAdminSession({ username: cleanUsername, name, surname });

      setRegisterForm(defaultRegister);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!loginForm.username || !loginForm.password) {
      setError("Username and password are required.");
      return;
    }

    const username = loginForm.username.trim().toLowerCase();
    setLoading(true);

    try {
      const userRef = doc(db, "admins", username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("Admin not found.");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();

      if (userData.password !== loginForm.password) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }

      saveAdminSession({
        username: userData.username,
        name: userData.name,
        surname: userData.surname,
      });

      setLoginForm(defaultLogin);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin");
  };

  if (location.pathname === "/admin/dashboard") {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h2 className="admin-title">Admin Dashboard</h2>
          <p className="admin-welcome-text">
            Welcome, {adminUser?.name || "Admin"} {adminUser?.surname || ""}
          </p>
          <button className="admin-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-toggle-row">
          <button
            type="button"
            className={
              isRegister
                ? "admin-toggle-button admin-toggle-inactive"
                : "admin-toggle-button admin-toggle-active"
            }
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={
              isRegister
                ? "admin-toggle-button admin-toggle-active"
                : "admin-toggle-button admin-toggle-inactive"
            }
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
          >
            Register
          </button>
        </div>

        {isRegister ? (
          <form onSubmit={handleRegister}>
            <h2 className="admin-title">Create Admin</h2>

            <input
              className="admin-input"
              type="text"
              name="username"
              placeholder="Username"
              value={registerForm.username}
              onChange={handleRegisterChange}
            />

            <input
              className="admin-input"
              type="text"
              name="name"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
            />

            <input
              className="admin-input"
              type="text"
              name="surname"
              placeholder="Surname"
              value={registerForm.surname}
              onChange={handleRegisterChange}
            />

            <input
              className="admin-input"
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
            />

            <input
              className="admin-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
            />

            {error && <p className="admin-error">{error}</p>}

            <button type="submit" className="admin-button" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="admin-title">Admin Login</h2>

            <input
              className="admin-input"
              type="text"
              name="username"
              placeholder="Username"
              value={loginForm.username}
              onChange={handleLoginChange}
            />

            <input
              className="admin-input"
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
            />

            {error && <p className="admin-error">{error}</p>}

            <button type="submit" className="admin-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminComp;
