import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TextInput from "./shared/TextInput";
import { createRoom as create } from "../http";
/* IMAGES AND ICONS */
import roomGlobe from "../assets/globe.png";
import social from "../assets/social.png";
import lock from "../assets/Lock.png";
import celebrationIcon from "../assets/celebration.png";
import closeIcon from "../assets/close.png";

const AddRoomModel = ({ closeModel }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const naviage = useNavigate();

  async function createRoom() {
    if (topic === "") {
      toast.error("Please enter topic first");
      return;
    }
    /* SERVER CALL */
    const promise = create({
      roomType,
      topic,
    });
    toast.promise(promise, {
      loading: "Creating rooms...",
      success: ({ data }) => {
        console.log(data.room._id);
        naviage(`/rooms/${data?.room?._id}`);
        return "Room created successfully !";
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong..";
      },
    });
  }

  return (
    <div className="modelWrapper">
      <div className="modelBody bgPrimary">
        <img src={closeIcon} alt="" className="close" onClick={closeModel} />
        <div className="modelHeader">
          <h3>Enter the topic to be disscussed</h3>
          <TextInput
            fullWidth={true}
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
          <h3>Room Types</h3>
          <div className="roomTypes">
            <div
              className={`typeBox ${roomType === "open" && "bgSecondary"}`}
              onClick={() => {
                setRoomType("open");
              }}
            >
              <img src={roomGlobe} alt="Globe" />
              <span>Open</span>
            </div>
            <div
              className={`typeBox ${roomType === "social" && "bgSecondary"}`}
              onClick={() => {
                setRoomType("social");
              }}
            >
              <img src={social} alt="Globe" />
              <span>Social</span>
            </div>
            <div
              className={`typeBox ${roomType === "private" && "bgSecondary"}`}
              onClick={() => {
                setRoomType("private");
              }}
            >
              <img src={lock} alt="Globe" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className="modelFooter">
          <h3>Start a room, open to everyone</h3>
          <button className="btn btnSecondary" onClick={createRoom}>
            <img src={celebrationIcon} alt="" />
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
