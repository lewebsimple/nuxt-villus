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
  interface NuxtConfig {
    villus?: NuxtVillusOptions;
  }
}
