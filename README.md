# Environment Setup

Install the following tools on your computer:
* [Node.js 14.x.x](https://nodejs.org/)
* npm (will be installed with Node.js)
* [Git](https://git-scm.com/downloads)
* IDE ([Visual Studio Code](https://code.visualstudio.com/) recommended)

If you installed [VS Code](https://code.visualstudio.com/), the following extensions are recommended:
* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
* [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

Also, do the following steps if you installed [VS Code](https://code.visualstudio.com/):
1. Open VS Code
1. Press `ctrl+shift+P` hotkey
1. Find `Preferences: Open Settings (JSON)`
1. Add
```
...
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
],
"files.eol": "\n"
...
```

If you use another IDE, please find a way to set it up in the similar way.

# Project Installation

### Backend
1. Create a copy of `.env.example` file and name it `.env`.
1. Update values in `.env` file with your local settings, if necessary.
1. Run the following commands:
```
npm install
npm start
```
### Frontend
1. Create a copy of `.env.example` file and name it `.env`.
1. Update values in `.env` file with your local settings, if necessary.
1. Run the following commands:
```
npm install
npm start
```
