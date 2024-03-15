// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logIn } from "../../redux/auth/operations";
// import { addEmail } from "../../redux/auth/authSlice";
// import { Link } from "react-router-dom";
// import Login from "./Login/Login";

// const Home = () => {
//   const dispatch = useDispatch();
//   const [isEmail, setIsEmail] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(addEmail(e.target.elements.email.value));
//     setIsEmail(true);
//     // setLoginEmail(e.target.elements.email.value);

//     // dispatch(
//     //   logIn({
//     //     email: loginEmail,
//     //     password: e.target.elements.password.value,
//     //   })
//     // );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email"></label>
//       <input type="email" name="email" id="email" />

//       <button onSubmit={handleSubmit}>Log in</button>
//       {isEmail && <Login />}
//     </form>
//   );
// };

// export default Home;

import { Notify } from "notiflix";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../../redux/auth/authSlice";
import { auth, logIn } from "../../redux/auth/operations";

const Home = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // dispatch(addEmail(email));
    setStep(2);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
    // dispatch(auth({ password }));
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmitEmail}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitPassword}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Next</button>
        </form>
      )}
    </div>
  );
};

export default Home;
