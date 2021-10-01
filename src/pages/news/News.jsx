import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import "./News.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#21b6b7",
      },
    },
  });

  return (
    <div>
      {!simplified && (
        <div className="select-news">
          <ThemeProvider theme={darkTheme}>
            <Box className="select-box" color="#21b6b7">
              <FormControl
                fullWidth
                color="primary"
                style={{ color: "#c4f5f5" }}
              >
                <InputLabel id="demo-simple-select-label" color="primary">
                  Select a Crypto News
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select a Crypto News"
                  color="primary"
                  style={{ color: "#c4f5f5" }}
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                >
                  <MenuItem
                    value="Cryptocurrency"
                    defaultValue="Cryptocurrency"
                  >
                    Cryptocurrency
                  </MenuItem>

                  {data?.data?.coins?.map((coin) => (
                    <MenuItem value={coin.name} key={coin.id}>
                      {coin.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </ThemeProvider>
        </div>
      )}

      <div className="news-card-wrapper">
        {cryptoNews.value.map((news, i) => (
          <div className="news-card-container" key={i}>
            <div className="news-card-inner">
              <a
                className="news-card"
                href={news.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="news-header">
                  <h1>
                    {news.name.length > 40
                      ? `${news.name.substring(0, 40)}...`
                      : news.name}
                  </h1>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                    className="news-thumb"
                  />
                </div>

                <p>
                  {news.description.length > 80
                    ? `${news.description.substring(0, 80)}...`
                    : news.description}
                </p>

                <div className="news-provider">
                  <div className="provider">
                    <img
                      className="provider-img"
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <h3>
                      {news.provider[0]?.name.length > 13
                        ? `${news.provider[0]?.name.substring(0, 15)}...`
                        : news.provider[0]?.name}
                    </h3>
                  </div>

                  <p className="timeperiod">
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </p>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
