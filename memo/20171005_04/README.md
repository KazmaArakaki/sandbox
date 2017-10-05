### php7, php-fpmのインストール

* パッケージのインストール

```
$ sudo yum install epel-release
$ sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
$ sudo yum install --enablerepo=remi,remi-php70 php php-fpm
```

* nginxで使用するための設定

```
$ sudo cp /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf.org
$ sudo vi /etc/php-fpm.d/www.conf
```

```
; RPM: apache user chosen to provide access to the same directories as httpd
user = nginx
; RPM: Keep a group allowed to write in log dir.
group = nginx
```

* php-fpmの起動
* php-fpmの起動確認

```
$ sudo systemctl start php-fpm
$ sudo systemctl status php-fpm
```
