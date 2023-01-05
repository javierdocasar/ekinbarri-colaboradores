<?php
/**
 * @version		$Id: blog.php 20960 2011-03-12 14:14:00Z chdemko $
 * @package		Joomla.Site
 * @subpackage	com_content
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT.'/helpers');


// Primera página de resultados
$primera_pagina = ($this->pagination->limitstart == 0) ? 'first-page ' : '';

?>
<section class="blog <?php echo $primera_pagina;?><?php echo $this->pageclass_sfx;?><?php
/*****************************************************************************************************************************/

// Contador item
$n_item = 0;

$n_items_leading = count($this->lead_items);
$clase_items_leading = ($n_items_leading > 0) ? ' leadings' : '';  //'no-leadings';
echo $clase_items_leading;

$n_items_row = count($this->intro_items);
$clase_items_row = ($n_items_row > 0) ? ' rows' : ' no-rows';
echo $clase_items_row;

/*****************************************************************************************************************************/
?>">
<?php
if ($this->params->get('show_page_heading', 1)
	OR $this->params->get('show_category_title', 1)
	OR $this->params->get('page_subheading')) :
?>
	<div class="header">
		<?php if ($this->params->get('show_page_heading', 1) || $this->params->get('show_category_title')) : ?>
		<h1>
		<?php if ($this->params->get('show_page_heading', 1)) : ?>
			<?php echo $this->escape($this->params->get('page_heading')); ?>
		<?php elseif ($this->params->get('show_category_title')) : ?>
			<?php echo $this->category->title;?>
		<?php endif; ?>
		</h1>
		<?php endif; ?>

		<?php if ($this->params->get('page_subheading')) : ?>
		<h2>
			<?php echo $this->escape($this->params->get('page_subheading')); ?>
		</h2>
		<?php endif; ?>
	</div>
<?php endif; ?>

<?php if ($this->category->getParams()->get('image')) : ?>
	<figure class="category">
		<img src="<?php echo $this->category->getParams()->get('image'); ?>"/>
	</figure>
<?php endif; ?>

<?php if ($this->params->get('show_tags', 1) && !empty($this->category->tags->itemTags)) : ?>
	<?php $this->category->tagLayout = new JLayoutFile('joomla.content.tags'); ?>
	<?php echo $this->category->tagLayout->render($this->category->tags->itemTags); ?>
<?php endif; ?>

<?php if ($this->params->get('show_description', 1)) : ?>
	<div class="category-desc">
		<?php echo JHtml::_('content.prepare', $this->category->description); ?>
	</div>
<?php endif; ?>


	<div class="content category">

	<?php if (!empty($this->lead_items)) : ?>
		<div class="items-leading">
		<?php foreach ($this->lead_items as &$item) : ?><article class="<?php
/*****************************************************************************************************************************/

// Categoría
$db =& JFactory::getDBO();
$db->setQuery( 'SELECT alias FROM jos_categories WHERE id = ' . $item->catid );
$category_item_alias = $db->loadResult();

if ($category_item_alias != "")
{
	echo $category_item_alias.'-category ';
}

// FIGURE
$article_imgs = json_decode($item->images);
if (isset($article_imgs->image_intro) && !empty($article_imgs->image_intro) && !empty($article_imgs->float_intro))
{
	echo ' has-figure figure-' . $article_imgs->float_intro . ' ';
}

/*****************************************************************************************************************************/
			?>item-<?php echo $n_item; ?><?php echo $item->state == 0 ? ' system-unpublished' : null; ?>">
				<?php
					$this->item = &$item;
					echo $this->loadTemplate('item');
				?>
			</article><?php

			$n_item++;

			endforeach; ?>
		</div>
	<?php endif; ?>

<?php
/*****************************************************************************************************************************/

	// Contador item en fila
	$n_item_row = 0;

	// Columnas
	$n_columns = (int) $this->columns;

/*****************************************************************************************************************************/

	if (!empty($this->intro_items)) : ?>
	<div class="items-row<?php echo ($n_columns > 1) ? ' columns-' . $n_columns : ''; ?>">

		<?php foreach ($this->intro_items as $key => &$item) :

		$key= ($key-$leadingcount) + ($leadingcount > 0 ? 1 : 0);
		$rowcount=( ((int)$key) %	(int) $this->columns);
		$row = $counter / $this->columns;

		if ($key > 0) echo '-->';

		?><article class="<?php
/*****************************************************************************************************************************/

// Categoría
$db =& JFactory::getDBO();
$db->setQuery( 'SELECT alias FROM jos_categories WHERE id = ' . $item->catid );
$category_item_alias = $db->loadResult();

if ($category_item_alias != "")
{
	echo $category_item_alias.'-category ';
}

// Nº item
echo ' item-' . $n_item;

if ($n_columns > 1)
{
	echo ' item-row-' . $n_item_row;
}

// Despublicado
echo $item->state == 0 ? ' system-unpublished' : null;

/*****************************************************************************************************************************/
				?>">
			<?php
				$this->item = &$item;
				echo $this->loadTemplate('item');
			?>
			</article><?php

			if ($key < count($this->intro_items)) echo '<!--';

			$n_item++;
			$n_item_row++;

			$counter++;

			if ($n_item_row == $n_columns && $n_columns > 1):

				echo '-->';

			?><div class="separator"></div><?php

				echo '<!--';

				$n_item_row = 0;

			endif;

			endforeach;

			echo '-->';
			
			?>
	</div>

	<?php endif; ?>

	<?php if (!empty($this->link_items)) : ?>
	<?php echo $this->loadTemplate('links'); ?>
	<?php endif; ?>


	<?php if (!empty($this->children[$this->category->id])&& $this->maxLevel != 0) : ?>
	<div class="cat-children">
		<h3><?php echo JTEXT::_('JGLOBAL_SUBCATEGORIES'); ?></h3>
		<?php echo $this->loadTemplate('children'); ?>
	</div>
	<?php endif; ?>

	<?php

	// Paginador
	if (($this->params->def('show_pagination', 1) == 1
		|| ($this->params->get('show_pagination') == 2))
		&& ($this->pagination->get('pages.total') > 1)) : ?>
	<div class="pagination">
		<?php  if ($this->params->def('show_pagination_results', 1)) : ?>
		<p class="page-counter"><?php echo $this->pagination->getPagesCounter(); ?></p>
		<?php endif; ?>
		
		<?php echo $this->pagination->getPagesLinks(); ?>
	</div>
	<?php endif; ?>
	</div>

</section>
