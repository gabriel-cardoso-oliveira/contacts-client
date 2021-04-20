import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { Button } from "../../../components/Wrappers/Wrappers";
import TextMaskDate from "../../../utils/textMaskDate";
import TextMaskFone from "../../../utils/textMaskFone";

import api from "../../../services/api";

export default function TypographyPage(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [address, setAddress] = useState('');

  const schema = Yup.object().shape({
    contactId: Yup.number().required(),
    name: Yup.string().required(),
    last_name: Yup.string().required(),
    fone: Yup.string().required(),
    birth_date: Yup.string().required(),
    address: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  async function editContact() {
    try {
      const values = {
        contactId: Number(props.location.state.id),
        name,
        last_name: lastName,
        birth_date: birthDate.split('/').reverse().join('/'),
        email,
        fone,
        address,
      };

      if (!(await schema.isValid(values))) {
        return toast.error('É necessário preencher todos os campos.');
      }

      await api.put('contacts', values);

      toast.success('Contato alterado com sucesso!');

      return props.history.push("/app/contacts");
    } catch (error) {
      return toast.error(
        'Ocorreu um erro inesperado. Verifique os dados e tente novamente!'
      );
    }
  }

  function formatDate(birth_date) {
    const date = new Date(birth_date);

    const day =
      date.getDate() >= 10
        ? date.getDate()
        : `0${date.getDate()}`;

    const month =
      date.getMonth() >= 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;

    return `${day}/${month}/${date.getFullYear()}`;
  }

  async function getContact() {
    const {
      data,
      status,
    } = await api.get(`contacts/${props.location.state.id}`);

    if (status !== 200) {
      props.history.push('/app/contacts');

      return toast.error('Contato não encontrado. Tente novamente!');
    }

    setName(data.name);
    setLastName(data.last_name);
    setBirthDate(formatDate(data.birth_date));
    setEmail(data.email);
    setFone(data.fone);
    return setAddress(data.address);
  }

  useEffect(() => {
    getContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle title="Editar Contato" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={editContact}
        >
          Salvar Alterações
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
              id="last_name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              margin="normal"
              placeholder="Sobrenome"
              label="Sobrenome"
              type="text"
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
              <InputLabel htmlFor="birth_date">Data de Nascimento</InputLabel>
              <Input
                id="birth_date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                name="textmask"
                inputComponent={TextMaskDate}
              />
            </FormControl>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Contatos" disableWidgetMenu>
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
              <InputLabel htmlFor="birth_date">Telefone</InputLabel>
              <Input
                id="fone"
                value={fone}
                onChange={e => setFone(e.target.value)}
                name="textmask"
                inputComponent={TextMaskFone}
                type="fone"
              />
            </FormControl>
            <TextField
              id="address"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={address}
              onChange={e => setAddress(e.target.value)}
              margin="normal"
              placeholder="Endereço Completo"
              label="Endereço Completo"
              type="text"
              fullWidth
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
