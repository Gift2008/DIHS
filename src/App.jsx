import "./App.css";
import "./styles/carousel.css";
import "./styles/footer.css";
import { lazy, Suspense } from "react";

import AboutComp from "./component/AboutComp";
import AllComp from "./component/AllComp";
import ContactComp from "./component/ContactComp";
import FooterComp from "./component/FooterComp";
import NavbarComp from "./component/NavbarComp";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./component/PageNotFound";
import JoinUs from "./component/JoinUs";
const Donate = lazy(() => import("./component/Donate"));
import AdminComp from "./component/AdminComp";
import AdminPg from "./component/AdminPg";

function App() {
  return (
    <>
      <NavbarComp />
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<AllComp />} />
          <Route path="/aboutUs" element={<AboutComp />} />
          <Route path="/contactUs" element={<ContactComp />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/donations" element={<Donate />} />
          <Route path="/admin" element={<AdminComp />} />
          <Route path="/admin/dashboard" element={<AdminPg />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <FooterComp />
    </>
  );
}

export default App;
