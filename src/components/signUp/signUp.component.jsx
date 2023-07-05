import "./signUp.styles.css";
import { useState, useEffect, useRef } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Input from "../Input-Component/input-Component";
import CustomButton from "../Button/button.component";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUpComponent = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [ValiduserName, setValidUserName] = useState(false);

  const [password, setPassword] = useState("");
  const [Validpassword, setValidpassword] = useState(false);
  const [ValidpasswordFocus, setValidpasswordFocus] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [ValidpasswordConfirm, setValidpasswordConfirm] = useState(false);
  const [ValidpasswordConfirmFocus, setValidpasswordConfirmFocus] =
    useState(false);

  const [errorMessage, seterrorMeassage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidUserName(USERNAME_REGEX.test(userName));
    setValidpassword(PASSWORD_REGEX.test(password));
    setValidpasswordConfirm(password === passwordConfirm);
  }, [userName, password, passwordConfirm]);

  //   fullName,
  //   email,
  //   password,
  //   passwordConfirm,

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, password, passwordConfirm);
    const data = {
      fullName: userName,
      email: "hassanRulezzz@gmail.com",
      password: password,
      passwordConfirm: passwordConfirm,
    };
    try {
      const response = await fetch("http://localhost:2007/api/v1/user/signUp", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        setUserName("");
        setPassword("");
        setPasswordConfirm("");
        setSuccessMessage(responseData.message);
        console.log(responseData);
        errRef.current.focus();
      }
      seterrorMeassage(responseData.message);
    } catch (err) {
      if (!err?.response) {
        seterrorMeassage("Failed To Connect To Server");
      } else if (err?.response) {
        seterrorMeassage(err.message);
      } else console.log(err);
    }
  };
  return (
    <>
      {successMessage ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/">Sign In</Link>
          </p>
        </section>
      ) : (
        <div className="form-Container">
          <p
            ref={errRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <p className="sign-Up-text">Sign-Up</p>
          <form onSubmit={handleSubmit}>
            <Input
              spanValue={"Username"}
              inputType={"text"}
              inputName={"userName"}
              Ref={userRef}
              inputPlaceHolder={"Enter Valid UserName or Email"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
            <p
              id="uidnote"
              className={
                userName && !ValiduserName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <Input
              spanValue={"Password"}
              inputType={"password"}
              inputName={"password"}
              inputPlaceHolder={"Enter Password..."}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              onFocus={() => {
                setValidpasswordFocus(true);
              }}
              onBlur={() => {
                setValidpasswordFocus(true);
              }}
            />
            <p
              id="pwdnote"
              className={
                ValidpasswordFocus && !Validpassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters,
              <br /> a number and a special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <Input
              spanValue={"Confirm-Password"}
              inputType={"password"}
              inputName={"confirmPassword"}
              inputPlaceHolder={"Confirm Your Passowrd"}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              value={passwordConfirm}
              onFocus={() => {
                setValidpasswordConfirmFocus(true);
              }}
              onBlur={() => {
                setValidpasswordConfirmFocus(false);
              }}
            />
            <p
              id="pwdnote"
              className={
                passwordConfirm && !ValidpasswordConfirm
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Password Must Match!!
            </p>

            <CustomButton
              disabled={
                !ValiduserName || !Validpassword || !ValidpasswordConfirm
                  ? true
                  : false
              }
            >
              Sign-Up
            </CustomButton>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpComponent;
