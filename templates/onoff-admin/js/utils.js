const TOKEN = getCookie("access_token");
const api = axios.create({
	//baseURL: 'http://127.0.0.1:8000/api/admin/',
	baseURL: 'https://colaboradores-api.ekinbarri.eus/index.php/api/admin/',
	headers: {'Authorization': 'Bearer ' + TOKEN, 'Content.Type':'application/json'}
})

var html_error		= '<div class="error"><p>#</p></div>';

jQuery(document).ready(function()
{
	jQuery("nav#sitemap").on("click", "li.disabled", function(e)
	{
		e.preventDefault();
		showError("Atención", "<p>No tiene autorizaci&oacute;n para ver este apartado.</p><p>Consulte con su administrador.</p>");
	});
});


function getCookie(name)
{
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}


/*function showError(title, message)
{
	try
	{
		var html_aviso_error 	= "<div class=\"error\" id=\"system-message\"><a class=\"close\" data-dismiss=\"alert\">\xD7</a><h4 class=\"message\">#title</h4><p>#message</p></div>";

		html_aviso = html_aviso_error.replace(/#title/g, title);
		html_aviso = html_aviso.replace(/#message/g, message);
		jQuery("#system-message-container *").remove();
		jQuery("#system-message-container").append(html_aviso);
		//jQuery("html").addClass("onmessage");

		jQuery('#system-message-container').on('click', function(event) {
			event.preventDefault();
			jQuery('#system-message-container *').remove();
		});
//		setTimeout(function(){
//			jQuery('#system-message-container *').slideUp(300);
//			//jQuery('#system-message-container *').remove();
//		}, 3000);
	}
	catch(err)
	{
		alert("showError: "+err);
	}

}

function showMessage (title, message)
{
	try
	{
		var html_aviso_error 	= "<div class=\"message\" id=\"system-message\"><a class=\"close\" data-dismiss=\"alert\">\xD7</a><h4 class=\"message\">#title</h4><p>#message</p></div>";

		html_aviso = html_aviso_error.replace(/#title/g, title);
		html_aviso = html_aviso.replace(/#message/g, message);
		jQuery("#system-message-container *").remove();
		jQuery("#system-message-container").append(html_aviso);
		//jQuery("html").addClass("onmessage");

		jQuery('#system-message-container').on('click', function(event) {
			event.preventDefault();
			jQuery('#system-message-container *').remove();
		});
		setTimeout(function(){
			jQuery('#system-message-container *').slideUp(300);
			//jQuery('#system-message-container *').remove();
		}, 3000);



	}
	catch(err)
	{
		alert("showError: "+err);
	}

}*/

function desactivarSubmit(elemento, texto)
{
	jQuery('#'+elemento).text(texto);
	jQuery('#'+elemento).attr("disabled", "disabled");
	jQuery('#'+elemento).addClass("wait");
}

function activarSubmit(elemento, texto)
{
	jQuery('#'+elemento).text(texto);
	jQuery('#'+elemento).removeAttr("disabled");
	jQuery('#'+elemento).removeClass("wait");

}

function openNewSelectDetail()
{
	jQuery('html').addClass("view-select");
	jQuery('html').removeClass("view-detail");
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');

}

function closeNewSelectDetail()
{
	jQuery('html').removeClass("view-new-select");
	jQuery('html').addClass("view-detail");

}


function mostrarList()
{
	jQuery('section.list').removeClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').addClass('off');
	jQuery('section.subrelation').addClass('off');
	jQuery('section.direct').addClass('off');
	if (jQuery('html').hasClass('view-list')== false)
		jQuery('html').removeClassPrefix('view-', 'view-list');
}


function mostrarDetail()
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').removeClass('off');
	jQuery('section.relation').addClass('off');
	//jQuery('section.relation').html("");
	jQuery('section.subrelation').addClass('off');
	jQuery('section.subrelation').html("");
	jQuery('section.direct').addClass('off');
	jQuery('section.select.inject').removeClass('visible');


	if (jQuery('html').hasClass('view-detail')== false)
		jQuery('html').removeClassPrefix('view-', 'view-detail');
}

function gotoFirstTab()
{
	// Mostrar primer TAB
	jQuery(".nav-form li").removeClass("active").first().addClass("active");
	jQuery("form fieldset").addClass("hidden").first().removeClass("hidden");
	jQuery('form .invalid').removeClass("invalid");

}
function mostrarRelation()
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').removeClass('off');
	jQuery('section.subrelation').addClass('off');
	jQuery('section.subrelation').html("");
	jQuery('section.direct').addClass('off');
	if (jQuery('html').hasClass('view-relation')== false)
		jQuery('html').removeClassPrefix('view-', 'view-relation');
}


function mostrarSubRelation()
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').addClass('off');
	jQuery('section.subrelation').removeClass('off');
	jQuery('section.direct').addClass('off');
	if (jQuery('html').hasClass('view-subrelation')== false)
		jQuery('html').removeClassPrefix('view-', 'view-subrelation');
}

function mostrarDirect()
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').addClass('off');
	jQuery('section.relation').html("");
	jQuery('section.subrelation').addClass('off');
	jQuery('section.subrelation').html("");
	jQuery('section.direct').removeClass('off');
	if (jQuery('html').hasClass('view-direct')== false)
		jQuery('html').removeClassPrefix('view-', 'view-direct');
}


function mostrarSelect(select)
{


	jQuery('section.detail').addClass('off');
	jQuery("section.visible").removeClass("visible");
	jQuery("table."+select).closest("section.select").addClass("visible");
}


function mostrarSelector(select)
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').addClass('off');
	jQuery('section.subrelation').addClass('off');
	jQuery('section.direct').addClass('off');

	jQuery("table."+select+" tbody").html("");
	jQuery("section.visible").removeClass("visible");
	jQuery("table."+select).closest("section.select div.list").removeClass("hidden");
	jQuery("table."+select).closest("section.select div.content").addClass("hidden");
	jQuery("table."+select).closest("section.select").addClass("visible");

}

function mostrarSelectInt(select)
{
	jQuery('section.list').addClass('off');
	jQuery('section.detail').addClass('off');
	jQuery('section.relation').addClass('off');

	jQuery("table."+select+" tbody").html("");
	//jQuery("section.visible").removeClass("visible");
	//jQuery("table."+select).closest("section.select div.list").removeClass("hidden");
	//jQuery("table."+select).closest("section.select div.content").addClass("hidden");
	jQuery("table."+select).closest("section.select").addClass("loading");
	jQuery("table."+select).closest("section.select").addClass("visible");

}

function mostrarEvent()
{

	jQuery('html').removeClassPrefix('view-', 'view-event');

}


function cerrarSelect()
{

		mostrarDetail();

}

function cerrarSelectInt()
{
	jQuery('.select.inject.visible').removeClass('visible').addClass('loading');
	jQuery('button[data-select]').closest('.form-element').removeClass('hidden');

	if (jQuery('html').hasClass('view-detail'))
	{
		mostrarDetail();
	}
	else if (jQuery('html').hasClass('view-relation'))
	{
		mostrarRelation();
	}
	else if (jQuery('html').hasClass('view-list'))
	{
		mostrarList();
	}



}
function closeSelect()
{
	jQuery('.select.inject.visible').removeClass('visible').addClass('loading');
	jQuery('button[data-select]').closest('.form-element').removeClass('hidden');
}


function loadTable(table, form, id)
{
	// Cargar datos
    jQuery.ajax({
        url : "index.php?option=com_wgselect&task=select.getMultipleSelectRows&format=raw",
        data :"select="+table+"&params="+id,
        dataType : 'json',
        success : function(data) {

        	var tabs = table.split(";");

        	for (i = 0; i < tabs.length; i++) {

        		jQuery("table."+tabs[i]+" tbody").html(data[tabs[i]]);
        	}

        	form.trigger("footable_redraw");
        }
    });
}


// Plugin JqUERY VISIBLE
/*jQuery.fn.visible = function() {
    return this.css('display', 'block');
};

jQuery.fn.invisible = function() {
    return this.css('display', 'none');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('display', function(i, visibility) {
        return (visibility == 'none') ? 'block' : 'none';
    });
};

jQuery.fn.enabled = function() {
    return this.removeAttr('disabled');
};

jQuery.fn.disabled= function() {
    return this.attr('disabled','disabled');
};
*/
function refreshMenu(form)
{
	form.each(function(n_form, el)
			{
				var this_form = jQuery(el);
				var n_fieldsets = this_form.find('fieldset').length;

				if (n_fieldsets > 1)
				{
					this_form
					.addClass('has-nav')
					.find('.header')
					.first()
					.append('<nav class="nav-form"><ul></ul></nav>');

					var this_form_nav = jQuery(this_form.find('.nav-form ul'));

					jQuery.each(this_form.find('fieldset'), function(n_fieldset, el_fieldset)
					{
						var this_fieldset = jQuery(el_fieldset);
						var txt_legend = this_fieldset.find('legend').html();

						var menu_el = jQuery(document.createElement('li'));
						menu_el.attr("id",txt_legend);

						var el_link = jQuery(document.createElement('a'));
						//var menu_link = jQuery(document.createElement('a'));
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
						//menu_link.wrap('<li></li>');

					});
				}
			});

		jQuery('.nav-filter, .nav-form')

}
/*

jQuery.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


jQuery.fn.resetear = function () {

		jQuery(this).each (function() {
			  this.reset();
			 });

		jQuery("input[name*='[id]']", this).val("0");
		//jQuery(this).find('tbody').html("");

		  var validator = this.validate({
				errorClass: "invalid",
						highlight: function(element, errorClass, validClass) {
					jQuery(element).addClass(errorClass).removeClass(validClass);
					jQuery(element).parents('div .form-element').addClass(errorClass).removeClass(validClass);
				  },
				unhighlight: function(element, errorClass, validClass) {
				    jQuery(element).removeClass(errorClass).addClass(validClass);
				    jQuery(element).parents('div .form-element').removeClass(errorClass);
				  }
			});

			validator.resetForm();

};

jQuery.fn.inputmask = function () {
	  jQuery(".mCodPostal").mask("99999",{placeholder:" "});
	  jQuery(".mDate").mask("99/99/9999",{placeholder:" "});
	  jQuery(".mTime").mask("99:99",{placeholder:" "});
	  jQuery(".mDateTime").mask("99/99/9999 99:99",{placeholder:" "});
	  jQuery(".mDecimal").on("keypress", function (event){
		   var charCode = (event.which) ? event.which : event.keyCode;
		   if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
		       return false;
		    return true;
	  });
	  jQuery(".mEntero").on("keypress", function (event){
		   var charCode = (event.which) ? event.which : event.keyCode;
		   if (charCode > 31 && (charCode < 48 || charCode > 57))
		       return false;
		    return true;
	  });

	  jQuery(".mPhone").on("keypress", function (event){
		   var charCode = (event.which) ? event.which : event.keyCode;
		   if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode!=35))
		       return false;
		    return true;
	  });

};

jQuery.fn.formatDate = function (date) {

	var dateFormat = ("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear();
	return this.val(dateFormat);
};

jQuery.fn.formatTime = function (date) {

	var timeFormat = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2);
	return this.val(timeFormat);
};

jQuery.fn.validateForm = function(){

	this.validate({
		errorClass: "invalid",
		highlight: function(element, errorClass, validClass) {
			jQuery(element).addClass(errorClass).removeClass(validClass);
			jQuery(element).parents('div .form-element').addClass(errorClass).removeClass(validClass);
		  },
		unhighlight: function(element, errorClass, validClass) {
		    jQuery(element).removeClass(errorClass).addClass(validClass);
		    jQuery(element).parents('div .form-element').removeClass(errorClass);
		  }

	});



};


jQuery.fn.resetValidate= function(){

	var validator = this.validate({
		errorClass: "invalid",
				highlight: function(element, errorClass, validClass) {
			jQuery(element).addClass(errorClass).removeClass(validClass);
			jQuery(element).parents('div .form-element').addClass(errorClass).removeClass(validClass);
		  },
		unhighlight: function(element, errorClass, validClass) {
		    jQuery(element).removeClass(errorClass).addClass(validClass);
		    jQuery(element).parents('div .form-element').removeClass(errorClass);
		  }
	});

	validator.resetForm();
};

jQuery.fn.toggleMenu = function(){
	jQuery(this)
	.on('click','.nav-filter, .nav-form',function(event)
	{
		if (viewp_w <= mq.xs)
		{
			jQuery(this).toggleClass('expanded');
		}
	});

};

jQuery.fn.navigator = function(){

	jQuery(this).each(function(n_form, el)
			{
				var this_form = jQuery(el);
				var n_fieldsets = this_form.find('fieldset').length;

				if (n_fieldsets > 1)
				{
					this_form
					.addClass('has-nav')
					.find('> .header')
					.append('<nav class="nav-form"><ul></ul></nav>');

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
}
jQuery.fn.changeTab = function(){

	jQuery(this).on ("changeTab", "a", function(event, form, urlSave, id, table){


		if (form.valid()==true)
		{

			if (table!=-1)
			{
				jQuery.ajax({
				  url: urlSave,
				  type:'POST',
				  data: form.serialize(),
				  success: function(data) {
						var res = JSON.parse(data);
						var footable = jQuery('table.'+table).data('footable');
						if (id.val() == "0")
						{

							footable.appendRow(res.data);
						}
						else
						{
							var selected = jQuery('table.'+table+' td.row-edit').filter(function() {
								return jQuery(this).data('id')==id;
							});
							jQuery(selected).parent().replaceWith(res.data);
						}
						id.val(res.id);


				  },
				  error:function(){

				  }
				});
			}

			lengend = jQuery(this).html();
			jQuery(this).closest('form').find("fieldset").addClass("hidden");
			jQuery(this).closest('form').find("legend:contains("+lengend+")").parent("fieldset").removeClass("hidden");
			jQuery(this).closest('form').find("legend:contains("+lengend+")").parent("fieldset").children('table').trigger('footable_initialize');


			jQuery(this).closest('ul').find('li').removeClass('active');
			jQuery(this).parent().addClass("active");
			//var posicion = jQuery(this).closest('form').find("legend:contains("+lengend+")").offset().top;
			jQuery(this).closest('form').find("legend:contains("+lengend+")").scrollTop();
		}
		else
		{
			jQuery(window).scrollTo(0, scrl_v, {axis:'y'});
			showMessage("WorkGuardian", "Antes de continuar debe completar los campos marcados en rojo.");
		}
	});
};
*/


/*jQuery.fn.autocompletejson = function(){
	json = jQuery(this).data("json");

	jQuery.ajax({
		  dataType: "json",
		  context:this,
		  url: "index.php?option=com_micehelper&task=json."+json+"&format=raw",
		  success: function (data)
		  {
			  jQuery(this).autocomplete({
					source: data,
					appendTo:jQuery(this).parent()
			  	});
		  }
		});

};*/



// c: Numero decimales
// d: Simbolo decimal
// t:Simbolo miles
Number.prototype.formatMoney = function(c, d, t){
	var n = this,
	    c = isNaN(c = Math.abs(c)) ? 2 : c,
	    d = d == undefined ? "," : d,
	    t = t == undefined ? "." : t,
	    s = n < 0 ? "-" : "",
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
//@ sourceURL=utils.js

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}


String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
