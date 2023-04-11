import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { NoteForm } from "./NoteForm";

export const NoteAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {id} = useParams() 

  const [formData, setFormData] = useState({
    name: "",
    body: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors([]);

    dispatch(setIsLoading(true));

    await axios
      .post("/notes/", {...formData, client_id:id})
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Note added successfully",
          })
        );
        navigate(`/dashboard/clients/${id}`);
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
  };

  return (
    <>
      <h2 className="mb-3">Add note</h2>
      <NoteForm
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        btnText='Add note'
      />
    </>
  );
};
