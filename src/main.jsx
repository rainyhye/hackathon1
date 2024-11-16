import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MosaicPage from "./MosaicPage";
import PdfPage from "./PdfPage";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mosaic" element={<MosaicPage />} />
        <Route path="/pdf" element={<PdfPage />} /> {/* PDF 페이지 라우팅 */}
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
