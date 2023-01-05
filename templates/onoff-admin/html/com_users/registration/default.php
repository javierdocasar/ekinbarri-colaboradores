<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('behavior.keepalive');
JHtml::_('behavior.tooltip');
JHtml::_('behavior.formvalidation');
?>
<article class="registration <?php echo $this->pageclass_sfx?>">
<?php if ($this->params->get('show_page_heading')) : ?>
	<div class="header">
		<h1><?php echo $this->escape($this->params->get('page_heading')); ?></h1>
	</div>
<?php endif; ?>

	<div class="content">
		<form id="member-registration" action="<?php echo JRoute::_('index.php?option=com_users&task=registration.register'); ?>" method="post" class="form-validate form-horizontal" enctype="multipart/form-data">
		<?php foreach ($this->form->getFieldsets() as $fieldset): // Iterate through the form fieldsets and display each one.?>
			<?php $fields = $this->form->getFieldset($fieldset->name);?>
			<?php if (count($fields)):?>
			<fieldset>
<?php
/************************** Me salto el primer legend */
if ($fieldset->name != 'default'): ?>
			<?php if (isset($fieldset->label)):// If the fieldset has a label set, display it as the legend.
			?>
				<legend><?php echo JText::_($fieldset->label);?></legend>
			<?php endif;?>
<?php endif;
/**************************/ ?>
			<?php foreach ($fields as $field) :// Iterate through the fields in the set and display them.?>
<?php
/************************** Me salto el primer elemento ("Campo requerido *") */
if ($field->name != 'jform[spacer]'): ?>
				<?php if ($field->hidden):// If the field is hidden, just display the input.?>
					<?php echo $field->input;?>
				<?php else:?>
					<div class="form-element">
						<?php echo $field->label; ?>
						<?php echo $field->input; 
							if ($field->id=='jform_username')
							{
								echo "<div class=\"info\">Tu DNI o NIE sin puntos ni espacios y con letra may&uacute;scula</div>";
							}
						?>
					</div>
				<?php endif;?>
<?php endif;
/**************************/ ?>
			<?php endforeach;?>
			</fieldset>
			<?php endif;?>
			<?php endforeach;?>

			<div class="footer">
<?php /*		<a class="button subb" href="<?php echo JRoute::_('');?>" title="<?php echo JText::_('JCANCEL');?>"><?php echo JText::_('JCANCEL');?></a>
				&nbsp; */?>
				<button type="submit" class="submit big full"><?php echo JText::_('JREGISTER');?></button>
				<input type="hidden" name="option" value="com_users" />
				<input type="hidden" name="task" value="registration.register" />
				<?php echo JHtml::_('form.token');?>
			</div>
		</form>
	</div>
</article>

