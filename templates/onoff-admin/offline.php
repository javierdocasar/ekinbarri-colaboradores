<!DOCTYPE html>
<!-- 
www.onoff.es
2013
-->

<?php

defined('_JEXEC') or die;
$app = JFactory::getApplication();

// Remove Generator
$this->setGenerator('www.onoff.es');
?>

<html lang="<?php echo $this->language; ?>">

<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="format-detection" content="telephone=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

	<jdoc:include type="head" />

	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/offline.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/offline.css" type="text/css" />
	
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>

<body>
	
	<header>
		<hgroup>
<?php if ($app->getCfg('offline_image')) : ?>
			<h1><img src="<?php echo $app->getCfg('offline_image'); ?>" alt="<?php echo htmlspecialchars($app->getCfg('sitename')); ?>" /></h1>
<?php else : ?>
			<h1><?php echo $app->getCfg('sitename'); ?></h1>
<?php endif; ?>
		</hgroup>
	</header>
	
	<jdoc:include type="message" />
	
	<article>
		
<?php if ($app->getCfg('display_offline_message', 1) == 1 && str_replace(' ', '', $app->getCfg('offline_message')) != ''): ?>
		<p>
			<?php echo $app->getCfg('offline_message'); ?>
		</p>
<?php elseif ($app->getCfg('display_offline_message', 1) == 2 && str_replace(' ', '', JText::_('JOFFLINE_MESSAGE')) != ''): ?>
		<p>
			<?php echo JText::_('JOFFLINE_MESSAGE'); ?>
		</p>
<?php  endif; ?>
		
		<form action="index.php" method="post" name="login" id="form-login">
			<fieldset class="input">
				<p id="form-login-username">
					<label for="username"><?php echo JText::_('JGLOBAL_USERNAME') ?></label>
					<input name="username" id="username" type="text" class="inputbox" alt="<?php echo JText::_('JGLOBAL_USERNAME') ?>" size="18" />
				</p>
				<p id="form-login-password">
					<label for="passwd"><?php echo JText::_('JGLOBAL_PASSWORD') ?></label>
					<input type="password" name="password" class="inputbox" size="18" alt="<?php echo JText::_('JGLOBAL_PASSWORD') ?>" id="passwd" />
				</p>
				<p id="form-login-remember">
					<label for="remember"><?php echo JText::_('JGLOBAL_REMEMBER_ME') ?></label>
					<input type="checkbox" name="remember" class="inputbox" value="yes" alt="<?php echo JText::_('JGLOBAL_REMEMBER_ME') ?>" id="remember" />
				</p>
				<input type="submit" name="Submit" class="button" value="<?php echo JText::_('JLOGIN') ?>" />
				<input type="hidden" name="option" value="com_users" />
				<input type="hidden" name="task" value="user.login" />
				<input type="hidden" name="return" value="<?php echo base64_encode(JURI::base()) ?>" />
				<?php echo JHtml::_('form.token'); ?>
			</fieldset>
		</form>
	</article>
</body>
</html>
