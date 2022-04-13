import React from "react";
import MenuBar from "./components/MenuBar";
import PatientProfile from "./components/PatientProfile";
import { Provider } from "react-redux";
import store from "./store/index";
import PatientList from "./components/PatientList";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./authentication/ProtectedRoute";


function App() {
  return (
    <div>
      <MenuBar/>
      <Provider store={store}>
        <Switch>
          <main>
            <Route path="/" exact>
              <Redirect to="/login"/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/patient-profile">
              <PatientProfile />
            </Route>
            <Route path="/patient-list">
              <PatientList />
            </Route>
          </main>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;