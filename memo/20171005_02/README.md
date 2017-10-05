### VMインスタンスへ接続

* https://console.cloud.google.com/compute/instances

### グループの作成（やらなくてもOK）

```
$ sudo groupadd developers
$ sudo visudo
```

```
## Allows people in group wheel to run all commands 
%wheel ALL=(ALL) ALL
%developers ALL=(ALL) ALL
```

### ユーザーの作成（やらなくてもOK）

```
$ sudo useradd -g developers [ユーザー名]
$ sudo passwd [ユーザー名]
```

### ユーザーの変更（やらなくてもOK）

```
$ su [ユーザー名]
```

