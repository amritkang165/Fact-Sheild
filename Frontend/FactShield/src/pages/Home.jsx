function Home() {
  return (
    <div className="hero">
      {/* Spline Background */}
      <spline-viewer
        url="https://prod.spline.design/zdsDt12YtbazL2tv/scene.splinecode"
        className="spline-bg"
      ></spline-viewer>

      {/* React Overlay Content */}
      <div className="hero-content">
        <h1>
          Fight <br />
          <span>Misinformation</span> <br />
          With AI
        </h1>

        <p>
          Instantly verify news, articles, and social media posts.
          <br />
          Get accurate, AI-powered credibility insights in seconds.
        </p>

        <button>CHECK NEWS NOW</button>
      </div>

      {/* ✅ Bottom Waves (OPTION A) */}
      <div className="wave-wrapper">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0f766e"
            fillOpacity="0.25"
            d="M0,224L80,202.7C160,181,320,139,480,128C640,117,800,139,960,154.7C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  )
}

export default Home
