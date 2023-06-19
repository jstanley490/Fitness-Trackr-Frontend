import { Link } from "react-router-dom";

export default function Navbar({ token }, { setToken }, setUser) {
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  return (
    <div id="nav">
      <p id="logo">Fitness Trakr</p>
      <span className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/routines"}>Routines</Link>
        <Link to={"/activities"}>Activities</Link>
        {token ? <Link to={"/my-routines"}>My Routines</Link> : null}

        {token ? (
          <Link onClick={logout} to={"/"}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </span>
    </div>
  );
}
