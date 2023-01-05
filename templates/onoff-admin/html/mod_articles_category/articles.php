<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_articles_category
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

/*****************************************************************************************************************************/

$n_item = 0;

// Separador de columnas
$n_columns  =  (int) $params->get('bootstrap_size', 0);

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
<?php if ($grouped) : ?>

<?php foreach ($list as $group_name => $group) : ?>

<<?php echo $category_header_tag; ?>><?php echo $group_name; ?></<?php echo $category_header_tag; ?>>

<?php foreach ($group as $item) : ?>
<?php /*****************************************************************************************************************************/


// Images
$images = json_decode($item->images);
$imgfloat = (empty($images->float_intro)) ? $params->get('float_intro') : $images->float_intro;

// Clases artículo
$class_article = 'item-' . $n_item;
$class_article .= empty($imgfloat) ? '' : ' figure-' . htmlspecialchars($imgfloat);
$class_article .= empty($item->active) ? '' : ' ' . $item->active;

// Contador
$n_item++;


/*****************************************************************************************************************************/ ?>
<article class="<?php echo $class_article; ?>">
<?php /*****************************************************************************************************************************/

if (isset($images->image_intro) and !empty($images->image_intro)) : ?>

	<figure class="intro <?php echo htmlspecialchars($imgfloat); ?>">
		<?php if ($params->get('link_titles') == 1) : ?><a href="<?php echo $item->link; ?>"><?php endif; ?>
		<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
			<?php if ($images->image_intro_caption):
				echo 'class="caption"'.' title="' .htmlspecialchars($images->image_intro_caption) .'"';
			endif; ?>
			alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" />
		<?php if ($params->get('link_titles') == 1) : ?></a><?php endif; ?>

		<?php if ($images->image_intro_caption): ?>
		<figcaption>
			<?php echo htmlspecialchars($images->image_intro_caption); ?>
		</figcaption>
		<?php endif; ?>
	</figure>
	
<?php endif;

/*****************************************************************************************************************************/ ?>					
					
	<div class="header">
		<<?php echo $article_header_tag; ?>>
		
		   	<?php if ($params->get('link_titles') == 1) : ?>
			<a href="<?php echo $item->link; ?>">
			<?php echo $item->title; ?>
	        </a>
	        <?php else :?>
	        <?php echo $item->title; ?>
	        <?php endif; ?>
        </<?php echo $article_header_tag; ?>>
	</div>
	
	<?php if ($item->displayCategoryTitle) :?>
		<span class="item-category">
			<?php echo $item->displayCategoryTitle; ?>
		</span>
	<?php endif; ?>
	
	<?php if ($item->displayHits) :?>
		<span class="item-hits">(<?php echo $item->displayHits; ?>)</span>
    <?php endif; ?>
	
	<?php if ($params->get('show_author')) :?>
		<span class="item-autor">
		<?php echo $item->displayAuthorName; ?>
		</span>
	<?php endif;?>

	<?php if ($item->displayDate) : ?>
		<span class="item-date"><?php echo $item->displayDate; ?></span>
	<?php endif; ?>

	<div class="content article">

<?php

// Intro galería
// (1º imagen de la galería)
/*****************************************************************************************************************************/

$dir_thu_gal = 'images/item/' . $item->id . '/image-thumbs/';
$thu_img_gal = glob($dir_thu_gal . '*');
$pri_img_gal = $thu_img_gal[0];

if (isset($pri_img_gal) && !empty($pri_img_gal))
{
	echo '<figure class="article-pre-gallery">';

	if ($params->get('link_titles') && $params->get('access-view'))
	{
		echo '<a href="' . $item->link . '">';
	}

	echo '<img src="' . $pri_img_gal . '" />';

	if ($params->get('link_titles') && $params->get('access-view'))
	{
		echo '</a>';
	}

	echo '</figure>';
}

/*****************************************************************************************************************************/
?>

	<?php if ($params->get('show_introtext')) :?>
		<div class="item-introtext">
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
			<?php
				if ($item->params->get('access-view')== FALSE) :
					echo JText::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE');
				elseif ($readmore = $item->alternative_readmore) :
					echo $readmore;
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
		</p>
	<?php endif; ?>
	</div>
		
</article>
<?php /*****************************************************************************************************************************/


// Separador de columnas
if ($n_columns > 0 && ($n_item)%$n_columns == 0) {
	
	echo '<div class="separator"></div>';
}

/*****************************************************************************************************************************/ ?>
<?php endforeach; ?>
<?php endforeach; ?>

<?php else : ?>

<?php foreach ($list as $item) : ?>
<?php /*****************************************************************************************************************************/


// Images
$images = json_decode($item->images);
$imgfloat = (empty($images->float_intro)) ? $params->get('float_intro') : $images->float_intro;

// Clases artículo
$class_article = 'item-' . $n_item;
$class_article .= empty($imgfloat) ? '' : ' figure-' . htmlspecialchars($imgfloat);
$class_article .= empty($item->active) ? '' : ' ' . $item->active;

// Contador
$n_item++;


// Eliminar espacios html
if ($n_item > 1 && $n_item < count($list)+1)
{
	echo '-->';
}

/*******************************************************************************/ ?><article class="<?php echo $class_article; ?>">
<?php /*****************************************************************************************************************************/

$images = json_decode($item->images);

if (isset($images->image_intro) and !empty($images->image_intro)) : ?>

	<figure class="intro">
		<?php if ($params->get('link_titles') == 1) : ?><a href="<?php echo $item->link; ?>"><?php endif; ?>
		<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
			<?php if ($images->image_intro_caption):
				echo 'class="caption"'.' title="' .htmlspecialchars($images->image_intro_caption) .'"';
			endif; ?>
			alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" />
		<?php if ($params->get('link_titles') == 1) : ?></a><?php endif; ?>

		<?php if ($images->image_intro_caption): ?>
		<figcaption>
			<?php echo htmlspecialchars($images->image_intro_caption); ?>
		</figcaption>
		<?php endif; ?>
	</figure>
	
<?php endif;

/*****************************************************************************************************************************/ ?>

	<div class="header">
	   	<<?php echo $article_header_tag; ?>>
		<?php if ($params->get('link_titles') == 1) : ?>
			<a href="<?php echo $item->link; ?>">
			<?php echo $item->title; ?>
			</a>
	    <?php else :?>
	        <?php echo $item->title; ?>
	    <?php endif; ?>
        </<?php echo $article_header_tag; ?>>
	</div>
	
	<?php if ($item->displayCategoryTitle) :?>
		<span class="item-category">
			<?php echo $item->displayCategoryTitle; ?>
		</span>
	<?php endif; ?>
	
	<div class="article-aux">
		<dl class="article-info">
		<?php if ($item->displayDate) : ?>
			<dt class="published">
				<img src="images/icons/icon-calendar.svg" alt="<?php echo JText::_('COM_CONTENT_PUBLISHED_DATE'); ?>">
				<?php echo JText::_('COM_CONTENT_PUBLISHED_DATE'); ?>
			</dt>
			<dd class="published">
				<?php echo $item->displayDate; ?>
			</dd>
		<?php endif; ?>
		
		<?php if ($params->get('show_author')) :?>
	   		<span class="item-autor">
			<?php echo $item->displayAuthorName; ?>
			</span>
		<?php endif;?>
		
		<?php if ($item->displayHits) :?>
			<span class="item-hits">(<?php echo $item->displayHits; ?>)</span>
		<?php endif; ?>
		</dl>
	</div>
	
	<div class="content article">

<?php

// Intro galería
// (1º imagen de la galería)
/*****************************************************************************************************************************/

$dir_thu_gal = 'images/item/' . $item->id . '/image-thumbs/';
$thu_img_gal = glob($dir_thu_gal . '*.jpg');
$pri_img_gal = $thu_img_gal[0];

if (isset($pri_img_gal) && !empty($pri_img_gal))
{
	echo '<figure class="article-pre-gallery">';

	if ($params->get('link_titles'))
	{
		echo '<a href="' . $item->link . '">';
	}

	echo '<img src="' . $pri_img_gal . '" />';

	if ($params->get('link_titles'))
	{
		echo '</a>';
	}

	echo '</figure>';
}

/*****************************************************************************************************************************/
?>
		
		<?php if ($params->get('show_introtext')) :?>
		<div class="item-introtext">
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
				<?php
					if ($item->params->get('access-view')== FALSE) :
						echo JText::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE');
					elseif ($readmore = $item->alternative_readmore) :
						echo $readmore;
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
			</p>
		<?php endif; ?>
	</div>

</article><?php /*****************************************************************************************************************************/

// Eliminar espacios html
if ($n_item < count($list))
{
	echo '<!--';
}


// Separador de columnas
if ($n_columns > 0 && ($n_item)%$n_columns == 0)
{
	echo  $n_item < count($list) ? '-->' : '' ; // Eliminar espacios html
	echo '<div class="separator"></div>';
	echo  $n_item < count($list) ? '<!--' : '' ; // Eliminar espacios html
}

/*****************************************************************************************************************************/ ?>
<?php endforeach; ?>
<?php endif; ?>
