import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  MutableRefObject,
} from "react";
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
import ManageCharacteristics from "./ManageProducts/ManageCharacteristics";
import { AddProduct } from "../../services/Api";
import { GetAllManufacturers, GetAllProductTypes } from "../../services/Api";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#222431",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function ManageProducts() {
  let manufacturers: MutableRefObject<Manufacturer[]> = useRef(
    useContext(ManufacturerContext)
  );
  let productTypes: MutableRefObject<ProductType[]> = useRef(
    useContext(ProductTypeContext)
  );

  const classes = useStylesAdmin();
  const [productType, setProductType] = useState<number>(1);
  const [manufacturer, setManufacturer] = useState<number>(1);
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null | "">(null);
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  function IsThereCharacteristic(name: string) {
    return characteristics.find((x) => x.name === name);
  }

  const onAddCharacteristics = (c: Characteristics) => {
    if (!IsThereCharacteristic(c.name)) {
      let characteristics2: Characteristics[] = [...characteristics];
      characteristics2.push(c);
      setCharacteristics(characteristics2);
    } else {
      alert("Vec postoji karakteristika sa nazivom " + c.name);
    }
  };

  const handleRemoveCharacteristics = (name: string) => {
    let characteristic: any = characteristics.find((c) => c.name === name);
    let characteristics2: Characteristics[] = [...characteristics];
    characteristics2.splice(characteristics2.indexOf(characteristic), 1);
    setCharacteristics(characteristics2);
  };

  const handleClear = () => {
    setName("");
    setPrice("");
    setProductType(1);
    setManufacturer(1);
    setCharacteristics([]);
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

  const handleAddProduct = (e: any) => {
    e.preventDefault();
    if (
      productType !== null &&
      manufacturer !== null &&
      characteristics &&
      name !== null &&
      name !== "" &&
      price !== null &&
      price !== ""
    ) {
      let product: Product = new Product(
        name,
        price,
        characteristics,
        manufacturer,
        productType
      );
      OnAddProduct(product);

      //   if (props.productToEdit === null) OnAddProduct(product);
      //   else {
      //     product.id = props.productToEdit.id;
      //     OnUpdateProduct(product);
      //   }
      // }
    }
  };

  const OnAddProduct = async (product: Product) => {
    try {
      const res = await AddProduct(product);
      console.log(res);
      if (res.error) {
        handleClickAlertError();
      } else {
        handleClickAlert();
        handleClear();
      }
    } catch {
      console.log("error in adding product");
      handleClickAlertError();
    }
  };

  // const OnUpdateProduct = (product: Product) => {
  //   handleClickAlert();
  //   setTimeout(() => {
  //     try {
  //       UpdateProduct(product);
  //       handleClear();
  //     } catch {
  //       console.log("error in updating product");
  //       handleClickAlertError();
  //     }
  //   }, 500);
  // };

  const getManufacturers = async () => {
    const newManufacturers: Manufacturer[] = await GetAllManufacturers();
    manufacturers.current = newManufacturers;
  };

  const getProductTypes = async () => {
    const newProductTypes: ProductType[] = await GetAllProductTypes();
    productTypes.current = newProductTypes;
  };

  useEffect(() => {
    getManufacturers();
    console.log("Manufacturers");
  }, []);

  useEffect(() => {
    getProductTypes();
    console.log("Product Types");
  }, [productTypes.current]);

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
                onChange={(e) => setProductType(Number(e.target.value))}
                variant="outlined"
                style={{ width: "15vw" }}
              >
                {productTypes?.current?.map((option: ProductType) => (
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
                {manufacturers?.current?.map((option: Manufacturer) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={6} className={classes.gridItem}>
            <Grid item className={classes.label}>
              <label>Naziv proizvoda: </label>
            </Grid>
            <Grid item className={classes.gridItem}>
              <TextField
                id="outlined-basic-name"
                label="Unesite naziv"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Grid item className={classes.label}>
              <label>Cena proizvoda: </label>
            </Grid>
            <Grid item className={classes.gridItem}>
              <TextField
                id="outlined-basic-price"
                label="Unesite cenu"
                type="number"
                variant="outlined"
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
              />
            </Grid>
          </Grid>
        </Grid>
        <ManageCharacteristics
          onAdd={onAddCharacteristics}
          characteristics={characteristics}
        />
        <Grid item xs={12} className={classes.gridCOntainerCharacteristics}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="customized table" id="mytable">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <StyledTableCell align="center">Naziv</StyledTableCell>
                  <StyledTableCell align="center">Vrednost</StyledTableCell>
                  <StyledTableCell align="center">
                    Ukloni stavku
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {characteristics.map((row) => {
                  return (
                    <StyledTableRow hover key={row.id} className={classes.row}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.value}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleRemoveCharacteristics(row.name)}
                          startIcon={<DeleteIcon />}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridItem}>
            <Button
              id="deleteProduct"
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              className={classes.finalButtons}
              onClick={handleClear}
            >
              Odustani
            </Button>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              id="addProduct"
              variant="contained"
              startIcon={<SaveIcon />}
              className={classes.finalButtons}
              onClick={handleAddProduct}
              style={{ backgroundColor: "#222431", color: "white" }}
            >
              Sacuvaj proizvod
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno kreiran proizvod!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          Server trenutno nije u funkciji.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ManageProducts;
