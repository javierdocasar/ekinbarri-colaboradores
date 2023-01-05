<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('behavior.keepalive');
//JHtml::_('behavior.tooltip');
JHtml::_('behavior.formvalidation');
?>
<article class="reset <?php echo $this->pageclass_sfx?>">
	<?php if ($this->params->get('show_page_heading')) : ?>
	<div class="header">
		<h1>
			<?php echo $this->escape($this->params->get('page_heading')); ?>
		</h1>
	</div>
	<?php endif; ?>

	<div class="content">
		<form id="user-registration" action="<?php echo JRoute::_('index.php?option=com_users&task=reset.request'); ?>" method="post" class="form-validate form-horizontal">

			<p><?php echo JText::_('COM_USERS_RESET_REQUEST_LABEL'); ?></p>

			<fieldset>
				<div class="form-element">
					<label id="jform_email-lbl" for="jform_email" class="mandatory" title=""><?php echo JText::_('COM_USERS_FIELD_PASSWORD_RESET_LABEL'); ?></label>
					<input type="text" name="jform[email]" id="jform_email" value="" class="validate-username" size="30" required="" aria-required="true" placeholder="Su email">
				</div>
			</fieldset>
			
			<div class="footer">
				<button type="submit" class="submit big full validate"><?php echo JText::_('JSUBMIT'); ?></button>
				<?php echo JHtml::_('form.token'); ?>
			</div>
		</form>
	</div>
</article>
