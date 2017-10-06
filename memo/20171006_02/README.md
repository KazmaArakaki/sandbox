### 投稿の取得

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ vim index.php
```

```
<?php
  $query = new WP_Query("author_name=Kazma Arakaki");
?>

<?php foreach($query -> posts as $post): ?>

<dl>
  <dt>title</dt>
  <dd><?php echo htmlspecialchars($post -> post_title, ENT_QUOTES); ?></dd>
  <dt>date</dt>
  <dd><?php echo htmlspecialchars(get_the_date("Y.m.d D", $post -> ID), ENT_QUOTES); ?></dd>
  <dt>content</td>
  <dd><?php echo htmlspecialchars($post -> post_content); ?></dd>
</dl>

<?php endforeach; ?>
```
