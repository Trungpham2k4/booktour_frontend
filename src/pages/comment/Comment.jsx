import "./Comment.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/api/CommentPageService";
import { FaStar, FaUser, FaPaperPlane } from "react-icons/fa";
import { format } from 'date-fns';

function MainContent() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await commentService.getComment();
      setComments(data);
    } catch (err) {
      console.error("Lỗi khi tải bình luận", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || rating === 0) {
      alert("Vui lòng nhập bình luận và đánh giá trước khi gửi.");
      return;
    }

    setIsSubmitting(true);
    try {
      await commentService.addComment(newComment, rating);
      await fetchComments();
      setNewComment("");
      setRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <h1>Chia Sẻ Đánh Giá Của Bạn</h1>
        <p className="subtitle">Chúng tôi trân trọng ý kiến đóng góp từ bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <textarea
            placeholder="Hãy chia sẻ suy nghĩ của bạn với chúng tôi..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="5"
            className="comment-textarea"
          />
        </div>

        <div className="form-group">
          <label className="rating-label">Đánh giá của bạn:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <FaStar
                key={num}
                className="star"
                color={num <= (hoverRating || rating) ? "#FFD700" : "#e4e5e9"}
                size={28}
                onClick={() => setRating(num)}
                onMouseEnter={() => setHoverRating(num)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? (
            "Đang gửi..."
          ) : (
            <>
              <FaPaperPlane style={{ marginRight: '8px' }} />
              Gửi Đánh Giá
            </>
          )}
        </button>
      </form>

      <div className="comment-list">
        <h3 className="comment-list-title">Đánh Giá Gần Đây</h3>
        {comments.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến!</p>
          </div>
        ) : (
          <ul className="comment-items">
            {comments.map((cmt, index) => (
              <li key={index} className="comment-item">
                <div className="comment-header2">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-info">
                    <span className="user-name">{cmt.name}</span>
                    <span className="comment-date">
                      {format(new Date(cmt.review_date || Date.now()), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
                <div className="comment-content">
                  <p>{cmt.comment}</p>
                </div>
                <div className="comment-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < cmt.rating ? "#FFD700" : "#e4e5e9"}
                      size={16}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
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
      className="page-container"
    >
      <MainContent />
    </motion.div>
  );
}

export default Comment;