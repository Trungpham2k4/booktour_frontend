import "./Comment.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../../components/navbar/NavBar";
// import Footer from "../../components/footer/Footer";
import commentService from "../../services/api/CommentPageService";
function MainContent() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    commentService
      .getComment()
      .then((data) => {
        setComments(data); // Sau khi fetch, set state bằng dữ liệu
      })
      .catch((err) => {
        console.error("Lỗi khi fetch comments", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || rating === 0) {
      alert("Vui lòng nhập bình luận và đánh giá trước khi gửi.");
      return;
    }

    await commentService.addComment(newComment, rating);
    const comment = await commentService.getComment();
    setComments(comment);
    setNewComment("");
    setRating(0);
  };

  return (
    <div className="comment-container">
      <h1>GÓP Ý CỦA BẠN </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Vui lòng để lại nhận xét của bạn"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />

        <div className="star-rating">
          <label>Đánh giá: </label>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              style={{
                cursor: "pointer",
                color: num <= rating ? "gold" : "gray",
                fontSize: "20px",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <br />
        <button type="submit">Nhập</button>
      </form>

      <div className="comment-list">
        <h3>Bình luận đã gửi:</h3>
        {comments.length === 0 && <p>Chưa có bình luận nào.</p>}
        <ul>
          {comments.map((cmt, index) => (
            <li key={index}>
              <p>{cmt.name}</p>
              <p>{cmt.comment}</p>
              <p>
                Đánh giá:{" "}
                {[...Array(cmt.rating)].map((_, i) => (
                  <span key={i} style={{ color: "gold" }}>
                    ★
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Comment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <NavBar /> */}
      <MainContent />
      {/* <Footer /> */}
    </motion.div>
  );
}

export default Comment;
