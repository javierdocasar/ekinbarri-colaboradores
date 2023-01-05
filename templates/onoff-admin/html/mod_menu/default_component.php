<?php
/**
 * @version		$Id: default_component.php 20423 2011-01-24 10:22:44Z infograf768 $
 * @package		Joomla.Site
 * @subpackage	mod_menu
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

// Note. It is important to remove spaces between elements.

if ($item->title == '[user_name]')
{
	$user = JFactory::getUser();

	$item->title = $user->name;
}

$title = $item->anchor_title ? 'title="'.$item->anchor_title.'" ' : '';

if ($item->menu_image) {

	// Embed SVG
	$img = $item->menu_image;
	$img_dir = pathinfo($item->menu_image, PATHINFO_DIRNAME);
	$img_filename = pathinfo($item->menu_image, PATHINFO_FILENAME);
	$img_extension = pathinfo($item->menu_image, PATHINFO_EXTENSION);
	$svg_version = $img_dir.'/'.$img_filename.'.svg';

	if (file_exists($svg_version))
	{
		$img = $svg_version;
		$img_extension = 'svg';
	}

	if ($img_extension == 'svg')
	{
		$svg = new DOMDocument();
		$svg->load($img);
		$svg_node = $svg->getElementsByTagName('svg');
		$svg_path = $svg_node->item(0)->C14N();

		$linktype = $svg_path;
	}
	else
	{
		$linktype = '<img src="'.$item->menu_image.'" alt="'.$item->title.'" />';
	}

	$linktype .= $item->params->get('menu_text', 1 ) ? '<span class="image-title">'.$item->title.'</span> ' : '';

} else {

	$linktype = $item->title;
}

$attributes = [];


if ($item->browserNav == 1)
{
	$attributes['target'] = '_blank';
}
elseif ($item->browserNav == 2)
{
	$options = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes';

	$attributes['onclick'] = "window.open(this.href, 'targetWindow', '" . $options . "'); return false;";
}

echo JHtml::_('link', JFilterOutput::ampReplace(htmlspecialchars($item->flink, ENT_COMPAT, 'UTF-8', false)), $linktype, $attributes);
