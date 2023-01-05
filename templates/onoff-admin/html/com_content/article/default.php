<?php
/**
 * @version		$Id: default.php 20817 2011-02-21 21:48:16Z dextercowley $
 * @package		Joomla.Site
 * @subpackage	com_content
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');

// Create shortcuts to some parameters.
$params		= $this->item->params;
$images		= json_decode($this->item->images);
$urls		= json_decode($this->item->urls);
$canEdit	= $this->item->params->get('access-edit');
$user		= JFactory::getUser();

?>
<?php
if (!empty($this->item->pagination) && $this->item->pagination && !$this->item->paginationposition && $this->item->paginationrelative)
{
	echo $this->item->pagination;
}
?>

<article class="item-page <?php echo $this->pageclass_sfx; ?><?php
/*****************************************************************************************************************************/

// FIGURE
if (isset($images->image_fulltext) && !empty($images->image_fulltext))
{
	echo ' has-figure';

	if (!empty($images->float_fulltext))
	{
		echo ' figure-' . $images->float_fulltext . ' ';
	}
}

/*****************************************************************************************************************************/
?>">

<?php

// Imagen 
/*****************************************************************************************************************************/

if (isset($images->image_fulltext) and !empty($images->image_fulltext))
{
?>
	<figure class="main">

		<img src="<?php echo htmlspecialchars($images->image_fulltext); ?>"
			<?php if ($images->image_fulltext_caption):
				echo ' title="' .htmlspecialchars($images->image_fulltext_caption) .'"';
			endif; ?>
			 alt="<?php echo htmlspecialchars($images->image_fulltext_alt); ?>" />

		<?php if ($images->image_fulltext_caption): ?>
		<figcaption>
			<?php echo htmlspecialchars($images->image_fulltext_caption); ?>
		</figcaption>
		<?php endif; ?>

	</figure>

<?php
}

/*****************************************************************************************************************************/
?>
	
<?php if ($this->params->get('show_page_heading', 1) || $params->get('show_title')) : ?>
<div class="header">
<?php if ($params->get('show_title')) : ?>
	<h1>
		<?php /* if ($params->get('link_titles') && !empty($this->item->readmore_link)) : ?>
		<a href="<?php echo $this->item->readmore_link; ?>">
			<?php if ($this->params->get('show_page_heading', 1)) {
				echo $this->escape($this->params->get('page_heading'));
			} else {
				echo $this->escape($this->item->title);
			} ?>
		</a>
		<?php else :*/  ?>
		<?php if ($this->params->get('show_page_heading', 1)) {
			echo $this->escape($this->params->get('page_heading'));
		} else {
			echo $this->escape($this->item->title);
		} ?>
		<?php /*endif;*/ ?>
		
		<?php if ($canEdit) : ?>
		<span class="toEditor"><?php echo JHtml::_('icon.edit', $this->item, $params); ?></span>
		<?php endif; ?>
	</h1>
<?php endif; ?>

<?php if ($this->params->get('show_page_heading', 1)) : ?>
	<h2>
		<?php echo $this->escape($this->item->title); ?>
	</h2>
<?php endif; ?>
</div>
<?php endif; ?>

<?php if ($params->get('show_print_icon') || $params->get('show_email_icon')) : ?>
	<ul class="actions">
	<?php if (!$this->print) : ?>
		<?php if ($params->get('show_print_icon')) : ?>
			<li class="print-icon">
			<?php echo JHtml::_('icon.print_popup',  $this->item, $params); ?>
			</li>
		<?php endif; ?>

		<?php if ($params->get('show_email_icon')) : ?>
			<li class="email-icon">
			<?php echo JHtml::_('icon.email',  $this->item, $params); ?>
			</li>
		<?php endif; ?>
		<?php else : ?>
			<li>
			<?php echo JHtml::_('icon.print_screen',  $this->item, $params); ?>
			</li>
		<?php endif; ?>
	</ul>
<?php endif; ?>

<?php if (!$params->get('show_intro')) : echo $this->item->event->afterDisplayTitle; endif; ?>

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
	<?php if ($params->get('show_parent_category') && $this->item->parent_slug != '1:root') : ?>
		<dd class="parent-category-name">
		<?php	$title = $this->escape($this->item->parent_title);
		$url = '<a href="'.JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->parent_slug)).'">'.$title.'</a>';?>
		<?php if ($params->get('link_parent_category') AND $this->item->parent_slug) : ?>
			<?php echo JText::sprintf('COM_CONTENT_PARENT', $url); ?>
		<?php else : ?>
			<?php echo JText::sprintf('COM_CONTENT_PARENT', $title); ?>
		<?php endif; ?>
		</dd>
	<?php endif; ?>
	<?php if ($params->get('show_category')) : ?>
		<dd class="category-name">
			<?php if ($params->get('link_category') AND $this->item->catslug) : ?>
				<span><?php  echo JText::sprintf('COM_CONTENT_CATEGORY', ''); ?> </span>
				<a href="<?php echo JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->catslug)); ?>">
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
		<?php echo JText::sprintf('COM_CONTENT_CREATED_DATE_ON', JHTML::_('date',$this->item->created, JText::_('Y'))); ?>
		</dd>
	<?php endif; ?>
	<?php if ($params->get('show_modify_date')) : ?>
		<dd class="modified">
		<?php echo JText::sprintf('COM_CONTENT_LAST_UPDATED', JHTML::_('date',$this->item->modified, JText::_('DATE_FORMAT_LC2'))); ?>
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
			 JHTML::_('link',JRoute::_('index.php?option=com_contact&view=contact&id='.$this->item->contactid),$author)); ?>

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
	

	<?php echo $this->item->event->beforeDisplayContent; ?>
	
</aside>
<?php endif; ?>

<?php if (isset($urls) AND ((!empty($urls->urls_position) AND ($urls->urls_position=='0'))
		OR ($params->get('urls_position')=='0' AND empty($urls->urls_position) ))
		OR (empty($urls->urls_position) AND (!$params->get('urls_position')))): ?>
	<?php echo $this->loadTemplate('links'); ?>
<?php endif; ?>

<?php if (isset ($this->item->toc)) : ?>
	<?php echo $this->item->toc; ?>
<?php endif; ?>

<div class="content article">
	
	<?php
	if (!empty($this->item->pagination) && $this->item->pagination && !$this->item->paginationposition && !$this->item->paginationrelative):
		echo $this->item->pagination;
	?>
	<?php endif; ?>

<?php if ($params->get('access-view')):?>
	
	<?php echo $this->item->text; ?>
	
	<?php //optional teaser intro text for guests ?>

<?php elseif ($params->get('show_noauth') == true AND  $user->get('guest') ) : ?>
	
	<?php echo $this->item->introtext; ?>
	
	<?php //Optional link to let them register to see the whole article. ?>
	<?php if ($params->get('show_readmore') && $this->item->fulltext != null) :
		$link1 = JRoute::_('index.php?option=com_users&view=login');
		$link = new JURI($link1);?>
		<p class="readmore">
		<a href="<?php echo $link; ?>">
		<?php $attribs = json_decode($this->item->attribs);  ?> 
		<?php 
		if ($attribs->alternative_readmore == null) :
			echo JText::_('COM_CONTENT_REGISTER_TO_READ_MORE');
		elseif ($readmore = $this->item->alternative_readmore) :
			echo $readmore;
			if ($params->get('show_readmore_title', 0) != 0) :
			    echo JHTML::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
			endif;
		elseif ($params->get('show_readmore_title', 0) == 0) :
			echo JText::sprintf('COM_CONTENT_READ_MORE_TITLE');	
		else :
			echo JText::_('COM_CONTENT_READ_MORE');
			echo JHTML::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
		endif; ?></a>
		</p>
	<?php endif; ?>
<?php endif; ?>
	
<?php

if ($params->get('show_tags', 1) && !empty($this->item->tags))
{
	$this->item->tagLayout = new JLayoutFile('joomla.content.tags');

	echo $this->item->tagLayout->render($this->item->tags->itemTags);
}

?>

	
	<?php
	if (!empty($this->item->pagination) && $this->item->pagination && $this->item->paginationposition && !$this->item->paginationrelative):
		echo $this->item->pagination;
	?>
	<?php endif; ?>
</div>

<?php if (isset($urls) AND ((!empty($urls->urls_position)  AND ($urls->urls_position=='1')) OR ( $params->get('urls_position')=='1') )): ?>
	<?php echo $this->loadTemplate('links'); ?>
<?php endif; ?>

<?php echo $this->item->event->afterDisplayContent; ?>

<?php
if (!empty($this->item->pagination) && $this->item->pagination && $this->item->paginationposition && $this->item->paginationrelative) :
	echo $this->item->pagination;
?>
<?php endif; ?>

</article>