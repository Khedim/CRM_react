import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../store";

export const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.state)

  const logout = () => {
    axios
      .post("/token/logout/")
      .then((res) => res)
      .catch((err) => console.log(err));

    axios.defaults.headers.common["Authorization"] = "";

    dispatch(removeToken());
    localStorage.clear()
    navigate("/");
  };

  return (
    <>
      <h1>MyAccount</h1>
      <div className="container p-4 mb-5">
      </div>
      <Link to={`/dashboard/team/member/edit/${user.id}`} className="btn btn-light me-1">
        Edit
      </Link>
      <button onClick={logout} className="btn btn-danger ms-1">
        Logout
      </button>
    </>
  );
};
