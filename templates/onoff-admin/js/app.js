/*
www.onoff.es
2014
*/

//const APIURL = 'http://localhost:8000/api/admin/';
//const APIURL = 'https://industria-api.onoffmultimedia.com/index.php/api/admin/'

// Ini js/css
document.documentElement.className = 'js';

//var viewp_h = jQuery(window).height();
var viewp_w; viewpW();

var mq = {xs:768, s:1024, l:1260, xl:1580};

var scrl_v = 200;



jQuery(document).ready(function()
{

	// TODO notificaciones


	/* General
	*****************************/

	// Touch
	if ('ontouchstart' in document)
	{
		jQuery('html').addClass('touch'); // class .touch en IEMobile
	}

	// Viewport
	viewpW();

	
	// Message
	jQuery('#system-message-container .close').on('click',function(event)
	{
		event.preventDefault();
		
		jQuery('#system-message-container').remove();
	});



	/* Forms
	*****************************/
	
	// Form nav.
	jQuery('.detail form').each(function(n_form, el)
	{
		var this_form = jQuery(el);
		var n_fieldsets = this_form.find('fieldset').length;

		if (n_fieldsets > 1)
		{
			this_form
			.addClass('has-nav')
			.find('> .header')
			.after('<nav class="nav-form"><ul></ul></nav>');

			var this_form_nav = jQuery(this_form.find('.nav-form ul'));

			jQuery.each(this_form.find('fieldset'), function(n_fieldset, el_fieldset)
			{
				var this_fieldset = jQuery(el_fieldset);
				var txt_legend = this_fieldset.find('legend').html();

				var menu_el = jQuery(document.createElement('li'));
				menu_el.attr("id",txt_legend);
				var el_link = jQuery(document.createElement('a'));

				menu_el.append(el_link);

				if (n_fieldset > 0)
				{
					this_fieldset.addClass('hidden');
				}
				else
				{
					menu_el.addClass('active');
				}

				el_link
				.html(txt_legend);
				
				this_form_nav.append(menu_el);
			});
		}
	});

	// Form notes focus
	/*jQuery('section#notes #note-text')
	.blur(function() {
		if (jQuery(this).val() == '')
		{
			jQuery(this).closest('section').removeClass('new-note');
		}
	});*/
		
	
	

	/* Menús
	*****************************/

	jQuery('#sitemap li').each(function(i, el)
	{
		var el_parent = jQuery(el);
		
		el_parent.find('a').first().on('click',function(event)
		{
			if (el_parent.hasClass('deeper parent'))
			{
				event.preventDefault();

				jQuery('#sitemap li.deeper.parent:not(.active)')
					.not(el_parent)
					.removeClass('expanded');

				jQuery(el_parent)
					.parents('li')
					.addClass('expanded');

				jQuery(el_parent)
					.toggleClass('expanded');
			}
		});
	});

	jQuery('.nav-actions button.expander')
	.on('click', function(event)
	{
		jQuery(this).find('+ ul').toggleClass('expanded');
	});

	jQuery('body')
	.on('click', '.nav-categories a, .nav-filter a, .nav-form a', function(event)
	{
		//if (viewp_w < mq.l) {
			jQuery(this).closest('nav').toggleClass('expanded');
		//}
	});



	/* Events
	*****************************/

	jQuery(document)
	.on('mouseup touchend',function(event)
	{
		if (viewp_w < mq.l)
		{
			// Cerrar Paneles
			var el = jQuery(event.target);

			if ((jQuery('html').hasClass('panel-sitemap')
				|| jQuery('html').hasClass('panel-right-notes')
				|| jQuery('html').hasClass('panel-right-alerts')
				|| jQuery('html').hasClass('panel-right-user'))
				&& jQuery(el).is('#main'))
			{
				jQuery('html')
				.removeClassPrefix('panel-');
			}
		}


		// Cerrar Desplegables
		var nav_el = jQuery(event.target).closest('nav');

		jQuery('.nav-actions')
		.not(nav_el)
		.find('ul.expanded')
		.removeClass('expanded');

		jQuery('.nav-categories.expanded, .nav-filter.expanded, .nav-form.expanded')
		.not(nav_el)
		.removeClass('expanded');
	});


	/* Actions
	*****************************/

	jQuery('a[href$="#sitemap"]').on('click touchstart',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.toggleClass('panel-sitemap');
	});

	/* jQuery('a[href$="#search-all"]').on('click',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.removeClassPrefix('panel-', 'panel-top');

		jQuery('section#search-all form input').focus();
	}); */

	// Expansores
	/*jQuery('.expandable .expandable-expander').on('click',function(event)
	{
		event.preventDefault();
		
		jQuery(this).closest('.expandable').toggleClass('collapsed');
	});*/


	// Search-all
	/*jQuery('button#b-search-all-cancel').on('click',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.removeClass('panel-top');
	});*/


	// Alerts
	jQuery('a[href$="#alerts"]').on('click',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.removeClassPrefix('panel-', 'panel-right-alerts');

		/*var panel = (jQuery('html').hasClass('panel-right-alerts')) ? 'panel-right-alerts' : '';
		jQuery.cookie('wg-panel', panel, { path: '/' });*/

		resize();
	});


	// Notes
	/*jQuery('a[href$="#notes"]').on('click',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.removeClassPrefix('panel-', 'panel-right-notes');

		var panel = (jQuery('html').hasClass('panel-right-notes')) ? 'panel-right-notes' : '';
		jQuery.cookie('wg-panel', panel, { path: '/' });
		
		resize();
	});*/


	// User
	/*jQuery('a[href$="#user"]').on('click',function(event)
	{
		event.preventDefault();

		jQuery('html')
		.removeClassPrefix('panel-', 'panel-right-user');
		
		resize();
	});*/


	// Print
	/*jQuery('a[href$="#print"]').on('click',function(event)
	{
		print_prepare();
	})*/



	/* Links
	*****************************/
	
	jQuery('.goto a, a.goto').on('click',function(event)
	{
		var anchor = "#"+jQuery(this).attr("href").split("#")[1];
		
		if (anchor && jQuery(anchor).length > 0)
		{
			event.preventDefault();
			
			jQuery(window).scrollTo(anchor, scrl_v, {axis:'y', onAfter:function()
			{
				location.hash = anchor;
			}});
		}
	});



	/* Cookies
	*****************************/

	/*if (jQuery.cookie('wg-panel') && jQuery('body').hasClass('user') && viewp_w > mq.l)
	{
		jQuery('html').addClass(jQuery.cookie('wg-panel'));

		jQuery('html')
		.addClass('panel-no-anim');
	}*/



	/* Login Intro.
	*****************************/

	if (jQuery('article.login, article.remind, article.reset').length > 0) {
	}
});

jQuery(window).on("load",function()
{

	/* Ini
	*****************************/
	
	resize();

	jQuery('html').addClass('charged');
});

jQuery(window).resize(function() { resize(); });
//jQuery(window).scroll(function() { scroll(); });


function viewpW()
{
	viewp_w = jQuery(window).width();
}

function resize()
{
	viewpW();

	// Calendar
	if (('ontouchstart' in document)
		&& viewp_w < mq.s
		&& jQuery('section#calendar').length > 0)
	{
		jQuery('#calendario').fullCalendar('changeView', 'agendaList');
	}

	// RTable
	//jQuery('.rtable:visible').trigger('footable_initialize');
}



/* Print
*****************************/

/*function print_prepare()
{
	jQuery('.value-print').remove();

	jQuery('#content input, #content textarea, #content select').each(function(i, el)
	{
		var _el = jQuery(el);
		var _value = _el.val();

		switch (el.type)
		{
			case 'checkbox':
				_value = el.checked ? 'Si' : 'No';
				break;

			case 'select-one':
				_value = (_value && _value != '0') ? _el.find('option[value="' + _value + '"]').text() : '';
				break;
		}

		if (el.type != 'hidden' && _value != '')
		{
			var _el_class = 'printable';
			_el_class += (el.type == 'textarea') ? ' full-print' : '';

			_el
			.closest('.form-element')
			.addClass(_el_class)
			.append('<span class="value-print">' + _value + '</span>');

			//console.log(el.type + ' "' + _value + '"')
		}
	});

	jQuery('body').addClass('printable');

	window.print();

	setTimeout(function() { jQuery('body').removeClass('printable'); }, 100);
}*/


/* Remove/Add Class
*****************************/

(function ($) {
$.fn.removeClassPrefix = function (prefix, toggleClass)
{
    this.each(function (n, el)
    {
    	var hasToggleClass = false;
        var classes = el.className.split(" ").map(function (item)
        {
        	if (item == toggleClass)
        	{
        		hasToggleClass = true;
        	}
        	return item.indexOf(prefix) === 0 ? "" : item;
        });
        if(!hasToggleClass)
        {
        	classes.push(toggleClass);
        }
        el.className = classes.join(" ");
    });

    jQuery(window).scrollTo(0, scrl_v, {axis:'y'});
 
    return this;
}
})(jQuery);




/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
// (function (factory) {
// 	if (typeof define === 'function' && define.amd) {
// 		// AMD
// 		define(['jquery'], factory);
// 	} else if (typeof exports === 'object') {
// 		// CommonJS
// 		factory(require('jquery'));
// 	} else {
// 		// Browser globals
// 		factory(jQuery);
// 	}
// }(function ($) {

// 	var pluses = /\+/g;

// 	function encode(s) {
// 		return config.raw ? s : encodeURIComponent(s);
// 	}

// 	function decode(s) {
// 		return config.raw ? s : decodeURIComponent(s);
// 	}

// 	function stringifyCookieValue(value) {
// 		return encode(config.json ? JSON.stringify(value) : String(value));
// 	}

// 	function parseCookieValue(s) {
// 		if (s.indexOf('"') === 0) {
// 			// This is a quoted cookie as according to RFC2068, unescape...
// 			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
// 		}

// 		try {
// 			// Replace server-side written pluses with spaces.
// 			// If we can't decode the cookie, ignore it, it's unusable.
// 			// If we can't parse the cookie, ignore it, it's unusable.
// 			s = decodeURIComponent(s.replace(pluses, ' '));
// 			return config.json ? JSON.parse(s) : s;
// 		} catch(e) {}
// 	}

// 	function read(s, converter) {
// 		var value = config.raw ? s : parseCookieValue(s);
// 		return $.isFunction(converter) ? converter(value) : value;
// 	}

// 	var config = $.cookie = function (key, value, options) {

// 		// Write

// 		if (value !== undefined && !$.isFunction(value)) {
// 			options = $.extend({}, config.defaults, options);

// 			if (typeof options.expires === 'number') {
// 				var days = options.expires, t = options.expires = new Date();
// 				t.setTime(+t + days * 864e+5);
// 			}

// 			return (document.cookie = [
// 				encode(key), '=', stringifyCookieValue(value),
// 				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
// 				options.path    ? '; path=' + options.path : '',
// 				options.domain  ? '; domain=' + options.domain : '',
// 				options.secure  ? '; secure' : ''
// 			].join(''));
// 		}

// 		// Read

// 		var result = key ? undefined : {};

// 		// To prevent the for loop in the first place assign an empty array
// 		// in case there are no cookies at all. Also prevents odd result when
// 		// calling $.cookie().
// 		var cookies = document.cookie ? document.cookie.split('; ') : [];

// 		for (var i = 0, l = cookies.length; i < l; i++) {
// 			var parts = cookies[i].split('=');
// 			var name = decode(parts.shift());
// 			var cookie = parts.join('=');

// 			if (key && key === name) {
// 				// If second argument (value) is a function it's a converter...
// 				result = read(cookie, value);
// 				break;
// 			}

// 			// Prevent storing a cookie that we couldn't decode.
// 			if (!key && (cookie = read(cookie)) !== undefined) {
// 				result[name] = cookie;
// 			}
// 		}

// 		return result;
// 	};

// 	config.defaults = {};

// 	$.removeCookie = function (key, options) {
// 		if ($.cookie(key) === undefined) {
// 			return false;
// 		}

// 		// Must not alter options, thus extending a fresh object...
// 		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
// 		return !$.cookie(key);
// 	};

// }));

