import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo.svg";
import {
  AttachMoney,
  Home,
  Lightbulb,
  TrendingUp,
  Menu,
} from "@mui/icons-material";
import SideDrawer from "../Drawer";

const Header = () => {
  const [show, handleShow] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`header ${show && "header_show"}`}>
      <div className="header_items">
        <div className="brand_container">
          <img src={logo} alt="" />
        </div>

        <div className="nav_items">
          <ul>
            <li>
              <NavLink
                to="/home"
                activeClassName="navbar__link--active"
                className="nav_item"
              >
                <Home style={{ marginRight: 7 }} /> Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cryptocurrencies"
                activeClassName="navbar__link--active"
                className="nav_item"
              >
                <TrendingUp style={{ marginRight: 7 }} /> Cryptocurrencies
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/exchanges"
                activeClassName="navbar__link--active"
                className="nav_item"
              >
                <AttachMoney style={{ marginRight: 2 }} /> Exchanges
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/news"
                activeClassName="navbar__link--active"
                className="nav_item"
              >
                <Lightbulb style={{ marginRight: 2 }} /> News
              </NavLink>
            </li>
          </ul>
        </div>

        <SideDrawer>
          <div className="drawer">
            <Menu
              fontSize="large"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#21b6b7",
              }}
            />
          </div>
        </SideDrawer>
      </div>
    </div>
  );
};

export default Header;
