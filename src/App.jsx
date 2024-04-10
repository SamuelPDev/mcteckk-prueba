import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Home } from "./pages/home";

function App() {
  //empieza nulo para que no haya un bucle infinito
  const [isLoggedIn, setIsLoggedIn] = useState();

  function isAuth() {
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const path = window.location.pathname;

    if (path === "/" && isLoggedIn === false) {
      window.location.href = "/signin";
    } else if (path === "/signin" && isLoggedIn) {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    isAuth();
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
