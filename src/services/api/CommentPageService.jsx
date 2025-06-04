import http from "../http";

const CommentPageService = {
  async addComment(text, rating) {
    try {
      const response = await http.post(
        "api/addComment",
        {
          text: text,
          rating: rating,
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      console.log("Error fetching" + e);
    }
  },
  async getComment() {
    try {
      const response = await http.get("api/getComments");
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default CommentPageService;
