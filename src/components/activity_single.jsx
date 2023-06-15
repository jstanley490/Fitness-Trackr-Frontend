import { useOutletContext, useParams } from "react-router-dom";

export default function ActivitySingle() {
  const { activityId } = useParams();
  console.log(activityId);

  const { activities } = useOutletContext();
  const post = activities.find((slug) => slug.id === activityId);
  console.log(post);

  return <>Individual Activity Page</>;
}
