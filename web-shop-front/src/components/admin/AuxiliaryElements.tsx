import React from "react";
import { Grid } from "@material-ui/core";
import { Manufacturer } from "../../models/Manufacturer";
import { ProductType } from "../../models/ProductType";
import { useStylesAuxiliary } from "../../styles/AuxiliaryElementsStyle";
import GeneratePDFs from "./AuxiliaryElements/GeneratePDFs";
import ManageManufacturers from "./AuxiliaryElements/ManageManufacturers";
import ManageProductType from "./AuxiliaryElements/ManageProductType";

function AuxiliaryElements() {
  const classes = useStylesAuxiliary();
  return (
    <Grid className={classes.root}>
      <Grid item xs={5}>
        <ManageManufacturers />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <ManageProductType />
        <GeneratePDFs />
      </Grid>
    </Grid>
  );
}

export default AuxiliaryElements;
