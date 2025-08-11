import React from 'react';
import './style.css';

const About = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "98%" }}>
      <h1>About HYDROMAP</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          HYDROMAP (Heatmap Yielding Device for Real-time Observation and Monitoring Application Platform) is a comprehensive, smart water monitoring solution tailored specifically for the ecological challenges of Dal Lake, Kashmir. The core innovation lies in an Unmanned Surface Vehicle (USV)—a custom-designed, remote-controlled boat—that autonomously collects multi-parameter water quality data across the lake. This data is wirelessly transmitted to a cloud server and visualized through a highly interactive, web-based dashboard. The system enables environmental researchers and authorities to observe, predict, and respond to lake health in real-time.
        </p>
      </section>

      <section>
        <h2>Key Features and Objectives</h2>
        <p>
          HYDROMAP leverages the synergy between modern technologies such as IoT, embedded systems, AI/ML, cloud computing, and data visualization. It aims to be a robust, cost-effective, and scalable solution for aquatic environmental monitoring.
        </p>
        <ul>
          <li><strong>Real-time Monitoring:</strong> The USV navigates freely across Dal Lake, enabling dynamic spatial data collection.</li>
          <li><strong>Multi-parameter Sensing:</strong> Equipped with sensors for pH, temperature, turbidity, and Total Dissolved Solids (TDS).</li>
          <li><strong>Cloud-Based Data Management:</strong> Environmental data is securely transmitted and stored in a time-series database hosted on the cloud.</li>
          <li><strong>Interactive Visualization:</strong> Data is presented as high-resolution heatmaps using React.js and D3.js, with support for real-time color palette switching and tooltips.</li>
          <li><strong>AI-Driven Prediction:</strong> Machine learning models fill missing data points, classify water conditions, and predict fish survival rates and harmful algal bloom (HAB) conditions.</li>
        </ul>
        <p>
          The primary goal is to establish a smart, AI-integrated environmental monitoring system that supports policy-making and sustainable ecosystem management.
        </p>
      </section>

      <section>
        <h2>System Architecture</h2>
        <p>
          HYDROMAP's architecture is divided into three key layers:
        </p>
        <ul>
          <li><strong>Physical Layer:</strong> The smart boat built using a catamaran hull design includes the ESP32 microcontroller, sensors, GPS, motor, microSD module, and power management unit. It ensures robust mobility and high-precision data collection.</li>
          <li><strong>Backend Layer:</strong> This layer handles data reception, cleansing, storage, and preliminary processing. It uses a structured JSON format and time-series database to maintain scalability.</li>
          <li><strong>Application Layer:</strong> The frontend user interface displays real-time environmental heatmaps, allows parameter comparison, and provides color scale customization through palette switching features.</li>
        </ul>
      </section>

      <section>
        <h2>Visualization & Frontend Platform</h2>
        <p>
          Built using React.js and D3.js, the HYDROMAP dashboard offers a multi-grid heatmap visualization system that renders individual maps for temperature, pH, TDS, turbidity, and dissolved oxygen. The platform uses a preprocessed black-and-white mask image to ensure that visual data is restricted only to lake regions, ensuring geographic accuracy. Each heatmap features interactive tooltips for real-time feedback and offers users the flexibility to choose from multiple D3-based color gradients such as Plasma, Cool, Inferno, and Viridis.
        </p>
      </section>

      <section>
        <h2>Machine Learning Integration</h2>
        <p>
          HYDROMAP incorporates predictive capabilities through various machine learning algorithms:
        </p>
        <ul>
          <li><strong>Random Forest Regressors:</strong> Predict missing values in datasets for parameters such as pH, TDS, and temperature using spatial correlations and historical patterns.</li>
          <li><strong>Interpolation & Heatmap Completion:</strong> High-resolution predictions using algorithms like Inverse Distance Weighting (IDW) to fill spatial gaps in the heatmap grid.</li>
          <li><strong>Fish Survival Prediction:</strong> Models trained on historical survival data using temperature, pH, and oxygen levels to predict habitability zones.</li>
          <li><strong>Harmful Algal Bloom Detection:</strong> AI models assess turbidity and nutrient trends to forecast bloom-prone regions.</li>
        </ul>
        <p>
          These models help stakeholders take preventive action based on real-time risk indicators.
        </p>
      </section>

      <section>
        <h2>Hardware Highlights</h2>
        <p>
          The boat features a dual-hull (catamaran) design for stability and waterproofing. Key components include:
        </p>
        <ul>
          <li><strong>ESP32:</strong> Central microcontroller with Wi-Fi, Bluetooth, and GPIO support.</li>
          <li><strong>D2826 Brushless Motor + ESC:</strong> Propulsion system with sufficient thrust for open water mobility.</li>
          <li><strong>GPS (NEO-6M):</strong> Geo-tagging each data point with real-time coordinates.</li>
          <li><strong>3S LiPo Battery:</strong> Power source for long operational hours, with voltage regulation for sensitive components.</li>
          <li><strong>Sensor Suite:</strong> Analog and digital sensors for pH, temperature (DS18B20), TDS, and turbidity.</li>
        </ul>
      </section>

      <section>
        <h2>Results & Future Scope</h2>
        <p>
          Field testing on Dal Lake validated the accuracy, responsiveness, and effectiveness of the system. All sensor readings were successfully logged, geo-tagged, and visualized through the frontend.
        </p>
        <p>
          Preliminary ML models achieved high accuracy in turbidity (R² = 0.998), pH (R² = 0.84), and temperature (R² = 0.999), with slightly lower results for TDS due to unknown environmental factors.
        </p>
        <p>
          <strong>Future Improvements:</strong>
        </p>
        <ul>
          <li>Autonomous navigation using computer vision and advanced GPS routing.</li>
          <li>Expanded sensor suite to monitor nitrates, phosphates, and heavy metals.</li>
          <li>Multi-boat fleet coordination for broader coverage and time efficiency.</li>
          <li>Public API for researchers and institutions to access data.</li>
          <li>Advanced deep learning models to improve predictive robustness.</li>
        </ul>
      </section>

      <section>
        <h2>Conclusion</h2>
        <p>
          HYDROMAP stands as a promising step forward in eco-centric innovation, offering a complete ecosystem for real-time water quality analysis. By combining unmanned systems, IoT, ML, and interactive heatmap visualization, it empowers decision-makers to act on timely, data-driven insights, ensuring the sustainable preservation of Dal Lake and similar freshwater resources.
        </p>
      </section>
    </div>
  );
};

export default About;