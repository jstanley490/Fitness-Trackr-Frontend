import { useOutletContext } from "react-router-dom";
import CreateActivity from "./create_activity";

export default function Activities() {
  const { token, activities } = useOutletContext();
  // console.log(activities);

  return (
    <>
      {token ? (
        <div className="body">
          <main>
            <h1 className="heading">Activities</h1>
            <div className="page-body">
              <div className="posts">
                {activities.map((activity) => (
                  <div className="post" key={activity.id}>
                    <h2>{activity.name}</h2>
                    <p className="description">
                      Description: {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <aside id="create-form">
            <CreateActivity />
          </aside>
        </div>
      ) : (
        <>
          <h1 className="heading">Activities</h1>
          <div className="page-body">
            <div className="posts">
              {activities.map((activity) => (
                <div className="post" key={activity.id}>
                  <h2>{activity.name}</h2>
                  <p className="description">
                    Description: {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
