class AuthHandler {
  constructor() {}

  protectRoute() {
    const token = sessionStorage.getItem("t");
    if (!token) {
      auth.redirectToError();
    }
  }

  redirectToError() {
    window.location.href = "/error";
  }
}

const auth = new AuthHandler();

export default auth;
