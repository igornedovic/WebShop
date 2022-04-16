import React, { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Theme,
  Badge,
  makeStyles,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function NavigationAdmin() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab component={Link} to="pomocna" label="Pomocni elementi" />
        <Tab component={Link} to="proizvodi" label="Dodavanje proizvoda" />
        <Tab component={Link} to="pregledProizvoda" label="Pregled proizvoda" />
        <Tab component={Link} to="porudzbine" label="Porudzbine" />
      </Tabs>
    </Paper>
  );
}

export default NavigationAdmin;
