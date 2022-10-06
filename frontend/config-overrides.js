const webpack = require('webpack');
module.exports = function override(config, env) {
    const fallback = config.resolve.fallback || {
        fs: false,
        net: false,
        './zlib_bindings': false,
        async_hooks: false
    };
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        //"./zlib.bindings": require.resolve("zlib.bindings"),
        "path": require.resolve("path-browserify"),
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}