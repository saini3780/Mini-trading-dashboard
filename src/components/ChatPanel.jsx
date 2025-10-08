import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { fetchCandles } from "../services/finnhubApi";
import TimeframeSelector from "./TimeframeSelector";

const ChartPanel = ({ symbol }) => {
  const chartContainerRef = useRef(null);
  const [timeframe, setTimeframe] = useState("D");

  useEffect(() => {
    if (!symbol) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#fff" },
        textColor: "#222",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    const loadData = async () => {
      const now = Math.floor(Date.now() / 1000);
      const from =
        timeframe === "D"
          ? now - 90 * 24 * 60 * 60 // 3 months for daily
          : now - 3 * 24 * 60 * 60; // shorter for intraday
      try {
        const data = await fetchCandles(symbol, timeframe, from, now);
        if (data.s === "ok") {
          const chartData = data.t.map((time, i) => ({
            time,
            open: data.o[i],
            high: data.h[i],
            low: data.l[i],
            close: data.c[i],
          }));
          candleSeries.setData(chartData);
        }
      } catch (err) {
        console.error("Error loading chart:", err);
      }
    };

    loadData();

    return () => chart.remove();
  }, [symbol, timeframe]);

  return (
    <div className="card p-3 mt-3">
      <h5>{symbol ? `${symbol} Chart` : "Select a symbol"}</h5>
      {symbol && (
        <TimeframeSelector current={timeframe} onChange={setTimeframe} />
      )}
      <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default ChartPanel;
