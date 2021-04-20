import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { toast } from 'react-toastify';

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { Button } from "../../../components/Wrappers/Wrappers";

import api from "../../../services/api";

export default function TypographyPage() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [administrator, setAdministrator] = useState('0');
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [permissions, setPermissions] = useState([]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeAdministrator = (event) => {
    setAdministrator(event.target.value);
  };

  const getPermissions = async () => {
    try {
      const { data } = await api.get('permissions');

      if (!data || !data.length) {
        return toast.error('Ocorreu um erro inesperado. Saia e faça o Login novamente.');
      }

      return setPermissions(data);
    } catch (error) {
      toast.error('Ocorreu um erro inesperado. Saia e faça o Login novamente.');
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>
      <PageTitle title="Adicionar Funcionário" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={() => {}}
        >
          Adicionar
        </Button>
      } />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget title="Informações" disableWidgetMenu>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="Nome"
              label="Nome"
              type="text"
              fullWidth
            />
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              placeholder="E-mail"
              label="E-mail"
              type="email"
              fullWidth
            />
            <FormControl
              className={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              margin="normal"
              fullWidth
            >
            <InputLabel htmlFor="password">Senha</InputLabel>
              <Input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormLabel component="legend" className={classes.labelRadio}>
              Este funcionário é Administrador?
            </FormLabel>
            <RadioGroup
              row
              className={classes.radio}
              aria-label="administrator"
              name="administrator"
              value={administrator}
              onChange={handleChangeAdministrator}
            >
              <FormControlLabel value="1" control={<Radio />} label="Sim" />
              <FormControlLabel value="0" control={<Radio />} label="Não" />
            </RadioGroup>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Permissões" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Typography variant="h1" color="primary" className={classes.text}>
                h1. Heading
              </Typography>
              <Typography variant="h2" color="success" className={classes.text}>
                h2. Heading
              </Typography>
              <Typography
                variant="h3"
                color="secondary"
                className={classes.text}
              >
                h3. Heading
              </Typography>
              <Typography variant="h4" color="warning" className={classes.text}>
                h4. Heading
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                colorBrightness="light"
                className={classes.text}
              >
                h5. Heading
              </Typography>
              <Typography variant="h6" color="info">
                h6. Heading
              </Typography>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
