import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLoading } from "../../store";

export const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const { isLoading } = useSelector((state) => state.state);

  const dispatch = useDispatch();

  const fetchLeads = async () => {
    dispatch(setIsLoading(true));
    setPrevPage(false);
    setNextPage(false);
    await axios
      .get(`/leads/?page=${currentPage}`)
      .then((res) => {
        setLeads(res.data.results);
        setPrevPage(res.data.previous ? true : false);
        setNextPage(res.data.next ? true : false);
      })
      .catch((err) => console.log(err));

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, [currentPage]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Leads</h1>
          <Link to="add">Add lead</Link>
          <hr />
          <form className="d-flex aline-items-center">
            <input type="text" className="p-1" />
            <button className="btn btn-success rounded-0">Search</button>
          </form>
          <table className="table table-striped mt-3 text-center text-md-start">
            <thead className="table-dark">
              <tr>
                <th>Company</th>
                <th>Contact person</th>
                <th>Assigned to</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.company}</td>
                  <td>{lead.contact_person}</td>
                  <td>
                    {lead.assigned_to?.first_name} {lead.assigned_to?.last_name}
                  </td>
                  <td>{lead.status}</td>
                  <td>
                    <Link className="text-decoration-none" to={`${lead.id}`}>
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
      )}
    </>
  );
};
