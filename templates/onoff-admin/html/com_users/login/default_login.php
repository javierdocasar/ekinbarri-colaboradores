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
?>
<script>
    jQuery('#submitLogin').on("click", function(e){
        jQuery(this).addClass("waiting");
    })
</script>
<article class="login <?php echo $this->pageclass_sfx?>">
	<?php if ($this->params->get('show_page_heading')) : ?>
	<div class="header">
		<h1>
			<?php echo $this->escape($this->params->get('page_heading')); ?>
		</h1>
	</div>
	<?php endif; ?>

	<div class="content">
		<?php if (($this->params->get('logindescription_show') == 1 && str_replace(' ', '', $this->params->get('login_description')) != '') || $this->params->get('login_image') != '') : ?>
		<div class="login-description">
		<?php endif; ?>

			<?php if ($this->params->get('logindescription_show') == 1) : ?>
				<?php echo $this->params->get('login_description'); ?>
			<?php endif; ?>

			<?php if (($this->params->get('login_image') != '')) :?>
				<img src="<?php echo $this->escape($this->params->get('login_image')); ?>" class="login-image" alt="<?php echo JTEXT::_('COM_USER_LOGIN_IMAGE_ALT')?>"/>
			<?php endif; ?>

		<?php if (($this->params->get('logindescription_show') == 1 && str_replace(' ', '', $this->params->get('login_description')) != '') || $this->params->get('login_image') != '') : ?>
		</div>
		<?php endif; ?>

		<form action="<?php echo JRoute::_('index.php?option=com_users&task=user.login'); ?>" method="post" class="form-horizontal">

			<fieldset>
				<div class="form-element">
					<label id="username-lbl" for="username" class="mandatory"><?php echo JText::_('COM_USERS_LOGIN_USERNAME_LABEL'); ?></label>
					<input type="text" name="username" id="username" value="" class="validate-username" size="25" required="" aria-required="true" placeholder="Su usuario">
				</div>
				<div class="form-element">
					<label id="password-lbl" for="password" class="mandatory">Contraseña</label>
					<input type="password" name="password" id="password" value="" class="validate-password" size="25" maxlength="99" required="" aria-required="true" placeholder="Su contraseña">
				</div>
			</fieldset>

			<div class="footer">
				<button id="submitLogin" type="submit" class="big full submit"><?php echo JText::_('JLOGIN'); ?></button>

				<!--<p class="remind-links">
			        <a href="<?php echo JRoute::_('index.php?option=com_users&view=remind'); ?>"><?php echo JText::_('COM_USERS_LOGIN_REMIND'); ?></a>
			    	<a href="<?php echo JRoute::_('index.php?option=com_users&view=reset'); ?>"><?php echo JText::_('COM_USERS_LOGIN_RESET'); ?></a>
					<?php
					$usersConfig = JComponentHelper::getParams('com_users');
					if ($usersConfig->get('allowUserRegistration')) : ?>
			         <a href="<?php echo JRoute::_('index.php?option=com_users&view=registration'); ?>"><?php echo JText::_('COM_USERS_LOGIN_REGISTER'); ?></a>
					<?php endif; ?>
				</p>-->
			</div>

			<input type="hidden" name="return" value="<?php echo base64_encode($this->params->get('login_redirect_url', $this->form->getValue('return'))); ?>" />
			<?php echo JHtml::_('form.token'); ?>
		</form>
	</div>
</article>
