import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search-icon.png";
import addRoomIcon from "../assets/add-room-icon.png";
import defaultAvatar from "../assets/monkey-avatar.png";
import "../scss/rooms.scss";
import { AddRoomModel, RoomCard } from "../components";
import { getRooms } from "../http";

const Rooms = () => {
  const [showModel, setShowModel] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await getRooms();
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="container bgPrimary roomsContainer">
      <div className="header">
        <div className="left">
          <span className="heading">All voice rooms</span>
          <div className="searchBox bgSecondary">
            <img src={searchIcon} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search room.."
              className="txtSecondary"
            />
          </div>
        </div>
        <div className="right">
          <button
            className="btn btnSecondary"
            onClick={() => {
              setShowModel(true);
            }}
          >
            <img src={addRoomIcon} alt="" />
            <span>Start Room</span>
          </button>
        </div>
      </div>

      <div className="roomsList">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>

      {showModel && (
        <AddRoomModel
          closeModel={() => {
            setShowModel(false);
          }}
        />
      )}
    </div>
  );
};

export default Rooms;
