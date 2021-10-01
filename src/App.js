import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Cryptocurrencies from "./pages/crypto/Cryptocurrencies";
import CryptoDetails from "./pages/cryptoDetails/CryptoDetails";
import Exchanges from "./pages/exchanges/Exchanges";
import News from "./pages/news/News";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/cryptocurrencies">
            <Cryptocurrencies />
          </Route>

          <Route path="/crypto/:coinId">
            <CryptoDetails />
          </Route>

          <Route path="/exchanges">
            <Exchanges />
          </Route>

          <Route path="/news">
            <News />
          </Route>
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
