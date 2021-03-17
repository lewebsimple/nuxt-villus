import { Plugin } from "@nuxt/types";
import { createClient, cache, dedup, handleSubscriptions } from "villus";
import { batch } from "@villus/batch";
import { multipart } from "@villus/multipart";
import { SubscriptionClient } from "graphql-subscriptions-client";
import fetch from "cross-fetch";

// Get options from template without triggering ESLint
const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`);

const villusPlugin: Plugin = (context, inject) => {
  // Default Villus plugins
  const plugins = [];

  if (!options.httpEndpoint) {
    throw new Error("GraphQL HTTP endpoint missing.");
  }

  if (process.client && options.wsEndpoint) {
    // Subscriptions handling
    const subscriptionClient = new SubscriptionClient(options.wsEndpoint, { reconnect: true });
    const subscriptions = handleSubscriptions((operation) => subscriptionClient.request(operation));
    plugins.push(subscriptions);
  }
  plugins.push(...[multipart(), cache(), dedup(), batch({ fetch })]);

  // Create Villus client
  const villus = createClient({
    url: options.httpEndpoint,
    use: plugins,
  });

  // Inject Villus client
  inject("villus", villus);
};

export default villusPlugin;
