import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { usePageTracking } from '../hooks/usePageTracking.js';

export default function Layout() {
  const { user, logout, loading, isAdmin, isStudent } = useAuth();
  usePageTracking();

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">
            CareerGuide
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMain"
            aria-controls="navMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/careers">
                  Career paths
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/resources">
                  Resources
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/sessions">
                    Sessions
                  </NavLink>
                </li>
              )}
              {isStudent && (
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/career-insights">
                    Ideas
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/admin">
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {loading ? (
                <li className="nav-item">
                  <span className="nav-link disabled">Loading…</span>
                </li>
              ) : user ? (
                <>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/profile">
                      {user.name}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-outline-light btn-sm my-1 ms-lg-2" onClick={logout}>
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/login">
                      Log in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="btn btn-light btn-sm my-1 ms-lg-2" to="/register">
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main className="py-4 flex-grow-1">
        <Outlet />
      </main>
      <footer className="border-top bg-white py-4 mt-auto">
        <div className="container text-center text-muted small">
          CareerGuide helps students explore paths and connect with counselors.
        </div>
      </footer>
    </div>
  );
}
