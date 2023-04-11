import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { NoteForm } from "./NoteForm";

export const NoteEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {client_id, note_id} = useParams() 

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
      .patch(`/notes/${note_id}/?client_id=${client_id}`, formData)
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Note edited successfully",
          })
        );
        navigate(`/dashboard/clients/${client_id}`);
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

  useEffect(() => {
    const fetchNote = async () => {
        dispatch(setIsLoading(true));
        await axios
          .get(`/notes/${note_id}/?client_id=${client_id}`)
          .then((res) => {
            setFormData(res.data);
          })
          .catch((err) => console.log(err));
        dispatch(setIsLoading(false));
      };
  
      fetchNote();
  }, [note_id])

  return (
    <>
      <h2 className="mb-3">Edit note</h2>
      <NoteForm
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        btnText='Edit note'
      />
    </>
  );
};
