// One-stop-shop to handle endpoints for API calls.
class EndPoints {
  constructor() {
    this.baseURL = "http://localhost:8000/api/";
    this.urlMap = {
      signin: "signin",
      auth: "auth",
      pubView: "publication/",
      allPub: "publications",
      drafts: "/drafts",
      createUser: "createUser",
      draftTBSN: "drafts/",
      submitDraft: "submitReview",
      draftSave: "drafts",
      getReview: "getReview",
      getPrice: "price/",
      getCollection: "collection/"
    };
  }

  getSignInAPI() {
    return this.baseURL + this.urlMap.signin;
  }
  getAuthAPI() {
    return this.baseURL + this.urlMap.auth;
  }
  getPublicationAPI(tbsn) {
    return this.baseURL + this.urlMap.pubView + tbsn;
  }
  getAllPubAPI() {
    return this.baseURL + this.urlMap.allPub;
  }
  getUserDraftAPI(username) {
    let u = username.replace(/ /g, "_").toLowerCase();
    return this.baseURL + u + this.urlMap.drafts;
  }
  getUserCollectionAPI(username) {
    let u = username.replace(/ /g, "_").toLowerCase();
    return this.baseURL + this.urlMap.getCollection + u;
  }

  getCreateUserAPI() {
    return this.baseURL + this.urlMap.createUser;
  }
  getDraftAPI(tbsn) {
    return this.baseURL + this.urlMap.draftTBSN + tbsn;
  }
  getDraftSubmitAPI() {
    return this.baseURL + this.urlMap.submitDraft;
  }
  getDraftSaveAPI() {
    return this.baseURL + this.urlMap.draftSave;
  }

  getReviewAPI() {
    return this.baseURL + this.urlMap.getReview;
  }
  getPriceAPI(tbsn) {
    return this.baseURL + this.urlMap.getPrice + tbsn;
  }
}

const endpoints = new EndPoints();
export default endpoints;
