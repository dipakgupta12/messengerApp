import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  CardActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { createMessage, getMessages } from "../api";
import { getDateString } from "../utility";

const useStyles = makeStyles(theme => ({
  messageRoom: {
    width: "32%",
    marginRight: 10,
  },
  card: {
    height: 370,
  },
  cardHeader: {
    backgroundColor: "#3f51b5",
    color: "#fff",
  },
  cardContent: {
    overflowY: "auto",
    maxHeight: 180,
  },
  chip: {
    display: "flex",
  },
  chipAvatar: {
    width: 25,
    height: 25,
  },
  avatar: {
    marginRight: 25,
  },
  userName: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  time: {
    fontSize: 8,
    color: "#999",
    position: "relative",
    top: 20,
  },
  actions: {
    position: "fixed",
    bottom: 10,
  },
  textField: {
    width: "80%",
  },
  left: {
    textAlign: "left",
    marginBottom: 10,
  },
  body: {
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
}));

const MessageRoom = props => {
  const classes = useStyles();
  const { chat_room, friend, user } = props.room;
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const refreshMessages = async () => {
      await fetchMessages();
    };
    refreshMessages();
    const id = setInterval(refreshMessages, 10 * 1000);
    props.setIntervalIds([...props.intervalIds, id]);
  }, [chat_room]);

  const fetchMessages = async () => {
    if (chat_room) {
      const res = await getMessages(chat_room.id);
      if (res) {
        setMessages(res.messages);
      }
    }
  };

  const closeRoom = id => {
    const filteredRooms = props.rooms.filter(r => r.chat_room.id !== id);
    props.setRooms(filteredRooms);
    setMessages([]);
  };

  const sendMessage = async () => {
    const res = await createMessage({
      message: { status: "unread", chat_room_id: chat_room.id, body },
    });
    if (res) {
      setBody("");
      setMessages([...messages, res.message]);
    }
  };

  return (
    <div className={classes.messageRoom}>
      <Card className={classes.card} variant="elevation">
        <CardHeader
          action={<CloseIcon onClick={() => closeRoom(chat_room.id)} />}
          avatar={<Avatar className={classes.avatar} src={friend.image} />}
          titleTypographyProps={{ align: "left", variant: "body1" }}
          className={classes.cardHeader}
          title={`To: ${friend.name}`}
        />
        <CardContent className={classes.cardContent}>
          {messages &&
            messages.map(msg => {
              const messageOwner = msg.user.id === user.id;
              return (
                <div key={msg.id} className={classes.left}>
                  <div className={classes.chip}>
                    <Avatar
                      className={classes.chipAvatar}
                      src={messageOwner ? user.image : friend.image}
                    />
                    <span className={classes.userName}>
                      {messageOwner ? user.name : friend.name}
                    </span>
                    <span className={classes.time}>
                      {getDateString(msg.created_at)}
                    </span>
                  </div>
                  <div className={classes.body}>{msg.body}</div>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardActions className={classes.actions}>
          <TextField
            className={classes.textField}
            type="text"
            variant="outlined"
            size="small"
            margin="dense"
            value={body}
            onKeyPress={e => e.key === "Enter" && sendMessage()}
            onChange={e => setBody(e.target.value)}
          />
          <SendIcon onClick={sendMessage} />
        </CardActions>
      </Card>
    </div>
  );
};

export default MessageRoom;
