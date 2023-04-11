import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLoading } from "../../store";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const { isLoading } = useSelector((state) => state.state);

  const dispatch = useDispatch();

  const fetchClients = async () => {
    dispatch(setIsLoading(true));
    setPrevPage(false);
    setNextPage(false);
    await axios
      .get(`/clients/?page=${currentPage}`)
      .then((res) => {
        setClients(res.data.results);
        setPrevPage(res.data.previous ? true : false);
        setNextPage(res.data.next ? true : false);
      })
      .catch((err) => console.log(err));

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage]);

  return (
    !isLoading && (
      <>
        <h1>Clients</h1>
        <Link to="add">Add client</Link>
        {clients.length ? (
          <>
            <table className="table table-striped mt-3 text-center text-md-start">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Contact person</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.contact_person}</td>
                    <td>
                      <Link
                        className="text-decoration-none"
                        to={`${client.id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {prevPage && (
              <div
                onClick={() => setCurrentPage((p) => p - 1)}
                className="btn btn-light me-2"
              >
                previous
              </div>
            )}
            {nextPage && (
              <div
                onClick={() => setCurrentPage((p) => p + 1)}
                className="btn btn-light"
              >
                next
              </div>
            )}
          </>
        ) : (
          <div className="mt-3">You don't have any clients yet...</div>
        )}
      </>
    )
  );
};
