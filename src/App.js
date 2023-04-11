import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { deactivateToast } from "./store";
import { useEffect } from "react";
import "./App.css";

function App() {
  const { token } = useSelector((state) => state.state);
  const { isLoading, toast, team } = useSelector((state) => state.state);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    token
      ? (axios.defaults.headers.common["Authorization"] = "Token " + token)
      : (axios.defaults.headers.common["Authorization"] = "");

    !team.team_id && navigate("/dashboard/team/add");
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container pt-4 pb-4">
        {isLoading && (
          <div className="is-loading-bar text-center">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        <Outlet />
      </div>
      <Toast
        className="bg-success bg-opacity-75 position-fixed bottom-0 end-0 m-3 text-light"
        onClose={() => dispatch(deactivateToast(false))}
        show={toast.show}
        delay={2000}
        autohide
      >
        <Toast.Body>{toast.text}</Toast.Body>
      </Toast>
    </div>
  );
}

export default App;
