import React, {Component} from 'react';
import ShellPrompt from './ShellPrompt';
import ShellHistoryStore from './ShellHistoryStore';
import CommandRegistry from './CommandRegistry';

let historyInstance = ShellHistoryStore.sharedInstance();

export default class Shell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      history: historyInstance.history
    };
  }

  componentDidMount() {
    historyInstance.addChangeListener(this.syncStore.bind(this));

    this.focus();
  }

  componentWillUnmount() {
    historyInstance.removeChangeListener(this.syncStore.bind(this));
  }

  syncStore() {
    this.setState({
      history: historyInstance.history
    }, () => {
      this.refs.commandField.scrollIntoView(true);
    });
  }

  focus() {
    this.refs.commandField.focus();
  }

  addCommandToHistory(command) {
    command = command.trim();
    historyInstance.push(command);
  }

  handleCommand(event) {
    if (event.key === 'Enter') {
      let command = this.refs.commandField.value.trim();
      this.addCommandToHistory(command);

      this.refs.commandField.value = '';
    }
  }

  render() {
    return (
      <div>
        {
          this.state.history.map((command, index) => {
            return (
              <div key={ index }>
                <ShellPrompt />
                <span className="command">{ command }</span>
                <p style={{ padding: 0, margin: '5px 0' }}
                   dangerouslySetInnerHTML={{
                    __html: CommandRegistry.sharedInstance().resolve(command).output
                  }}>
                </p>
              </div>
            )
          })
        }
        <ShellPrompt />
        <input type="text" autofocus ref="commandField"
                className="command"
                onBlur={ this.focus.bind(this) }
                onKeyPress={ this.handleCommand.bind(this) } />
      </div>
    );
  }
}
