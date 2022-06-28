import axios from "axios";

class AuthHandler {
  constructor() {}

  getPostAuthData() {
    // Assume that have the Session Storage Data
    const token = sessionStorage.getItem("t");
    let body = { walletAddress: sessionStorage.getItem("address") };
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
      const authCheckerAPI = "http://localhost:8000/api/auth";
      let authData = this.getPostAuthData();
      axios.post(authCheckerAPI, authData.body, authData.config).then(
        (acc) => {
          // All OK
          return;
        },
        (rej) => {
          window.location.href = "/error";
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
