import { Plugin } from "@nuxt/types";
import { createClient, cache, dedup, fetch } from "villus";
import $fetch from "cross-fetch";

// Get options from template without triggering ESLint
const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`);

const villusPlugin: Plugin = (context, inject) => {
  // Default Villus plugins
  const plugins = [
    cache(),
    dedup(),
    fetch({
      fetch: $fetch,
    }),
  ];

  if (!options.httpEndpoint) {
    throw new Error("GraphQL HTTP endpoint missing.");
  }

  // Create Villus client
  const villus = createClient({
    url: options.httpEndpoint,
    use: plugins,
  });

  // Inject Villus client
  inject("villus", villus);
};

export default villusPlugin;
