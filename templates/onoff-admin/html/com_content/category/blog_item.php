<?php
/**
* @package		Joomla.Site
* @subpackage	com_content
* @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
* @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

// Create a shortcut for params.
$params = &$this->item->params;
$images = json_decode($this->item->images);
$canEdit	= $this->item->params->get('access-edit');
JHtml::addIncludePath(JPATH_COMPONENT.'/helpers/html');
JHtml::_('behavior.tooltip');
JHtml::_('behavior.framework');

?>

<?php if ($this->item->state == 0) : ?>
<div class="system-unpublished">
<?php endif; ?>

<?php

// Imagen
/************************************************************************************************************************/
if (isset($images->image_intro) and !empty($images->image_intro)) : ?>

	<figure class="intro">
		<?php if ($params->get('link_titles') && $params->get('access-view')) : ?>
			<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid)); ?>">
			<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
				 <?php if ($images->image_intro_caption):
					echo 'title="' .htmlspecialchars($images->image_intro_caption) .'"';
				endif; ?>
			 	 alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" /></a>
		<?php else : ?>
			<img src="<?php echo htmlspecialchars($images->image_intro); ?>"
				 <?php if ($images->image_intro_caption):
					echo 'title="' .htmlspecialchars($images->image_intro_caption) .'"';
				endif; ?>
			 	 alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" />
		<?php endif; ?>
		
		<?php if ($images->image_intro_caption): ?>
		<figcaption>
			<?php echo htmlspecialchars($images->image_intro_caption); ?>
		</figcaption>
		<?php endif; ?>
	</figure>
	
<?php endif;
/***************************************************************************************************************************/ ?>

<?php if ($params->get('show_title')) : ?>
<div class="header">
	<h2>
		<?php if ($params->get('link_titles') && $params->get('access-view')) : ?>
			<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid)); ?>">
			<?php echo $this->escape($this->item->title); ?></a>
		<?php else : ?>
			<?php echo $this->escape($this->item->title); ?>
		<?php endif; ?>

		<?php if ($canEdit) : ?>
		<span class="toEditor"><?php echo JHtml::_('icon.edit', $this->item, $params); ?></span>
		<?php endif; ?>
	</h2>
</div>
<?php endif; ?>

<?php if ($params->get('show_print_icon') || $params->get('show_email_icon')) : ?>
<ul class="actions">
	<?php if ($params->get('show_print_icon')) : ?>
	<li class="print-icon">
		<?php echo JHtml::_('icon.print_popup', $this->item, $params); ?>
	</li>
	<?php endif; ?>
	<?php if ($params->get('show_email_icon')) : ?>
	<li class="email-icon">
		<?php echo JHtml::_('icon.email', $this->item, $params); ?>
	</li>
	<?php endif; ?>
</ul>
<?php endif; ?>

<?php if (!$params->get('show_intro')) : ?><?php echo $this->item->event->afterDisplayTitle; ?><?php endif; ?>

<?php $useDefList = (($params->get('show_author'))
	OR ($params->get('show_category'))
	OR ($params->get('show_parent_category'))
	OR ($params->get('show_create_date'))
	OR ($params->get('show_modify_date'))
	OR ($params->get('show_publish_date'))
	OR ($params->get('show_hits')));

if ($useDefList) : ?>
<aside class="article-aux">

	<dl class="article-info">
	<?php if ($params->get('show_parent_category') && $this->item->parent_id != 1) : ?>
		<dt class="parent-category-name"></dt>
		<dd class="parent-category-name">
			<?php $title = $this->escape($this->item->parent_title);
				$url = '<a href="' . JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->parent_id)) . '">' . $title . '</a>'; ?>
			<?php if ($params->get('link_parent_category')) : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', $url); ?>
				<?php else : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', $title); ?>
			<?php endif; ?>
		</dd>
	<?php endif; ?>
	<?php if ($params->get('show_category')) : ?>
			<dd class="category-name">
				<?php if ($params->get('link_category')) : ?>
				<span><?php  echo JText::sprintf('COM_CONTENT_CATEGORY', ''); ?> </span>
				<a href="<?php echo JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->catid)); ?>">
				<?php echo $this->escape($this->item->category_title); ?>
				</a>
				<?php else : ?>
				<span><?php  echo JText::sprintf('COM_CONTENT_CATEGORY', ''); ?></span>
				<?php echo $this->escape($this->item->category_title); ?>
				<?php endif; ?>
			</dd>
	<?php endif; ?>
	<?php if ($params->get('show_create_date')) : ?>
			<dd class="create">
			<?php echo JText::sprintf('COM_CONTENT_CREATED_DATE_ON', JHtml::_('date', $this->item->created, JText::_('Y'))); ?>
			</dd>
	<?php endif; ?>
	<?php if ($params->get('show_modify_date')) : ?>
			<dd class="modified">
			<?php echo JText::sprintf('COM_CONTENT_LAST_UPDATED', JHtml::_('date', $this->item->modified, JText::_('DATE_FORMAT_LC2'))); ?>
			</dd>
	<?php endif; ?>
	<?php if ($params->get('show_publish_date')) : ?>
		<dt class="published">
			<img src="images/icons/icon-calendar.svg" alt="<?php echo JText::_('COM_CONTENT_PUBLISHED_DATE'); ?>">
			<?php echo JText::_('COM_CONTENT_PUBLISHED_DATE'); ?>
		</dt>
		<dd class="published">
			<?php echo  JHtml::_('date', $this->item->publish_up, JText::_('DATE_FORMAT_LC2')); ?>
		</dd>
	<?php endif; ?>
	<?php if ($params->get('show_author') && !empty($this->item->author )) : ?>
		<dd class="createdby"> 
			<?php $author =  $this->item->author; ?>
			<?php $author = ($this->item->created_by_alias ? $this->item->created_by_alias : $author);?>

				<?php if (!empty($this->item->contactid ) &&  $params->get('link_author') == true):?>
			        <?php 	echo JText::sprintf('COM_CONTENT_WRITTEN_BY' , 
			         JHtml::_('link',JRoute::_('index.php?option=com_contact&view=contact&id='.$this->item->contactid),$author)); ?>

				<?php else :?>
			        <?php echo JText::sprintf('COM_CONTENT_WRITTEN_BY', $author); ?>
				<?php endif; ?>
		</dd>
	<?php endif; ?>
	<?php if ($params->get('show_hits')) : ?>
		<dd class="hits">
		<?php echo JText::sprintf('COM_CONTENT_ARTICLE_HITS', $this->item->hits); ?>
		</dd>
	<?php endif; ?>
	</dl>
</aside>
<?php endif; ?>

<?php if ($params->get('show_intro') || ($params->get('show_readmore') && $this->item->readmore)) : ?>
<div class="content">
	
	<?php echo $this->item->event->beforeDisplayContent; ?>
	
	<?php  if ($params->get('show_intro')) : ?>
	<?php echo $this->item->introtext; ?>
	<?php endif; ?>
	
	<?php if ($params->get('show_readmore') && $this->item->readmore) :
		if ($params->get('access-view')) :
			$link = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid));
		else :
			$menu = JFactory::getApplication()->getMenu();
			$active = $menu->getActive();
			$itemId = $active->id;
			$link1 = JRoute::_('index.php?option=com_users&view=login&Itemid=' . $itemId);
			$returnURL = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug));
			$link = new JURI($link1);
			$link->setVar('return', base64_encode($returnURL));
		endif;
	?>
	<p>
		<a class="readmore" href="<?php echo $link; ?>">
			<?php if (!$params->get('access-view')) :
				echo JText::_('COM_CONTENT_REGISTER_TO_READ_MORE');
			elseif ($readmore = $this->item->alternative_readmore) :
				echo $readmore;
				if ($params->get('show_readmore_title', 0) != 0) :
				    echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
				endif;
			elseif ($params->get('show_readmore_title', 0) == 0) :
				echo JText::sprintf('COM_CONTENT_READ_MORE_TITLE');	
			else :
				echo JText::_('COM_CONTENT_READ_MORE');
				echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
			endif; ?></a>
	</p>
	<?php endif; ?>
	
	<?php echo $this->item->event->afterDisplayContent; ?>
</div>
<?php endif; ?>

<?php if ($this->item->state == 0) : ?>
</div>
<?php endif; ?>
