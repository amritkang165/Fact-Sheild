import { useEffect, useState } from "react";
import Header from "../components/Header";

function Home() {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    // Force Spline to mount after page load
    const timer = setTimeout(() => {
      setShowSpline(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero">
      <Header />

      {showSpline && (
        <spline-viewer
          url="https://prod.spline.design/zdsDt12YtbazL2tv/scene.splinecode"
          className="spline-bg"
        ></spline-viewer>
      )}

      <div className="hero-content">
        <h1>
          <span className="brand-font">FIGHT</span> <br />
          <span className="misinfo-word">MISINFORMATION</span> <br />
          <span className="brand-font">WITH AI</span>
        </h1>

        <p>
          Instantly verify news, articles, and social media posts.
          <br />
          Get accurate, AI-powered credibility insights in seconds.
        </p>

        <button>CHECK NEWS NOW</button>
      </div>
    </div>
  );
}

export default Home;
