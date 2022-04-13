import axios from "axios";
import { SERVER_URL } from "../constants.js";
import { useHistory } from "react-router-dom";


const signin = (username, password) => {
    return axios
      .get(`${SERVER_URL}users/${username}/${password}`,).then(console.log("first post request"))
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("isAuthenticated", "true");
        }
        return response.data;
      }).then(console.log("second step"));
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const auth = {
    signin,
    logout,
  };
  
  export default auth;