import { createClient, cache, dedup, fetch } from "villus";
import { $fetch } from "ohmyfetch";

const options = <%= JSON.stringify(options, null, 2) %>;

const villusPlugin = (context, inject) => {
  // Default Villus plugins
  const plugins = [
    cache(),
    dedup(),
    fetch({
      fetch: $fetch,
    }),
  ];

  if (!options.httpEndpoint) {
    return;
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
