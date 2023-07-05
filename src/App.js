import "./App.css";

import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signUp/signupPage";
import LoginPage from "./pages/logIn/loginPage";
import { connect } from "react-redux";
import { startTokenFetch } from "./redux/auth/auth.action";
// import { useEffect } from "react";
import VerifyAuth from "./components/auth/requireAuth";
function App({ startTokenFetch }) {
  // useEffect(() => {
  //   startTokenFetch();
  // });
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<VerifyAuth />}>
        <Route path="/" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

const mapDispatchToProps = (dispatch) => ({
  startTokenFetch: () => dispatch(startTokenFetch()),
});

export default connect(null, mapDispatchToProps)(App);
