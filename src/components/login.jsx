import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    if (result.error) {
      setError(result.message);
      console.error(result.message);
      return;
    }
    localStorage.setItem("token", result.token);
    setToken(result.token);
    navigate("/my-routines");
  }
  return (
    <div className="auth">
      <h1 id="login">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type={"password"}
          id="showInput"></input>
        <button type="submit">Login</button>
      </form>
      <p className="err-msg">{error}</p>
      <span>
        <input onClick={showPassword} type="checkbox" />
        Show password
      </span>
      <Link to={"/register"}>
        <p>Create new account</p>
      </Link>
    </div>
  );
}
