import React from 'react';

import store from 'store';
import { Provider } from 'react-redux';
import TaskBoard from 'containers/TaskBoard';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TaskBoard />
    </ThemeProvider>
  </Provider>
);

export default App;
