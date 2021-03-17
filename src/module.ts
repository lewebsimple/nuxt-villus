import { resolve } from "path";
import { Module } from "@nuxt/types";

export interface NuxtVillusOptions {
  httpEndpoint?: string;
  wsEndpoint?: string;
  enableCompositionApi?: boolean;
}

const nuxtVillusModule: Module<NuxtVillusOptions> = function (moduleOptions) {
  moduleOptions.enableCompositionApi = this.nuxt.options.buildModules.includes("@nuxtjs/composition-api");

  this.addPlugin({
    src: resolve(__dirname, "../dist/plugin.js"),
    fileName: "nuxt-villus/plugin.js",
    options: moduleOptions,
  });
};
(nuxtVillusModule as any).meta = require("../package.json");

export default nuxtVillusModule;
