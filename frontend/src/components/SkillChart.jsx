import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillChart = ({ currentSkills, missingSkills, isDarkMode }) => {
  // Combine skills for the labels
  const allLabels = [...currentSkills, ...missingSkills];

  // Data Logic: 
  // Current Skills = 10 (Full Score)
  // Missing Skills = 2 (Low Score)
  const currentData = allLabels.map(skill => currentSkills.includes(skill) ? 10 : 2);
  const requiredData = allLabels.map(() => 10); // The "Perfect" Job Profile

  // --- DYNAMIC COLORS ---
  const textColor = isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)";
  const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";
  const backdropColor = isDarkMode ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.8)";

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: 'Your Skills',
        data: currentData,
        backgroundColor: 'rgba(59, 130, 246, 0.3)', // Blue transparent
        borderColor: 'rgba(59, 130, 246, 1)',       // Blue solid
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
      {
        label: 'Target Requirement',
        data: requiredData,
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red transparent (very light)
        borderColor: 'rgba(239, 68, 68, 0.5)',     // Red solid
        borderWidth: 1,
        borderDash: [5, 5], // Dashed line for the target
        pointRadius: 0, // Hide points for the target line
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: gridColor,
        },
        grid: {
          color: gridColor,
        },
        pointLabels: {
          color: textColor,
          font: {
            size: 13, // Bigger font for labels
            family: "'Inter', sans-serif",
            weight: 'bold',
          },
          backdropColor: backdropColor, // Background behind text (cleaner look)
        },
        ticks: {
          display: false, // Hide the 0-10 numbers on the axis (cleaner)
          backdropColor: "transparent",
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 14,
          }
        },
        position: 'top',
      },
    },
    maintainAspectRatio: false, // Allows us to control height manually
  };

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillChart;