import { Plugin } from "@nuxt/types";
import { createClient, cache, dedup, fetch } from "villus";
import { $fetch } from "ohmyfetch";

const villusPlugin: Plugin = ({ $config }, inject) => {
  // Default Villus plugins
  const plugins = [
    cache(),
    dedup(),
    fetch({
      fetch: $fetch,
    }),
  ];

  if (!$config.villus.httpEndpoint) {
    return;
  }

  // Create Villus client
  const villus = createClient({
    url: $config.villus.httpEndpoint,
    use: plugins,
  });

  // Inject Villus client
  inject("villus", villus);
};

export default villusPlugin;
