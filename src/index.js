import React from 'react';
import {render} from 'react-dom';
import App from './App';

if (console && console.log) {
  console.log('Alright! I am impressed by your extra-hacking skills! Call me maybe...');
}

render(
  <App />,
  document.getElementById('root')
);

