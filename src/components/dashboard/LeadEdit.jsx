import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { LeadForm } from "./LeadForm";

export const LeadEdit = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const [team, setTeam] = useState({ members: [], created_by: {} });

  const [formData, setFormData] = useState({
    company: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    confidence: 0,
    estimated_value: 0,
    status: "new",
    priority: "medium",
    assigned_to: null,
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors([]);

    dispatch(setIsLoading(true));
    
    await axios
      .patch(`/leads/${id}/`, formData)
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Lead edited successfuly",
          })
        );
        navigate(`/dashboard/leads/${id}`);
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
    const fetchlead = async () => {
      dispatch(setIsLoading(true));
      await axios
        .get(`/leads/${id}`)
        .then((res) => {
          setFormData({...res.data, assigned_to: res.data.assigned_to.id});
        })
        .catch((err) => console.log(err));
      dispatch(setIsLoading(false));
    };

    fetchlead();

    const fetchTeam = async () => {
      await axios
        .get("/teams/get-my-team/")
        .then((res) => {
          setTeam(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchTeam();
  }, [id]);

  return (
    <>
      <h2 className="mb-3">Edit lead</h2>
      <LeadForm
        formData={formData}
        formErrors={formErrors}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        btnText="Edit lead"
        team={team}
        isAssigned_to={true}
      />
    </>
  );
};
