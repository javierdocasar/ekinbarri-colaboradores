<?php
/**
 * @version
 * @package		Joomla.Site
 * @subpackage	com_content
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// Create shortcut
$urls = json_decode($this->item->urls);

// Create shortcuts to some parameters.
$params		= $this->item->params;

if ($urls->urla != '' || $urls->urlb != '' || $urls->urlc != '') :
?>
<?php


/*********************	Video
*/

function parse_youtube($link){

    $regexstr = '~
        # Match Youtube link and embed code
        (?:                             # Group to match embed codes
            (?:<iframe [^>]*src=")?       # If iframe match up to first quote of src
            |(?:                        # Group to match if older embed
                (?:<object .*>)?      # Match opening Object tag
                (?:<param .*</param>)*  # Match all param tags
                (?:<embed [^>]*src=")?  # Match embed tag to the first quote of src
            )?                          # End older embed code group
        )?                              # End embed code groups
        (?:                             # Group youtube url
            https?:\/\/                 # Either http or https
            (?:[\w]+\.)*                # Optional subdomains
            (?:                         # Group host alternatives.
            youtu\.be/                  # Either youtu.be,
            | youtube\.com              # or youtube.com
            | youtube-nocookie\.com     # or youtube-nocookie.com
            )                           # End Host Group
            (?:\S*[^\w\-\s])?           # Extra stuff up to VIDEO_ID
            ([\w\-]{11})                # $1: VIDEO_ID is numeric
            [^\s]*                      # Not a space
        )                               # End group
        "?                              # Match end quote if part of src
        (?:[^>]*>)?                       # Match any extra stuff up to close brace
        (?:                             # Group to match last embed code
            </iframe>                 # Match the end of the iframe
            |</embed></object>          # or Match the end of the older embed
        )?                              # End Group of last bit of embed code
        ~ix';

    preg_match($regexstr, $link, $matches);

    return $matches[1];
}

function parse_vimeo($link){

    $regexstr = '~
        # Match Vimeo link and embed code
        (?:<iframe [^>]*src=")?       # If iframe match up to first quote of src
        (?:                         # Group vimeo url
            https?:\/\/             # Either http or https
            (?:[\w]+\.)*            # Optional subdomains
            vimeo\.com              # Match vimeo.com
            (?:[\/\w]*\/videos?)?   # Optional video sub directory this handles groups links also
            \/                      # Slash before Id
            ([0-9]+)                # $1: VIDEO_ID is numeric
            [^\s]*                  # Not a space
        )                           # End group
        "?                          # Match end quote if part of src
        (?:[^>]*></iframe>)?        # Match the end of the iframe
        (?:<p>.*</p>)?              # Match any title information stuff
        ~ix';

    preg_match($regexstr, $link, $matches);

    return $matches[1];
}

/*********************/


$urlarray = array(
array($urls->urla, $urls->urlatext, $urls->targeta, 'a'),
array($urls->urlb, $urls->urlbtext, $urls->targetb, 'b'),
array($urls->urlc, $urls->urlctext, $urls->targetc, 'c')
);
foreach($urlarray as $url) :
	$link = $url[0];
	$label = $url[1];
	$target = $url[2];
	$id = $url[3];

	if( ! $link) :
		continue;
	endif;

	// If no label is present, take the link
	$label = ($label) ? $label : $link;

	// If no target is present, use the default
	$target = $target ? $target : $params->get('target'.$id);



	/*********************	Video
	*/



	if (strpos($link, 'youtu.be') !== FALSE || strpos($link, 'youtube') !== FALSE) : ?>
	<figure class="video">
		<iframe type="text/html" width="640" height="400" src="//www.youtube.com/embed/<?php echo parse_youtube($link); ?>?rel=0&showinfo=0&autohide=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	</figure>
	<?php elseif (strpos($link, 'vimeo.com') !== FALSE) : ?>
	<figure class="video">
		<iframe type="text/html" width="640" height="400" src="//player.vimeo.com/video/<?php echo parse_vimeo($link); ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	</figure>
	<?php else : ?> 
	<nav class="article-links link-<?php echo $id; ?>">
	<?php

	/*********************	Links
	*/

		switch ($target)
		{
			case 1:
				// open in a new window
				echo '<a href="'. htmlspecialchars($link) .'" target="_blank"  rel="nofollow">'.
					htmlspecialchars($label) .'</a>';
				break;

			case 2:
				// open in a popup window
				$attribs = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600';
				echo "<a href=\"" . htmlspecialchars($link) . "\" onclick=\"window.open(this.href, 'targetWindow', '".$attribs."'); return false;\">".
					htmlspecialchars($label).'</a>';
				break;
			case 3:
				// open in a modal window
				JHtml::_('behavior.modal', 'a.modal'); ?>
				<a class="modal" href="<?php echo htmlspecialchars($link); ?>"  rel="{handler: 'iframe', size: {x:600, y:600}}">
					<?php echo htmlspecialchars($label) . ' </a>';
				break;

			default:
				// open in parent window
				echo '<a href="'.  htmlspecialchars($link) . '" rel="nofollow">'.
					htmlspecialchars($label) . ' </a>';
				break;
		}
	?>
	</nav>
	<? endif; ?>
<?php endforeach; ?>
<?php endif;


?>