// PdfPage.jsx
import React, { useState } from "react"; // useState를 추가로 가져옵니다.
import "./PdfPage.css";

function PdfPage() {
  return (
    <div>
      <header className="header2">
        <div>AI COMPLIENCE</div>
      </header>
      <div className="dashboard2">
        <div className="card-grid2">
          <div className="card2 card2-1">
            <h2>UPLOAD</h2>
          </div>
          <div className="card2 card2-2">
            <h2>NOTICE</h2>
          </div>
          <div className="card2 card2-3">
            <h2>DOWNLOAD</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfPage;
