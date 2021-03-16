# Nuxt Villus
[![Version](https://img.shields.io/npm/v/nuxt-villus.svg)](https://www.npmjs.com/package/nuxt-villus)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/lewebsimple/nuxt-villus#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/lewebsimple/nuxt-villus/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/lewebsimple/nuxt-villus)](https://github.com/lewebsimple/nuxt-villus/blob/master/LICENSE)

> Villus GraphQL client integration with Nuxt.js

## Features

- Provide Villus client to Nuxt / Vue

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

Install with yarn:

```sh
yarn add nuxt-villus graphql
```

Install with npm:

```bash
npm install nuxt-villus graphql
```

**nuxt.config.js**

```ts
export default {
  modules: ["nuxt-villus"],

  villus: {
    /**
     * GraphQL HTTP endpoint
     */
    httpEndpoint: "https://rickandmortyapi.com/graphql",

    /**
     * GraphQL WS endpoint
     */
    wsEndpoint: "wss://rickandmortyapi.com/graphql",
  },
}
```

## 📝 License

[MIT license](https://github.com/lewebsimple/nuxt-villus/blob/master/LICENSE)
