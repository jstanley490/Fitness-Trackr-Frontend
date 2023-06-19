import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "../api/utils";
import Navbar from "../components/navbar";

export default function Root() {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  // console.log(token);
  // console.log(user);

  useEffect(() => {
    async function getActivities() {
      const response = await fetch(`${BASE_URL}/activities`);
      const activities = await response.json();
      setActivities(activities);
    }
    getActivities();
  }, [activities]);

  useEffect(() => {
    async function getRoutines() {
      const response = await fetch(`${BASE_URL}/routines`);
      const routines = await response.json();
      setRoutines(routines);
    }
    getRoutines();
  }, [routines]);

  useEffect(() => {
    async function getMyRoutines(user) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(
          `${BASE_URL}/users/${user.username}/routines`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
        const routines = await response.json();
        console.log(routines);
        setMyRoutines(routines);
      }
    }
    getMyRoutines(user);
  }, [token, myRoutines]);

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        if (result.id) {
          setUser(result);
        }
      }
    }
    fetchUser();
  }, [token]);

  return (
    <div>
      {/* {token ? <div>logged in</div> : <div>not logged in</div>} */}
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <Toaster position="bottom-center" />
      <Outlet
        context={{
          activities,
          user,
          token,
          routines,
          myRoutines,
          setRoutines,
          setActivities,
          setUser,
          setToken,
        }}
      />
    </div>
  );
}
