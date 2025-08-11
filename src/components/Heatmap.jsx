import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import './style.css';

const DualHeatmap = () => {
  const [heatmapLayers, setHeatmapLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colorPalette, setColorPalette] = useState(d3.interpolateWarm);
  const [maskData, setMaskData] = useState(null);

  const colorPalettes = [
    { name: "Warm", scale: d3.interpolateWarm },
    { name: "Cool", scale: d3.interpolateCool },
    { name: "Viridis", scale: d3.interpolateViridis },
    { name: "Inferno", scale: d3.interpolateInferno },
    { name: "Turbo", scale: d3.interpolateTurbo  },
  ];

  const lonStart = 74.83497, lonEnd = 74.88256;
  const latStart = 34.07999, latEnd = 34.15052;
  const gridRows = 40;
  const gridCols = 60;

  const valueDomains = {
  TDS: [295, 320],
  Turbidity: [1.82, 1.85],
  pH: [5.5, 5.95],
  Temperature: [25.3, 25.4],
};

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/ph_predicted.json");
        const json = await res.json();

        const latStep = (latEnd - latStart) / gridRows;
        const lonStep = (lonEnd - lonStart) / gridCols;

        const tds = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
        const turbidity = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
        const pH = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
        const temperature = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
        const counts = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));

        for (let point of json) {
          const lat = parseFloat(point.Latitude);
          const lon = parseFloat(point.Longitude);
          const tdsVal = parseFloat(point.TDS);
          const turbVal = parseFloat(point.Turbidity);
          const phVal = parseFloat(point.pH);
          const tempVal = parseFloat(point.Temperature);

          for (let r = 0; r < gridRows; r++) {
            const latMin = latStart + r * latStep;
            const latMax = latMin + latStep;
            if (lat < latMin || lat >= latMax) continue;

            for (let c = 0; c < gridCols; c++) {
              const lonMin = lonStart + c * lonStep;
              const lonMax = lonMin + lonStep;
              if (lon < lonMin || lon >= lonMax) continue;

              let valid = false;
              if (!isNaN(tdsVal) && tdsVal >= 0) {
                tds[r][c] += tdsVal;
                valid = true;
              }
              if (!isNaN(turbVal) && turbVal >= 0) {
                turbidity[r][c] += turbVal;
                valid = true;
              }
              if (!isNaN(phVal) && phVal >= 0 && phVal <= 14) {
                pH[r][c] += phVal;
                valid = true;
              }
              if (!isNaN(tempVal) && tempVal > -100 && tempVal < 100) {
                temperature[r][c] += tempVal;
                valid = true;
              }

              if (valid) counts[r][c]++;
              break;
            }
            break;
          }
        }

        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            if (counts[r][c] > 0) {
              tds[r][c] /= counts[r][c];
              turbidity[r][c] /= counts[r][c];
              pH[r][c] /= counts[r][c];
              temperature[r][c] /= counts[r][c];
            } else {
              tds[r][c] = NaN;
              turbidity[r][c] = NaN;
              pH[r][c] = NaN;
              temperature[r][c] = NaN;
            }
          }
        }

        setHeatmapLayers([
          { id: "#heatmap1", label: "TDS", data: tds },
          { id: "#heatmap2", label: "Turbidity", data: turbidity },
          { id: "#heatmap3", label: "pH", data: pH },
          { id: "#heatmap4", label: "Temperature", data: temperature },
        ]);
      } catch (err) {
        console.error("Data load error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/images/2.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      setMaskData({ data: imageData, width: img.width, height: img.height });
    };
    img.onerror = () => console.error("Failed to load mask image");
  }, []);

  useEffect(() => {
    if (!heatmapLayers.length || !maskData) return;
    heatmapLayers.forEach(layer => drawHeatmap(layer.id, layer.data, layer.label));
  }, [heatmapLayers, colorPalette, maskData]);

 

const drawHeatmap = (containerId, heatmapData, parameter) => {
  d3.select(containerId).selectAll("svg, .tooltip").remove();

  const margin = { top: 60, right: 0, bottom: 30, left: 50 };
  const container = document.querySelector(containerId);
  const width = Math.min(500, container.clientWidth) - margin.left - margin.right;
  const height = Math.min(350, container.clientHeight) - margin.top - margin.bottom;

  const svg = d3.select(containerId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear().domain([lonStart, lonEnd]).range([0, width]);
  const yScale = d3.scaleLinear().domain([latStart, latEnd]).range([height, 0]);

  // Use custom domain for each parameter
  const [minVal, maxVal] = valueDomains[parameter] || [0, d3.max(heatmapData.flat())];
const colorScale = d3.scaleSequential(colorPalette).domain([minVal, maxVal]).clamp(true);

  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "white")
    .style("width", "200px")
    .style("border-radius", "3px")
    .style("color", "black")
    .style("visibility", "hidden");

  const isWater = (lon, lat) => {
    const { data, width: mw, height: mh } = maskData;
    const px = Math.floor(((lon - lonStart) / (lonEnd - lonStart)) * mw);
    const py = Math.floor(mh - ((lat - latStart) / (latEnd - latStart)) * mh);
    const idx = (py * mw + px) * 4;
    return data[idx] > 128;
  };

  const cells = [];
  const rows = heatmapData.length;
  const cols = heatmapData[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lon = lonStart + (c / (cols - 1)) * (lonEnd - lonStart);
      const lat = latStart + (r / (rows - 1)) * (latEnd - latStart);
      if (isWater(lon, lat)) {
        cells.push({ r, c, v: heatmapData[r][c] });
      }
    }
  }

  svg.selectAll("rect")
    .data(cells)
    .join("rect")
    .attr("x", d => xScale(lonStart + (d.c / (cols - 1)) * (lonEnd - lonStart)))
    .attr("y", d => yScale(latStart + (d.r / (rows - 1)) * (latEnd - latStart)))
    .attr("width", xScale(lonStart + (1 / (cols - 1)) * (lonEnd - lonStart)) - xScale(lonStart))
    .attr("height", yScale(latStart) - yScale(latStart + (1 / (rows - 1)) * (latEnd - latStart)))
    .style("fill", d => colorScale(d.v))
    .on("mouseover", (event, d) => {
      const lat = latStart + (d.r / (rows - 1)) * (latEnd - latStart);
      const lon = lonStart + (d.c / (cols - 1)) * (lonEnd - lonStart);
      const value = isNaN(d.v) ? "N/A" : d.v.toFixed(2);
      tooltip
        .style("visibility", "visible")
        .html(`Value: ${value}<br>Lat: ${lat.toFixed(5)}<br>Lon: ${lon.toFixed(5)}`);
    })
    .on("mousemove", event => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  svg.append("image")
    .attr("x", xScale(lonStart))
    .attr("y", yScale(latEnd))
    .attr("width", xScale(lonEnd) - xScale(lonStart))
    .attr("height", yScale(latStart) - yScale(latEnd))
    .attr("xlink:href", "/src/assets/images/1.png")
    .style("opacity", 0.8)
    .style("pointer-events", "none");

  svg.append("g").call(d3.axisTop(xScale).ticks(5).tickFormat(d3.format(".5f")));
  svg.append("g").call(d3.axisLeft(yScale).ticks(5).tickFormat(d3.format(".5f")));
};


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {loading || !maskData ? (
        <p>Loading heatmap data and lake mask…</p>
      ) : (
        <div className="heatmap-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {heatmapLayers.map((layer, i) => (
            <div key={i} id={layer.id.substring(1)} style={{ position: "relative", height: 500 }}>
              <h2>{layer.label}</h2>
            </div>
          ))}
          <div style={{ width: 700, height: 500 }}>
            <h1 style={{ textDecoration: "underline" }}>Select Color Palette</h1>
            {colorPalettes.map((p, i) => (
              <button key={i}
                style={{
                  display: "block", margin: "20px auto",
                  padding: "10px 20px", background: "#555", color: "#fff",
                  border: "none", cursor: "pointer"
                }}
                onClick={() => setColorPalette(() => p.scale)}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DualHeatmap;
