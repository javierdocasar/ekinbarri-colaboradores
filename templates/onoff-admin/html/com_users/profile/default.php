<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
JHtml::_('behavior.tooltip');
?>
<article class="profile <?php echo $this->pageclass_sfx?>">
	<?php if ($this->params->get('show_page_heading')) : ?>
	<div class="header">
		<h1>
			<?php echo $this->escape($this->params->get('page_heading')); ?>
		</h1>
	</div>
	<?php endif; ?>

	<div class="content">
		<?php echo $this->loadTemplate('core'); ?>

		<?php echo $this->loadTemplate('params'); ?>

		<?php echo $this->loadTemplate('custom'); ?>
		
		<?php /*if (JFactory::getUser()->id == $this->data->id) : ?>
		<a id="profile-edit" class="button" href="<?php echo JRoute::_('index.php?option=com_users&task=profile.edit&user_id='.(int) $this->data->id);?>"><span><?php echo JText::_('COM_USERS_EDIT_PROFILE'); ?></span></a>
		<br><br>
		<?php endif;*/ ?>
	</div>

</article>
