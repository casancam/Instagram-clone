import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import ReactLoader from "./components/loader";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";
import PrivateRoute from "./helpers/private-route";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));
const Profile = lazy(() => import("./pages/profile"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route
              path={ROUTES.DASHBOARD}
              exact
              element={
                <PrivateRoute user={user}>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route component={NotFound} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
