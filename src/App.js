import React, {Component} from 'react';
import Shell from './Shell';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>
          Welcome! I am Vishal.
          It is a cumbersome job for me to setup a nice homepage.
          So, I have made it bit boring.
        </p>
        <p>
          For more information, enter command `help`
          to list all available commands.
          Type `about` to know a little bit about me.
        </p>

        <Shell />
      </div>
    );
  }
}
