### マークダウン対応

```
$ cd /var/www/wordpress/wp-content/themes/mytheme
$ vim dl-libs.sh
```

```
mkdir lib/
mkdir lib/markdown/
mkdir lib/markdown/block/
mkdir lib/markdown/inline/
wget -P lib/markdown/ https://raw.githubusercontent.com/cebe/markdown/master/Parser.php
wget -P lib/markdown/ https://raw.githubusercontent.com/cebe/markdown/master/Markdown.php
wget -P lib/markdown/ https://raw.githubusercontent.com/cebe/markdown/master/GithubMarkdown.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/CodeTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/FencedCodeTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/HeadlineTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/HtmlTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/ListTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/QuoteTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/RuleTrait.php
wget -P lib/markdown/block/ https://raw.githubusercontent.com/cebe/markdown/master/block/TableTrait.php
wget -P lib/markdown/inline/ https://raw.githubusercontent.com/cebe/markdown/master/inline/CodeTrait.php
wget -P lib/markdown/inline/ https://raw.githubusercontent.com/cebe/markdown/master/inline/EmphStrongTrait.php
wget -P lib/markdown/inline/ https://raw.githubusercontent.com/cebe/markdown/master/inline/LinkTrait.php
wget -P lib/markdown/inline/ https://raw.githubusercontent.com/cebe/markdown/master/inline/StrikeoutTrait.php
wget -P lib/markdown/inline/ https://raw.githubusercontent.com/cebe/markdown/master/inline/UrlLinkTrait.php
```

```
$ sh dl-libs.sh
$ rm dl-libs.sh
$ vim functions.php
```

```
<?php

include "lib/markdown/block/CodeTrait.php";
include "lib/markdown/block/FencedCodeTrait.php";
include "lib/markdown/block/HeadlineTrait.php";
include "lib/markdown/block/HtmlTrait.php";
include "lib/markdown/block/ListTrait.php";
include "lib/markdown/block/QuoteTrait.php";
include "lib/markdown/block/RuleTrait.php";
include "lib/markdown/block/TableTrait.php";
include "lib/markdown/inline/CodeTrait.php";
include "lib/markdown/inline/EmphStrongTrait.php";
include "lib/markdown/inline/LinkTrait.php";
include "lib/markdown/inline/StrikeoutTrait.php";
include "lib/markdown/inline/UrlLinkTrait.php";
include "lib/markdown/Parser.php";
include "lib/markdown/Markdown.php";
include "lib/markdown/GithubMarkdown.php";

function print_title($post) {
  echo htmlspecialchars(
      $post -> post_title,
      ENT_QUOTES
  );
}

function print_content($post) {
  $parser = new \cebe\markdown\GithubMarkdown();

  echo $parser -> parse($post -> post_content);
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
<?php if(is_home()): ?>
  <h1>Index</h1>

  <?php $query = new WP_Query("author_name=Kazma Arakaki"); ?>

  <?php foreach($query -> posts as $post): ?>
    <p><?php print_title($post); ?></p>
  <?php endforeach; ?>
<?php else: ?>
  <h1>Post</h1>

  <p><?php print_title($post); ?></p>

  <div><?php print_content($post); ?></div>
<?php endif; ?>
```
