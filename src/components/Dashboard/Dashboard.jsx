import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const dashboard = () => {
    const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
    </main>
  );
};

export default Dashboard;