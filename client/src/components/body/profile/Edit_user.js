import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utlis/notification/Notification";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setError("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <div className="profile_page edit_user">
      <div className="row">
        <button onClick={() => history.goBack()} className="go_back">
          <i className="fas fa-long-arrow-alt-left"></i> Go Back
        </button>
      </div>

      <div className="col-left">
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
        <h2>Edit User</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleCheck}
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
          />
          <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default EditUser;
