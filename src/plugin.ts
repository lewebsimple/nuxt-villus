import { Plugin } from "@nuxt/types";
import { createClient } from "villus";

const villusPlugin: Plugin = ({ $config }, inject) => {
  if (!$config.villus.url) {
    return;
  }

  // Create Villus client
  const villus = createClient({
    url: $config.villus.url,
  });

  // Inject Villus client
  inject("villus", villus);
};

export default villusPlugin;
