import ShellHistoryStore from './ShellHistoryStore';

let _sharedInstance = null;

export default class CommandRegistry {

  constructor() {
    this.commands = [];
  }

  register(command) {
    this.commands.push(command);
  }

  resolve(commandName) {
    let downcasedCommandName = commandName.toLowerCase();
    let foundCommand = this.commands.find(command => command.name === downcasedCommandName);

    if (foundCommand) {
      if (typeof foundCommand.handler === 'function') {
        foundCommand.output = foundCommand.handler();
      }
      return foundCommand;
    } else {
      return {
        name: commandName,
        error: true,
        output: `sh: command not found - ${commandName}
                 <br/>
                 Try \`help\` for available commands.`
      };
    }
  }

  static sharedInstance() {
    if (!_sharedInstance) {
      _sharedInstance = new CommandRegistry();
    }

    return _sharedInstance;
  }

}

let registry = CommandRegistry.sharedInstance();

registry.register({
  name: 'about',
  description: 'A bit about me',
  output: 'Umm... You better ask something else.'
});

registry.register({
  name: 'work',
  description: 'Where do I work?',
  output: `I work remotely at
           <a href="http://bigbinary.com" target="_blank">BigBinary</a>.
           <br/><br/>
           Previously, I worked at
           <a href="http://yogurtlabs.co" target="_blank">Yogurt Labs</a>, and
           <a href="http://weboniselab.com" target="_blank">Webonise Lab</a>.
           <br/><br/>
           Maybe you don't know this; during academics, I had created a popular
           college search engine for colleges in Maharashtra.
           It was aimed to suggest colleges based on student's marks,
           cutoff marks, and other various criteria.
          Head on to <a href="http://2zerozero.com/">2zerozero.com</a>
          to see it live.
          It is a past 2012 college project, and still alive,
          but not actively maintained!`
});

registry.register({
  name: 'github',
  description: 'My GitHub',
  output: `You can find my open source work
           <a href="http://github.com/vishaltelangre" target="_blank">here</a>.`
});

registry.register({
  name: 'skills',
  description: 'I am good at',
  output: `I am a computer programmer.
           Primarily I write programs in Ruby, JavaScript.
           Hack in Go on weekends.`
});

registry.register({
  name: 'blog',
  description: 'Link to my blog',
  output: `I occasionally write on
           <a href="http://blog.vishaltelangre.com" target="_blank">
             Poor Programmer's Blog</a>.`
});

registry.register({
  name: 'location',
  description: 'Where do I stay?',
  output: `I am based in Aurangabad, Maharashtra.`
});

registry.register({
  name: 'speak',
  description: 'Human languages I can speak',
  output: `I speak Marathi, Hindi, and English.`
});

registry.register({
  name: 'contact',
  description: 'Contact info',
  output: `E-mail (GTalk): the@vishaltelangre.com
           <br/>
           Mobile: +91-8087729277
           <br/>
           Skype: vishaltelangre`
});

registry.register({
  name: 'elsewhere',
  description: 'Other places I can be found',
  output: `<a href="http://twitter.com/suruwat">Twitter</a>,
            <a href="http://in.linkedin.com/in/vishaltelangre/" target="_blank">LinkedIn</a>,
            <a href="http://stackoverflow.com/users/1052356/vishal" target="_blank">StackOverflow</a>,
            <a href="http://facebook.com/vishaltelangre" target="_blank">Facebook</a>,
            <a href="http://500px.com/vishaltelangre" target="_blank">500px</a>,
            <a href="https://plus.google.com/u/0/117409082821975320389" target="_blank">Google+</a>,
            <a href="http://www.imdb.com/user/ur25704938/" target="_blank">IMDb</a>.`
});

registry.register({
  name: 'source',
  description: 'View source of this page',
  output: `Head on to
           <a href="https://github.com/vishaltelangre/vishaltelangre.com" target="_blank">
            this repository.
           </a>`
});

registry.register({
  name: 'clear',
  description: 'Clear this mess',
  handler: () => {
    ShellHistoryStore.sharedInstance().clear();
    return '';
  }
});

registry.register({
  name: 'help',
  description: 'See these list of commands again',
  handler: () => {
    return CommandRegistry.sharedInstance().commands.map(({ name, description }) => {
      return `<span style="min-width: 120px; display: inline-block;">${name}</span>
              ${description}<br/>`;
    }).join('');
  }
});
