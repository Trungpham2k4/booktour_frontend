import http from "../http";

const SearchpageService = {
  async searchTour(tourName, tourType) {
    try {
      console.log("Get data from backend");
      const response = await http.post(
        "api/searchTour",
        {
          tourName: tourName,
          tourType: tourType,
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      console.log("Error fetching" + e);
    }
  },
  async getTourTypes() {
    try {
      const response = await http.get("api/getTourType");
      return response;
    } catch (e) {
      console.log("Error fetching tour types: " + e);
    }
  }
};

export default SearchpageService;
