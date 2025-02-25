import { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  return (
    <div>
      <Navbar className="navbar" fixed="top" expand="lg">
        <NavbarBrand className="logo" tag={RRNavLink} to="/">
          ✍️ Tabloid
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="navbar-route" tag={RRNavLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="navbar-route"
                    tag={RRNavLink}
                    to="/explore"
                  >
                    Explore
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="navbar-route"
                    tag={RRNavLink}
                    to="/subscriptions"
                  >
                    Subscriptions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="navbar-route"
                    tag={RRNavLink}
                    to="/my-posts"
                  >
                    My Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="navbar-route"
                    tag={RRNavLink}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="navbar-route" tag={RRNavLink} to="/tags">
                    Tags
                  </NavLink>
                </NavItem>
                {loggedInUser.roles.includes("Admin") && (
                  <NavItem>
                    <NavLink
                      className="navbar-route"
                      tag={RRNavLink}
                      to="/userprofiles"
                    >
                      User Profiles
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
            <Link
              className="me-2 text-light text-decoration-none"
              to={`/userprofiles/${loggedInUser.id}`}
            >
              <img
                className="profile-image-small"
                src={loggedInUser.imageLocation}
                alt="profile"
              />
              {loggedInUser.firstName} {loggedInUser.lastName}
            </Link>
            <Button
              color="danger"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
