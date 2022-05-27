import { useReducer } from "react";
import "./App.css";
import { Kudos } from "./pages/kudos";
import { Auth } from "./libs/auth";
import { useUser, useProfile } from "./libs/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Navigate
} from "react-router-dom";
import useSWR from "swr";
import { Layout } from "./components/layout";
function App() {
  const { user, token } = useUser();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Navigate to={user ? `/p/${user.username}` : "/login"} replace />
          }
        />
        <Route
          exact
          path="/p/:username"
          element={
            <KudosByUsername
              token={token}
              forceAppUpdate={forceUpdate}
              loggedUser={user}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<Auth forceAppUpdate={forceUpdate} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

const KudosByUsername = ({ token, forceUpdate, loggedUser }) => {
  const username = window.location.href.split("/").pop();
  const user = useProfile(username);
  // console.log(`user: ${JSON.stringify(username, null, 2)}`);
  // console.log(`${username} === ${loggedUser.username}`);
  return (
    user && (
      <Layout user={user}>
        <Kudos
          token={token}
          user={user}
          forceAppUpdate={forceUpdate}
          isMine={username === loggedUser?.username}
        />
      </Layout>
    )
  );
};
