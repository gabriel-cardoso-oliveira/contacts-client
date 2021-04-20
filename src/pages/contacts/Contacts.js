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
import { columns } from "../../utils/columnsContacts";
import { Button } from "../../components/Wrappers/Wrappers";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Tables(props) {
  const classes = useStyles();

  const [contacts, setContacts] = useState([]);

  async function getContacts() {
    try {
      const { data } = await api.get('contacts');

      // const contactsTmp = data.map(user => {
      //   user.administrator = user.administrator ? 'Sim' : 'Não';
      //   user.status = user.status ? 'Ativo' : 'Desativado';

      //   return user;
      // });

      setContacts(data);
    } catch (error) {
      toast.error('Ocorreu um erro inesperado. Saia e faça o Login novamente.');
    }
  }

  useEffect(() => {
    getContacts();
  }, []);

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

  const addContacts = () => {
    return props.history.push("/app/add-contacts");
  }

  return (
    <>
      <PageTitle title="Funcionários" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={addContacts}
        >
          Adicionar
        </Button>
      } />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={theme}>
            <MUIDataTable
              data={contacts}
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
