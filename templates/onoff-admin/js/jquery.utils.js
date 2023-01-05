if (typeof jQuery === "undefined") {
    throw new Error("jQuery is not loaded.");
}
// Converters
var Converters = {
    string: function (value) {
        return String(value);
    },
    number: function (value) {
        return Number(value);
    },
    boolean: function (value) {
        return (value === true || value === "true" || value === "on" || typeof value == "number" && value > 0 || value === "1");
    },
    json: function (value) {
        if (!value) { return null; }
        return JSON.parse(value);
    }
};

const findValue = function(parent, dotNot) {

    if (!dotNot || !dotNot) return undefined;

    var splits = dotNot.split(".");
    var value;

    for (var i = 0; i < splits.length; ++i) {
        value = parent[splits[i]];
        if (value === undefined) return undefined;
        if (typeof value === "object") parent = value;
    }

    return value;
};
jQuery.fn.serializerSearch = function () {
    var $form = this
    var output = [];
    $form.find("[data-field][data-serialize]").each(function () {
        var $element = jQuery(this)
        output.push({field:$element.data("field"), "type":$element.data("type"), value:$element.val()})
    });

    return output;
}
jQuery.fn.serializer = function(){


    var $form = this, serializedForm = {};

       // Collect information from all [data-field] elements
        $form.find("[data-field][data-serialize]").each(function () {

            // Get the current element
            var $element = jQuery(this)

                // How to get the value?
                , how = $element.attr("data-value") || "val"

                // Get params
                , params = $element.attr("data-params")

                // Get field name
                , field = $element.attr("data-field")

                // Convert to
                , convertTo = $element.attr("data-convert-to")

                // Delete if
                , deleteIfValue = $element.attr("data-delete-if")

                // Arguments that are passed to how function
                , howArguments = params ? [params] : []

                // Create the value
                , value = $element[how].apply($element, howArguments)
            ;

            // Convert to a valid value
            if (convertTo && Converters[convertTo]) {
                value = Converters[convertTo](value);
                deleteIfValue = Converters[convertTo](deleteIfValue);
            }

            // Verify if value can be added
            if ((value === deleteIfValue)){
                return;
            }

            // Set the value in the serialized form object using the field
            serializedForm[field] = value;
    });

    return serializedForm;
};


jQuery.fn.serializer.converters = Converters;

jQuery.fn.fill = function(data) {

    var $fields = jQuery("[data-field]", this)

    $fields.each(function () {
         var $field = jQuery(this)
             , path = $field.attr("data-field")
             , value = findValue(data, path)
             , dataParams = $field.attr("data-params")
             , dataValue = $field.attr("data-value") || "val"
             , args = dataParams ? [dataParams] : []
             , convertTo = $field.attr("data-convert-to")
        ;
        //
         if (convertTo === "json" && typeof value !== "string") {
             value = JSON.stringify(value, null, 4);
         }
        //
         args.push(value);
        //
         $field[dataValue].apply($field, args);
    });
}

jQuery.fn.waiting = function() {
    jQuery(this).addClass("waiting");
};

jQuery.fn.removeWaiting = function() {
    jQuery(".waiting").removeClass("waiting");
};


jQuery.fn.renderSearch = function (data) {
    const filter = data;
    let fields = jQuery("[data-field]", this);
    fields.each(function () {
        var field = this;
        if (filter[jQuery(this).attr("data-field")]!=undefined) {
            filter[jQuery(this).attr("data-field")].forEach(function (element, index) {

                jQuery(field).append(jQuery('<option>', {
                    value: element.id,
                    text: element.value
                }));
            })
        }
    });
    jQuery('*[data-multiple=true]').each(function(indes){
        jQuery(this).multiSelect({noneText: 'Seleccionar',allText:'Todos', presets:[{name:'Todos',all:true},{name:'Seleccionar',all:false}]});
    });

}


jQuery.fn.renderSelect = function (data) {
    const filter = data;
    let fields = jQuery("[data-preload]", this)
    fields.each(function () {
        var field = this;
        filter[jQuery(this).attr("data-preload")].forEach(function (element, index) {

            jQuery(field).append(jQuery('<option>', {
                value: element.id,
                text : element.value
            }));
        })

    });
}


jQuery.fn.searchText = function(){


    var $form = this, searchText = "";

    // Collect information from all [data-field] elements
    $form.find("[data-field]").each(function () {

        // Get the current element
        var $element = jQuery(this);
        var params = $element.attr("data-params")?$element.attr("data-params"):"";
        var value="";
        if ($element.is("select")) {
            if ($element.prop("multiple"))
            {
                $element.find(":selected").each(function(index){
                        value += jQuery(this).text()+",";
                    });
                value = value.substr(0,value.length-1);
            }
            else {
                value = $element.val() === "" ? "" : $element.find(":selected").text();
            }
        }
        else
        {
            value = $element.val() === "" ? "" :  params+$element.val();
        }



        if ( (value==='')){
            return;
        }

        // Set the value in the serialized form object using the field
        searchText = searchText+ " | " +value;
    });

    return searchText;
};

jQuery.fn.visible = function() {
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

jQuery.fn.fieldmask = function () {
    jQuery(".mCodPostal").mask("00000",{placeholder:" "});
    jQuery(".mDate").mask("00/00/0000", {placeholder: "__/__/____"});
    jQuery(".mTime").mask("00:00",{placeholder:" "});
    jQuery(".mDateTime").mask("00/00/0000 00:00",{placeholder:" "});
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



jQuery.fn.serializeDateTime = function()
{
    jQuery(this).find('.serialize-datetime').on("change",".mDate", function(e){
        var datetime_field = jQuery(this).data("datetime")
        var date_field = jQuery(this).data("datetime")+"_date"
        var time_field = jQuery(this).data("datetime")+"_time"
        var formatTime = ""
        if (jQuery("#"+time_field).val()=="")
        {
            formatTime= "DD/MM/YYYY";
        }
        else
        {
            formatTime= "DD/MM/YYYY HH:mm";
        }
        jQuery('#'+datetime_field).val(moment(jQuery("#"+date_field).val()+" "+jQuery("#"+time_field).val(), formatTime).format('YYYY-MM-DD HH:mm'))



    });

    jQuery(this).find('.serialize-datetime').on("change",".mTime", function(e){
        var datetime_field = jQuery(this).data("datetime")
        var date_field = jQuery(this).data("datetime")+"_date"
        var time_field = jQuery(this).data("datetime")+"_time"
        var formatTime = ""
        if (jQuery("#"+date_field).val()=="")
        {
            formatTime= "HH:mm";
        }
        else
        {
            formatTime= "DD/MM/YYYY HH:mm";
        }
        jQuery('#'+datetime_field).val(moment(jQuery("#"+date_field).val()+" "+jQuery("#"+time_field).val(), formatTime).format('YYYY-MM-DD HH:mm'))
    });

}
jQuery.fn.renderDate = function()
{

    jQuery(this).off("click").on("click", function(e){
        if(jQuery(this).html()=="Abrir")
        {
            jQuery(this).html("Cerrar");
            var $input = jQuery(this).parent().find(".mDate").pickadate({editable: true,format: 'dd/mm/yyyy', formatSubmit: 'dd/mm/yyyy',clear:'',close:''});
            var picker = $input.pickadate('picker');
            picker.on('close', function (data){
                setTimeout(function(){jQuery('.action.seldate').html("Abrir");}, 300);

            });
            e.preventDefault();
            e.stopPropagation();
            var curDate = jQuery(this).parent().find("input.mDate").val()
            if (curDate != '')
            {
                picker.set('select', curDate, { format: 'dd/mm/yyyy' })
            }
            else
            {
                picker.set('view', new Date())
            }
            picker.render(true);
            picker.open();
        }
        else
        {
            jQuery(this).html("Abrir");
            e.preventDefault();
            e.stopPropagation();
        }

    });
}


jQuery.fn.renderTime = function()
{
    jQuery(this).off("click").on("click", function(e){
        if(jQuery(this).html()=="Abrir")
        {
            jQuery(this).html("Cerrar");
            var $input = jQuery(this).parent().find(".mTime").pickatime({editable: true,format: 'HH:i', formatSubmit: 'HH:i',clear:'',close:'', hiddenPrefix:'pre_'});
            var picker = $input.pickatime('picker');
            picker.on('close', function (data){
                setTimeout(function(){jQuery('.action.seltime').html("Abrir");}, 300);

            });
            e.preventDefault();
            e.stopPropagation();

            var curDate = jQuery(this).parent().find("input.mTime").val()
            if (curDate != '')
            {
                picker.set('select', curDate, { format: 'HH:i' })
            }
            else
            {
                picker.set('view', new Date())
            }
            picker.render(true);
            picker.open();
        }
        else
        {
            jQuery(this).html("Abrir");
            e.preventDefault();
            e.stopPropagation();
        }

    });

}
jQuery.fn.setdatetime = function(){

    jQuery(this).on ("click",function(event){
        event.preventDefault();
        jQuery(this).next().html();
        if (jQuery(this).next().hasClass("mDateTime")==true)
        {
            jQuery(this).next().val(moment().format("D/MM/YYYY h:mm"));
        }
        else if (jQuery(this).next().hasClass("mDate")==true)
        {
            jQuery(this).next().val(moment().format("D/MM/YYYY"));
        };
    });

}
