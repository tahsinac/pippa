import LoginForm from "../components/LoginForm";
import { useHistory } from "react-router-dom";
import auth from "../authentication/AuthenticationService";

export default function Login() {
  const history = useHistory();

  const addLoginHandler = (loginData) => {

    auth.signin(loginData.username, loginData.password).then(() => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated === "true") {
        history.push("/patient-list");
        window.location.reload();
      } else {
        window.alert("Sorry incorrect log in credentials or you are blocked!");
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/images/calgary.jpg)",
        backgroundSize: "cover",
      }}
    >
      <LoginForm onLogin={addLoginHandler} />
    </div>
  );
}