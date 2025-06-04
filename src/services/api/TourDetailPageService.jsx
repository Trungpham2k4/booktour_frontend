import http from "../http";

const TourDetailPageService = {
  async searchHeritageDetail(locationId) {
    try {
      console.log("Get data from backend");
      const response = await http.post(
        "api/searchHeritage",
        {
          heritageId: locationId
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      console.log("Error fetching" + e);
    }
  },
};

export default TourDetailPageService;
