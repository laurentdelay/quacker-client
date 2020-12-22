import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useAuth } from "../context/Auth";

function MenuBar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  // on attribue le path correspondant : 'home' pour '/' sinon on retire le 1er char
  const activeItem = pathname === "/" ? "home" : pathname.substring(1);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "home"} as={Link} to="/">
        {user.username}
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout}>
          Se déconnecter
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "home"} as={Link} to="/">
        Accueil
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          as={Link}
          to="/login"
        >
          Connexion
        </Menu.Item>
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          as={Link}
          to="/register"
        >
          Créer un compte
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}

export default MenuBar;
