### 記事一覧画面と記事表示画面を切り分ける２

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ cp index.php index_home.php
$ cp index.php index_post.php
$ vim index.php
```

```
<!DOCTYPE html>
<html>
<?php
  if(is_home()) {
    get_template_part("index_home");
  }
  else {
    get_template_part("index_post");
  }
?>
</html>
```

```
$ vim index_home.php
```

```
<h1>Index</h1>

<?php $query = new WP_Query("author_name=Kazma Arakaki"); ?>

<?php foreach($query -> posts as $post): ?>
  <p><?php print_title($post); ?></p>
<?php endforeach; ?>
```

```
$ vim index_post.php
```

```
<h1>Post</h1>

<p><?php print_title($post); ?></p>

<div><?php print_content($post); ?></div>
```
