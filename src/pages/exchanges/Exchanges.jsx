import React from "react";
import { useGetExchangesQuery } from "../../services/cryptoApi";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Loader from "../../components/Loader";
import "./Exchanges.css";
import { ThemeProvider } from "@emotion/react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangeList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  console.log(exchangeList);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div style={{ marginTop: 100 }}>
      <div className="field-container">
        <span>Exchanges</span>

        <div className="field-item">
          <span>24h Trade Volume</span>
          <span>Markets</span>
          <span>Change</span>
        </div>
      </div>

      <div className="exchange-container">
        {exchangeList.map((exchange) => (
          <div key={exchange.id} className="exchange-wrapper">
            <ThemeProvider theme={darkTheme}>
              <Accordion className="exchange-accordion">
                <AccordionSummary className="exchange-header-container">
                  <div className="exchange-header">
                    <div className="exchange-title">
                      <h4>
                        <strong>{exchange.rank}.</strong>
                      </h4>
                      <img
                        className="exchange-image"
                        src={exchange.iconUrl}
                        alt=""
                      />
                      <h4>
                        <strong>{exchange.name}</strong>
                      </h4>
                    </div>

                    <div className="exchange-items">
                      <div className="exchange-item">
                        <h4>$ {millify(exchange.volume)}</h4>
                      </div>

                      <div className="exchange-item">
                        <h4>{millify(exchange.numberOfMarkets)}</h4>
                      </div>

                      <div className="exchange-item">
                        <h4>{millify(exchange.marketShare)} %</h4>
                      </div>
                    </div>
                  </div>
                </AccordionSummary>

                <AccordionDetails className="exchange-details">
                  {HTMLReactParser(
                    exchange.description ||
                      "Oops! Sorry description is not available, it will be available soon."
                  )}
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
