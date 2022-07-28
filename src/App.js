import { useSelector } from "react-redux";
import {
  /*
    Static sites don't support routers that use the HTML5 pushState history API under the hood 
    (for example, React Router using browserHistory).
    You can switch to hashHistory for this effect.
  */
  BrowserRouter as Router,
  // HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Layout } from "./app/Layout";
import { AppHeader } from "./app/AppHeader";
import { PublicRoute, PrivateRoute } from "./app/route";
import { ChatsPage } from "./features/chats/";
import {
  selectAuthStatus,
  RegisterPage,
  UserPage
} from "./features/users";

function App() {
  const isAuth = useSelector((state) => selectAuthStatus(state));
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout appHeader={<AppHeader isAuth={isAuth} />} />}>
          <Route path="chats" element={
            <PrivateRoute isAuth={isAuth} to="/signin">
              <ChatsPage />
            </PrivateRoute>
          } >
            <Route path=":chatId" element={
              <PrivateRoute isAuth={isAuth} to="/signin">
                <ChatsPage />
              </PrivateRoute>
            } />
          </Route>
          <Route path="users/:userId" element={
            <PrivateRoute isAuth={isAuth} to="/signin">
              <UserPage />
            </PrivateRoute>
          } />
          <Route path="signin" element={
            <PublicRoute isAuth={isAuth} to="/chats">
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="signup" element={
            <PublicRoute isAuth={isAuth} to="/chats">
              <RegisterPage isSignUp={true} />
            </PublicRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;