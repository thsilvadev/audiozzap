import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';

const UserCheck = () => {
  const navigate = useNavigate();

  const { userHash } = useParams();

  let [message, setMessage] = useState("");

  useEffect(() => {
    if (userHash) {
      Axios.put(`${window.name}/userCheck/${userHash}`, {
        confirmed: "confirmed",
      }).then((response) => {
        if (response.data.message){
            alert(response.data.message);
            navigate("/userRegistration");
        }
        }).catch((error) => {
            console.error(error);
            setMessage(error.response.data.error);
        })
    }
  }, [userHash, message]);

  return (
    <div>
      <h1>Hey!</h1>
      <h2>Wait...</h2>
      <h3>{message}</h3>
    </div>
  );
};

export default UserCheck;
