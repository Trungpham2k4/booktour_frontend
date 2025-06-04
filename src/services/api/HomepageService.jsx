import http from "../http";

const HomepageService = {
  async getAllHeritage() {
    try {
      console.log("Get data from backend");
      const response = await http.get("api/getAllHeritage");
      console.log(response);
      return response;
    } catch (e) {
      console.log("Error fetching" + e);
    }
  },
};

export default HomepageService;
