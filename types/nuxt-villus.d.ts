import Vue from "vue";
import { Client } from "villus";

declare module "vue/types/vue" {
  interface Vue {
    $villus: Client;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $villus: Client;
  }
  interface Context {
    $villus: Client;
  }
  // Nuxt 2.14+
  interface NuxtConfig {
    villus?: NuxtVillusOptions;
  }
  // Nuxt 2.9 - 2.13
  interface Configuration {
    villus?: NuxtVillusOptions;
  }
}
