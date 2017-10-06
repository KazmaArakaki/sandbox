### 記事一覧画面と記事表示画面を切り分ける

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ vim index.html
```

```
<?php if(is_home()): ?>
  <h1>Index</h1>

  <?php $query = new WP_Query("author_name=Kazma Arakaki"); ?>

  <?php foreach($query -> posts as $post): ?>
    <p><?php print_title($post); ?></p>
  <?php endforeach; ?>
<?php else: ?>
  <h1>Post</h1>

  <p><?php print_title($post); ?></p>
<?php endif; ?>
```
