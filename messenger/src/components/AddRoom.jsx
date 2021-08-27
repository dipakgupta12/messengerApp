import AddIcon from "@material-ui/icons/Add";
import { Popover, Avatar, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { createChatRoom } from "../api";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: "none",
    padding: 15,
    width: 200,
    maxHeight: 200,
    overflowY: 'auto'
  },
  li: {
    display: "flex",
    cursor: "pointer",
  },
  avatar: {
    marginRight: 25,
  },
  userName: {
    margin: "auto",
  },
  search: {
    padding: 10,
  },
}));

const AddRoom = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const addChatRoom = async user_2 => {
    const chat_room = props.chatRooms.find(cr => cr.user_1 === user_2 || cr.user_2 === user_2)
    if (!chat_room) { 
      const res = await createChatRoom({ chat_room: { user_2 } });
      if (res.chat_room) {
        await props.fetchUsers();
        props.setChatRooms([...props.chatRooms, res.chat_room])
      }
    }
    handleClose()
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "new-room" : undefined;
  const filteredUsers = props.users ? (search.length > 2 ? 
    props.users.filter(u => u.name.includes(search)) :
    props.users) : []
  return (
    <>
      <AddIcon onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={classes.search}
          type="text"
          label=""
          variant="outlined"
          margin='dense'
        />
        <ul className={classes.ul}>
          {filteredUsers && filteredUsers.length > 0 &&
            filteredUsers.map(user => {
              return (
                <li
                  className={classes.li}
                  key={user.id}
                  onClick={() => addChatRoom(user.id)}
                >
                  <Avatar className={classes.avatar} src={user.image} />
                  <Typography className={classes.userName} variant="body1">
                    {user.name}
                  </Typography>
                </li>
              );
            })}
        </ul>
      </Popover>
    </>
  );
};

export default AddRoom;
