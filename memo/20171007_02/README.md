### Scssトランスパイル環境を作る

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ npm init
$ npm i -S node-sass
$ mkdir scss
$ mkdir scss/style
$ vim scss/style/index.scss
```

```
/*
Theme Name: My Theme
Theme URI: 
Author: Kazma Arakaki
Author URI: 
Description: Theme for private use
Version: 0.1
License: CC BY 1.0
License URI: https://creativecommons.org/licenses/by/1.0/
Text Domain: mytheme
Tags: 

This is my simple theme.
*/

@import "_header";
```

```
$ vim scss/style/_header.scss
```

```
.header {
  .title {
    font-size: 20px;
  }
}
```

```
$ vim package.json
```

```
  "scripts": {
    "build:css": "node_modules/node-sass/bin/node-sass scss/style/index.scss ./style.css"
  },
```

```
$ npm run build:css
```
