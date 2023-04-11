import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { activateToast, setIsLoading } from "../../store";

export const Lead = () => {
  const [lead, setLead] = useState({});
  const { isLoading } = useSelector((state) => state.state);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const convertToClient = async () => {
    dispatch(setIsLoading(true));
    await axios
      .post("/convert_lead_to_client/", { lead_id: id })
      .then((res) => {
        console.log("converted");
        dispatch(
          activateToast({
            show: true,
            text: "Lead converted to client successfully",
          })
        );
        navigate("/dashboard/leads");
      });

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    const fetchLead = async () => {
      dispatch(setIsLoading(true));
      await axios
        .get(`/leads/${id}`)
        .then((res) => {
          setLead(res.data);
        })
        .catch((err) => console.log(err));
      dispatch(setIsLoading(false));
    };
    fetchLead();
  }, [id]);

  return (
    !isLoading && (
      <div className="row">
        <div className="mb-4">
          <h1>{lead.company}</h1>

          <div className="buttons mt-3">
            <Link
              to={`/dashboard/leads/edit/${lead.id}`}
              className="btn btn-light"
            >
              Edit
            </Link>
            <button className="btn btn-primary" onClick={convertToClient}>
              Convert to client
            </button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="shadow p-3">
            <h2 className="mb-4">Details</h2>

            {lead.assigned_to && (
              <p>
                <strong>Assigned to: </strong>
                {lead.assigned_to.first_name} {lead.assigned_to.last_name}
              </p>
            )}
            <p>
              <strong>Status: </strong>
              {lead.status}
            </p>
            <p>
              <strong>Priority: </strong>
              {lead.priority}
            </p>
            <p>
              <strong>Confidence: </strong>
              {lead.confidence}
            </p>
            <p>
              <strong>Estimated value: </strong>
              {lead.estimated_value}
            </p>
            <p>
              <strong>Created at: </strong>
              {lead.created_at}
            </p>
            <p>
              <strong>Modified at: </strong>
              {lead.modified_at}
            </p>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="shadow p-3">
            <h2 className="mb-4">Contact information</h2>

            <p>
              <strong>Contact person: </strong>
              {lead.contact_person}
            </p>
            <p>
              <strong>Email: </strong>
              {lead.email}
            </p>
            <p>
              <strong>Phone: </strong>
              {lead.phone}
            </p>
            <p>
              <strong>Website: </strong>
              {lead.website}
            </p>
          </div>
        </div>
      </div>
    )
  );
};
