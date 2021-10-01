import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AttachMoney, Home, Lightbulb, TrendingUp } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  button: {
    width: 30,
    height: 30,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SideDrawer({ children }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const history = useHistory();

  const itemsList = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => history.push("/"),
    },
    {
      text: "Cryptocurrencies",
      icon: <TrendingUp />,
      onClick: () => history.push("/cryptocurrencies"),
    },
    {
      text: "Exchanges",
      icon: <AttachMoney />,
      onClick: () => history.push("/exchanges"),
    },
    {
      text: "News",
      icon: <Lightbulb />,
      onClick: () => history.push("/news"),
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={index} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <React.Fragment key={"right"}>
          <div onClick={toggleDrawer("right", true)}>{children}</div>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </ThemeProvider>
  );
}
