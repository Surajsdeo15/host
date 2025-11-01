const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: process.env.REACT_APP_MODULE_FEDERATION_NAME || 'host',
          remotes: {
            remote: `remote@${process.env.REACT_APP_REMOTE_ENTRY_URL || 'http://localhost:3001/remoteEntry.js'}`,
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            'react-router-dom': {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
          },
        })
      );
      
      // Ensure output is set correctly
      if (!webpackConfig.output) {
        webpackConfig.output = {};
      }
      
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      port: Number(process.env.PORT) || 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    };
  },
};

