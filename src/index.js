import { Main } from './Main.elm';

const app = Main.embed(document.getElementById('root'));

app.ports.scrollIntoView.subscribe(elementId => {
  setTimeout(() => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView(false);
    }
  }, 50);
});

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
