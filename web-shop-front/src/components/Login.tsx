import React, { useState, useEffect } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { RequestUser } from "../models/RequestUser";
import { useStyles } from "../styles/Style";
import Alerts from "./Alerts";

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  let navigate = useNavigate();

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("login")!);
    if (store && store.loggedIn) {
      setUser(store.user);
    }
  };

  const login = () => {
    let requestUser: RequestUser = new RequestUser("", "");
    if (username !== null && password !== null) {
      requestUser.username = username;
      requestUser.password = password;
      fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify(requestUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          response.json().then((result) => {
            console.log(result);
            console.warn("result", result);
            let u: User = new User(
              result.name,
              result.surname,
              result.phone,
              result.email,
              result.username,
              result.password,
              result.isAdmin,
              result.image
            );
            localStorage.setItem(
              "login",
              JSON.stringify({
                loggedIn: true,
                token: result.token,
                user: JSON.stringify(u),
              })
            );
            storeCollector();

            console.log(u);
            setUser(u);

            let path;
            if (u?.isAdmin) {
              path = "/home/admin";
            } else {
              path = "/home/user";
            }

            navigate(path);
          });
        } else {
          handleClickAlert();
          setUsername(null);
          setPassword(null);
        }
      });
    }
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  useEffect(() => {
    storeCollector();
    const data = JSON.parse(localStorage.getItem("login")!);
    if (data) {
      setUser(JSON.parse(data.user));
    }
  }, []);

  return (
    <>
      <div className={classes.loginBackground}>
        <Container className={classes.loginContainer}>
          <label className={classes.loginLabel}>Dobrodosli!</label>
          <TextField
            id="outlined-basic-username"
            label="Korisnicko ime"
            variant="outlined"
            className={classes.loginElements}
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic-password"
            label="Lozinka"
            variant="outlined"
            className={classes.loginElements}
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.loginButton}
            onClick={login}
          >
            Prijavi se
          </Button>
          <Button
            variant="contained"
            className={classes.loginButton}
            style={{ backgroundColor: "#222431", color: "#4EB8CE" }}
            component={Link}
            to="/register"
          >
            Kreiraj nalog
          </Button>
          {openAlert ? (
            <Alerts
              text="Ne postoji korisnik sa unetim korisnickim imenom i lozinkom."
              type="info"
              setText={() => setOpenAlert(false)}
              setType={() => setOpenAlert(false)}
            />
          ) : null}
        </Container>
      </div>
    </>
  );
}

export default Login;
