import React, {Component} from 'react';
import ShellPrompt from './ShellPrompt';
import ShellHistoryStore from './ShellHistoryStore';
import CommandRegistry from './CommandRegistry';

let historyInstance = ShellHistoryStore.sharedInstance();

export default class Shell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      history: historyInstance.history,
      currentCommandName: ''
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
      history: historyInstance.history,
      currentCommandName: historyInstance.current() && historyInstance.current().name
    }, () => {
      this.refs.commandField.scrollIntoView(true);
    });
  }

  focus() {
    // NOTE: setTimeout is required to make it work inside Firefox and Safari.
    setTimeout(() => this.refs.commandField.focus(), 0);
  }

  addCommandToHistory(commandName) {
    commandName = commandName.trim();
    historyInstance.push({ name: commandName });
  }

  onChange(event) {
    this.setState({
      currentCommandName: event.target.value
    });
  }

  handleCommand(event) {
    if (event.key === 'Enter') {
      let command = this.refs.commandField.value.trim();
      this.addCommandToHistory(command);

      this.refs.commandField.value = '';
    }
  }

  handleKeyDown(event) {
    if (event.which === 38 /* Up key */) {
      historyInstance.seekPrev();
    }

    if (event.which === 40 /* Down key */) {
      historyInstance.seekNext();
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
                <span className="command">{ command.name }</span>
                <p style={{ padding: 0, margin: '5px 0' }}
                   dangerouslySetInnerHTML={{
                    __html: CommandRegistry.sharedInstance().resolve(command.name).output
                  }}>
                </p>
              </div>
            )
          })
        }
        <ShellPrompt />
        <input type="text" autofocus ref="commandField"
                className="command"
                value={ this.state.currentCommandName }
                onBlur={ this.focus.bind(this) }
                onChange={ this.onChange.bind(this) }
                onKeyPress={ this.handleCommand.bind(this) }
                onKeyDown={ this.handleKeyDown.bind(this) } />
      </div>
    );
  }
}
