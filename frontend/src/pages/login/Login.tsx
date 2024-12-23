import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../store/api/auth";
import { Helmet } from "react-helmet-async";
import { useGetEmployesQuery } from "../../store/api/users";

type TError = {
  status: number;
  desc: string;
};
const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const { refetch } = useGetEmployesQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigation = useNavigate();
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWrongPassword(false);
    setWrongEmail(false);
    try {
      const res = await login({ email, password }).unwrap();
      if (checkbox) {
        localStorage.setItem("user", res.user.id);
        localStorage.setItem("userType", res.user.role);
      } else {
        sessionStorage.setItem("user", res.user.id);
        sessionStorage.setItem("userType", res.user.role);
      }
      await refetch();
      navigation("/");
    } catch (error) {
      const err = error as TError;
      if (err.status && err.status === 404) {
        setWrongEmail(true);
      }
      if (err.status && err.status === 401) {
        setWrongPassword(true);
      }
      console.log(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="login_container">
        <form action="" onSubmit={submitForm}>
          <div className="login_input">
            <label htmlFor="">Emial</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className={`${wrongEmail && "wrong_input_input"}`}
            />
            {wrongEmail && (
              <div className="wrong_input">User does not exist</div>
            )}
          </div>
          <div className="login_input">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className={`${wrongPassword && "wrong_input_input"}`}
            />
            {wrongPassword && <div className="wrong_input">Wrong password</div>}
          </div>
          <div className="remember_input">
            <input
              type="checkbox"
              id="remember_me"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.currentTarget.checked)}
            />
            <label htmlFor="remember_me">Remember Me</label>
          </div>

          <div className="login_btn_container">
            <button type="submit">Log In</button>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
