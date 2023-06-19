import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
// import { deletePost } from "../../api/utils";
import CreateNewRoutine from "./create_routine";

export default function My_Routines() {
  const { user, myRoutines, token, setRoutines } = useOutletContext();
  const navigate = useNavigate();

  if (!token) {
    useEffect(() => {
      navigate("/");
    });
  } else {
    return (
      <div className="body">
        <main>
          <h1 className="heading">Welcome {user.username}</h1>
          <ul className="act-list">
            {myRoutines.map((routine) => {
              if (routine.creatorId === user.id) {
                return (
                  <li key={routine.id}>
                    <span className="activity-name">{routine.name}</span>
                    <br />
                    <strong>goal:</strong> {routine.goal}
                    <br />
                    {routine.isPublic ? <>Public</> : <>Private</>}
                    <br />
                    <strong>creator:</strong> {routine.creatorName}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </main>
        <aside id="create-form">
          <CreateNewRoutine routine={setRoutines} />
        </aside>
      </div>
    );
  }
}
