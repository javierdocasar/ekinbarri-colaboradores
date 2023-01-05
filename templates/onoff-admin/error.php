<!DOCTYPE html>
<!-- 
www.onoff.es
-->

<?php
/**
 * @version		$Id: error.php 21322 2011-05-11 01:10:29Z dextercowley $
 * @package		Joomla.Site
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
if (!isset($this->error)) {
	$this->error = JError::raiseWarning(404, JText::_('JERROR_ALERTNOAUTHOR'));
	$this->debug = false;
}
//get language and direction
$doc = JFactory::getDocument();
$this->language = $doc->language;
$this->direction = $doc->direction;
?>

<html lang="<?php echo $this->language; ?>">

<head>
	<meta charset="utf-8">
	
	<title><?php echo $this->title; ?></title>
	
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template ?>/css/error.css" type="text/css" />
<?php /*
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.noConflict.js"></script>
	
	<!--[if lt IE 8]>
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.pngFix.pack.js"></script>
	<script type="text/javascript">
		jQuery(document).ready(function(){ jQuery(document).pngFix(); });
	</script>
	<![endif]-->*/?>
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>

<body class="error">
	
	<article>
		
		<div class="header">
			<h1><?php echo $this->error->getCode(); ?></h1>
			<h2><?php echo $this->error->getMessage(); ?></h2>
		</div>
		
		<div class="content">
			
			<div id="techinfo">
				<p>
					<?php if ($this->debug) :
						echo $this->renderBacktrace();
					endif; ?>
				</p>
			</div>
			
			<a class="home" href="<?php echo $this->baseurl; ?>/index.php" title="<?php echo JText::_('JERROR_LAYOUT_GO_TO_THE_HOME_PAGE'); ?>">
			← <?php echo JText::_('JERROR_LAYOUT_HOME_PAGE'); ?></a>
			
		</div>
		
	</article>
	
</body>
</html>
