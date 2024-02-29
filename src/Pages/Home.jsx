import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VideoHome from '../Components/VideosHome/VideoHome'

function Home() {
  return (
    <div className="container-main-home">
      <VideoHome className="container-video">componente video</VideoHome>
      <div className="container-text">
        <h1>Buy luxurious items coupled with utility NFTs</h1>
        <h2>
          The marketplace that merges physical luxury and digital security.
        </h2>
        <div className="container-link">
          <div className="link-icons">
            <a href="">Get Started</a>
            <ArrowForwardIcon />
          </div>
          <div className="container-line">
            <div className="line-white">.</div>
            <div className="line-gray">.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
