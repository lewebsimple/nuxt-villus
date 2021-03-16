import { resolve } from "path";
import defu from "defu";
import { Module } from "@nuxt/types";

export interface NuxtVillusOptions {
  httpEndpoint?: string;
  wsEndpoint?: string;
}

declare module "@nuxt/types" {
  interface NuxtConfig {
    villus?: NuxtVillusOptions;
  } // Nuxt 2.14+
  interface Configuration {
    villus?: NuxtVillusOptions;
  } // Nuxt 2.9 - 2.13
}

const nuxtVillusModule: Module<NuxtVillusOptions> = function (moduleOptions) {
  const { nuxt } = this;

  const defaults: NuxtVillusOptions = {
    httpEndpoint: process.env.VILLUS_HTTP_ENDPOINT,
    wsEndpoint: process.env.VILLUS_WS_ENDPOINT,
  };

  const options = defu(this.options.villus || {}, moduleOptions, defaults);

  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "nuxt-villus.js",
    options: moduleOptions,
  });
};
(nuxtVillusModule as any).meta = require("../package.json");

export default nuxtVillusModule;
