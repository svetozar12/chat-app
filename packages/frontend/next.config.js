module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.fallback = {
      fs: false,
    };
    config.resolve.alias = { ...config.resolve.alias, ejs: 'bundle.es.js' };

    return config;
  },
};
