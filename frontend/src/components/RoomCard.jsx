import React from "react";
import chatBubble from "../assets/chat-bubble.png";
import userImage from "../assets/user-icon.png";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const naviage = useNavigate();
  return (
    <div
      className="roomCard bgSecondary"
      onClick={() => {
        naviage(`/rooms/${room._id}`);
      }}
    >
      <h3>{room.topic}</h3>
      <div
        className={`speakersWrapper ${
          room?.speakers?.length === 1 && "singleSpeakerWrapper"
        }`}
      >
        <div
          className={`avatarsWrapper bgSecondary ${
            room?.speakers?.length === 1 && "singleAvatarWrapper"
          }`}
        >
          {room.speakers.map((speaker) => (
            <img
              key={speaker._id}
              src={`${process.env.REACT_APP_API_URL}${speaker.avatar}`}
              alt="user avatar"
            />
          ))}
        </div>

        <div className="namesWrapper">
          {room.speakers.map((speaker) => (
            <div key={speaker._id} className="nameWrapper">
              <span>{speaker.name}</span>
              <img src={chatBubble} alt="chat bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className="peopleCount">
        <span>30</span>
        <img src={userImage} alt="" />
      </div>
    </div>
  );
};

export default RoomCard;
