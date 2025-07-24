import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

import { usePage } from "@inertiajs/react";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportsCard = () => {

  const { stats_total_report_membership, stats_total_report_booking } = usePage().props; 

  // Turn object into arrays
  const labels = Object.keys(stats_total_report_membership);      // All dates
  const membershipSales = Object.values(stats_total_report_membership); // Corresponding sales
  const bookingsSales = Object.values(stats_total_report_booking); // Corresponding sales

  const data = {
    labels: labels, // Dates on the x-axis
    datasets: [
      {
        label: "Membership Plan",
        data: membershipSales, // Dynamic sales values
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "Book a Trainer",
        data: bookingsSales, // Static for now (you can replace this too)
        borderColor: "rgb(98, 192, 75)",
        backgroundColor: "rgba(75, 77, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const generateCSV = () => {
    let csv = "Date,Membership Sales,Booking Sales\n";
    labels.forEach((label, idx) => {
      csv += `${label},${membershipSales[idx]},${bookingsSales[idx]}\n`;
    });
    return csv;
  };

  const downloadCSV = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Sales Reports  
          </h5>
          {/* Line Chart */}
          <div style={{ height: "300px" }}>
            <Line data={data} options={options} />
          </div>
          {/* Download Button moved below chart */}
          <button className="btn btn-primary mt-3" onClick={downloadCSV}>
            Download Sales Report
          </button>
          {/* End Line Chart */}
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
