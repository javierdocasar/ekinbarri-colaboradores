<?php
defined('_JEXEC') or die('Restricted access');

function modChrome_onoff_no_container($module, &$params, &$attribs)
{
	$headerTag      = htmlspecialchars($params->get('header_tag', 'h3'));
	
	$headerClass	= $params->get('header_class');
	$clase_header	= $headerClass != '' ? ' class="' . $headerClass . '"' : '';
	
	if (!empty ($module->content)) : ?>

		<?php if ($module->showtitle) : ?>
		<<?php echo $headerTag . $clase_header; ?>>
			<?php echo $module->title; ?>
		</<?php echo $headerTag; ?>>
		<?php endif; ?>
		
		<?php echo $module->content; ?>

	<?php endif;
}

function modChrome_onoff_container($module, &$params, &$attribs)
{
	$moduleTag      = $params->get('module_tag', 'div');
	$headerTag      = htmlspecialchars($params->get('header_tag', 'h3'));
	$bootstrapSize  = (int) $params->get('bootstrap_size', 0);
	$bootstrapClass	= $bootstrapSize != 0 ? ' columns-' . $bootstrapSize : '';
	
	$moduleClass	= htmlspecialchars($params->get('moduleclass_sfx')) . $bootstrapClass;
	$clase_modulo	= $moduleClass != '' ? ' class="' . $moduleClass . '"' : '';
	
	$headerClass	= $params->get('header_class');
	$clase_header	= $headerClass != '' ? ' class="' . $headerClass . '"' : '';

	if (!empty ($module->content)) : ?>
	<<?php echo $moduleTag; ?><?php echo $clase_modulo; ?>>
		
		<?php if ($module->showtitle) : ?>
		<<?php echo $headerTag . $clase_header ?>><?php echo $module->title; ?></<?php echo $headerTag; ?>>
		<?php endif; ?>
		
		<?php echo $module->content; ?>
		
	</<?php echo $moduleTag; ?>>
	<?php endif;
}

function modChrome_onoff_template_container($module, &$params, &$attribs)
{
	$moduleTag      = $params->get('module_tag', 'div');
	$headerTag      = htmlspecialchars($params->get('header_tag', 'h3'));

	$bootstrapSize  = (int) $params->get('bootstrap_size', 0);
	$bootstrapClass	= $bootstrapSize != 0 ? ' class="columns-' . $bootstrapSize . '"' : '';
	
	$moduleClass	= htmlspecialchars($params->get('moduleclass_sfx')) . $bootstrapClass;
	$clase_modulo	= $moduleClass != '' ? ' class="' . $moduleClass . '"' : '';
	
	$headerClass	= $params->get('header_class');
	$clase_header	= $headerClass != '' ? ' class="' . $headerClass . '"' : '';

	if (!empty ($module->content)) : ?><
	<<?php echo $moduleTag; ?><?php echo $clase_modulo; ?>>

		<?php if ($module->showtitle) : ?>
		<<?php echo $headerTag . $clase_header ?>><?php echo $module->title; ?></<?php echo $headerTag; ?>>
		<?php endif; ?>

		<div<?php echo $bootstrapClass; ?>>
			<?php echo $module->content; ?>
		</div>
	
	</<?php echo $moduleTag; ?>>
	<?php endif;
}

function modChrome_onoff_section_container($module, &$params, &$attribs)
{
	$moduleTag      = $params->get('module_tag', 'div');
	$headerTag      = htmlspecialchars($params->get('header_tag', 'h3'));
	$bootstrapSize  = (int) $params->get('bootstrap_size', 0);
	$bootstrapClass	= $bootstrapSize != 0 ? ' columns-' . $bootstrapSize : '';

	$moduleClass	= htmlspecialchars($params->get('moduleclass_sfx'));
	$clase_modulo	= $moduleClass != '' ? ' class="' . $moduleClass . '"' : '';
	
	//$headerClass	= $params->get('header_class');
	//$clase_header	= $headerClass != '' ? ' class="' . $headerClass . '"' : '';
	
	$headerClass	= $params->get('header_class');
	$id_modulo		= $headerClass != '' ? ' id="' . $headerClass . '"' : '';

	if (!empty ($module->content)) : ?>
	<section<?php echo $id_modulo; ?><?php echo $clase_modulo; ?>>
	
		<?php if ($module->showtitle) : ?>
		<div class="header">
			<<?php echo $headerTag; ?>><?php echo $module->title; ?></<?php echo $headerTag; ?>>
		</div>
		<?php endif; ?>
	
		<<?php echo $moduleTag; ?> class="content<?php echo $bootstrapClass; ?>">
			<?php echo $module->content; ?>
		</<?php echo $moduleTag; ?>>
	
	</section>
	<?php endif;	
}