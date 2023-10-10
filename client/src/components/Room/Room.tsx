import React from 'react';
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface RoomProps {
  room: {
    _id: string;
    roomId: string;
  };
}

const Course: React.FC<RoomProps> = ({ room }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        borderRadius: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">Restart the game with RoomId</Typography>
      <Typography textAlign={"center"} variant="subtitle1">{room.roomId}</Typography>
      <img src="https://images.unsplash.com/photo-1610633389918-7d5b62977dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoZXNzYm9hcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" style={{ width: 300, height: 200 }} alt="chessboard" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button variant="contained" size="large" onClick={() => {
          navigate("/game?roomId=" + room.roomId);
        }}>Continue</Button>
      </div>
      <br />
    </Card>
  );
};

export default Course;
