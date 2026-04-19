"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  date: string;
  views: number;
};

type TopPage = {
  url: string;
  views: number;
};

interface TrafficChartProps {
  chartData: ChartData[];
  topPages: TopPage[];
}

export default function TrafficChart({ chartData, topPages }: TrafficChartProps) {
  return (
    <div style={{
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "1.5rem",
      marginBottom: "2.5rem",
    }}>
      <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", fontWeight: "600" }}>Trafic - Ultimele 7 Zile</h2>
      
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1e293b", 
                border: "none", 
                borderRadius: "8px",
                color: "#f8fafc",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
              }}
              itemStyle={{ color: "#38bdf8" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#38bdf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", color: "#cbd5e1" }}>Cele mai vizitate pagini (top 5)</h3>
        {topPages.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {topPages.map((page, index) => (
              <li 
                key={index} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  padding: "0.75rem 1rem", 
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: index === 0 ? "8px 8px 0 0" : index === topPages.length - 1 ? "0 0 8px 8px" : "0",
                }}
              >
                <span style={{ color: "#f8fafc", wordBreak: "break-all", paddingRight: "1rem" }}>{page.url}</span>
                <span style={{ color: "#38bdf8", fontWeight: "bold" }}>{page.views} vizualizări</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#94a3b8" }}>Nu există date de trafic încă.</p>
        )}
      </div>
    </div>
  );
}
