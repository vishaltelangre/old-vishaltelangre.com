let _sharedInstance = null;

export default class ShellHistoryStore {

  constructor() {
    this.history = [];
    this.changeListeners = [];
  }

  push(command) {
    this.history.push(command);
    this.triggerChange();
  }

  clear() {
    this.history = [];
    setTimeout(() => {
      this.triggerChange();
    }, 0);
  }

  addChangeListener(handler) {
    this.changeListeners.push(handler);
  }

  removeChangeListener(handler) {
    this.changeListeners = this.changeListeners.filter(l => handler !== l);
  }

  triggerChange() {
    this.changeListeners.forEach(handler => handler());
  }

  static sharedInstance() {
    if (!_sharedInstance) {
      _sharedInstance = new ShellHistoryStore();
    }

    return _sharedInstance;
  }

}
