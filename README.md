# 2025 Development Environment

> A development environment for creating a modern React based web application.

## Framework + Language + Build

React, TypeScript, Vite /w esbuild

## Developer Setup for Windows

- Windows 11 with WSL2
  - [Install Windows Terminal from an Administrator PowerShell prompt](https://github.com/microsoft/terminal?tab=readme-ov-file#via-windows-package-manager-cli-aka-winget) `winget install --id Microsoft.WindowsTerminal -e`
  - [Install WSL2 from an Administrator PowerShell prompt](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command) `wsl --install`
  - Install Cursor [from the _user_ installation package](https://api2.cursor.sh/updates/download/golden/win32-x64-user/cursor/2.2)
  - Open Cursor and install Cursor WSL extension `anysphere.remote-wsl`, click on the "Connect To <>" command on the lower left of the Cursor window and select "Connect to WSL"
  - Install Prettier - Code formatter extension `esbenp.prettier-vscode` (use the legacy version)

- WSL Setup from Ubuntu Bash Shell in Windows Terminal
  - [Install and use latest stable node.js release](https://github.com/nvm-sh/nvm?tab=readme-ov-file#long-term-support) `nvm install --lts && nvm use --lts`
  - [Install the pnmp package manager](https://pnpm.io/installation#using-npm) `npm install -g pnpm@latest-10`
  - Edit the `.bashrc` file to [add a permanent bash alias command](https://pnpm.io/installation#adding-a-permanent-alias-on-posix-systems) `alias pn=pnpm`
  - [Install GitHub CLI](https://github.com/cli/cli/blob/trunk/docs/install_linux.md])
  - [Setup GitHub CLI to authenticate via Windows Credential Manager](https://github.com/cli/cli/discussions/10082#discussioncomment-13104245) Install [GitHub CLI in Windows](https://cli.github.com/), add an export for the GITHUB_TOKEN in the `.bashrc` file `export GITHUB_TOKEN=$(gh.exe auth token)`, open PowerShell and log into GitHub `gh auth login`, reopen Ubuntu and run `gh auth status` to reveal a login with the token. Reboot the computer to get the environment to reset in Cursor. Validate `gh auth status` in Cursor Terminal is also logged into GitHub.

  ```bash
  (type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
  	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
  	&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  	&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  	&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
  	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  	&& sudo apt update \
  	&& sudo apt install gh -y
  ```

- Create new project
  - From a WSL bash shell (Ubuntu in Terminal or bash in Cursor)
  - [Create the project in a WSL folder](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl#:~:text=Note%3A%E2%80%AF%20To,working%20with%20files.) such as `~/code/my-app`
  - Run Create Vite command to start a new project `pnpx create-vite@latest my-app --template react-ts`
  - Initialize the git repository `git init -b main`
  - Require `pnpm` package manager, https://github.com/pnpm/only-allow/issues/33#issuecomment-3094948348
    create the `.npmrc` file and add setting `engine-strict=true`

    ```json
    // .npmrc
    engine-strict=true
    ```

    ```json
    // package.json
    ...
    "engines": {
      "node": ">=24.12.0"
    },
    "devEngines": {
      "packageManager": {
        "name": "pnpm",
        "version": "^10.20.0",
        "onFail": "error"
      }
    },
    ```

  - Add security settings to `pnmp-workspace.yaml`

    ```yaml
    # https://pnpm.io/blog/2025/12/05/newsroom-npm-supply-chain-security

    strictDepBuilds: true

    onlyBuiltDependencies:
      - package-with-necessary-build-scripts

    ignoredBuiltDependencies:
      - package-with-unnecessary-build-scripts

    minimumReleaseAge: 10080

    minimumReleaseAgeExclude:
      - package-with-critical-hotfix@1.2.3

    trustPolicy: no-downgrade

    trustPolicyExclude:
      - package-that-migrated-cicd@1.2.3
    ```

  - Add the necessary packages for the development environment
    - Prettier `pnpm add -D prettier`
    - Vitest `pnpm add -D vitest`
    - lint-staged `pnpm add -D lint-staged`
    - eslint-plugin-react-x, eslint-plugin-react-dom `pnpm add -D eslint-plugin-react-x eslint-plugin-react-dom`, per VITE_README.md

    - Husky `pnpm add -D husky`, init `pnpx husky init`
    - Modify the Husky pre-commit file

    ```yaml
    # .husky\pre-commit
    lint-staged
    pnpm test
    ```

    - Modify the `package.json` file for vitest and lint-staged

    ```json
    // package.json
    "scripts": {
      ...
      "test": "vitest",
      "bench": "vitest bench",
      ...
    },
    ...
    "lint-staged": {
      "*.{js,jsx,ts,tsx}": [
          "eslint --cache --fix"
      ],
      "*.{json,js,ts,jsx,tsx,html}": [
          "prettier --write --ignore-unknown"
      ]
    }


    ```
