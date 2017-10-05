### WordPressのインストール

* 必要なパッケージのインストール

```
$ sudo yum install --enablerepo=remi,remi-php70 wget unzip php-common php-mysql php-gd php-xml php-mbstring php-mcrypt php-xmlrpc
```

* WordPressのダウンロード

```
$ cd /home/www/
$ sudo wget http://wordpress.org/latest.tar.gz
$ sudo tar -zxvf latest.tar.gz
$ sudo rm latest.tar.gz
```

* MariaDBの設定

```
$ mysql -uroot -p
```

```
> CREATE DATABASE wordpress;
> GRANT ALL PRIVILEGES ON wordpress.* to wp_user@localhost IDENTIFIED BY '[MariaDB用パスワード]';
> FLUSH PRIVILEGES;
```

* WordPressの設定

```
$ sudo cp wordpress/wp-config-sample.php wordpress/wp-config.php
$ sudo vim wordpress/wp-config.php
```

```
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wp_user');

/** MySQL database password */
define('DB_PASSWORD', 'twi1ight');
```

* Nginxの設定

```
$ sudo vim /etc/nginx/conf.d/default.conf
```
