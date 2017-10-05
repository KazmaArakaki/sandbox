### テーマ作成

```
$ cd /var/www/wordpress/wp-content/themes/
$ sudo mkdir mytheme
$ sudo chown nginx:developers mytheme
$ sudo chmod 775 mytheme
$ cd mytheme
$ vim style.css
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
```

```
$ vim index.php
```

```
<h1>Hello, World</h1>
```
