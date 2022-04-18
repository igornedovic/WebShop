import React, { useEffect, useState } from "react";
import { Manufacturer } from "../../../models/Manufacturer";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useStylesManageManufacturers } from "../../../styles/AuxiliaryElementsStyle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SaveIcon from "@material-ui/icons/Save";
import { validMail } from "../../helpers/Functions";
import { AddManufacturer } from "../../../services/Api";
import { User } from "../../../models/User";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  user: User | null;
  appendManufacturers: (m: Manufacturer) => void;
}

function ManageManufacturers(props: Props) {
  const classes = useStylesManageManufacturers();

  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const [openName, setOpenName] = useState<boolean>(false);
  const [openPhone, setOpenPhone] = useState<boolean>(false);
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  const [openAddress, setOpenAddress] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleAddManufacturer = () => {
    let good: boolean = true;
    if (name === null || name === "") {
      setOpenName(true);
      good = false;
    }
    if (email === null || (email !== null && !validMail(email))) {
      setOpenEmail(true);
      good = false;
    }
    if (phone === null || phone === "") {
      setOpenPhone(true);
      good = false;
    }
    if (address === null || address === "") {
      setOpenAddress(true);
      good = false;
    }

    if (good) {
      let manu: Manufacturer = new Manufacturer(
        name!,
        phone!,
        email!,
        address!
      );
      onAddManufacturer(manu);
    }
  };

  const onAddManufacturer = async (man: Manufacturer) => {
    try {
      if (!props.user?.token) return;

      const response = await AddManufacturer(man, props.user.token);
      if (response.status === 404) {
        handleClickAlertError();
      } else {
        handleClickAlert();
        handleCancel();
        props.appendManufacturers(man);
      }
    } catch {
      console.log("Greska prilikom cuvanja proizvodjaca!");
      handleClickAlertError();
    }
  };

  const handleCancel = () => {
    setName(null);
    setPhone(null);
    setEmail(null);
    setPhone(null);
    setAddress(null);
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };
  const handleCloseAlertError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };

  return (
    <Grid component={Paper} className={classes.root}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno kreiran novi proizvodjac!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          Nije moguce sacuvati novog proizvodjaca!
        </Alert>
      </Snackbar>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.labelMain}>Novi proizvodjac</label>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Naziv </label>
        <Tooltip
          open={openName}
          title="Unesite ispravan naziv!"
          placement="right"
        >
          <TextField
            required
            id="standard-required-name-man"
            variant="outlined"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
              setOpenName(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Broj telefona </label>
        <Tooltip
          open={openPhone}
          title="Unesite ispravan broj telefona!"
          placement="right"
        >
          <TextField
            required
            id="standard-required-phone"
            variant="outlined"
            value={phone || ""}
            onChange={(e) => {
              setPhone(e.target.value);
              setOpenPhone(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Email </label>
        <Tooltip
          open={openEmail}
          title="Unesite ispravan email!"
          placement="right"
        >
          <TextField
            required
            id="standard-required-email"
            variant="outlined"
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
              setOpenEmail(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Adresa </label>
        <Tooltip
          open={openAddress}
          title="Unesite ispravnu adresu!"
          placement="right"
        >
          <TextField
            required
            id="standard-required-adress"
            variant="outlined"
            value={address || ""}
            onChange={(e) => {
              setAddress(e.target.value);
              setOpenAddress(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Grid item xs={6}>
          <Button
            id="removeMan"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            onClick={handleCancel}
            style={{ backgroundColor: "#676d92", color: "white" }}
            className={classes.btns}
          >
            Ponisti
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id="addMan"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleAddManufacturer}
            style={{ backgroundColor: "#222431", color: "white" }}
            className={classes.btns}
          >
            Sacuvaj
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ManageManufacturers;
