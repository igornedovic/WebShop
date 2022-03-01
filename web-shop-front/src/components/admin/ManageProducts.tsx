import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Grid,
  Button,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  withStyles,
  Theme,
  createStyles,
  TableCell,
  Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStylesAdmin } from "../../styles/AdminStyles";
import { Manufacturer } from "../../models/Manufacturer";
import { ProductType } from "../../models/ProductType";
import { Characteristics } from "../../models/Characteristics";
import { Product } from "../../models/Product";
import { ManufacturerContext } from "../../App";
import { ProductTypeContext } from "../../App";

function ManageProducts() {
  const manufacturers: Manufacturer[] = useContext(ManufacturerContext);
  const productTypes: ProductType[] = useContext(ProductTypeContext);

  const classes = useStylesAdmin();
  const [type, setType] = useState<number | null>(0);
  const [productType, setProductType] = useState<number>(1);
  const [manufacturer, setManufacturer] = useState<number>(1);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.mainGridContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={6} className={classes.gridItem}>
            <Grid item className={classes.label}>
              <label>Tip proizvoda: </label>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <TextField
                id="outlined-select-productType"
                select
                label="Odaberite tip proizvoda"
                value={productType}
                onChange={(e) => setType(Number(e.target.value))}
                variant="outlined"
                style={{ width: "15vw" }}
              >
                {productTypes?.map((option: ProductType) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Grid item className={classes.label}>
              <label>Proizvodjac: </label>
            </Grid>
            <Grid item className={classes.gridItem}>
              <TextField
                id="outlined-select-manufacturer"
                select
                label="Odaberite proizvodjaca"
                value={manufacturer}
                onChange={(e) => setManufacturer(Number(e.target.value))}
                variant="outlined"
                style={{ width: "15vw" }}
              >
                {manufacturers?.map((option: Manufacturer) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManageProducts;
