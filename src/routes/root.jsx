import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BASE_URL } from "../api/utils";
import Navbar from "../components/navbar";

export default function Root() {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  // console.log(token);
  // console.log(user);

  async function getActivities() {
    const response = await fetch(`${BASE_URL}/activities`);
    const activities = await response.json();
    setActivities(activities);
  }
  async function getRoutines() {
    const response = await fetch(`${BASE_URL}/routines`);
    const routines = await response.json();
    setRoutines(routines);
  }

  // useEffect(() => {
  //   async function fetchUser() {
  //     const localToken = localStorage.getItem("token");
  //     if (localToken) {
  //       setToken(localToken);
  //       const response = await fetch(`${BASE_URL}/users/me`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localToken}`,
  //         },
  //       });
  //       const result = await response.json();
  //       if (result.success) {
  //         setUser(result.data);
  //       }
  //     }
  //   }
  //   fetchUser();
  // }, [token]);

  useEffect(() => {
    getActivities(token);
    getRoutines(token);
  }, [token]);

  return (
    <div>
      {/* {token ? <div>logged in</div> : <div>not logged in</div>} */}
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{
          activities,
          user,
          token,
          routines,
          setRoutines,
          setActivities,
          setUser,
          setToken,
        }}
      />
    </div>
  );
}
