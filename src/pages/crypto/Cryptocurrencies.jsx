import { SearchRounded } from "@mui/icons-material";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import "./Cryptocurrencies.css";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filterData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search)
    );

    setCryptos(filterData);
  }, [cryptoList, search]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="search-container">
        {!simplified && (
          <div className="search-crypto">
            <SearchRounded color="inherit" />
            <input
              type="text"
              className="search-input"
              placeholder="Search Cryptocurrencies"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="crypto-wrapper">
        <div className="crypto-container">
          {cryptos?.map((crypto) => (
            <div className="crypto-inner" key={crypto.id}>
              <Link to={`/crypto/${crypto.id}`}>
                <div className="crypto-card-header">
                  <h1>{`${crypto.rank}. ${crypto.name}`}</h1>
                  <img className="crypto-image" src={crypto.iconUrl} alt="" />
                </div>

                <div className="crypto-items">
                  <p>Price</p>
                  <p>{millify(crypto.price)}</p>
                </div>
                <div className="crypto-items">
                  <p>Market Cap</p>
                  <p>{millify(crypto.marketCap)}</p>
                </div>
                <div className="crypto-items">
                  <p>Daily change</p>
                  <p>{millify(crypto.change)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cryptocurrencies;
