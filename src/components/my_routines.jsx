import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { deleteRoutine, deleteRoutineActivity } from "../api/utils";
import CreateNewRoutine from "./create_routine";
import UpdateRoutine from "./update_routine";

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
              const routineId = routine.id;
              // console.log(routine);

              if (routine.creatorId === user.id) {
                return (
                  <li className="post" key={routine.id}>
                    <div>
                      <span className="activity-name">{routine.name}</span>
                      <br />
                      <strong>routine id:</strong> {routineId}
                      <br />
                      <strong>goal:</strong> {routine.goal}
                      <br />
                      {routine.isPublic ? <>Public</> : <>Private</>}
                      <br />
                      <strong>creator:</strong> {routine.creatorName}
                    </div>
                    <div className="post-buttons">
                      <button
                        className="manage"
                        onClick={() => deleteRoutine(routineId)}>
                        delete routine
                      </button>
                      <Link className="manage" to={`/${routine.id}`}>
                        <button>Edit routine</button>
                      </Link>
                    </div>
                    {routine.activities.length > 0 ? (
                      <>
                        <h3>Activities:</h3>
                        {routine.activities.map((activity) => {
                          return (
                            <ul className="act-list" key={activity.id}>
                              <li>
                                <span className="activity-name">
                                  {activity.name}
                                </span>
                                <br />
                                <strong>description:</strong>{" "}
                                {activity.description}
                                <br />
                                <strong>count:</strong> {activity.count}
                                <br />
                                <strong>duration:</strong> {activity.duration}
                              </li>
                            </ul>
                          );
                        })}
                      </>
                    ) : null}
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
