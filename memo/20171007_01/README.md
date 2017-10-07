### Nodejsのインストール

* リポジトリの追加

```
$ curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -
```

```
## Run `yum install -y nodejs` (as root) to install Node.js 8.x and npm.
## You may also need development tools to build native addons:
##   `yum install -y gcc-c++ make`
```

* インストール

```
$ sudo yum install gcc-c++ make
$ sudo yum install nodejs
```

* バージョン確認

```
$ node -v
```
