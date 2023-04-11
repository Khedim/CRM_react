import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { LeadForm } from "./LeadForm";

export const LeadAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .post("/leads/", formData)
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Lead added successfully",
          })
        );
        navigate("/dashboard/leads");
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
    const fetchTeam = async () => {
      await axios
        .get("/teams/get-my-team/")
        .then((res) => {
          setTeam(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchTeam();
  }, []);

  return (
    <>
      <h2 className="mb-3">Add lead</h2>
      <LeadForm
        formData={formData}
        formErrors={formErrors}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        btnText="Add lead"
        team={team}
        isAssigned_to={false}
      />
    </>
  );
};
