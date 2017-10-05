### MariaDBのインストール

* MariaDBのインストール

```
$ sudo yum install mariadb mariadb-server
```

* MariaDBの起動
* MariaDBの起動確認

```
$ sudo systemctl start mariadb
$ sudo systemctl restart mariadb
```

* MariaDBの初期化

```
$ sudo mysql_secure_installation
```

```
> Enter current password for root (enter for none): [そのままEnter]
> Set root password? [Y/n] n
> Remove anonymous users? [Y/n] y
> Disallow root login remotely? [Y/n] y
> Remove test database and access to it? [Y/n] y
> Reload privilege tables now? [Y/n] y
```
