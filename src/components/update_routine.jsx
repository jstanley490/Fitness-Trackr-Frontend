import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UpdateRoutine() {
  const { routineId } = useParams();
  const { user, routines, myRoutines, activities, token, setToken } =
    useOutletContext();

  const routine = myRoutines.find((slug) => slug.id === routineId);
  // console.log(routine);
  const navigate = useNavigate();

  const { setRoutines } = useOutletContext();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  // const [routineId, setRoutineId] = useState("");

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (!result.id) {
      toast.error("cannot update routine");
    } else {
      toast.success("Routine has been updated!");
      setRoutines([result]);
      setName("");
      setGoal("");
    }
    navigate("/my-routines");
  }

  return (
    <div className="body">
      <h1>{name}</h1>
      <div id="create-form">
        <h2>Update routine</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setRoutines(e.target.value)}
            value={routineId}
            placeholder="Routine ID"></input>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Update routine name"></input>

          <input
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
            placeholder="Update routine goal"></input>
          <button>Submit</button>
        </form>
      </div>
      <div id="create-form">
        <h2>Add activity</h2>
        <form className="form" onSubmit={handleSubmit}>
          <select
            onChange={(e) => setRoutines(e.target.value)}
            value={routineId}
            placeholder="Routine ID"></select>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Update routine name"></input>

          <input
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
            placeholder="Update routine goal"></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
