module.exports = {
  presets: [
    '@babel/preset-env',
    ["@babel/preset-react", {"runtime": "automatic"}]
  ],
  "plugins": [
    ["@babel/transform-runtime"],
    ["@babel/plugin-syntax-optional-chaining"],
  ]
};
