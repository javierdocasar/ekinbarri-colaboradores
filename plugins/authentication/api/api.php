<?php

/**
 * @package     Joomla.Plugin
 * @subpackage  Authentication.api
 *
 */

defined('_JEXEC') or die;
jimport('onoff.api');
use Joomla\Registry\Registry;
/**
 * Joomla Authentication plugin
 *
 * @since  3.2
 * @note   Code based on http://jaspan.com/improved_persistent_login_cookie_best_practice
 *         and http://fishbowl.pastiche.org/2004/01/19/persistent_login_cookie_best_practice/
 */
class PlgAuthenticationApi extends JPlugin
{
	/**
	 * Application object
	 *
	 * @var    JApplicationCms
	 * @since  3.2
	 */
	protected $app;

	/**
	 * Database object
	 *
	 * @var    JDatabaseDriver
	 * @since  3.2
	 */
	protected $db;


	/**
	 * This method should handle any authentication and report back to the subject
	 *
	 * @param array    $credentials Array holding the user credentials
	 * @param array    $options     Array of extra options
	 * @param object  &$response    Authentication response object
	 *
	 * @return  boolean
	 *
	 * @throws Exception
	 * @since   3.2
	 */
	public function onUserAuthenticate($credentials, $options, &$response)
	{
		$app = JFactory::getApplication();

		if ($app->isClient('site'))
		{
			$data = [
				"grant_type" => "password",
				"username"   => $credentials["username"],
				"password"   => $credentials["password"],
				"scope"      => "*",
			];

			$reg   = new Registry ($data);
			$api   = new ApiClient($reg, null);
			$token = $api->authenticate();
			if ($token) {
                $app = JFactory::getApplication();
                $app->input->cookie->set("access_token", $token['access_token']);






                    $response->status = JAuthentication::STATUS_SUCCESS;
                    $response->username = $credentials["username"];
                    $response->password = $credentials["password"];
                    $response->email = $credentials["username"];
                    $response->error_message = '';

            }
			else
            {
                //$app->setUserState("users.login.form.return", "http://localhost:8080/index.php/panel-de-control" );
                $response->status = JAuthentication::STATUS_FAILURE;
                $response->error_message = JText::_('JGLOBAL_AUTH_NOT_CONNECT');
            }
		}


	}




}

