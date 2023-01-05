<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_login
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

require_once JPATH_SITE . '/components/com_users/helpers/route.php';

JHtml::_('behavior.keepalive');
JHtml::_('bootstrap.tooltip');

?>
<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" id="login-form" class="form-inline">

	<?php if ($params->get('pretext')) : ?>
	<div class="pretext">
		<p><?php echo $params->get('pretext'); ?></p>
	</div>
	<?php endif; ?>

	<fieldset class="userdata">

		<div id="form-login-username" class="form-element">
			<label for="modlgn-username"><?php echo JText::_('MOD_LOGIN_VALUE_USERNAME') ?> *</label>
			<input id="modlgn-username" type="text" name="username" tabindex="0" size="18" placeholder="<?php echo JText::_('MOD_LOGIN_VALUE_USERNAME') ?>" />
		</div>

		<div id="form-login-password" class="form-element">
			<label for="modlgn-passwd"><?php echo JText::_('JGLOBAL_PASSWORD') ?> *</label>
			<input id="modlgn-passwd" type="password" name="password" tabindex="0" size="18" placeholder="<?php echo JText::_('JGLOBAL_PASSWORD') ?>" />
		</div>

		<?php if (count($twofactormethods) > 1): ?>
		<div id="form-login-secretkey" class="form-element">
			<label for="modlgn-secretkey"><?php echo JText::_('JGLOBAL_SECRETKEY') ?></label>
			<input id="modlgn-secretkey" autocomplete="off" type="text" name="secretkey" tabindex="0" size="18" placeholder="<?php echo JText::_('JGLOBAL_SECRETKEY') ?>" />
		</div>
		<?php endif; ?>

		<?php if (JPluginHelper::isEnabled('system', 'remember')) : ?>
		<div id="form-login-remember" class="form-element checkbox">
			<label for="modlgn-remember"><input id="modlgn-remember" type="checkbox" name="remember" value="yes"/> <?php echo JText::_('MOD_LOGIN_REMEMBER_ME') ?></label>
		</div>
		<?php endif; ?>
	</fieldset>

	<div id="form-login-submit" class="footer">
		<button type="submit" tabindex="0" name="Submit" class="big full icon-login"><?php echo JText::_('JLOGIN') ?></button>
	</div>

	<?php

	$usersConfig = JComponentHelper::getParams('com_users'); ?>
	<nav>
		<ul class="menu">
		<?php if ($usersConfig->get('allowUserRegistration')) : ?>
			<li id="form-login-registration">
				<a href="<?php echo JRoute::_('index.php?option=com_users&view=registration&Itemid=' . UsersHelperRoute::getRegistrationRoute()); ?>" class="button">
				<?php echo JText::_('MOD_LOGIN_REGISTER'); ?></a>
			</li>
		<?php endif; ?>
			<li id="form-login-remind">
				<a href="<?php echo JRoute::_('index.php?option=com_users&view=remind&Itemid=' . UsersHelperRoute::getRemindRoute()); ?>">
				<?php echo JText::_('MOD_LOGIN_FORGOT_YOUR_USERNAME'); ?></a>
			</li>
			<li id="form-login-reset">
				<a href="<?php echo JRoute::_('index.php?option=com_users&view=reset&Itemid=' . UsersHelperRoute::getResetRoute()); ?>">
				<?php echo JText::_('MOD_LOGIN_FORGOT_YOUR_PASSWORD'); ?></a>
			</li>
		</ul>
	</nav>

	<input type="hidden" name="option" value="com_users" />
	<input type="hidden" name="task" value="user.login" />
	<input type="hidden" name="return" value="<?php echo $return; ?>" />
	<input type="hidden" name="loginurl" value="<?php echo $loginUrl; ?>" />
	<?php echo JHtml::_('form.token'); ?>

	<?php if ($params->get('posttext')) : ?>
	<div class="posttext">
		<p><?php echo $params->get('posttext'); ?></p>
	</div>
	<?php endif; ?>

</form>
