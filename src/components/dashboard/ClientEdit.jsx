import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { ClientForm } from "./ClientForm";

export const ClientEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()

  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors([]);

    dispatch(setIsLoading(true));

    await axios
      .patch(`/clients/${id}/`, formData)
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Client edited successfully",
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

  useEffect(() => {
    const fetchClient = async () => {
        dispatch(setIsLoading(true));
        await axios
          .get(`/clients/${id}`)
          .then((res) => {
            setFormData(res.data);
          })
          .catch((err) => console.log(err));
        dispatch(setIsLoading(false));
      };
  
      fetchClient();
  }, [id])

  return (
    <>
      <h2 className="mb-3">Edit client</h2>
      <ClientForm
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        btnText='Edit Client'
      />
    </>
  );
};
