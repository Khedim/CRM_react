import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading, setTeam, setToken, setUser } from "../../store";

export const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrors([]);
    dispatch(setIsLoading(true));
    await axios
      .post("token/login/", formData)
      .then((res) => {
        const token = res.data.auth_token;
        dispatch(setToken(token));
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        
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
    await axios
      .get("/users/me")
      .then((res) => {
        dispatch(setUser({ id: res.data.id, username: res.data.username }));
      })
      .catch((err) => console.log(err));
    await axios
      .get("/teams/get-my-team/")
      .then((res) => {
        dispatch(setTeam({ team_id: res.data.id, team_name: res.data.name }));

        navigate("/dashboard/my-account");
      })
      .catch((err) => console.log(err));
    dispatch(setIsLoading(false));
  };

  return (
    <div className="row justify-content-center px-sm-4">
      <div className="col-md-6 col-lg-4 pt-4 pb-2">
        <h2 className="mb-3">Log in</h2>
        <form className="pb-2" onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="username"
              className="form-control"
              id="username"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
            />
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
            Log in
          </button>
        </form>
        <hr />
        <p className="fs-6">
          You don't have an accout <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
