import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <Switch>
      <AppRoute path="/" />
    </Switch>
  );
}

export default App;
