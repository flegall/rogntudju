// babel.config.js
// This is only used for compiling typescript in jest, we use babel typescript as it's a bit faster
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
};
