import './main.css';
import { Main } from './Main.elm';

Main.embed(document.getElementById('root'));

// Keep focus in the prompt on pressing Tab key
document.querySelector('body').addEventListener('keydown', (evt) => {
  evt = evt || event;
  if (evt.keyCode === 9 /* Tab key */) {
    evt.preventDefault();
    document.querySelector('#prompt').focus();
  }
});

// Keep focus in the prompt on clicking anywhere on the page
document.querySelector('*').addEventListener('click', (event) => {
  document.querySelector('#prompt').focus();
});
