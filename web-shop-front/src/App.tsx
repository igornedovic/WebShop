import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import { useStyles } from './styles/Style';

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      
    </Container>
  );
}

export default App;
