import React from "react";
import logo from "../assets/logo512.png";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainHeader = ({ getSearchInput }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = async (log) => {
    if (log === 1) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}user/logout`, {
          method: "POST",
          body: JSON.stringify({ userId: auth.userId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          auth.logout();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      auth.logout();
      navigate("/");
    }
  };
  return (
    <div className="container mx-auto flex flex-wrap gap-1 justify-center md:justify-between items-center text-xs sm:text-base py-2 px-4 flex-col sm:flex-row">
      <div className="flex items-center mr-2">
        <img src={logo} alt="logo" className="h-[35px] bg-[#1560bd]" />
      </div>
      {auth.isLoggedIn ? (
        <p className="text-lg">Hello {auth.userName}</p>
      ) : null}
      {auth.isLoggedIn ? (
        <div className="flex space-x-2 justify-center 	">
          <details className="dropdown dropdown-end">
            <summary className="m-1 btn btn-primary">Logout</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <span onClick={() => logoutHandler(0)}>
                  Logout from this device
                </span>
              </li>
              <li>
                <smap onClick={() => logoutHandler(1)}>
                  Logout from all devices
                </smap>
              </li>
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
};

export default MainHeader;
