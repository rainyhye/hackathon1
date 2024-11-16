import React, { useState, useEffect, useRef } from "react"; // useEffect 추가
import "./MosaicPage.css";
import { Chart, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Chart.register(...registerables);

function MosaicPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("YOLO"); // 기본 선택 알고리즘
  const [fileList, setFileList] = useState([]); // 선택된 알고리즘의 파일 리스트

  const [chartData, setChartData] = useState({}); // 차트 데이터 상태
  const chartRef = useRef(null); // 차트를 렌더링할 canvas 참조*/

  const [filteredFiles, setFilteredFiles] = useState([]); // 필터링된 파일 리스트
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜
  const [visibleFiles, setVisibleFiles] = useState(5); // 한 번에 보여줄 파일 수

  const [processingData, setProcessingData] = useState({
    completed: 95000,
    processing: 2000,
    pending: 3000,
  });
  const speedChartRef = useRef(null); // 처리 속도 차트를 위한 참조
  const [averageSpeeds, setAverageSpeeds] = useState({
    YOLO: 120,
    Blur: 200,
    Pixelation: 150,
    DeepPrivacy: 200,
  });

  // 모자이크 알고리즘 종류
  const algorithms = ["YOLO", "Blur", "Pixelation", "DeepPrivacy"];

  // 알고리즘 선택 핸들러
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setFileList(algorithmFiles[algorithm] || []);
    setStartDate(""); // 알고리즘 변경 시 필터 초기화
    setEndDate("");
    setVisibleFiles(5); // 초기화
  };

  // 날짜 필터링 로직
  const filterByDate = (list, start, end) => {
    if (!start || !end) return list; // 날짜가 없으면 필터링하지 않음
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    return list.filter((file) => {
      const fileDate = new Date(file.date);
      return fileDate >= startDateObj && fileDate <= endDateObj;
    });
  };

  // 시작 날짜 변경 핸들러
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // 종료 날짜 변경 핸들러
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const generateYoloFiles = () => {
    const files = [];
    const startDate = new Date("2024-11-01");
    for (let i = 1; i <= 50; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i % 17)); // 날짜 순환
      files.push({
        name: `yolo_file${i}.mp4`,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      });
    }
    return files;
  };
  const generateblurFiles = () => {
    const files = [];
    const startDate = new Date("2024-11-01");
    for (let i = 1; i <= 50; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i % 17)); // 날짜 순환
      files.push({
        name: `blur_file${i}.mp4`,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      });
    }
    return files;
  };
  const generatepixelFiles = () => {
    const files = [];
    const startDate = new Date("2024-11-01");
    for (let i = 1; i <= 50; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i % 17)); // 날짜 순환
      files.push({
        name: `pixel_file${i}.mp4`,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      });
    }
    return files;
  };

  const generatedeepprivacyFiles = () => {
    const files = [];
    const startDate = new Date("2024-11-01");
    for (let i = 1; i <= 50; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i % 17)); // 날짜 순환
      files.push({
        name: `deepprivacy_file${i}.mp4`,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      });
    }
    return files;
  };

  const algorithmFiles = {
    YOLO: generateYoloFiles(),
    Blur: generateblurFiles(),
    Pixelation: generatepixelFiles(),
    DeepPrivacy: generatedeepprivacyFiles(),
  };

  // 필터링 로직 실행
  useEffect(() => {
    const filtered = filterByDate(fileList, startDate, endDate);
    setFilteredFiles(filtered);
  }, [fileList, startDate, endDate]);

  // 초기 상태 설정
  useEffect(() => {
    setFileList(algorithmFiles[selectedAlgorithm]);
    setFilteredFiles(algorithmFiles[selectedAlgorithm]);
  }, [selectedAlgorithm]);

  /*// 초기 상태 설정: 페이지 로드 시 YOLO 파일 리스트를 설정
  useEffect(() => {
    setFileList(algorithmFiles["YOLO"]);
  }, []);*/

  useEffect(() => {
    // 캔버스가 마운트되었는지 확인
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // 기존 차트 인스턴스가 있으면 제거
      if (Chart.instances.length > 0) {
        Chart.instances.forEach((instance) => instance.destroy());
      }

      // 차트 생성
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["처리 완료", "처리 중", "대기"],
          datasets: [
            {
              data: [
                processingData.completed,
                processingData.processing,
                processingData.pending,
              ],
              backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
              hoverBackgroundColor: ["#45a049", "#ffa726", "#e57373"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 20,
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
    }
  }, [processingData]); // processingData 변경 시 차트 갱신

  useEffect(() => {
    let speedChartInstance;

    // 기존 차트 인스턴스가 있으면 제거
    if (Chart.instances.length > 0) {
      Chart.instances.forEach((instance) => instance.destroy());
    }

    if (speedChartRef.current) {
      const ctx = speedChartRef.current.getContext("2d");

      if (speedChartInstance) {
        speedChartInstance.destroy();
      }

      speedChartInstance = new Chart(ctx, {
        type: "bar", // 막대 그래프
        data: {
          labels: Object.keys(averageSpeeds), // 알고리즘 이름들
          datasets: [
            {
              label: "평균 처리 속도 (ms)",
              data: Object.values(averageSpeeds), // 속도 데이터
              backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#9c27b0"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true, // Y축 0부터 시작
              title: {
                display: true,
                text: "처리 속도 (ms)",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });
    }

    return () => {
      if (speedChartInstance) {
        speedChartInstance.destroy();
      }
    };
  }, [averageSpeeds]);

  return (
    <div>
      <header className="header1">
        <div>MOSAIC STATUS</div>
      </header>
      <div className="progress-bar1"></div>
      <div className="dashboard1">
        <div className="card-grid1">
          <div className="card1 card1-1">
            <h2>DB 현황</h2>
            <div className="db-stats">
              <div className="stat-item">
                <p>총 데이터</p>
                <p className="stat-value">100,000건</p>
              </div>
              <div className="stat-item">
                <p>처리 완료</p>
                <p className="stat-value">95,000건</p>
              </div>
              <div className="stat-item">
                <p>오류량</p>
                <p className="stat-value">5,000건</p>
              </div>
            </div>
          </div>
          <div className="card1 card1-2">
            <h2>처리 완료 리스트</h2>
            <div className="dropdown">
              <label htmlFor="algorithm-select" className="dropdown-label">
                모자이크 알고리즘 선택:
              </label>
              <select
                id="algorithm-select"
                value={selectedAlgorithm}
                onChange={(e) => handleAlgorithmChange(e.target.value)}
                className="dropdown-select"
              >
                {Object.keys(algorithmFiles).map((algo) => (
                  <option key={algo} value={algo}>
                    {algo}
                  </option>
                ))}
              </select>
            </div>
            {/* 날짜 범위 필터 */}
            <div className="date-filter">
              <label htmlFor="start-date" className="dropdown-label">
                시작 날짜:
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                className="date-input"
              />
              <label htmlFor="end-date" className="dropdown-label">
                종료 날짜:
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                className="date-input"
              />
            </div>
            {/* 필터링된 파일 리스트 */}
            <div className="file-list">
              <h3 className="file-list-title">
                {selectedAlgorithm} 처리 완료 파일
              </h3>
              {filteredFiles.length > 0 ? (
                <ul className="file-list-items">
                  {filteredFiles.slice(0, visibleFiles).map((file, index) => (
                    <li key={index} className="file-list-item">
                      <a href={`#`} download className="file-link">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-files">선택한 조건에 맞는 파일이 없습니다.</p>
              )}
              {visibleFiles < filteredFiles.length && (
                <button
                  onClick={() => setVisibleFiles((prev) => prev + 5)}
                  className="load-more-btn"
                >
                  더보기
                </button>
              )}
            </div>
          </div>
          <div className="card1 card1-3">
            <h2>NOTICE</h2>
            <div className="notice-list">
              <div className="notice-item">
                <h4>서버 점검 예정</h4>
                <p>
                  모자이크 처리 시스템의 안정성을 개선하기 위해 오는 2024년 11월
                  20일 오후 11시부터 오전 3시까지 정기 서버 점검이 진행됩니다.
                  이 기간 동안 일부 작업이 지연될 수 있습니다.
                </p>
              </div>
              <div className="notice-item">
                <h4>개인정보 사용 권한 설정 안내</h4>
                <p>
                  모자이크 처리 시 필요한 권한은 관리자 설정 페이지에서 조정
                  가능합니다. 권한 관리에 대한 문의는 IT 보안팀으로 연락
                  바랍니다.
                </p>
              </div>
              <div className="notice-item">
                <h4>모자이크 처리 완료 보고</h4>
                <p>
                  현재까지 95,000건의 개인정보 데이터가 성공적으로 모자이크
                  처리되었습니다. 오류 데이터 5,000건에 대한 분석 및 복구 작업이
                  진행 중입니다.
                </p>
              </div>
              <div className="notice-item">
                <h4>모자이크 파일 다운로드 시 유의사항</h4>
                <p>
                  모자이크 처리된 파일은 보안상의 이유로 30일간만 보관됩니다.
                  이후에는 자동 삭제되오니 필요한 파일은 즉시 다운로드하세요.
                </p>
              </div>
              <div className="notice-item">
                <h4>새로운 기능 추가</h4>
                <p>
                  이제 모자이크 처리 속도 통계를 확인할 수 있습니다.
                  대시보드에서 각 알고리즘별 평균 처리 시간을 비교해보세요.
                </p>
              </div>
            </div>
          </div>
          <div className="card1 card1-4">
            <h2>처리 상태</h2>
            <canvas ref={chartRef} id="statusChart"></canvas>
          </div>
          <div className="card1 card1-5">
            <h2>처리 속도 통계</h2>
            <div style={{ width: "100%", height: "250px" }}>
              <canvas ref={speedChartRef} id="speedChart"></canvas>
            </div>
          </div>
          <div className="card1 card1-6">
            <h2 className="recent-log-title">최근 작업 로그</h2>
            <ul className="recent-log-list">
              <li className="recent-log-item">
                <span className="log-date">2024-11-16</span>
                <span className="log-description">
                  YOLO 파일 처리 완료{" "}
                  <span className="log-file">(yolo_file49.mp4)</span>
                </span>
              </li>
              <li className="recent-log-item">
                <span className="log-date">2024-11-16</span>
                <span className="log-description">
                  Blur 파일 처리 완료{" "}
                  <span className="log-file">(blur_file49.mp4)</span>
                </span>
              </li>
              <li className="recent-log-item">
                <span className="log-date">2024-11-15</span>
                <span className="log-description">
                  DeepPrivacy 처리 완료{" "}
                  <span className="log-file">(deepprivacy_file48.mp4)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MosaicPage;
