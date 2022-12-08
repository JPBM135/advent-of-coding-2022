# 🌟 My answers for the Advent of Code 2022 🌟

> This repository contains my answers for the [Advent of Code 2022](https://adventofcode.com/2022).

To use this repository, you need to have [Node.js](https://nodejs.org/en/) installed since it uses [TypeScript](https://www.typescriptlang.org/) and JavaScript as the main programming languages.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

To run the code for a specific day, run the following command:

```bash
npm run day <day>

# Example

npm run day 01
```

To run all days, run the following command:

```bash
npm run all
```

## Nerd stuff:

### Tech stack:

- [`Eslint`](https://eslint.org/) for linting (extends the [neon config](https://github.com/iCrawl/eslint-config-neon))
- [`Prettier`](https://prettier.io/) for code formatting
- [`TypeScript`](https://www.typescriptlang.org/) for type safety and better code
- [`Swc`](https://swc.rs/) for compiling TypeScript to JavaScript (faster than tsc)

### The [Build Script](./util/build.js):

The build script allows you to run the code for a specific day. It does the following:

- Checks if the day is valid
- Builds the TypeScript code for the day
- Runs the JavaScript code for the day providing timing information

It also has a `--all` flag which allows you to run all days (accessible through the `npm run all` command).

- It builds all TypeScript code for all days
- Runs all JavaScript code for all days!
