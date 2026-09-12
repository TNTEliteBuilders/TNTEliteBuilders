import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./chrome/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
