<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Content.pagenavigation
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
?>
<nav class="pagenav">
	<ul class="menu">
	<?php if ($row->prev) : ?>
		<li class="prev">
			<a href="<?php echo $row->prev; ?>" rel="prev"><span><?php echo JText::_('JPREV'); ?></span></a>
		</li>
	<?php else :  ?>
		<li class="prev">
			<span><?php echo JText::_('JPREV'); ?></span>
		</li>
	<?php endif; ?>
	<?php if ($row->next) : ?>
		<li class="next">
			<a href="<?php echo $row->next; ?>" rel="next"><span><?php echo JText::_('JNEXT'); ?></span></a>
		</li>
	<?php else :  ?>
		<li class="next">
			<span><?php echo JText::_('JNEXT'); ?></span>
		</li>
	<?php endif; ?>
	</ul>
</nav>
