### Nginxのインストール

* レポジトリファイルの作成

```
$ sudo vim /etc/yum.repos.d/nginx.repo
```

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=1
enabled=1
gpgkey=http://nginx.org/keys/nginx_signing.key

[nginx-source]
name=nginx source
baseurl=http://nginx.org/packages/mainline/centos/7/SRPMS/
gpgcheck=1
enabled=0
gpgkey=http://nginx.org/keys/nginx_signing.key
```

* nginxのインストール

```
$ sudo yum install nginx
```

* nginxの起動
* nginxの起動確認

```
$ sudo systemctl start nginx
$ sudo systemctl status nginx
```

* ブラウザで表示確認
