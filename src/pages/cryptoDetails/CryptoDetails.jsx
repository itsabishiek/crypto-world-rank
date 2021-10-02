import {
  AlignVerticalBottom,
  AllInclusive,
  Approval,
  AttachMoney,
  CheckCircleOutline,
  FlashOn,
  HighlightOffOutlined,
  MonetizationOnOutlined,
  Tag,
  TrendingUp,
} from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import "./CryptoDetails.css";
import LineChart from "../../components/chart/LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  console.log(coinHistory);

  if (isFetching) return <Loader />;

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#21b6b7",
      },
    },
  });

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <AttachMoney />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <Tag /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <FlashOn />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <MonetizationOnOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <AllInclusive />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <TrendingUp />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <AttachMoney />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckCircleOutline />
      ) : (
        <HighlightOffOutlined />
      ),
      icon: <Approval />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <AlignVerticalBottom />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <CheckCircleOutline />,
    },
  ];

  return (
    <div className="coin-detail-container">
      <div className="coin-heading-container">
        <h1 className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </h1>

        <p>{cryptoDetails.name} live price in US Dollar (USD)</p>
      </div>

      <ThemeProvider theme={darkTheme}>
        <Box className="select-box" color="#21b6b7">
          <FormControl fullWidth color="primary" style={{ color: "#c4f5f5" }}>
            <InputLabel id="demo-simple-select-label" color="primary">
              Select Time period
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Time period"
              color="primary"
              style={{ color: "#c4f5f5" }}
              value={timeperiod}
              onChange={(e) => setTimeperiod(e.target.value)}
            >
              {time.map((date) => (
                <MenuItem key={date} value={date} defaultValue="7d">
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </ThemeProvider>

      <div className="line-chart">
        <LineChart
          coinHistory={coinHistory}
          currentPrice={cryptoDetails.price}
          coinName={cryptoDetails.name}
        />
      </div>

      <div className="stats-container">
        <div className="coin-value-statistics">
          <div className="coin-value-heading">
            <h2 className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </h2>

            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and the trading volume.
            </p>
          </div>

          {stats.map(({ icon, title, value }) => (
            <div className="coin-stats" key={value}>
              <div className="coin-stats-name">
                <h3 className="stats-icon">{icon}</h3>
                <h3>{title}</h3>
              </div>

              <h3 className="stats">{value}</h3>
            </div>
          ))}
        </div>

        <div className="other-stats-info">
          <div className="coin-value-heading">
            <h2 className="coin-details-heading">Other Stats Information</h2>

            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>

          {genericStats.map(({ icon, title, value }) => (
            <div className="coin-stats" key={value}>
              <div className="coin-stats-name">
                <h3 className="stats-icon">{icon}</h3>
                <h3>{title}</h3>
              </div>

              <h3 className="stats">{value}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="coin-desc-link">
        <div className="coin-desc">
          <h4 className="coin-details-heading">
            What is {cryptoDetails.name}?
          </h4>

          {HTMLReactParser(cryptoDetails.description)}
        </div>

        <div className="coin-links">
          <h3 className="coin-details-heading">{cryptoDetails.name} Links</h3>

          {cryptoDetails.links?.map((link) => (
            <div className="coin-link" key={link.name}>
              <h4 className="link-name">{link.type}</h4>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
