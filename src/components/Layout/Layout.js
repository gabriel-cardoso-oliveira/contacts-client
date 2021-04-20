import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Contacts from "../../pages/contacts";
import AddContacts from "../../pages/contacts/addContacts";
import EditContacts from "../../pages/contacts/EditContacts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/contacts" component={Contacts} />
              <Route path="/app/add-contacts" component={AddContacts} />
              <Route path="/app/edit-contacts" component={EditContacts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
