<?php
/**
 * @version		$Id: default.php 20983 2011-03-17 16:19:45Z chdemko $
 * @package		Joomla.Site
 * @subpackage	mod_menu
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;
$app = JFactory::getApplication();
$permissions = $app->getUserState('access_permissions');
$permissions = $permissions?$permissions:[];
// Note. It is important to remove spaces between elements.
?><ul class="menu<?php echo $class_sfx;?>"<?php
	$tag = '';
	if ($params->get('tag_id')!=NULL) {
		$tag = $params->get('tag_id').'';
		echo ' id="'.$tag.'"';
	}
?>><?php


foreach ($list as $i => &$item) :
    //Modoficado por doka


    /*$intersec = array_intersect(explode(",",$item->note), $permissions);
	if (!count($intersec) && $item->menutype=="admin-sitemap"  ) {
	    continue;
    }*/
        $id = '';
        $class = '';

        if ($item->anchor_css) {
            $clases = explode(" ", $item->anchor_css);

            foreach ($clases as &$clase) {
                $es_id = substr($clase, 0, 1);
                if ($es_id == '#') {
                    $id .= ' id="' . substr($clase, 1) . '"';
                } else {
                    $class .= $clase . ' ';
                }
            };
        }

        if ($item->id == $active_id) {
            $class .= 'current ';
        }

        if (in_array($item->id, $path)) {
            $class .= 'active ';
        } elseif ($item->type == 'alias') {
            $aliasToId = $item->params->get('aliasoptions');
            if (count($path) > 0 && $aliasToId == $path[count($path) - 1]) {
                $class .= 'active ';
            } elseif (in_array($aliasToId, $path)) {
                $class .= 'alias-parent-active ';
            }
        }

        if ($item->type == 'separator') {
            $class .= 'divider ';
        }

        if ($item->deeper) {
            $class .= 'deeper ';
        }

        if ($item->parent) {
            $class .= 'parent ';
        }

        if (!empty($class)) {
            $class = ' class="' . trim($class) . '"';
        }

        echo '<li' . $class . $id . '>';

        // Render the menu item.
        switch ($item->type) :
            case 'separator':
            case 'url':
            case 'component':
            case 'heading':
                require JModuleHelper::getLayoutPath('mod_menu', 'default_' . $item->type);
                break;

            default:
                require JModuleHelper::getLayoutPath('mod_menu', 'default_url');
                break;
        endswitch;

        // The next item is deeper.
        if ($item->deeper) {
            echo '<ul>';
        } // The next item is shallower.
        else if ($item->shallower) {
            echo '</li>';
            echo str_repeat('</ul></li>', $item->level_diff);
        } // The next item is on the same level.
        else {
            echo '</li>';
        }

endforeach;
?></ul>
