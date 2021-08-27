import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Typography,
  Button,
  Snackbar,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { login } from "../api";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: "auto",
    },
  },
  submit: {
    width: "30%",
    marginTop: 20,
    position: "relative",
    left: "69%",
  },
  container: {
    marginTop: 50,
    textAlign: "center",
  },
}));

const Login = props => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const submitForm = async () => {
    if (email && password) {
      const res = await login({ email, password });
      if (res.errors) {
        setError(res.errors.join(", "));
        setOpen(true);
      } else {
        props.setUser(res.data);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <form>
        <Typography variant="h6" className={classes.title}>
          Login
        </Typography>
        <FormControl>
          <TextField
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            type="email"
            label="Email"
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            label="Password"
          />
          <Button
            className={classes.submit}
            onClick={submitForm}
            size="small"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </FormControl>
      </form>
    </Container>
  );
};

export default Login;
