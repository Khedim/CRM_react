import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { SignUpForm } from "../layout/SignUpForm";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors([]);
    if (formData.password === formData.password2) {
      dispatch(setIsLoading(true));
      await axios
        .post("/users/", formData)
        .then((res) => {
          dispatch(
            activateToast({
              show: true,
              text: "Account created successfuly. Please login",
            })
          );
          navigate("/log-in");
        })
        .catch((err) => {
          if (err.response) {
            for (const property in err.response.data) {
              setFormErrors((pre) => [
                ...pre,
                `${property}: ${err.response.data[property]}`,
              ]);
            }
            console.log(JSON.stringify(err.response.data));
          } else if (err.message) {
            setFormErrors((pre) => [
              ...pre,
              "Something went wrong. Please try again",
            ]);
            console.log(JSON.stringify(err));
          }
        });
      dispatch(setIsLoading(false));
    } else {
      setFormErrors((prev) => [...prev, "Passwords did not match"]);
    }
  };

  useEffect(() => {
    document.title = `Sign up | Ganar`;
  }, []);

  return (
    <div className="row justify-content-center px-sm-4">
      <div className="col-md-6 col-lg-4 pt-4 pb-2">
        <h2 className="mb-3">Sign up</h2>
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          handleSubmit={handleSubmit}
          btnText='Sign up'
        />
        <hr />
        <p className="fs-6">
          Or click <Link to="/log-in">here</Link> to log in
        </p>
      </div>
    </div>
  );
};
