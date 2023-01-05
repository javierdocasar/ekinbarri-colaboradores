<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_login
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('behavior.keepalive');
?>
<?php if ($params->get('greeting')) : ?>
<p>
	<?php if ($params->get('name') == 0) : {
		echo JText::sprintf('MOD_LOGIN_HINAME', htmlspecialchars($user->get('name')));
	} else : {
		echo JText::sprintf('MOD_LOGIN_HINAME', htmlspecialchars($user->get('username')));
	} endif; ?>
</p>
<?php else: ?>
<p>
	<?php if ($params->get('name') == 0) : {
		echo htmlspecialchars($user->get('name'));
	} else : {
		echo htmlspecialchars($user->get('username'));
	} endif; ?>
</p>
<?php endif; ?>
<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" id="login-form" class="form-vertical">
	<button type="submit" id="logout" name="Submit" class="logout"><?php echo JText::_('JLOGOUT'); ?></button>
	<button type="button" id="logoutApp" name="Submit" class="logout hidden" onclick="window.open('wg://logout');"><?php echo JText::_('JLOGOUT'); ?></button>
	<input type="hidden" name="option" value="com_users" />
	<input type="hidden" name="task" value="user.logout" />
	<input type="hidden" name="return" value="<?php echo $return; ?>" />
	<?php echo JHtml::_('form.token'); ?>
</form>
