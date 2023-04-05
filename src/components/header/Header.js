import React from "react";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";

//navlink class isactive
const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  //3
  //redux and reacter-dom methods
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    //logout functiom in authslice
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span>AUTH:Z</span>
        </div>

        <ul className="home-links">
          {/* show hi when logged in  */}
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20} />
              <UserName></UserName>
            </li>
          </ShowOnLogin>

          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to="/profile" className={activeLink}>
                profile
              </NavLink>
            </li>

            <li>
              <button onClick={logoutUser} className="--btn --btn-secondary">
                logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
