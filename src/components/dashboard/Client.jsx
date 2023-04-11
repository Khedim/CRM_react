import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setIsLoading } from "../../store";

export const Client = () => {
  const [client, setClient] = useState({});
  const [notes, setNotes] = useState([]);
  const { isLoading } = useSelector((state) => state.state);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClient = async () => {
      dispatch(setIsLoading(true));
      await axios
        .get(`/clients/${id}`)
        .then((res) => {
          setClient(res.data);
        })
        .catch((err) => console.log(err));
      await axios
        .get(`/notes/?client_id=${id}`)
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => console.log(err));
      dispatch(setIsLoading(false));
    };
    fetchClient();
  }, [id]);

  return (
    !isLoading && (
      <div className="row">
        <div className="mb-4">
          <h1>{client.name}</h1>
          <div className="buttons mt-3">
            <Link
              to={`/dashboard/clients/edit/${client.id}`}
              className="btn btn-light"
            >
              Edit
            </Link>
            <button className="btn btn-primary">Convert to client</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="shadow p-3">
            <h2 className="mb-4">Details</h2>
            <p>
              <strong>Created at: </strong>
              {client.created_at}
            </p>
            <p>
              <strong>Modified at: </strong>
              {client.modified_at}
            </p>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="shadow p-3">
            <h2 className="mb-4">Contact information</h2>

            <p>
              <strong>Contact person: </strong>
              {client.contact_person}
            </p>
            <p>
              <strong>Email: </strong>
              {client.email}
            </p>
            <p>
              <strong>Phone: </strong>
              {client.phone}
            </p>
            <p>
              <strong>Website: </strong>
              {client.website}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="mb-4">Notes</h2>
          <Link
            className="btn btn-success mb-4"
            to={`/dashboard/clients/note/add/${id}`}
          >
            Add note
          </Link>
        </div>
        {notes.map((note) => (
          <div className="p-2" key={note.id}>
            <div className="shadow p-3">
              <h6 className="m-0">{note.name}</h6>
              <p className="m-0">{note.body}</p>
              <Link className="btn btn-success btn-sm mt-3" to={`/dashboard/clients/${id}/note/edit/${note.id}`}>Edit note</Link>
            </div>
          </div>
        ))}
      </div>
    )
  );
};
