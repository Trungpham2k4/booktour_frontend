import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({
  isLoggedIn,
  username,
  email,
  phoneNumber,
  setShowProfile,
}) => {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: username || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
  });
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Load mock booking history
    const mockBookings = [
      {
        id: 1,
        tourName: "Tour Hạ Long",
        date: "15/05/2023",
        status: "Confirmed",
      },
      {
        id: 2,
        tourName: "Tour Đà Nẵng",
        date: "22/06/2023",
        status: "Completed",
      },
      {
        id: 3,
        tourName: "Tour Phú Quốc",
        date: "10/08/2023",
        status: "Cancelled",
      },
    ];
    setBookings(mockBookings);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setUserInfo({ ...userInfo, avatar: URL.createObjectURL(files[0]) });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Thông tin đã được cập nhật thành công!",
      });
      setIsEditing(false);

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setUserInfo({
      avatar: "",
      name: username || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
    });
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-modal">
        <div className="profile-content">
          <div className="profile-header">
            <h2>Thông tin cá nhân</h2>
          </div>
          <div className="profile-not-logged-in">
            <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>
            <button
              className="btn btn-close"
              onClick={() => setShowProfile(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-modal">
      <div className="profile-content">
        {notification && (
          <div className={`notification notification-${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="profile-header">
          <h2>Thông tin cá nhân</h2>
          {!isEditing && (
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </button>
          )}
        </div>

        <div className="avatar-section">
          <div className="avatar-container">
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="avatar-image"
              />
            ) : (
              <div className="avatar-placeholder">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <label className="avatar-upload-btn">
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                accept="image/*"
              />
              Thay đổi ảnh đại diện
            </label>
          )}
        </div>

        <div className="form-group">
          <label>Tên người dùng</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="form-input"
            />
          ) : (
            <div className="form-value">{userInfo.name}</div>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="form-input"
            />
          ) : (
            <div className="form-value">{userInfo.email}</div>
          )}
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleChange}
              className="form-input"
            />
          ) : (
            <div className="form-value">{userInfo.phoneNumber}</div>
          )}
        </div>

        {isEditing && (
          <div className="action-buttons">
            <button className="btn btn-save" onClick={handleSave}>
              Lưu thay đổi
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Hủy bỏ
            </button>
          </div>
        )}

        <button className="btn btn-close" onClick={() => setShowProfile(false)}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Profile;
