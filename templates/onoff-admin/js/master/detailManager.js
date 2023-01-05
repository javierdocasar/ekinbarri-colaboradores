const DetailManager = (function () {
    let _uid = null;
    let _detail = null;

    var settings = {
        entity:null,
        form:null,
        table:null,
        new:null,
        relations:[],
        select:false,
        header_field:null
    };

    let init = function (options) {
        jQuery.extend(settings, options);
        settings.form.validateForm();
        settings.form.fieldmask();
        initCalendar();
        initSelect();
        eventHandler();
    };

    let load = function (id)
    {
        if (id === 0)
        {
            settings.form.resetear();
            mostrarDetail();

        }
        else {
            api.get(`${settings.entity}/${id}`)
                .then((response) => {
                    _detail = response.data.data;
                    renderDetail();

                })
                .catch((error) => {

                });
        }

    };

    let initCalendar = function ()
    {
        settings.form.serializeDateTime();
        settings.form.find("a.action.seldate").renderDate();
        settings.form.find("a.action.seltime").renderTime();
    };
    let initSelect = function ()
    {
        if (settings.select) {
            api.get(`${settings.entity}/select`)
                .then((response) => {
                    settings.form.renderSelect(response.data);

                })
                .catch((error) => {
                });
        }
    };
    let confirmDelete = function () {

        jQuery.confirm({
            'message'	: `Vas a eliminar el registro en curso`,
            'buttons'	: {
                'Eliminar'	: {
                    'class'	: 'big',
                    'action': function(){
                        deleteDetail();
                    }
                },
                'Cancelar'	: {
                    'class'	: 'subb big',
                    'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
                }
            }
        });
    };

    let renderDetail = function ()
    {

        settings.form.fill(_detail);
        if (typeof _detail.h1 =='string')
        {
            jQuery(".detail .header h1").html(_detail.h1);
        }

        if (typeof _detail.h2 =='string')
        {
            jQuery(".detail .header h2").html(_detail.h2);
        }
        //jQuery(".detail .header h1").html(_detail[settings.header_field]);
        mostrarDetail();
        for (const [key, element] of Object.entries(relationsTable))
        {
            element.loadTable(_detail.id);
        }

    };
    let createDetail = function(callback, errorCallback)
    {
        let item = settings.form.serializer();
        api.post(`${settings.entity}`, item)
            .then((response) => {
                _detail = response.data.data;
                renderDetail();
                mostrarList();
                settings.table.addData([response.data.data], true);
                jQuery(this).removeWaiting();
            })
            .catch ((error) => {

            });

    };
    let saveDetail = function(callback, errorCallback)
    {
        let id = settings.form.find("#id").val();
        let item = settings.form.serializer();
        api.put(`${settings.entity}/${id}`, item)
            .then((response) => {
                jQuery(this).removeWaiting();
                mostrarList();
                settings.table.updateData([response.data.data]);
                showMessage("Master", `Se ha actualizado correctamente el registro`);

            })
            .catch ((error) => {
                console.log(error);
            });

    };

    let deleteDetail = function (callback, errorCallback)
    {
        let id = settings.form.find('#id').val();
        api.delete(`${settings.entity}/${id}`)
            .then((response) => {
                mostrarList();
                settings.table.deleteRow(id);
                showMessage("OnOff", `Se ha eliminado el registro correctamente`);
            })
            .catch ((error) => {

            });
    };
    let eventHandler = function ()
    {
        jQuery("#"+settings.header_field).on("keyup change", function(){
           jQuery(".detail .header h1").html(jQuery("#"+settings.header_field).val());
        });
        settings.form.on('click', ".nav-form a", function (e){
            e.preventDefault();
            let legend = jQuery(this).html();

            if (legend !== settings.form.find("li.active a").html())
            {
                settings.form.find("li").removeClass("active");
                jQuery(this).parent().addClass("active");
                settings.form.find("fieldset").addClass("hidden");
                settings.form.find("legend:contains("+legend+")").parent("fieldset").removeClass("hidden");
                //settings.table.redraw();



            }
        });
        settings.new.on('click', "",function (e){
            e.preventDefault();
            load(0);

        });


        settings.form.on('click', '#save', function (e){
            e.preventDefault();

            if (settings.form.valid()) {
                jQuery(this).waiting();
                if (jQuery('#id').val() === "0") {
                    createDetail();
                } else {
                    saveDetail();
                }
            }
        });

        settings.form.on('click', '#delete', function (e){
            e.preventDefault();
            confirmDelete();
        });

        settings.table.on("rowClick", function(e, row){
            e.preventDefault();
            load(row.getData()["id"]);

        });
        /*jQuery(document).on("click", "#tableData .row-edit", function (e){

            load(jQuery(this).data("id"))
        })*/
        // Nuevo


        // Guardar
        settings.form.on('click', '.nav-actions .close', function (e){
            e.preventDefault();
            mostrarList();
        });
    };
    return {
        init: init,
        load:load,

    };
})();

