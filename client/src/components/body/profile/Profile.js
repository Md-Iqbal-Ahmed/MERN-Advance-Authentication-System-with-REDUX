import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../../redux/actions/userAction";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utlis/notification/Notification";

const initialState = {
  name: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: "",
};

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { user, isAdmin } = auth;

  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const { name, password, confirmPassword, error, success } = data;

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };
  const updateInfo = async () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, error: "", success: "Updated Succesfully!" });
    } catch (err) {
      setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };
  const updatePassword = async () => {
    try {
      const res = await axios.put(
        "/user/reset_password",
        { password, confirmPassword },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, error: "", success: res.data.msg });
    } catch (err) {
      setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };

  const handleChangeAvatar = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      if (!file)
        return setData({ ...data, error: "File is not attached", success: "" });

      if (file.size > 1024 * 1024)
        return setData({
          ...data,
          error: "Size too large. Upload a file not more than 1MB",
          success: "",
        });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          error: "Incorrect file format",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are sure to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div>
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

          <div className="avatar">
            {loading ? (
              <h3
                style={{
                  textAlign: "center",
                  padding: "10px",
                  marginTop: "50px",
                  textTransform: "uppercase",
                }}
              >
                Loading.....
              </h3>
            ) : (
              <>
                <img src={avatar ? avatar : user.avatar} alt="" />
                <span>
                  <i className="fas fa-camera"></i>
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={handleChangeAvatar}
                  />
                </span>
              </>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Your name"
              onChange={handleChange}
            />
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user.email}
                placeholder="Your email address"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <button disabled={loading} onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div className="col-right">
          <h2>{isAdmin ? "Users" : "Info"}</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === 1 ? (
                        <i className="fas fa-check" title="Admin"></i>
                      ) : (
                        <i className="fas fa-times" title="User"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/edit_user/${user._id}`}>
                        <i className="far fa-edit" title="Edit"></i>
                      </Link>
                      <i
                        onClick={() => handleDelete(user._id)}
                        className="fas fa-trash-alt"
                        title="Remove"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
