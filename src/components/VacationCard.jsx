import React, { useEffect, useState } from "react";
import "./vacation.css";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import { useHistory } from "react-router-dom";
import EditVacation from "./EditVacation";

export default function VacationCard({ vacation, setVacationsArr }) {
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(vacation.followers);

  useEffect(() => {
    if (vacation.favID) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
    console.log(followed);
    console.log(vacation.destination);
  }, [vacation.followers]);

  const upFollowers = () => {
    setFollowers(followers + 1);
  };

  const downFollowers = () => {
    setFollowers(followers - 1);
  };

  const addFollowers = async () => {
    try {
      const id = vacation.id;
      console.log(id);
      const res = await fetch("http://localhost:1000/vacations/add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ vacationID: id }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.err) {
        fetch("http://localhost:1000/vacations", {
          credentials: "include",
        })
          .then((res1) => res1.json())
          .then((data1) => {
            const x = data1.find((d) => d.destination === vacation.destination);
            console.log(x);
            if (x) {
              // setFollowers(x.followers);
              upFollowers(x.followers);
            }
            setVacationsArr(data1);
          });
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFollowers = async () => {
    const id = vacation.id;
    console.log(id);
    const res = await fetch("http://localhost:1000/vacations/remove", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ vacationID: id }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!data.err) {
      downFollowers();
      fetch("http://localhost:1000/vacations", {
        credentials: "include",
      })
        .then((res1) => res1.json())
        .then((data1) => setVacationsArr(data1));
    } else {
      alert(data.msg);
    }
  };

  const deleteVac = async () => {
    const res = await fetch(
      `http://localhost:1000/admin/delete/${vacation.id}`,
      {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    fetch("http://localhost:1000/vacations", {
      credentials: "include",
    })
      .then((res3) => res3.json())
      .then((data3) => setVacationsArr(data3));

    alert(data.msg);
  };


  const userRole = localStorage.role;

  return (
    <div>
      <div className="vac-div">
        <div className="fav"></div>
        <img className="vac-img" src={vacation.imgUrl} alt="no" />
        <div className="bottom-card">
          <div className="actions">
            <h2 className="des-title">{vacation.destination}</h2>

            {userRole === "admin" && (
              <div className="admin-menu">
                {/* <button>Edit Vacation</button> */}
                <IconButton
                  onClick={deleteVac}
                  aria-label="delete"
                  color="primary"
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
                <EditVacation
                  vacation={vacation}
                  setVacationsArr={setVacationsArr}
                />
              </div>
            )}
            {userRole === "user" && (
              <div className="follow">
                {!followed && (
                  <IconButton
                    onClick={addFollowers}
                    aria-label="delete"
                    color="primary"
                  >
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </IconButton>
                )}
                {followed && (
                  <IconButton
                    onClick={removeFollowers}
                    aria-label="delete"
                    color="primary"
                  >
                    <Favorite></Favorite>
                  </IconButton>
                )}{" "}
              </div>
            )}
          </div>

          <div className="description">
            <p>{vacation.description}</p>
          </div>
          <div className="date">
            <h5 className="date-text">
              Departure Date:{" "}
              {new Date(vacation.fromDate).toLocaleDateString("en-IL")}
            </h5>
            <h5 className="date-text">
              Return Date:{" "}
              {new Date(vacation.toDate).toLocaleDateString("en-IL")}
            </h5>
            <div className="price">
              <h2>${vacation.price}</h2>
              <h4>Followers: {vacation.followers}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
