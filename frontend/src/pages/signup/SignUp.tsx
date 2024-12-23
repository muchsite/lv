import React, { useState } from "react";
import "./login.scss";

import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/api/auth";
import { Helmet } from "react-helmet-async";
type TError = {
  status: number;
  data: string;
};
const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const navigation = useNavigate();

  const [signUp] = useSignUpMutation();
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailExists(false);
    let newUser = {
      isRemoteWork: false,
      user_avatar: "/assets/avatar2.svg",
      first_name: "",
      last_name: "",
      first_native_name: "",
      last_native_name: "",
      middle_native_name: "",
      department: "",
      building: "",
      room: "",
      date_birth: {
        year: 1985,
        month: 11,
        day: 11,
      },
      desk_number: 15,
      manager: {
        id: "a1234567-bc89-45de-f012-3456789abcd",
        first_name: "",
        last_name: "0",
      },
      phone: "",
      email: "",
      skype: "",
      cnumber: "",
      citizenship: "",
      visa: [
        {
          issuing_country: "Japan",
          type: "Work visa",
          start_date: 1671238800000,
          end_date: 1702774800000,
        },
      ],
      id: "579e",
      password: "",
      role: "user",
      sub: [],
    };
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.id = Math.random().toString(16).slice(2);
    newUser.email = email;
    const hashPassword = async (password: string) => {
      const url =
        "https://www.toptal.com/developers/bcrypt/api/generate-hash.json";
      const urlBody = new URLSearchParams();
      urlBody.append("cost", "5");
      urlBody.append("password", password);
      try {
        const res = await fetch(url, {
          method: "post",
          body: urlBody,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const user = await res.json();
        const hashedPassword = user.hash;
        newUser.password = hashedPassword;
      } catch (error) {
        console.log(error);
      }
    };
    await hashPassword(password);
    try {
      await signUp({ user: newUser }).unwrap();
      localStorage.setItem("user", newUser.id);
      navigation("/");
    } catch (error) {
      const err = error as TError;
      if (err.data === "Email already exists") {
        setEmailExists(true);
      }
      console.log(error);
    }
  };
  const [emailExists, setEmailExists] = useState(false);
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="login_container">
        <form action="" onSubmit={submitForm}>
          <div className="login_input">
            <label htmlFor="">Emial</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className={`${emailExists && "wrong_input_input"}`}
            />
            {emailExists && (
              <div className="wrong_input">Email already exists</div>
            )}
          </div>
          <div className="login_input">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.currentTarget.value)}
            />
          </div>
          <div className="login_input">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.currentTarget.value)}
            />
          </div>
          <div className="login_input">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <button type="submit">Sing Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
