<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_articles_category
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/*****************************************************************************************************************************/

// Titular artículos
$mod_header_tag = htmlspecialchars($params->get('header_tag', 'h3'));
if ($module->showtitle)
{
	switch ($mod_header_tag)
	{
		case 'h1':
		$category_header_tag = 'h2'; $article_header_tag = 'h3'; break;
		case 'h2':
		$category_header_tag = 'h3'; $article_header_tag = 'h4'; break;
		case 'h3':
		$category_header_tag = 'h4'; $article_header_tag = 'h5'; break;
		case 'h4':
		$category_header_tag = 'h5'; $article_header_tag = 'h6'; break;
		case 'h5':
		case 'h6':
		$category_header_tag = 'h6'; $article_header_tag = 'h6'; break;
	}
}
else
{
	$category_header_tag = $mod_header_tag;
}
if (!$grouped)
{
	$article_header_tag = $category_header_tag;
}


/*****************************************************************************************************************************/
?>

<div class="swiper-container">
	
<ul class="<?php echo $moduleclass_sfx; ?> swiper-wrapper">
<?php if ($grouped) : ?>
	<?php foreach ($list as $group_name => $group) : ?>
	<li class="swiper-slide">
		<ul>
			<?php foreach ($group as $item) : ?>
				<li class="<?php 
				
/*****************************************************************************************************************************/

$images = json_decode($item->images);

echo (isset($images->image_intro) and !empty($images->image_intro)) ? ' has-figure' : '';
							
?>">			
<?php

if (isset($images->image_intro) and !empty($images->image_intro)) : ?>

					<div class="image-intro img-cover">
						<?php if ($params->get('link_titles') == 1) : ?><a href="<?php echo $item->link; ?>"><?php endif; ?>
						<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
							<?php if ($images->image_intro_caption):
								echo 'class="caption"'.' title="' .htmlspecialchars($images->image_intro_caption) .'"';
							endif; ?>
							alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" />
						<?php if ($params->get('link_titles') == 1) : ?></a><?php endif; ?>

						<?php /*if ($images->image_intro_caption): ?>
						<span class="caption">
							<?php echo htmlspecialchars($images->image_intro_caption); ?>
						</span>
						<?php endif;*/ ?>
					</div>

<?php endif;

/*****************************************************************************************************************************/ ?>
					
					<<?php echo $article_header_tag; ?> class="title">
						<?php if ($params->get('link_titles') == 1) : ?>
						<a href="<?php echo $item->link; ?>">
							<span><?php echo $item->title; ?></span>
						</a>
						<?php else : ?>
						<?php echo $item->title; ?>
						<?php endif; ?>
					</<?php echo $article_header_tag; ?>>

					<?php if ($item->displayHits) : ?>
					<p class="hits">(<?php echo $item->displayHits; ?>)  </p>
					<?php endif; ?>

					<?php if ($params->get('show_author')) :?>
					<p class="author"><?php echo $item->displayAuthorName; ?></p>
					<?php endif;?>

					<?php if ($item->displayCategoryTitle) :?>
					<p class="category">(<?php echo $item->displayCategoryTitle; ?>)</p>
					<?php endif; ?>

					<?php if ($item->displayDate) : ?>
					<p class="date"><?php echo $item->displayDate; ?></p>
					<?php endif; ?>

					<?php if ($params->get('show_introtext')) :?>
					<div class="item-introtext">
<?php

// Intro galería
// (1º imagen de la galería)
/*****************************************************************************************************************************/
/*
$dir_thu_gal = 'images/item/' . $item->id . '/image-thumbs/';
$thu_img_gal = glob($dir_thu_gal . '*.jpg');
$pri_img_gal = $thu_img_gal[0];

if (isset($pri_img_gal) && !empty($pri_img_gal))
{
	echo '<figure class="article-pre-gallery">';

	if ($params->get('link_titles') == 1)
	{
		echo '<a href="' . $item->link . '">';
	}

	echo '<img src="' . $pri_img_gal . '" />';

	if ($params->get('link_titles') == 1)
	{
		echo '</a>';
	}

	echo '</figure>';
}
*/
/*****************************************************************************************************************************/
?>
						<p><?php
/*****************************************************************************************************************************/

// Contenido
if (isset($item->fulltext) and !empty($item->fulltext))
{
	echo $item->introtext;
}
else
{
	echo $item->displayIntrotext;
}

/*****************************************************************************************************************************/
						?></p>
					</div>
					<?php endif; ?>

					<?php if ($params->get('show_readmore')) :?>
					<a class="readmore" href="<?php echo $item->link; ?>">
					<?php if ($item->params->get('access-view') == false) :
						echo JText::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE');
					elseif ($readmore = $item->alternative_readmore) :
						echo $readmore;
						echo JHtml::_('string.truncate', $item->title, $params->get('readmore_limit'));
							if ($params->get('show_readmore_title', 0) != 0) :
								echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
								endif;
					elseif ($params->get('show_readmore_title', 0) == 0) :
						echo JText::sprintf('MOD_ARTICLES_CATEGORY_READ_MORE_TITLE');
					else :
						echo JText::_('MOD_ARTICLES_CATEGORY_READ_MORE');
						echo JHtml::_('string.truncate', ($item->title), $params->get('readmore_limit'));
					endif; ?>
					</a>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	</li>
	<?php endforeach; ?>
<?php else : ?>
	<?php foreach ($list as $item) : ?>
	<li class="swiper-slide<?php 
		
/*****************************************************************************************************************************/

$images = json_decode($item->images);

echo (isset($images->image_intro) and !empty($images->image_intro)) ? ' has-figure' : '';
					
?>">
<?php

if (isset($images->image_intro) and !empty($images->image_intro)) : ?>

		<div class="image-intro img-cover">
			<?php if ($params->get('link_titles') == 1) : ?><a href="<?php echo $item->link; ?>"><?php endif; ?>
			<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
				<?php if ($images->image_intro_caption):
					echo 'class="caption"'.' title="' .htmlspecialchars($images->image_intro_caption) .'"';
				endif; ?>
				alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" />
			<?php if ($params->get('link_titles') == 1) : ?></a><?php endif; ?>

			<?php /*if ($images->image_intro_caption): ?>
			<span class="caption">
				<?php echo htmlspecialchars($images->image_intro_caption); ?>
			</span>
			<?php endif;*/ ?>
		</div>

<?php endif;

/*****************************************************************************************************************************/ ?>
		
		<<?php echo $article_header_tag; ?> class="title">
			<?php if ($params->get('link_titles') == 1) : ?>
			<a href="<?php echo $item->link; ?>">
				<span><?php echo $item->title; ?></span>
			</a>
			<?php else : ?>
			<?php echo $item->title; ?>
			<?php endif; ?>
		</<?php echo $article_header_tag; ?>>

		<?php if ($item->displayHits) :?>
		<p class="hits">(<?php echo $item->displayHits; ?>)</p>
		<?php endif; ?>

		<?php if ($params->get('show_author')) :?>
		<p class="author">?php echo $item->displayAuthorName; ?></p>
		<?php endif;?>

		<?php if ($item->displayCategoryTitle) :?>
		<p class="category">(<?php echo $item->displayCategoryTitle; ?>)</p>
		<?php endif; ?>

		<?php if ($item->displayDate) : ?>
		<p class="date"><?php echo $item->displayDate; ?></p>
		<?php endif; ?>

		<?php if ($params->get('show_introtext')) :?>
		<div class="item-introtext">
<?php

// Intro galería
// (1º imagen de la galería)
/*****************************************************************************************************************************/
/*
$dir_thu_gal = 'images/item/' . $item->id . '/image-thumbs/';
$thu_img_gal = glob($dir_thu_gal . '*');
$pri_img_gal = $thu_img_gal[0];

if (isset($pri_img_gal) && !empty($pri_img_gal))
{
	echo '<figure class="article-pre-gallery">';

	if ($params->get('link_titles') == 1)
	{
		echo '<a href="' . $item->link . '">';
	}

	echo '<img src="' . $pri_img_gal . '" />';

	if ($params->get('link_titles') == 1)
	{
		echo '</a>';
	}

	echo '</figure>';
}
*/
/*****************************************************************************************************************************/
?>
			<p><?php
/*****************************************************************************************************************************/

// Contenido
if (isset($item->fulltext) and !empty($item->fulltext))
{
	echo $item->introtext;
}
else
{
	echo $item->displayIntrotext;
}

/*****************************************************************************************************************************/
			?></p>
		</div>
		<?php endif; ?>

		<?php if ($params->get('show_readmore')) :?>
		<p>
			<a class="readmore" href="<?php echo $item->link; ?>">
				<?php if ($item->params->get('access-view') == false) :
					echo JText::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE');
				elseif ($readmore = $item->alternative_readmore) :
					echo $readmore;
					echo JHtml::_('string.truncate', $item->title, $params->get('readmore_limit'));
				elseif ($params->get('show_readmore_title', 0) == 0) :
					echo JText::sprintf('MOD_ARTICLES_CATEGORY_READ_MORE_TITLE');
				else :
					echo JText::_('MOD_ARTICLES_CATEGORY_READ_MORE');
					echo JHtml::_('string.truncate', $item->title, $params->get('readmore_limit'));
				endif; ?>
			</a>
		</p>
		<?php endif; ?>
	</li>
	<?php endforeach; ?>
<?php endif; ?>
</ul>

</div>