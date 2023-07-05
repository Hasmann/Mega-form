import "./login.styles.css";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import Input from "../Input-Component/input-Component";
import CustomButton from "../Button/button.component";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUserToken } from "../../redux/auth/auth.action";
const Login = ({ setUserToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userNameRef = useRef();
  const errRef = useRef();
  useEffect(() => {
    userNameRef.current.focus();
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: userName,
      password: password,
    };

    const response = await fetch(
      "http://localhost:2007/api/v1/user/userLogin",
      {
        method: "POST",
        withCredentials: true,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    if (responseData.status !== "SUCCESS") {
      console.log(responseData);
      return setErrorMessage(responseData.message);
    }
    setSuccessMessage("User Logged In Successfully");
    Cookies.set("userrtoken", responseData.token, { expires: 7, path: "/" });
    setUserToken(responseData.token);
    navigate(from, { replace: true });
    console.log(responseData);
  };

  return (
    <div className="form-Container">
      <p
        ref={errRef}
        className={errorMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <p
        ref={errRef}
        className={successMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {successMessage}
      </p>
      <p className="sign-Up-text">Sign-In</p>
      <form onSubmit={handleSubmit}>
        <Input
          spanValue={"UserName"}
          inputType={"email"}
          inputName={"UserName"}
          inputPlaceHolder={"Enter your Email..."}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          Ref={userNameRef}
        />
        <Input
          spanValue={"Password"}
          inputType={"password"}
          inputName={"password"}
          inputPlaceHolder={"Enter your Password..."}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <CustomButton disabled={!userName || !password ? true : false}>
          Sign-In
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUserToken: (token) => dispatch(setUserToken(token)),
});
export default connect(null, mapDispatchToProps)(Login);
