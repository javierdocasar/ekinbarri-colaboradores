<?php
/**
 * @package     Joomla.Platform
 * @subpackage  OAuth2
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('JPATH_PLATFORM') or die;

use Joomla\Registry\Registry;

/**
 * OnOff Platform class for interacting with an OAuth 2.0 server.
 *
 * @since       3.1.4
 */
class ApiClient
{
    /**
     * @var    Registry  Options for the JOAuth2Client object.
     * @since  3.1.4
     */
    protected $options;

    /**
     * @var    JHttp  The HTTP client object to use in sending HTTP requests.
     * @since  3.1.4
     */
    protected $http;

    /**
     * @var    JInput  The input object to use in retrieving GET/POST data.
     * @since  3.1.4
     */
    protected $input;


    /**
     * Constructor.
     *
     * @param Registry $options JOAuth2Client options object
     * @param JHttp    $http    The HTTP client object
     *
     * @throws Exception
     * @since   3.1.4
     */
    public function __construct(Registry $options = null, JHttp $http = null)
    {
        $this->options = isset($options) ? $options : new Registry;
        $this->http = isset($http) ? $http : new JHttp($this->options);

        $api_host = JFactory::getConfig()->get("api_host");

        $this->setOption("token_url", $api_host."/api/admin/users/login");
        $this->setOption("client_id", JFactory::getConfig()->get("api_client_id"));
        $this->setOption("client_secret", JFactory::getConfig()->get("api_client_secret"));

        $app = JFactory::getApplication();
        $token = $app->getUserState("access_token");

        $this->setToken($token);
    }

    /**
     * Get the access token or redirect to the authentication URL.
     *
     * @return  mixed The access token
     *
     * @throws RuntimeException
     * @throws Exception
     * @since   3.1.4
     */
    public function authenticate()
    {
        $data['grant_type'] = 'password';
        $data['client_id'] = $this->getOption('client_id');
        $data['client_secret'] = $this->getOption('client_secret');
        $data['username'] = $this->getOption('username');
        $data['password'] = $this->getOption('password');
        $data['scope'] = $this->getOption('scope');

        $headers = ['Content-Type' => 'application/x-www-form-urlencoded'];


        $response = $this->http->post($this->getOption('token_url'), $data, $headers);

        if ($response->code >= 200 && $response->code < 400)
        {
            if ((strpos($response->headers['Content-Type'], 'application/json') === 0) || (strpos($response->headers['content-type'], 'application/json') === 0))
            {
                $token = array_merge(json_decode($response->body, true), array('created' => time()));
            }
            else
            {
                parse_str($response->body, $token);
                $token = array_merge($token, array('created' => time()));
            }

            $this->setToken($token);

            return $token;
        }
        else
        {
            return false;
        }



    }

    /**
     * Verify if the client has been authenticated
     *
     * @return  boolean  Is authenticated
     *
     * @since   3.1.4
     */
    public function isAuthenticated()
    {
        $token = $this->getToken();

        if (!$token || !array_key_exists('access_token', $token))
        {
            return false;
        }
        elseif (array_key_exists('expires_in', $token) && $token['created'] + $token['expires_in'] < time() + 20)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    /**
     * Send a signed Oauth request.
     *
     * @param string $url     The URL for the request.
     * @param mixed  $data    The data to include in the request
     * @param array  $headers The headers to send with the request
     * @param string $method  The method with which to send the request
     * @param int    $timeout The timeout for the request
     *
     * @return  string  The URL.
     *
     * @throws  InvalidArgumentException
     * @throws  RuntimeException*@throws Exception
     * @throws Exception
     * @since   3.1.4
     */
    public function query($url, $data = null, $headers = array(), $method = 'get', $timeout = null)
    {
        $token = $this->getToken();

        // Token Expired
        if (array_key_exists('expires_in', $token) && $token['created'] + $token['expires_in'] < time() + 20)
        {
            if (!$this->getOption('use_refresh'))
            {
                return false;
            }

            $token = $this->refreshToken($token['refresh_token']);
        }

        if (!$this->getOption('auth_method') || $this->getOption('auth_method') == 'bearer')
        {
            $headers['Content-Type'] = 'application/json';
            $headers['Authorization'] = 'Bearer ' . $token['access_token'];
        }

        switch ($method)
        {
            case 'head':
            case 'get':
            case 'delete':
            case 'trace':
                $response = $this->http->$method($url, $headers, $timeout);
                break;
            case 'post':
            case 'put':
            case 'patch':
                $response = $this->http->$method($url, $data, $headers, $timeout);
                break;
            default:
                throw new InvalidArgumentException('Unknown HTTP request method: ' . $method . '.');
        }

        if ($response->code < 200 || $response->code >= 400)
        {
            throw new RuntimeException('Error code ' . $response->code . ' received requesting data: ' . $response->body . '.');
        }

        return $response->body;
    }

    /**
     * Get an option from the JOAuth2Client instance.
     *
     * @param   string  $key  The name of the option to get
     *
     * @return  mixed  The option value
     *
     * @since   3.1.4
     */
    public function getOption($key)
    {
        return $this->options->get($key);
    }

    /**
     * Set an option for the JOAuth2Client instance.
     *
     * @param   string  $key    The name of the option to set
     * @param   mixed   $value  The option value to set
     *
     * @return  ApiClient  This object for method chaining
     *
     * @since   3.1.4
     */
    public function setOption($key, $value)
    {
        $this->options->set($key, $value);

        return $this;
    }

    /**
     * Get the access token from the JOAuth2Client instance.
     *
     * @return  array  The access token
     *
     * @since   3.1.4
     */
    public function getToken()
    {
        return $this->getOption('access_token');
    }

    /**
     * Set an option for the JOAuth2Client instance.
     *
     * @param array $value The access token
     *
     * @return  ApiClient  This object for method chaining
     *
     * @throws Exception
     * @since   3.1.4
     */
    public function setToken($value)
    {
        if (is_array($value) && !array_key_exists('expires_in', $value) && array_key_exists('expires', $value))
        {
            $value['expires_in'] = $value['expires'];
            unset($value['expires']);
        }

        $this->setOption('access_token', $value);

        $app = JFactory::getApplication();
        $app->setUserState("access_token", $value);

        return $this;
    }

    public function setPermissions($value)
    {



        $app = JFactory::getApplication();
        $app->setUserState("access_permissions", $value);

        return $this;
    }

    /**
     * Refresh the access token instance.
     *
     * @param   string  $token  The refresh token
     *
     * @return  array  The new access token
     *
     * @since   3.1.4
     * @throws  Exception
     * @throws  RuntimeException
     */
    public function refreshToken($token = null)
    {
        if (!$this->getOption('use_refresh'))
        {
            throw new RuntimeException('Refresh token is not supported for this OAuth instance.');
        }

        if (!$token)
        {
            $token = $this->getToken();

            if (!array_key_exists('refresh_token', $token))
            {
                throw new RuntimeException('No refresh token is available.');
            }

            $token = $token['refresh_token'];
        }

        $data['grant_type'] = 'refresh_token';
        $data['refresh_token'] = $token;
        $data['client_id'] = $this->getOption('client_id');
        $data['client_secret'] = $this->getOption('client_secret');
        $response = $this->http->post($this->getOption('token_url'), $data);

        if ($response->code >= 200 || $response->code < 400)
        {
            if (strpos($response->headers['content-type'], 'application/json') === 0)
            {
                $token = array_merge(json_decode($response->body, true), array('created' => time()));
            }
            else
            {
                parse_str($response->body, $token);
                $token = array_merge($token, array('created' => time()));
            }

            $this->setToken($token);

            return $token;
        }
        else
        {
            throw new Exception('Error code ' . $response->code . ' received refreshing token: ' . $response->body . '.');
        }
    }
}
