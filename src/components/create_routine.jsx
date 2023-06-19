import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CreateNewRoutine() {
  const { setRoutines } = useOutletContext();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (!result.id) {
      toast.error("cannot add activity");
    } else {
      toast.success("Activity has been added!");
      setRoutines([result]);
      setName("");
      setGoal("");
      setIsPublic(false);
    }
  }

  return (
    <div>
      <h2>Create routine</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Routine name"></input>

        <input
          onChange={(e) => setGoal(e.target.value)}
          value={goal}
          placeholder="Goal"></input>
        <span>
          <input
            onChange={() => setIsPublic(!isPublic)}
            type="checkbox"
            checked={isPublic}
          />
          Public?
        </span>
        <button>Submit</button>
      </form>
    </div>
  );
}
