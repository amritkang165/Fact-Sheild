import Header from "../components/Header";

function Home() {
  return (
    <div className="hero">
      {/* Logo */}
      <Header />

      {/* Spline Background */}
      <spline-viewer
        url="https://prod.spline.design/zdsDt12YtbazL2tv/scene.splinecode"
        className="spline-bg"
      ></spline-viewer>

      {/* Text Content */}
      <div className="hero-content">
        <h1 className="hero-heading">
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
