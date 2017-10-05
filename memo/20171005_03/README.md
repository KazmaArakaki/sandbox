### Nginxのインストール

HTTP/2, ALPN対応のNginxをインストールする。

* 必要なパッケージのインストール

```
$ sudo yum install wget yum-utils rpm-build expat-devel pcre-devel zlib-devel GeoIP-devel
```

* レポジトリファイルの作成

```
$ sudo vim /etc/yum.repos.d/nginx.repo
```

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainlines/centos/7/$basearch/
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

* SRPMのインストール

```
$ sudo yumdownloader --source nginx
$ sudo rpm -ivh --nosignature nginx-1.13.5-1.el7.ngx.src.rpm
```

* アップデートの禁止

```
$ sudo yum-config-manager --disable nginx
$ sudo yum-config-manager --disable nginx-source
```

* OpenSSLの1.0.2をダウンロード・展開

```
$ cd /tmp
$ sudo wget https://www.openssl.org/source/openssl-1.0.2l.tar.gz
$ tar -xzf openssl-1.0.2l.tar.gz
```

.specファイルのカスタマイズ

```
$ cd ~
$ sudo vim rpmbuild/SPECS/nginx.spec
```

```
# 中略

%if 0%{?rhel} == 7
%define _group System Environment/Daemons
%define epoch 1
Epoch: %{epoch}
Requires(pre): shadow-utils
Requires: systemd
#Requires: openssl >= 1.0.1
BuildRequires: systemd
#BuildRequires: openssl-devel >= 1.0.1
BuildRequires: GeoIP-devel #追加
BuildRequires: expat-devel #追加
%endif

# 中略

%define BASE_CONFIGURE_ARGS $(echo "#中略# --with-stream_ssl_preread_module --with-http_geoip_module --add
-module=./nginx-dav-ext-module --with-openssl=/tmp/openssl-1.0.2l")

# 中略

%prep
%setup -q
cp %{SOURCE2} .
sed -e 's|%%DEFAULTSTART%%|2 3 4 5|g' -e 's|%%DEFAULTSTOP%%|0 1 6|g' \
    -e 's|%%PROVIDES%%|nginx|g' < %{SOURCE2} > nginx.init
sed -e 's|%%DEFAULTSTART%%||g' -e 's|%%DEFAULTSTOP%%|0 1 2 3 4 5 6|g' \
    -e 's|%%PROVIDES%%|nginx-debug|g' < %{SOURCE2} > nginx-debug.init
git clone https://github.com/arut/nginx-dav-ext-module.git #追加

%build
./configure %{BASE_CONFIGURE_ARGS} \
    --with-cc-opt="%{WITH_CC_OPT}" \
    --with-ld-opt="%{WITH_LD_OPT}" \
    --with-debug --with-openssl-opt="-fPIC" #追加
make %{?_smp_mflags}
%{__mv} %{bdir}/objs/nginx \
    %{bdir}/objs/nginx-debug
./configure %{BASE_CONFIGURE_ARGS} \
    --with-cc-opt="%{WITH_CC_OPT}" \
    --with-ld-opt="%{WITH_LD_OPT}" --with-openssl-opt="-fPIC" #追加
make %{?_smp_mflags}
```

* ビルド・インストール

```
$ sudo rpmbuild -ba rpmbuild/SPECS/nginx.spec
$ sudo yum localinstall /root/rpmbuild/RPMS/x86_64/nginx-1.13.5-1.el7.ngx.x86_64.rpm
```

* 一時ファイルの削除

```
$ sudo rm -r /tmp/openssl-1.0.2l
```

* nginxの設定

```
$ sudo vim /etc/nginx/conf.d/default.conf
```

* nginx起動
* nginx起動確認

```
$ sudo systemctl start nginx
$ sudo systemctl status nginx
```
