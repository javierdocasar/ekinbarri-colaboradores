<?php
// No permitir el acceso directo
defined('_JEXEC') or die('Acceso Restringido');

class OOEmpresaViewEmpresa extends JViewLegacy
{
	function display($tpl=null)
	{

		$document = JFactory::getDocument();
		$app = JFactory::getApplication();

		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js//moment.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/pickadate/picker.min.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/master/tableManager.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/master/detailManager.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/master/tableRelationManager.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/master/detailRelationManager.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/templates/onoff-admin/js/tabulator/js/tabulator.js" defer></script>');
		$document->addCustomTag('<script type="text/javascript" src="'.JURI::root(true).'/components/com_ooempresa/views/empresa/tmpl/js/entity.js" defer></script>');




		parent::display($tpl);

	}
}
?>
