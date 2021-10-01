import React from "react";
import "./Home.css";
import video from "../../video/bg-video.mp4";
import Cryptocurrencies from "../../pages/crypto/Cryptocurrencies";
import News from "../../pages/news/News";
import { Link, useHistory } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../../components/Loader";
import millify from "millify";
import { ArrowForwardIos } from "@mui/icons-material";

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const history = useHistory();

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          src={video}
          type="video/mp4"
          className="hero-video"
        ></video>

        <div className="hero-content">
          <h4>Cryptocurrencies, Crypto news and much more.</h4>
          <h1>Crypto World Rank</h1>
          <p>
            You will find all cryptos, exchanges, news, crypto price chart,
            graph and crypto details in one place.
          </p>

          <button
            className="hero-btn"
            onClick={() => history.push("/cryptocurrencies")}
          >
            Explore
          </button>
        </div>
      </div>

      <div className="global-stats-container">
        <h1 className="global-title">Global Crypto Stats</h1>

        <div className="global-container">
          <div className="global-row">
            <div className="global-content">
              <div className="global-content-inner">
                <h1>{globalStats.total}</h1>
                <h3>Total Cryptocurrencies</h3>
              </div>
            </div>

            <div className="global-content">
              <div className="global-content-inner">
                <h1>{globalStats.totalExchanges}</h1>
                <h3>Total Exchanges</h3>
              </div>
            </div>

            <div className="global-content">
              <div className="global-content-inner">
                <h1>{millify(globalStats.totalMarketCap)}</h1>
                <h3>Total Market Cap</h3>
              </div>
            </div>

            <div className="global-content">
              <div className="global-content-inner">
                <h1>{millify(globalStats.total24hVolume)}</h1>
                <h3>Total 24h Volume</h3>
              </div>
            </div>

            <div className="global-content">
              <div className="global-content-inner">
                <h1>{globalStats.totalMarkets}</h1>
                <h3>Total Markets</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="top-cryptos">
        <div className="top-crypto-title">
          <h1>Top 10 Cryptos</h1>
          <div className="show-more-wrapper">
            <Link to="cryptocurrencies" className="show-more">
              Show more
            </Link>
            <ArrowForwardIos fontSize="small" className="arrow-right" />
          </div>
        </div>

        <Cryptocurrencies simplified />
      </div>

      <div className="top-cryptos">
        <div className="top-crypto-title">
          <h1>
            Latest <span className="helper-crypto">Crypto</span> News
          </h1>
          <div className="show-more-wrapper">
            <Link to="news" className="show-more">
              Show more
            </Link>
            <ArrowForwardIos fontSize="small" className="arrow-right" />
          </div>
        </div>

        <News simplified />
      </div>
    </>
  );
};

export default Home;
