### 関数ファイルの作成

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ vim functions.php
```

```
<?php

function print_title($post) {
  echo htmlspecialchars(
      $post -> post_title,
      ENT_QUOTES
  );
}

function print_content($post) {
  echo htmlspecialchars(
      $post -> post_content,
      ENT_QUOTES
  );
}

function print_date($post) {
  echo htmlspecialchars(
      get_the_date("Y.m.d D", $post -> ID),
      ENT_QUOTES
  );
}

function print_permalink($post) {
  echo get_permalink($post -> ID);
}

?>
```

```
$ vim index.php
```

```
<?php
  $query = new WP_Query("author_name=Kazma Arakaki");
?>

<?php foreach($query -> posts as $post): ?>

<dl>
  <dt>title</dt>
  <dd><?php print_title($post); ?></dd>
  <dt>date</dt>
  <dd><?php print_date($post); ?></dd>
  <dt>content</td>
  <dd><?php print_content($post); ?></dd>
  <dt>permalink</dt>
  <dd><?php print_permalink($post); ?></dd>
</dl>

<?php endforeach; ?>
```
