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

// Keep focus in the input command field.
document.querySelector('body').addEventListener('keydown', (evt) => {
  evt = evt || event;
  if (evt.keyCode === 9 /* Tab key */) {
    event.preventDefault();
    document.querySelector('input.command').focus();
  }
});
