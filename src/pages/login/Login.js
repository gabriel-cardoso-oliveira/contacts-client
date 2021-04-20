import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
// import logo from "./logo.svg";
import logo from "../../images/logo.webp";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const classes = useStyles();

  // global
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <div className={classes.containerImg}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
        </div>
        <Typography className={classes.logotypeText}>
          Agenda de Contatos
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Bem vindo!
            </Typography>
            <Typography variant="h5" className={classes.subGreeting}>
              Sistema de Agenda de Contatos
            </Typography>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
            </div>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="E-mail"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Senha"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                    )
                  }
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Login
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://github.com/gabriel-cardoso-oliveira" rel="noopener noreferrer" target="_blank">Gabriel Cardoso de Oliveira Pereira</a>
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
