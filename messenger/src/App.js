import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import Login from './components/Login';
import { getLoggedInUser } from './utility';
import { logout, getUsers } from './api';
import Signup from './components/Signup';
import MessageBox from './components/MessageBox';
import MessageRoom from './components/MessageRoom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rooms: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '60%',
    display: 'flex'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  logOut: {
    zIndex: 1
  }
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null)
  const [signUp, setSignUp] = useState(false)
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([])
  const [intervalIds, setIntervalIds] = useState([])

  useEffect(() => {
    if (user) { return }
    const refreshUser = async () => {
      await fetchUser();
    }
    refreshUser()
  }, [user])

  useEffect(() => {
    if (user) {
      const refreshUsers = async () => {
        await fetchUsers();
      };
      refreshUsers()
      const id = setInterval(refreshUsers, 10 * 1000)
      setIntervalIds([...intervalIds, id])
    }
  }, [user])

  const fetchUser = async () => {
    const res = await getLoggedInUser();
    if (res && res.data) {
      setUser(res.data)
    }
  }

  const clearIntervalsData = () => {
    intervalIds.forEach(id => {
      clearInterval(id);
    })
  }

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      setUsers(res);
    }
  };

  const logOut = async () => {
    const res = await logout();
    if (res.success) {
      setUser(null)
      setRooms([]);
      setUsers([])
      setSignUp(false)
      clearIntervalsData();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Messenger
          </Typography>
          {
            user ?
              <>
                <Avatar src={user.image} />
                <Button className={classes.logOut} color="inherit" onClick={logOut}>Logout</Button>
              </>
              :
              (signUp ?
                <Button color="inherit" onClick={() => setSignUp(false)}>Login</Button> :
                <Button color="inherit" onClick={() => setSignUp(true)}>SignUp</Button>
              )
          }
        </Toolbar>
      </AppBar>
      {
        user ?
          <>
            <MessageBox rooms={rooms} setRooms={setRooms} fetchUsers={fetchUsers} users={users} fetchUser={fetchUser} user={user} />
            <div className={classes.rooms}>
              {
                rooms && rooms.map(room => {
                  return <MessageRoom intervalIds={intervalIds} setIntervalIds={setIntervalIds} key={room.chat_room.id} rooms={rooms} setRooms={setRooms} room={room} />
                })
              }
            </div>
          </> :
          (signUp ? <Signup setUser={setUser} /> : <Login setUser={setUser} />)
      }
    </div>
  );
}

export default App;
