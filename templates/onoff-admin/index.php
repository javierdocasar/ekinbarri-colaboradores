<!DOCTYPE html>
<?php
defined( '_JEXEC' ) or die( 'ONOFF.es' );
define('_DEBUG', 1);
//define('_DEMO', 1);
define( '_VER','?v=4.0');
$min = defined('_DEBUG')?'':'.min';

$app = JFactory::getApplication();

//$doc = JFactory::getDocument();

$user = JFactory::getUser();

$menu = $app->getMenu();
$lang = JFactory::getLanguage();

$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
//$itemid   = $app->input->getCmd('Itemid', '');


$item_menu = $menu->getActive();

$isHome = ($item_menu == $menu->getDefault($lang->getTag()));


// Clases Body
$body_class = '';

if ($item_menu)
{
	$body_class .= $item_menu->params->get('pageclass_sfx') . ' ';
}

$body_class .= $view . ' ';
$body_class .= ($layout ? $layout . ' ' : '');
$body_class .= ($task ? $task . ' ' : ' ');

$body_class .= ($isHome) ? 'home ' : '';

if ($view == 'form'
	|| $view == 'reset'
	|| $view == 'remind'
	|| $view == 'profile'
	|| $view == 'login'
	|| $view == 'registration')
{
	$body_class .= 'article ';
}

$body_class .= ($this->countModules('breadcrumbs')) ? 'breadcrumbs ' : '';
$body_class .= ($this->countModules('cover')) ? 'cover ' : '';
$body_class .= ($this->countModules('top')) ? 'top ' : '';
$body_class .= ($this->countModules('left')) ? 'left ' : '';
$body_class .= ($this->countModules('right')) ? 'right ' : '';
$body_class .= ($this->countModules('bottom')) ? 'bottom ' : '';
$body_class .= ($this->countModules('content-top')) ? 'content-top ' : '';
$body_class .= ($this->countModules('content-left')) ? 'content-left ' : '';
$body_class .= ($this->countModules('content-right')) ? 'content-right ' : '';
$body_class .= ($this->countModules('content-bottom')) ? 'content-bottom ' : '';
$body_class .= ($this->countModules('sitemap')) ? 'sitemap ' : '';

$body_class .= ($user->id > 0) ? 'user ' : 'no-user ';
//$body_class .= ($user->guest) ? 'guest ' : '';

$base_url_template = $this->baseurl . '/templates/' . $this->template;


// Título de la página
if ($isHome)
{
	$this->setTitle( $app->getCfg( 'sitename' ) );
}
else
{
	$this->setTitle( $this->getTitle() /*. ' - ' . $app->getCfg( 'sitename' )*/ );
}



// Remove Generator
$this->setGenerator('www.onoff.es');

?>
<html class="no-js" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>

	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="format-detection" content="telephone=no">

	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

	<link rel="icon" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/favicon/favicon.svg" type="image/x-icon">
    <link rel="manifest" href="/site.webmanifest">

	<jdoc:include type="head" />

	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/screen.css" media="screen" type="text/css" />
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/print.css" media="print" type="text/css" />

    <script type="text/JavaScript">
	//<![CDATA[

		var baseURL = "<?php echo JURI::root(); ?>";

	//]]>
	</script>

	<?php
		$document = JFactory::getDocument();
		$document->addScript($this->baseurl."/templates/onoff-admin/js/jquery.min.js");
		$document->addScript($this->baseurl."/media/jui/js/jquery-noconflict.js");
	?>

	<?php if ($min==".min"):?>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/utils.min.js<?php echo _VER;?>"></script>
	<?php else:?>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/axios.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.validate.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/additional-methods.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.utils.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/luxon.min.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/message.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/localization/messages_es.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.multi-select.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.mask.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.scrollTo.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery.confirm.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/autocomplete.js"></script>
        <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/app.js"></script>
		<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/utils.js"></script>
	<?php endif;?>
</head>
<body class="<?php echo $body_class; ?>" ontouchstart="">
	<div id="inicio"></div>
	<div id="container">
		<?php if($this->countModules('admin-header') || $user->guest) : ?><header id="header"><jdoc:include type="modules" name="admin-header" style="onoff" /></header><?php endif; ?>
		<?php if($this->countModules('admin-sitemap')) : ?><nav id="sitemap"><jdoc:include type="modules" name="admin-sitemap" style="onoff" /></nav><?php endif; ?>
		<div id="main">
			<div id="system-message-container" class="message-container"><jdoc:include type="message" /></div>
			<?php if($this->countModules('admin-top')) : ?><div id="top"><jdoc:include type="modules" name="admin-top" style="onoff" /></div><?php endif; ?>
			<div id="content">
				<?php if($this->countModules('admin-content-top')) : ?><div id="content-top"><jdoc:include type="modules" name="admin-content-top" style="onoff" /></div><?php endif; ?>
				<div id="component"><jdoc:include type="component" /></div>
				<?php if($this->countModules('admin-content-bottom')) : ?><div id="content-bottom"><jdoc:include type="modules" name="admin-content-bottom" style="onoff" /></div><?php endif; ?>
			</div>
			<?php if($this->countModules('admin-content-left')) : ?><div id="content-left"><jdoc:include type="modules" name="admin-content-left" style="onoff" /></div><?php endif; ?>
			<?php if($this->countModules('admin-content-right')) : ?><div id="content-right"><jdoc:include type="modules" name="admin-content-right" style="onoff" /></div><?php endif; ?>
		</div>
		<?php if($this->countModules('admin-left')) : ?><div id="left"><jdoc:include type="modules" name="admin-left" style="onoff" /></div><?php endif; ?>
		<?php if($this->countModules('admin-right')) : ?><div id="right"><jdoc:include type="modules" name="admin-right" style="onoff" /></div><?php endif; ?>
		<?php if($this->countModules('admin-bottom')) : ?><div id="bottom"><jdoc:include type="modules" name="admin-bottom" style="onoff" /></div><?php endif; ?>
		<?php if($this->countModules('admin-footer')) :?><footer id="footer"><div class="content"><jdoc:include type="modules" name="admin-footer" style="onoff"/></div></footer><?php endif; ?>
	</div>
	<?php if($this->countModules('debug')) : ?><jdoc:include type="modules" name="debug" style="onoff" /><?php endif; ?>
</body>
</html>
