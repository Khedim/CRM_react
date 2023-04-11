import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateToast, setIsLoading, setTeam } from "../../store";

export const TeamAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "" });

  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({name:e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors([]);

    dispatch(setIsLoading(true));

    await axios
      .post("/teams/", formData)
      .then((res) => {
        console.log(res)
        dispatch(setTeam({team_id:res.data.id, team_name:res.data.name}))
        dispatch(
          activateToast({
            show: true,
            text: "Team added successfuly",
          })
        );
        navigate("/dashboard");
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
      <h1 className="mb-3">Add team</h1>
      <form
        className="pb-2 row"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Write your group name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        {formErrors.length > 0 && (
          <div className="bg-danger bg-opacity-25 p-1 text-danger border border-danger rounded mb-3">
            {formErrors.map((err) => (
              <p className="p-0 m-0" key={err}>
                {err}
              </p>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-success">
          Add team
        </button>
      </form>
    </>
  );
};
