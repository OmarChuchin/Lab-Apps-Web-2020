import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Collapse } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "../../Constants/functions";
import { Container, Col, Row } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";
import navigationItems from "../../navigation.json";

import logoutIcon from "../../Assets/img/logout-icon.png";
import HomeIcon from "../../Assets/img/home-icon.png";
import NotifIcon from "../../Assets/img/notif-icon.png";
import EventsIcon from "../../Assets/img/events-icon.png";
import AddIcon from "../../Assets/img/add-icon.png";
import StatsIcon from "../../Assets/img/stat-icon.png";
import SettingIcon from "../../Assets/img/setting-icon.png";


import { primaryColor, secondaryColor, SUPER_ADMIN_TAG } from "../../Constants/constants";
import { FirebaseContext } from "../../API/Firebase";
import AvatarIcon from "../../Assets/img/avatar.jpg";
import DASHBOARD_ICON from "../../Assets/img/dashboard.png";

import "./style.css";
import { Usuario } from "../../Constants/interfaces";

const useStyles = makeStyles({
  root: {
    backgroundColor: secondaryColor,
    height: "100vh",
    width: "250px",
    boxShadow: "1px 4px 50px 0px rgba(64,77,103,0.88)",
    float: "left",
    zIndex: 100,
    paddingTop: 20,
    paddingLeft: 10,
    position: "fixed",
  },
});

const chooseIcon = (s: string) => {
  switch (s) {
    case "Home":
      return HomeIcon;
    case "Notificaciones":
      return NotifIcon;
    case "Eventos":
      return EventsIcon;
    case "Estadisticas":
      return StatsIcon;
    case "Configuracion":
      return SettingIcon;
    case "Sub-Admins":
      return AddIcon;
    default:
      return logoutIcon;
  }
}

interface Props {
  user : Usuario
}

const Navigation: React.FC<Props> = (p) => {
  const styles = useStyles();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const size = useWindowSize();
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(0);

  useEffect(() => {

    setCorrectHighLight(window.location);

    const unlisten = history.listen((location, action) => {
      setCorrectHighLight(location);
    });

    return () => unlisten();
    // eslint-disable-next-line
  },[]);

  function setCorrectHighLight(location : any){
    const navItems : string[] = (getAccesibleNavItems().filter(nav => typeof nav.action === "string").map( nav => nav.action ) as string[]);
    setSelected(navItems.indexOf(location.pathname));
  }

  const clickedNavElement = (action :
    | string
    | {
      route: string;
      action: string;
    }) => {
    setOpen(false);
    if (typeof action === "string") history.push(action);
    else {
      if (action.action === "logout") firebase.signout();
      if (action.action === "logout") history.push("/login");
      history.push("/login"); //e.action.action
    }
  }

  const createElement = (
    e: {
      title: string;
      action:
      | string
      | {
        route: string;
        action: string;
      };
      icon: string;
      children?: any[];
    },
    i: number
  ) => {
    return <Col key={i} md={12} className={selected === i ? "navElement elementSelected" : "navElement"} onClick={() => clickedNavElement(e.action)} >
      <img
        style={{ filter: primaryColor}}
        width="20"
        alt="icon"
        src={chooseIcon(e.icon)}
      // require(e.icon)
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span
        style={{ color: primaryColor}}
      >
        {e.title}
      </span>
    </Col>;
  };

  function getUserName(){
    const namesSeparated = p.user.nombre.split(" ");
    if(namesSeparated.length < 1)
      return "User";
    return namesSeparated[0];
  }

  function getAccesibleNavItems(){
    return (p.user.rol && p.user.rol === SUPER_ADMIN_TAG) ? 
      navigationItems
    :
      navigationItems.filter((v) => v.reserved === undefined);
  }

  const navElements = () => {
    const navItems = getAccesibleNavItems();
    return <div>{navItems.map((e: any, i) => createElement(e, i))}</div>;
  };

  if (size.width && size.width < 768)
    return (
      <>
        <div
          style={{
            position: "fixed",
            zIndex: 99,
            backgroundColor: secondaryColor,
            width: "100%",
            height: "80px",
            padding: 20,
          }}
        >
          <img
            width={35}
            style={{
              borderRadius: 10,
            }}
            alt="logo"
            src={DASHBOARD_ICON}
          />
          <div
            style={{
              display: "inline-block",
              height: "100%",
              width:
                size.width && size.width < 340
                  ? "85%"
                  : size.width < 391
                    ? "88%"
                    : "90%",
            }}
          >
            <span
              style={{
                color: primaryColor,
                fontSize: 35,
                fontWeight: 900,
                marginLeft: 5
              }}
            >
              Dashboard
            </span>
            <MenuIcon
              onClick={() => setOpen(!open)}
              style={{
                color: "white",
                float: "right",
                verticalAlign: "middle",
                marginTop: 3,
              }}
            />
          </div>
        </div>
        <Collapse in={open}>
          <div
            style={{
              color: "white",
              paddingLeft: 20,
              paddingBottom: 20,
              zIndex: 99,
              backgroundColor: secondaryColor,
              marginTop: 80,
              position: "fixed",
              width: "100%",
            }}
          >
            {navElements()}
          </div>
        </Collapse>
        <div style={{ height: 70 }} />
      </>
    );
  return (
    <div className={styles.root}>
      <Container>
        <Row>
          <Col md={3}>
            <img
              className="userIcon"
              alt="logo"
              src={(p.user.imagen_perfil && p.user.imagen_perfil.length > 0) ? p.user.imagen_perfil : AvatarIcon}
            />
          </Col>
          <Col id="userName" md={9}>
            <p>{getUserName()}</p>
            {/* <p>Admin</p> */}
          </Col>
          <br />
          <br />
          <br />
          {navElements()}
        </Row>
      </Container>
    </div>
  );
};

export default Navigation;
