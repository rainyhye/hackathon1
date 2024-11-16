import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MosaicPage from "./MosaicPage";
import PdfPage from "./PdfPage";
import PdfPage1 from "./PdfPage1";
import PdfPage2 from "./PdfPage2";
import PdfPage3 from "./PdfPage3";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mosaic" element={<MosaicPage />} />
        <Route path="/pdf" element={<PdfPage />} /> {/* PDF 페이지 라우팅 */}
        <Route path="/pdf1" element={<PdfPage1 />} />
        <Route path="/pdf2" element={<PdfPage2 />} />
        <Route path="/pdf3" element={<PdfPage3 />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
