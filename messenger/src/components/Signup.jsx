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
import { signup } from "../api";
import Alert from "@material-ui/lab/Alert";

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

const Signup = props => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const submitForm = async e => {
    e.preventDefault();
    if (name && image && email && password) {
      const formData = new FormData(e.target);
      const res = await signup(formData);
      if (res.errors) {
        setError(res.errors.full_messages.join(", "));
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
      <form onSubmit={e => submitForm(e)}>
        <Typography variant="h6" className={classes.title}>
          SignUp
        </Typography>
        <FormControl>
          <TextField
            onChange={e => setName(e.target.value)}
            value={name}
            required
            label="name"
            name="name"
          />
          <TextField
            onChange={e => setImage(e.target.value)}
            value={image}
            required
            type="file"
            label="Image"
            name="image"
          />
          <TextField
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            type="email"
            label="Email"
            name="email"
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            label="Password"
            name="password"
          />
          <Button
            className={classes.submit}
            type="submit"
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

export default Signup;
