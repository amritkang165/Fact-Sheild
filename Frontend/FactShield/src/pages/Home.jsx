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
    </div>
  )
}

export default Home
