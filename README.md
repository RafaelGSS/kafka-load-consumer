# kafka-load-consumer

NodeJs tool to publish messages on kafka

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install -g kafka-load-consumer
```

## Tests

```sh
npm install
npm test
```

## Usage

Create an `kafka-load.js` at home directory

```sh
kafka-load-consumer --init
```

and run at directory of `kafka-load.js`

```sh
kafka-load-consumer
```

## Dependencies

- [node-rdkafka](https://ghub.io/node-rdkafka): Node.js bindings for librdkafka
- [pino](https://ghub.io/pino): super fast, all natural json logger

## Dev Dependencies

- [eslint](https://ghub.io/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-standard](https://ghub.io/eslint-config-standard): JavaScript Standard Style - ESLint Shareable Config
- [eslint-plugin-import](https://ghub.io/eslint-plugin-import): Import with sanity.
- [eslint-plugin-node](https://ghub.io/eslint-plugin-node): Additional ESLint&#39;s rules for Node.js
- [eslint-plugin-promise](https://ghub.io/eslint-plugin-promise): Enforce best practices for JavaScript promises
- [eslint-plugin-standard](https://ghub.io/eslint-plugin-standard): ESlint Plugin for the Standard Linter

## License

MIT
