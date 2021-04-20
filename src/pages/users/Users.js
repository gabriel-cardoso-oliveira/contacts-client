import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import api from "../../services/api";
import { textLabels } from "../../utils/labelsTable";
import { Button } from "../../components/Wrappers/Wrappers";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Tables(props) {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "E-mail",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "administrator",
      label: "Administrador",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  async function getUsers() {
    try {
      const { data } = await api.get('users');

      const usersTmp = data.map(user => {
        user.administrator = user.administrator ? 'Sim' : 'Não';
        user.status = user.status ? 'Ativo' : 'Desativado';

        return user;
      });

      setUsers(usersTmp);
    } catch (error) {
      toast.error('Ocorreu um erro inesperado. Saia e faça o Login novamente.');
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function disableUser(id, status) {
    const values = {
      userId: id,
      status: status === 'Ativo' ? false : true,
    };

    try {
      const { data } = await api.put('users-status', values);

      if (!!data.id) {
        getUsers();

        return toast.success(
          `Funcionário ${
            status === 'Ativo' ? 'desativado' : 'ativado'
          } com sucesso!`
        );
      }

      return toast.error(
        `Ocorreu um erro ${
          status === 'Ativo' ? 'desativar' : 'ativar'
        } o funcionário. Tente novamente!`
      );
    } catch (error) {
      toast.error('Ocorreu um erro inesperado. Saia e faça o Login novamente.');
    }
  }

  const options = {
    selectableRows: 'none',
    filterType: 'checkbox',
    textLabels,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    renderExpandableRow: rowData => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            Ações:
            <Button
              variant="contained"
              color="info"
              className={classnames(classes.buttonOptions)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={classnames(classes.buttonOptions)}
              onClick={() => disableUser(rowData[0], rowData[4])}
            >
              {rowData[4] === 'Ativo' ? 'Desativar' : 'Ativar'}
            </Button>
          </TableCell>
        </TableRow>
      );
    },
  };

  const theme = createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          visibility: 'hidden',
        },
      },
    },
  });

  const components = {
    ExpandButton: props => {
      if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{width:'24px'}} />;
      return <ExpandButton {...props} />;
    }
  }

  const addUser = () => {
    return props.history.push("/app/add-user");
  }

  return (
    <>
      <PageTitle title="Funcionários" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={addUser}
        >
          Adicionar
        </Button>
      } />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={theme}>
            <MUIDataTable
              data={users}
              columns={columns}
              options={options}
              components={components}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </>
  );
}
