import { Link, NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
            Jacket
          </Link>
          <button
            className="navbar-toggler  bg-light"
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
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
            </div>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item btn btn-light">
                    <NavLink to="/log-in" className="text-dark">
                      Login
                    </NavLink>
                </li>
                <li className="nav-item btn btn-success">
                    <NavLink to="/sign-up" className="text-light">
                      Sign up
                    </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
