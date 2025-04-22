import React, { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import Admin from "./component/admin-component/Admin";
import { PlayerControl } from "./playerLogic/PlayerControls";

const App = () => {
  const { episodeData } = useContext(PlayerControl);

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const isAuthenticationPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/*" element={<Admin />} />

        {!isAuthenticationPage && (
          <Route
            path="*"
            element={
              <div className="h-screen  overflow-y-scroll bg-black flex ">
                {episodeData.length !== 0 ? (
                  <>
                    <Sidebar
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                    <Home
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </>
                ) : null}
              </div>
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
