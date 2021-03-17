import { resolve } from "path";
import defu from "defu";
import { Module } from "@nuxt/types";

export interface NuxtVillusOptions {
  httpEndpoint?: string;
  wsEndpoint?: string;
}

const nuxtVillusModule: Module<NuxtVillusOptions> = function (moduleOptions) {
  const { nuxt } = this;

  const defaults: NuxtVillusOptions = {
    httpEndpoint: process.env.VILLUS_HTTP_ENDPOINT,
    wsEndpoint: process.env.VILLUS_WS_ENDPOINT,
  };

  const options = defu(this.options.villus || {}, moduleOptions, defaults);

  this.addPlugin({
    src: resolve(__dirname, "../src/plugin.template.js"),
    fileName: "nuxt-villus/plugin.js",
    options: moduleOptions,
  });
};
(nuxtVillusModule as any).meta = require("../package.json");

export default nuxtVillusModule;
