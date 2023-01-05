<?php
/**
 * @package     Joomla.Site
 * @subpackage  Template.Beez3
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

function renderMessage($msgList)
{
	$buffer  	= '';
	$msg_html	= '';
	
	if (is_array($msgList))
	{
		foreach ($msgList as $type => $msgs)
		{
			if (count($msgs))
			{
				$msg_html .= "\n<h4>" . JText::_($type) . "</h4>";

				foreach ($msgs as $msg)
				{
					$msg_html .= "\n\t\t<p>" . $msg . "</p>";
				}
			}
		}
		
		if ($msg_html != '')
		{
			$buffer .= "\n<div id=\"system-message\" class=\"message " . strtolower($type) . "\">";
			$buffer .= $msg_html;
			$buffer .= "<a class=\"close\" data-dismiss=\"alert\">" . JText::_('JLIB_HTML_BEHAVIOR_CLOSE') . "</a>";
			$buffer .= "\n</div>";
		}
	}

	return $buffer;
}
