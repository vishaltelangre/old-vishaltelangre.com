let _sharedInstance = null;

export default class ShellHistoryStore {

  constructor() {
    this.history = [];
    this.changeListeners = [];
  }

  push(inputCommand) {
    this.history.forEach(command => {
      command.current = false;
    });

    this.history.push(inputCommand);

    this.triggerChange();
  }

  seekPrev() {
    let prevIndex = this.history.length - 1;

    if (this.current()) {
      let currentIndex = this.history.findIndex(command => command.current);
      prevIndex = currentIndex - 1;
    }

    prevIndex = Math.max(0, prevIndex);

    let prevCommand = this.history[prevIndex];

    if (prevCommand) {
      this.history.forEach(command => {
        command.current = false;
      });
      prevCommand.current = true;
    }

    this.triggerChange();
  }

  seekNext() {
    let nextIndex = this.history.length;

    if (this.current()) {
      let currentIndex = this.history.findIndex(command => command.current);
      nextIndex = currentIndex + 1;
    }

    nextIndex = Math.min(this.history.length, nextIndex);

    let nextCommand = this.history[nextIndex];

    if (nextCommand) {
      this.history.forEach(command => {
        command.current = false;
      });
      nextCommand.current = true;
    }

    this.triggerChange();
  }

  current() {
    return this.history.find(command => command.current);
  }

  clear() {
    this.history = [];

    this.triggerChange();
  }

  addChangeListener(handler) {
    this.changeListeners.push(handler);
  }

  removeChangeListener(handler) {
    this.changeListeners = this.changeListeners.filter(l => handler !== l);
  }

  triggerChange() {
    setTimeout(() => {
      this.changeListeners.forEach(handler => handler());
    }, 0);
  }

  static sharedInstance() {
    if (!_sharedInstance) {
      _sharedInstance = new ShellHistoryStore();
    }

    return _sharedInstance;
  }

}
