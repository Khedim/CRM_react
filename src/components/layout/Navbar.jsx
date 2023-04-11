import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.state);

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Ganar CRM
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <>
                <Link
                  className="btn btn-dark me-2"
                  to="/dashboard/leads"
                >
                  Leads
                </Link>
                <Link
                  className="btn btn-dark me-2"
                  to="/dashboard/clients"
                >
                  Clients
                </Link>
                <Link
                  className="btn btn-dark me-2"
                  to="/dashboard/team"
                >
                  Team
                </Link>
                <Link to="/dashboard/my-account" className="btn btn-primary">
                  My account
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-success me-2" to="/sign-up">
                  <strong>Sign up</strong>
                </Link>
                <Link className="btn btn-light" to="/log-in">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
