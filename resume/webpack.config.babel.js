import path from "path";

export default {
  "entry": {
    "service/resume/bundle": "./projects/resume/index.jsx"
  },
  "output": {
    "path": path.join(__dirname, "public"),
    "filename": "[name].js"
  },
  "resolve": {
    "extensions": ["*", ".js", ".jsx"]
  },
  "module": {
    "loaders": [
      {
        "test": /\.jsx?$/,
        "exclude": /node_modules/,
        "loader": [
          "babel-loader"
        ]
      },
      {
        "test": /\.css$/,
        "loaders": [
          "style-loader", "css-loader?modules"
        ]
      },
      {
        "test": /\.svg/,
        "loaders": [
          "svg-url-loader"
        ]
      }
    ]
  }
}

