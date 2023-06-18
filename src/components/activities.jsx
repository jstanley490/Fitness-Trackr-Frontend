import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Activities() {
  // activities include = id, name, description
  const { user, token, activities, setActivities } = useOutletContext();

  return (
    <>
      <h1 className="profile">Activities</h1>
      <div className="page-body">
        <div className="posts">
          {activities.map((activity) => (
            <div className="post" key={activity.id}>
              <h2>{activity.name}</h2>
              <p className="description">{activity.description}</p>
              <Link to={`/activities/${activity.id}`}>View Activity</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
