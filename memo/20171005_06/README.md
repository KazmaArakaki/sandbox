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

```
server {
  listen 80;
  server_name localhost_http;
  
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  location / {
    alias /var/www/wordpress/;
    index index.php index.html;

    location ~ \.php$ {
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_split_path_info ^(.+\.php)(.*)$;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME /var/www/wordpress$fastcgi_script_name;
      include fastcgi_params;
    }
  }
}
```

### WordPressを/blog/以下で動かす

```
server {
  listen 80;
  server_name localhost_http;
  
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  location /blog/ {
    alias /var/www/wordpress/;
    index index.php index.html;

    location ~ \.php$ {
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_split_path_info ^/blog(.+\.php)(.*)$;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME /var/www/wordpress$fastcgi_script_name;
      include fastcgi_params;
    }
  }
}
```
