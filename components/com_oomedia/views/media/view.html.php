<?php
// No permitir el acceso directo
defined('_JEXEC') or die('Acceso Restringido');

class OOMediaViewMedia extends JViewLegacy
{
	function display($tpl=null)
	{

		$document = JFactory::getDocument();



		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/components/com_oomedia/views/media/tmpl/js/moment.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/components/com_oomedia/views/media/tmpl/js/entityManager.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/components/com_oomedia/views/media/tmpl/js/entity.js" defer></script>');



		parent::display($tpl);

	}
}
?>
