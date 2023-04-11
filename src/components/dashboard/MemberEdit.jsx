import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";
import { MemberForm } from "./MemberForm";

export const MemberEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {member_id} = useParams() 

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const [formErrors, setFormErrors] = useState([]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors([]);

    dispatch(setIsLoading(true));

    await axios
      .put(`/teams/member/${member_id}/`, formData)
      .then((res) => {
        dispatch(
          activateToast({
            show: true,
            text: "Member edited successfully",
          })
        );
        navigate(`/dashboard/my-account`);
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
    const fetchMember = async () => {
        dispatch(setIsLoading(true));
        await axios
          .get(`/teams/member/${member_id}/`)
          .then((res) => {
            setFormData(res.data);
          })
          .catch((err) => console.log(err));
        dispatch(setIsLoading(false));
      };
  
      fetchMember();
  }, [member_id])

  return (
    <div className="col-md-8 ms-auto me-auto">
      <h2 className="mb-3">Edit member</h2>
      <MemberForm
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        btnText='Edit member'
      />
    </div>
  );
};
