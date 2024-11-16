import React, { useState } from "react";
import "./PdfPage1.css";
import { Bar } from "react-chartjs-2";

function PdfPage1() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("Uploaded file:", file.name);
    }
  };
  const data = {
    labels: [
      "AI 정책 준수 가이드",
      "데이터 보호 가이드",
      "FAQ",
      "데이터 분석 가이드",
    ],
    datasets: [
      {
        label: "조회 수",
        data: [120, 80, 60, 100],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FFC107"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { stepSize: 20 } },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div>
      <header className="header3">
        <div>AI COMPLIANCE</div>
      </header>
      <div className="sub-header3">2023 상반기</div>
      <div className="card3-grid3">
        {/* UPLOAD 카드 */}
        <div className="card3 card3-1">
          <h2>정책 업로드</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="file-upload-input"
          />
          {uploadedFile && (
            <p className="file-upload-message">Uploaded: {uploadedFile.name}</p>
          )}
        </div>

        {/* NOTICE 카드 */}
        <div className="card3 card3-2">
          <div className="notice-section">
            <h3>컴플라이언스 공지사항</h3>
            <p className="notice-item">
              [2023-07-15] AI 알고리즘 윤리적 검토 완료
            </p>
            <p className="notice-item">
              [2023-06-30] 데이터 사용 정책 업데이트
            </p>
            <p className="notice-item">
              [2023-06-01] 컴플라이언스 교육 의무화 시행
            </p>
            <div className="notice-more">더보기</div>
          </div>
        </div>

        {/* 사용자 통계 카드 */}
        <div className="card3 card3-3">
          <h3>사용자 통계</h3>
          <div className="statistics-container">
            <div className="statistic-item">
              <span className="stat-title">현재 접속자</span>
              <span className="stat-value">52명</span>
            </div>
            <div className="statistic-item">
              <span className="stat-title">총 업로드</span>
              <span className="stat-value">152건</span>
            </div>
            <div className="statistic-item">
              <span className="stat-title">총 다운로드</span>
              <span className="stat-value">430건</span>
            </div>
          </div>
        </div>

        {/* DOWNLOAD 카드 */}
        <div className="card3 card3-4">
          <h2>DOWNLOAD</h2>
          <button className="download-button">파일 다운로드</button>
        </div>
        <div className="card3 card3-5">
          <h3>최근 업데이트 내역</h3>
          <ul className="update-list">
            <li>[2023-07-10] 정책 검토 시스템 자동화 업데이트</li>
            <li>[2023-06-25] AI 검토 보고서 통합 기능 추가</li>
            <li>[2023-06-01] 데이터 암호화 강화</li>
          </ul>
        </div>
        {/* 유용한 자료 및 도움말 카드 */}
        <div className="card3 card3-6">
          <h3>유용한 자료 및 도움말</h3>
          <div className="helpful-links-container">
            <div className="helpful-link-row">
              <div className="helpful-link-item">
                <a href="#">📘 AI 정책 준수 가이드</a>
              </div>
              <div className="helpful-link-item">
                <a href="#">🔒 데이터 보호 가이드</a>
              </div>
            </div>
            <div className="helpful-link-row">
              <div className="helpful-link-item">
                <a href="#">❓ 컴플라이언스 FAQ</a>
              </div>
              <div className="helpful-link-item">
                <a href="#">📊 데이터 분석 가이드</a>
              </div>
            </div>
            <div style={{ height: "110px", width: "400px", marginTop: "0px" }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfPage1;
