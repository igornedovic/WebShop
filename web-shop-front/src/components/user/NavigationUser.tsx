import React from "react";
import {
  Badge,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Theme,
  withStyles,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStyles } from "../../styles/Style";
import { OrderItem } from "../../models/OrderItem";
import { User } from "../../models/User";
import { Link } from "react-router-dom";
import user from "../../assets/user.png";

interface Props {
  user: User | null;
  orders: OrderItem[] | null;
}

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 9,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  })
)(Badge);

function NavigationUser(props: Props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{paper: classes.paper}}
      anchor="left"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Divider />
      <List>
        <ListItem>
          <img
            src={
              props.user
                ? props.user.image !== null
                  ? props.user.image
                  : user
                : user
            }
            style={{
              maxWidth: "100px",
              margin: "auto",
              borderRadius: "2px",
            }}
            alt="user"
          ></img>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="profile">
          <PersonIcon style={{ paddingRight: "10px", color: "#222431" }} />
          <ListItemText>Profil</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="catalog">
          <ImportContactsIcon
            style={{ paddingRight: "10px", color: "#222431" }}
          />
          <ListItemText>Katalog</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="myCart">
          <StyledBadge badgeContent={props.orders?.length} color="primary">
            <ShoppingCartIcon
              style={{ paddingRight: "10px", color: "#222431" }}
            />
          </StyledBadge>
          <ListItemText>Moja korpa</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="myOrders">
          <AssignmentIcon style={{ paddingRight: "10px", color: "#222431" }} />
          <ListItemText>Porudzbine</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="contact">
          <MailIcon style={{ paddingRight: "10px", color: "#222431" }} />
          <ListItemText>Kontakt</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default NavigationUser;
