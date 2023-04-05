import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServicemy";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlicemy";
import Loader from "../../components/loader/Loader";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

//styles class names in authmodules
// destructure from formdata.name
export const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;
  //3
  //redux and reacter-dom methods
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //3
  //hook to get store state
  //redux states destructring
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //password usercase checking
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  //icons for password strength
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  //function to check and switch icon
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // match string function javascript
  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);
  //3
  //front end form regesteruser checking added after frontend and backend was completed
  const registerUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = { name, email, password };
    console.log(userData);
    //getting register : asyncthunk
    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth} `}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>register</h2>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />

            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
              // cant copy paste
              onPaste={(e) => {
                e.preventDefault();
                toast.error("cannot paste into input field");
                return false;
              }}
            />

            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card>

            <button type="submit" className="--btn --btn-primary --btn-block">
              register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; already have an account? &nbsp;</p>
            <Link to="/login">login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
