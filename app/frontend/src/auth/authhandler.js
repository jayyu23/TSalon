import axios from "axios";
import endpoints from "./endpoints";

class AuthHandler {
  constructor() {
    this.loggedIn = false;
  }

  getPostAuthData() {
    // Assume that have the Session Storage Data
    const token = sessionStorage.getItem("t");
    let body = {
      walletAddress: sessionStorage.getItem("address"),
      username: sessionStorage.getItem("username"),
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return { body: body, config: config };
  }

  protectRoute() {
    const token = sessionStorage.getItem("t");
    if (!token) {
      auth.redirectToError();
    } else {
      // ping the auth-checker backend
      const authCheckerAPI = endpoints.getAuthAPI();
      let authData = this.getPostAuthData();
      axios.post(authCheckerAPI, authData.body, authData.config).then(
        (acc) => {
          // All OK
          return;
        },
        (rej) => {
          auth.redirectToError();
        }
      );
    }
  }

  redirectToError() {
    window.location.href = "/error";
  }
}

const auth = new AuthHandler();

export default auth;
