export interface CommandResult {
  output: string;
  navigate?: string;
  clear?: boolean;
}

interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandResult;
}

// Virtual filesystem structure
const filesystem: Record<string, string[]> = {
  '~': ['projects/', 'photos/', 'blog/', 'about.md', 'README.md'],
  '~/projects': [
    'coppermind/',
    'reprisedb/',
    'railyard/',
    'nenya/',
    'touchstone/',
    'chip8-emulator/',
  ],
  '~/photos': [],
  '~/blog': [
    'a-brave-neo-world/',
    '1-billion-row-challenge-part-2/',
    '1-billion-row-challenge-part-1/',
    'plausible-analytics/',
    'hello-gatsby/',
  ],
};

// Path to URL mapping
const pathToUrl: Record<string, string> = {
  '~': '/',
  '~/projects': '/',
  '~/photos': '/photos',
  '~/blog': '/blog',
  '~/about.md': '/about',
};

// Current working directory (managed by the component)
let cwd = '~/projects';

export function getCurrentPath(): string {
  return cwd;
}

export function setCurrentPath(path: string): void {
  cwd = path;
}

function resolvePath(path: string): string {
  if (path === '~' || path === '/') return '~';
  if (path.startsWith('~/')) return path;
  if (path.startsWith('/')) return '~' + path;
  if (path === '..') {
    const parts = cwd.split('/');
    parts.pop();
    return parts.length === 0 ? '~' : parts.join('/');
  }
  if (path === '.') return cwd;
  return `${cwd}/${path}`.replace(/\/+/g, '/');
}

const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    execute: () => ({
      output: `Available commands:
  ls              List directory contents
  cd <path>       Change directory
  cat <file>      View file contents
  open <item>     Open project/post
  clear           Clear terminal
  whoami          Show about info
  help            Show this message

Navigation:
  j/k or ↓/↑      Move selection
  Enter           Open selected item
  g               Go to GitHub (on projects)
  ?               Toggle help overlay`,
    }),
  },
  {
    name: 'ls',
    description: 'List directory contents',
    execute: () => {
      const contents = filesystem[cwd];
      if (!contents) {
        return { output: `ls: cannot access '${cwd}': No such directory` };
      }
      if (contents.length === 0) {
        return { output: '(empty directory)' };
      }
      return { output: contents.join('  ') };
    },
  },
  {
    name: 'cd',
    description: 'Change directory',
    execute: (args) => {
      const target = args[0] || '~';
      const newPath = resolvePath(target.replace(/\/$/, ''));

      // Check if path exists
      if (!filesystem[newPath] && !pathToUrl[newPath]) {
        return { output: `cd: no such directory: ${target}` };
      }

      cwd = newPath;
      const url = pathToUrl[newPath];
      if (url) {
        return { output: '', navigate: url };
      }
      return { output: '' };
    },
  },
  {
    name: 'cat',
    description: 'View file contents',
    execute: (args) => {
      const file = args[0];
      if (!file) {
        return { output: 'cat: missing file operand' };
      }

      const fullPath = resolvePath(file);

      if (fullPath === '~/about.md' || file === 'about.md') {
        return { output: '', navigate: '/about' };
      }

      if (fullPath === '~/README.md' || file === 'README.md') {
        return {
          output: `# Error Signal

Personal portfolio and blog of Matthew Emerson.

Visit github.com/emersonmde for more.`,
        };
      }

      return { output: `cat: ${file}: No such file` };
    },
  },
  {
    name: 'open',
    description: 'Open project, photo, or post',
    execute: (args) => {
      const item = args[0];
      if (!item) {
        return { output: 'open: missing operand' };
      }

      // Check projects
      const projects = [
        'coppermind',
        'reprisedb',
        'railyard',
        'nenya',
        'touchstone',
        'chip8-emulator',
      ];
      if (projects.includes(item.replace(/\/$/, ''))) {
        return {
          output: `Opening ${item} on GitHub...`,
          navigate: `https://github.com/emersonmde/${item.replace(/\/$/, '')}`,
        };
      }

      // Check blog posts
      const posts = filesystem['~/blog'];
      if (posts.includes(item) || posts.includes(item + '/')) {
        return { output: '', navigate: `/blog/${item.replace(/\/$/, '')}/` };
      }

      return { output: `open: cannot open '${item}': No such item` };
    },
  },
  {
    name: 'clear',
    description: 'Clear terminal output',
    execute: () => ({ output: '', clear: true }),
  },
  {
    name: 'whoami',
    description: 'Show about info',
    execute: () => ({
      output: `Matthew Emerson
Systems Engineer @ Amazon
github.com/emersonmde`,
      navigate: '/about',
    }),
  },
  // Easter eggs
  {
    name: 'sudo',
    description: '',
    execute: () => ({ output: 'Nice try.' }),
  },
  {
    name: 'rm',
    description: '',
    execute: (args) => {
      if (args.includes('-rf') && (args.includes('/') || args.includes('~'))) {
        return {
          output: `
    *  *  *
   * ** ** *
  *   ****   *
 *    **    *
 *    **    *
  *        *
   *      *
    *    *
     *  *
      **

Just kidding. Your files are safe.`,
        };
      }
      return { output: 'rm: refusing to remove without confirmation' };
    },
  },
  {
    name: 'vim',
    description: '',
    execute: () => ({
      output: "Ah, I see you're a person of culture.",
    }),
  },
  {
    name: 'nvim',
    description: '',
    execute: () => ({
      output: 'BTW, I use Neovim.',
    }),
  },
  {
    name: 'emacs',
    description: '',
    execute: () => ({
      output: 'I appreciate the gesture, but no thank you.',
    }),
  },
  {
    name: 'exit',
    description: '',
    execute: () => ({
      output: 'There is no escape.',
      navigate: 'https://github.com/emersonmde',
    }),
  },
  {
    name: 'sl',
    description: '',
    execute: () => ({
      output: `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/`,
    }),
  },
  {
    name: 'cowsay',
    description: '',
    execute: (args) => {
      const message = args.join(' ') || 'moo';
      const line = '_'.repeat(message.length + 2);
      return {
        output: `
 ${line}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
      };
    },
  },
];

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = commands.find((c) => c.name === cmdName);
  if (!command) {
    return { output: `command not found: ${cmdName}` };
  }

  return command.execute(args);
}

export function getCompletions(partial: string): string[] {
  const parts = partial.split(/\s+/);

  // If just the command, complete command names
  if (parts.length === 1) {
    return commands
      .filter((c) => c.name.startsWith(partial) && c.description)
      .map((c) => c.name);
  }

  // If completing a path argument
  const cmdName = parts[0].toLowerCase();
  const pathArg = parts[parts.length - 1];

  if (['cd', 'cat', 'open'].includes(cmdName)) {
    const contents = filesystem[cwd] || [];
    return contents.filter((item) => item.startsWith(pathArg));
  }

  return [];
}
