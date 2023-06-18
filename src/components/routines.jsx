import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Routines() {
  const { user, token, routines, setRoutines } = useOutletContext();
  // console.log(routines)
  return (
    <>
      <h1 className="profile">Routines</h1>
      <div className="page-body">
        <div className="posts">
          {routines.map((routine) =>
            routine.isPublic ? (
              <div className="post" key={routine.id}>
                <h2>{routine.name}</h2>
                <p className="description">Goal: {routine.goal}</p>
                <div>
                  created by:{" "}
                  <Link to={`/activities/${routine.creatorId}`}>
                    {routine.creatorName}
                  </Link>
                </div>
                {routine.activities.length > 0 ? (
                  <>
                    <h3>Activities:</h3>
                    {routine.activities.map((activity) => {
                      return (
                        <ul key={activity.id}>
                          <li>{activity.name}</li>
                        </ul>
                      );
                    })}
                  </>
                ) : null}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
