import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core";
import AddRoom from "./AddRoom";
import { getChatRooms } from "../api";

const useStyles = makeStyles(theme => ({
  messageBox: {
    width: "22%",
    position: "fixed",
    bottom: 0,
  },
  card: {},
  cardHeader: {
    textAlign: "center",
    backgroundColor: "#3f51b5",
    color: "#fff",
  },
  ul: {
    listStyleType: "none",
    padding: 15,
    width: 200,
    maxHeight: 250,
    minHeight: 250,
    overflowY: "auto",
  },
  li: {
    display: "flex",
    cursor: "pointer",
    padding: 10,
  },
  avatar: {
    marginRight: 25,
  },
  userName: {
    margin: "auto",
  },
}));

const MessageBox = props => {
  const classes = useStyles();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (props.users){
      const refreshChatRooms = async () => {
        await fetchChatRooms();
      };
      refreshChatRooms();
    }
  }, [props.users]);

  const fetchChatRooms = async () => {
    const res = await getChatRooms();
    if (res) {
      setChatRooms(res.chat_rooms);
    }
  };

  const openRoom = (chat_room, friend, user) => {
    const rooms = props.rooms;
    const room = rooms.find(r => r.chat_room.id === chat_room.id);
    if (!room) {
      if (rooms.length > 2) {
        rooms.pop();
      }
      props.setRooms([...rooms, { chat_room, friend, user }]);
    }
  };

  return (
    <div className={classes.messageBox}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <AddRoom
              fetchUsers={props.fetchUsers}
              users={props.users}
              fetchUser={props.fetchUser}
              user={props.user}
              chatRooms={chatRooms}
              setChatRooms={setChatRooms}
            />
          }
          titleTypographyProps={{ align: "center", variant: "h6" }}
          className={classes.cardHeader}
          title="Chat Rooms"
        />
        <CardContent>
          <ul className={classes.ul}>
            {chatRooms &&
              props.users.length > 0 &&
              chatRooms.map(chat_room => {
                const friendId =
                  props.user.id === chat_room.user_1
                    ? chat_room.user_2
                    : chat_room.user_1;
                const friend = props.users.find(u => u.id === friendId);
                return (
                  <li
                    className={classes.li}
                    key={chat_room.id}
                    onClick={() => openRoom(chat_room, friend, props.user)}
                  >
                    <Avatar className={classes.avatar} src={friend.image} />
                    <Typography className={classes.userName} variant="body1">
                      {friend.name}
                    </Typography>
                  </li>
                );
              })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageBox;
