import { Plugin } from "@nuxt/types";
import { createClient, cache, dedup, handleSubscriptions, useClient } from "villus";
import { batch } from "@villus/batch";
import { multipart } from "@villus/multipart";
import { SubscriptionClient } from "graphql-subscriptions-client";
import { onGlobalSetup } from "@nuxtjs/composition-api";
import fetch from "cross-fetch";
import { NuxtVillusOptions } from "./module";

// Get options from template without triggering ESLint
const options: NuxtVillusOptions = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`);

const villusPlugin: Plugin = (context, inject) => {
  function getVillusClientOptions() {
    const plugins = [];
    if (process.client && options.wsEndpoint) {
      const subscriptionClient = new SubscriptionClient(options.wsEndpoint, { reconnect: true });
      const subscriptions = handleSubscriptions((operation) => subscriptionClient.request(operation));
      plugins.push(subscriptions);
    }
    plugins.push(...[multipart(), cache(), dedup(), batch({ fetch })]);
    return {
      url: options.httpEndpoint || "/graphql",
      use: plugins,
    };
  }

  if (options.enableCompositionApi) {
    onGlobalSetup(() => {
      const villus = useClient(getVillusClientOptions());
      inject("villus", villus);
    });
  } else {
    inject("villus", createClient(getVillusClientOptions()));
  }
};

export default villusPlugin;
