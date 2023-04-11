import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { SignUpForm } from "../layout/SignUpForm";

export const TeamMemberAdd = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
              text: "The member was added successfully",
            })
          );

          axios
            .post("/teams/add-member/", { email: formData.username })
            .then((res) => {
              dispatch(
                activateToast({
                  show: true,
                  text: "The member was added successfully",
                })
              );
              navigate("/dashboard/team");
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

  return (
    <div className="row justify-content-center px-sm-4">
      <div className="col-md-6 col-lg-4 pt-4 pb-2">
        <h2 className="mb-3">Add member</h2>
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          handleSubmit={handleSubmit}
          btnText="Add member"
        />
      </div>
    </div>
  );
};
