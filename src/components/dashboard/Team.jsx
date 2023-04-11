import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLoading } from "../../store";

export const Team = () => {
  const [team, setTeam] = useState({members: [], created_by:{}});

  const { isLoading, user } = useSelector((state) => state.state);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeam = async () => {
      dispatch(setIsLoading(true));

      await axios
        .get("/teams/get-my-team/")
        .then((res) => {
          setTeam(res.data);
        })
        .catch((err) => console.log(err));

      dispatch(setIsLoading(false));
    };

    fetchTeam();
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="">
          <h1>{team.name}</h1>
          {team.created_by.id === parseInt(user.id) && <Link to="member/add" className="btn btn-success">Add member</Link>}
          <h4 className="mt-3 mb-3">Members</h4>
          <table className="table table-striped mt-3 text-center text-md-start">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Full name</th>
              </tr>
            </thead>

            <tbody>
                {team.members.map(member => <tr key={member.id}>
                    <td>{member.username}</td>
                    <td>{member.first_name} {member.last_name}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
