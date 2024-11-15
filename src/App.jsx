import React, { useEffect, useRef } from "react";
import "./App.css";
import { Chart, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faRedo,
  faCog,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

function App() {
  const riskLevelRef = useRef(null);
  const organizationRiskRef = useRef(null);
  const dailyRiskRef = useRef(null);
  const weeklyRiskRef = useRef(null);
  const mosaicRef = useRef(null);

  // PDF 아이콘 클릭 시 API 요청을 보내고 응답으로 받은 URL을 새 탭에서 여는 함수
  const handlePdfClick = async (index) => {
    try {
      // 예시 API 요청 - 실제 API 엔드포인트를 사용해야 함
      const response = await fetch(
        `https://api.example.com/generate-pdf/${index}`
        // Please modify this to the actual API endpoint URL: for example if the server is running on localhost:3000, it should be http://localhost:3000/some-routes/etc
      );
      const data = await response.json();
      // the response in an object, check the api endpoint documentation. What are the object keys?
      // For example data object could be { fileUrl: "http://example.com/somefile.pdf" } or { url: "http://example.com/somefile.pdf" } etc
      // so you will change the fileUrl variable below to the actual key that contains the file URL

      // 응답에서 파일 URL을 받아 새 탭에서 열기
      const fileUrl = data.fileUrl; // API 응답에서 파일 URL이 담긴 키
      window.open(fileUrl, "_blank"); // 새 탭에서 열기
    } catch (error) {
      console.error("PDF 파일을 열 수 없습니다:", error);
    }
  };

  // API 요청을 통해 다른 페이지로 이동하는 함수
  const handleMosaicClick = async () => {
    try {
      // 예시 API 요청 - 실제 API 엔드포인트를 사용해야 함
      const response = await fetch("https://api.example.com/mosaic-page");
      const data = await response.json();

      // 응답에서 받은 URL로 새 탭에서 이동
      const pageUrl = data.pageUrl; // API 응답에서 페이지 URL이 담긴 키
      window.open(pageUrl, "_blank"); // 새 탭에서 열기
    } catch (error) {
      console.error("페이지를 열 수 없습니다:", error);
    }
  };

  useEffect(() => {
    const destroyChartIfExists = (chart) => {
      if (chart) chart.destroy();
    };

    const createChart = (ctx, type, data, options) =>
      new Chart(ctx, { type, data, options });
    if (dailyRiskRef.current) {
      destroyChartIfExists(dailyRiskRef.current.chart);
      dailyRiskRef.current.chart = createChart(
        dailyRiskRef.current,
        "line",
        {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              label: "일간 점수",
              data: [500, 650, 700, 620, 590, 670, 680],
              borderColor: "#FFA500",
              fill: false,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
        }
      );
    }

    if (weeklyRiskRef.current) {
      destroyChartIfExists(weeklyRiskRef.current.chart);
      weeklyRiskRef.current.chart = createChart(
        weeklyRiskRef.current,
        "line",
        {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              label: "주간 점수",
              data: [5000, 5200, 5100, 5300, 5250, 5100, 5050],
              borderColor: "#00BFFF",
              fill: false,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
        }
      );
    }
    if (riskLevelRef.current) {
      destroyChartIfExists(riskLevelRef.current.chart);
      riskLevelRef.current.chart = createChart(
        riskLevelRef.current,
        "doughnut",
        {
          labels: ["위험", "주의", "경고", "관심", "양호"],
          datasets: [
            {
              data: [40, 25, 15, 10, 10],
              backgroundColor: [
                "#FF6384",
                "#FFCE56",
                "#36A2EB",
                "#FF9F40",
                "#4BC0C0",
              ],
            },
          ],
        },
        {
          responsive: true,
          rotation: -90, // Start angle for the half-doughnut
          circumference: 180, // Display only 180 degrees for a semi-circle
          maintainAspectRatio: false,
          cutout: "30%",
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 10, // 아이콘 크기 조정 (기본값: 40)
                boxHeight: 10, // 필요 시 높이도 조정
                font: {
                  size: 12, // 텍스트 크기 조정 (기본값: 12)
                },
              },
            },
          },
        }
      );
    }

    // 조직별 위험 현황 차트 - 선형 그래프 설정
    if (organizationRiskRef.current) {
      destroyChartIfExists(organizationRiskRef.current.chart);
      organizationRiskRef.current.chart = createChart(
        organizationRiskRef.current,
        "line", // 선형 그래프 타입 설정
        {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              label: "기획부",
              data: [20000, 19000, 22000, 21000, 25000, 24000, 23000],
              borderColor: "#FF6384",
              fill: true,
            },
            {
              label: "IT부서",
              data: [22000, 21000, 23000, 25000, 24000, 20000, 21000],
              borderColor: "#36A2EB",
              fill: true,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
        }
      );
    }
    if (mosaicRef.current) {
      destroyChartIfExists(mosaicRef.current.chart);
      mosaicRef.current.chart = createChart(
        mosaicRef.current,
        "bar",
        {
          labels: ["1", "2", "3", "4"],
          datasets: [
            {
              label: "모자이크 요청량",
              data: [15, 20, 10, 25],
              backgroundColor: ["#4BC0C0", "#4BC0C0", "#4BC0C0", "#4BC0C0"],
            },
            {
              label: "모자이크 처리량",
              data: [10, 19, 8, 22],
              backgroundColor: ["#36A2EB", "#36A2EB", "#36A2EB", "#36A2EB"],
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
        }
      );
    }

    // 다른 차트 설정도 동일하게 추가
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-left" style={{ fontSize: "20px" }}>
          BS SOLUTION
        </div>
        <div className="header-center" style={{ fontSize: "20px" }}>
          DATA BOARD
        </div>
        <div className="header-right">
          <FontAwesomeIcon icon={faUndo} className="fa-icon" />
          <FontAwesomeIcon icon={faRedo} className="fa-icon" />
          <FontAwesomeIcon icon={faCog} className="fa-icon" />
          <div className="search-bar">
            <input type="text" placeholder="검색" />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </header>

      <div className="dashboard">
        <div className="card danger">
          <h2
            style={{
              fontSize: "1.5em",
              fontWeight: "bold" /*볼드체가 적용이 안됨*/,
            }}
          >
            개인정보 접근 행위수
          </h2>
          <p style={{ fontSize: "2em" }}>495,005 건</p>
        </div>
        <div className="card group">
          <h2>조직별 위험 현황</h2>
          <canvas ref={organizationRiskRef}></canvas>
        </div>
        <div className="card mosaik">
          <h2>모자이크</h2>
          <div className="chart-container">
            <canvas ref={mosaicRef}></canvas>
          </div>
          {/* 버튼을 차트 아래에 추가 */}
          <button onClick={handleMosaicClick} className="mosaic-button">
            버튼
          </button>
        </div>
        <div className="card risk-level drank">
          <h2>위험 등급</h2>
          <canvas ref={riskLevelRef}></canvas>
        </div>
        <div className="card day">
          <h2>일간 위험 점수 비교</h2>
          <canvas ref={dailyRiskRef}></canvas>
        </div>
        <div className="card week">
          <h2>주간 위험 점수 비교</h2>
          <canvas ref={weeklyRiskRef}></canvas>
        </div>
        <div className="card user">
          <h2>사용자별 위험 순위</h2>
          <table className="rank-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>이름</th>
                <th>점수</th>
                <th>변동</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>손주은</td>
                <td>291,395</td>
                <td>▲</td>
              </tr>
              <tr>
                <td>2</td>
                <td>김민지</td>
                <td>203,123</td>
                <td>▲</td>
              </tr>
              <tr>
                <td>3</td>
                <td>김나연</td>
                <td>197,543</td>
                <td>▼</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card risk-level1 total">
          <h2>개인정보 총 이용량</h2>
          <p style={{ fontSize: "1.5em" }}>19,147,314 건</p>
        </div>
        <div className="card risk-level2 ai">
          <h2>AI 컴플라이언스</h2>
          <div className="pdf-icons">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                alt="PDF 아이콘"
                onClick={() => handlePdfClick(index)} // 각 아이콘 클릭 시 handlePdfClick 호출
              />
            ))}
          </div>
        </div>
        {/* "서버 상태"와 "부서별 위험 순위" 카드를 "AI 컴플라이언스" 카드 외부로 이동 */}
        <div className="card risk-level4 part">
          <h2>부서별 위험 순위</h2>
          <table className="rank-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>부서명</th>
                <th>점수</th>
                <th>변동</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>영업부</td>
                <td>302,314</td>
                <td>▲</td>
              </tr>
              <tr>
                <td>2</td>
                <td>기획부</td>
                <td>234,543</td>
                <td>▲</td>
              </tr>
              <tr>
                <td>3</td>
                <td>IT 부서</td>
                <td>223,123</td>
                <td>▼</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card risk-level3 server">
          <h2>서버 상태 </h2>
          <div className="server-status">
            <div className="server-status-icon">CPU</div>
            <span>50%</span>
          </div>
          <div className="server-status">
            <div className="server-status-icon">MEM</div>
            <span>48%</span>
          </div>
          <div className="server-status">
            <div className="server-status-icon">DISK</div>
            <span>49%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
