import React, { useEffect, useState } from "react";
import "./nav.scss";
import sLogo from "../../assets/q.svg";
import on from "../../assets/on.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSingleEmployQuery } from "../../store/api/users";
import { IEmploye } from "../../Types";
import hamImage from "../../assets/ham.svg";
import closeImage from "../../assets/close.svg";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
const Nav: React.FC = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") || sessionStorage.getItem("user") || "";
  const { data: cardsData, isLoading, isError } = useGetSingleEmployQuery(user);
  const [logedIn, setLogedIn] = useState<IEmploye>();
  const [openHam, setOpenHam] = useState(false);
  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    if (!isLoading && !isError && cardsData) {
      setLogedIn(cardsData);
    }
  }, [isLoading, isError, cardsData, user]);
  const handleOpenHam = () => {
    setOpenHam(!openHam);
    if (openHam) {
      document.body.classList.remove("no_scroll");
    } else {
      document.body.classList.add("no_scroll");
    }
  };
  return (
    <>
      {!location.startsWith("/login") && !location.startsWith("/signup") && (
        <>
          <nav>
            <NavLink to="/" className="nav_logo">
              <img src={logo} alt="logo" />
            </NavLink>
            <div className="nav_links">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active_link" : "")}
              >
                Address Book
              </NavLink>
              {logedIn?.role == "admin" && (
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? "active_link" : "")}
                >
                  Settings
                </NavLink>
              )}
            </div>
            <div className="nav_btns">
              <div className="nav_support">
                <img src={sLogo} alt="asdf" />
                <p>Support</p>
              </div>
              <Link
                to={`/card/${logedIn?.id}`}
                className="nav_avatar_container"
              >
                <img src={logedIn?.user_avatar} alt="" />
                <p>{logedIn?.first_name}</p>
              </Link>
              <div className="log_out" onClick={logOut}>
                <img src={on} alt="" />
              </div>
            </div>
            <div className="nav_hamburger_container">
              <div className="nav_ham_icons_container" onClick={handleOpenHam}>
                <img
                  src={hamImage}
                  alt="ham_icon"
                  className={`ham_icons ${openHam && "ham_icons_close"}`}
                />
                <img
                  src={closeImage}
                  alt="close_icon"
                  className={`ham_icons ${!openHam && "ham_icons_close"}`}
                />
              </div>
              <div className={`nav_ham_content ${openHam && "visible"}`}>
                <div
                  className="nav_ham_background"
                  onClick={handleOpenHam}
                ></div>
                <div
                  className={`nav_ham_body ${openHam && "nav_ham_body_open"}`}
                >
                  <div className="ham_top">
                    <div className="ham_info">
                      <img
                        src={logedIn?.user_avatar}
                        className="ham_avatar"
                        alt="hamburger avatar"
                      />
                      <div className="ham_info_text">
                        <h4>
                          {logedIn?.first_name} {logedIn?.last_name}
                        </h4>
                        <h3 onClick={logOut}>Sign Out</h3>
                      </div>
                    </div>
                    <div className="ham_links_container">
                      <NavLink
                        to="/"
                        onClick={handleOpenHam}
                        className={({ isActive }) =>
                          isActive ? "active_link_ham" : ""
                        }
                      >
                        Address Book
                      </NavLink>
                      {logedIn?.role == "admin" && (
                        <NavLink
                          to="/settings"
                          onClick={handleOpenHam}
                          className={({ isActive }) =>
                            isActive ? "active_link_ham" : ""
                          }
                        >
                          Settings
                        </NavLink>
                      )}
                    </div>
                  </div>

                  <div className="ham_support">
                    <img src={sLogo} alt="asdf" />
                    <p>Support</p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="nav_height"></div>
        </>
      )}
    </>
  );
};

export default Nav;
