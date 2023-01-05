const DetailMultipleManager = (function () {

    let _detail = null;
    let _select_data = [];

    var settings = {
        entity:null,
        form:null,
        table:null,
        new:null,
        relations:[],
        select:false,
        header_field:null
    }

    let init = function (options) {
        jQuery.extend(settings, options);
        settings.form.validateForm();
        settings.form.fieldmask();
        initCalendar();
        initSelect();
        initRelations();
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
                    _select_data = response.data;


                })
                .catch((error) => {
                });
        }
    };

    let initRelations = function() {
        console.log(settings.sections);
        settings.sections.forEach(function(el){
          console.log (el);
          if (el.relations)
            {
                var section = el.id;
                el.relations.forEach(function(relation)
                {
                    let settings = {
                        entity: relation.entity,
                        table: relation.table,
                        columns: relation.columns,
                        field_relation: relation.field_relation,
                        id_relation: jQuery("#section_"+section+" "+relation.id_relation),
                        totals: jQuery("#section_"+section+" "+relation.totals),
                        totals_show: relation.totals_show,
                        detail: relation.detail,

                    };
                    relationsTable[section+"_"+relation.entity] = new TableRelationManager(settings);
                    relationsTable[section+"_"+relation.entity].init();
                });
            }
        });
        /*for (const [key, value] of Object.entries(relations))
        {
            let settings = {
                entity: key,
                table: value.table,
                columns: value.columns,
                field_relation: value.field_relation,
                id_relation: value.id_relation,
                totals: value.totals,
                totals_show: value.totals_show,
                detail: value.detail,

            };
            relationsTable[key] = new TableRelationManager(settings);
            relationsTable[key].init();
        }*/
    };
    let confirmDelete = function () {

        jQuery.confirm({
            'message'	: `Vas a eliminar el registro en curso`,
            'buttons'	: {
                'Eliminar'	: {
                    'class'	: 'big',
                    'action': function(){
                        deleteDetail()
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
        jQuery('section.detail').addClass("hidden");
        jQuery('#section_'+_detail.declaracion_plantilla).removeClass("hidden");
        jQuery('#section_'+_detail.declaracion_plantilla+' form').renderSelect(_select_data);
        jQuery('#section_'+_detail.declaracion_plantilla+' form').fill(_detail);


        mostrarDetail();

        var relationTables = settings.sections.find(el => el.id == _detail.declaracion_plantilla);
        relationTables.relations.forEach(function(el){
            //relationsTable[i].load(_detail.id);
            relationsTable[_detail.declaracion_plantilla+"_"+el.entity].loadTable(_detail.id);
        });




    };
    let createDetail = function(callback, errorCallback)
    {
        let item = settings.form.serializer();
        api.post(`${settings.entity}`, item)
            .then((response) => {
                _detail = response.data.data;
                renderDetail();
                mostrarList();
                settings.table.addData([response.data.data], true)
                jQuery(this).removeWaiting();
            })
            .catch ((error) => {

            })

    }
    let saveDetail = function(callback, errorCallback)
    {
        let id = settings.form.find("#id").val();
        let item = settings.form.serializer();
        api.put(`${settings.entity}/${id}`, item)
            .then((response) => {
                jQuery(this).removeWaiting();
                mostrarList();
                settings.table.updateData([response.data.data])
                showMessage("Master", `Se ha actualizado correctamente el registro`)

            })
            .catch ((error) => {
                console.log(error)
            })

    }

    let deleteDetail = function (callback, errorCallback)
    {
        let id = settings.form.find('#id').val();
        api.delete(`${settings.entity}/${id}`)
            .then((response) => {
                mostrarList();
                settings.table.deleteRow(id);
                showMessage("OnOff", `Se ha eliminado el registro correctamente`)
            })
            .catch ((error) => {

            })
    }
    let eventHandler = function ()
    {
        /*jQuery("#"+settings.header_field).on("keyup change", function(){
           jQuery(".detail .header h1").html(jQuery("#"+settings.header_field).val());
        });*/

        settings.sections.forEach(function(el){

            jQuery(document).on('click', 'section#section_'+el.id+' .closedetail', function (e){
                e.preventDefault();
                mostrarList();
            });

            jQuery(document).on('click', 'section#section_'+el.id+' .saveDetail', function (e){
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


            jQuery(document).on('click', 'section#section_'+el.id+' .deletedetail', function (e){
                e.preventDefault();
                confirmDelete();
            });

            jQuery(document).on('click', 'section#section_'+el.id+' .nav-form a', function (e){
                e.preventDefault();
                let legend = jQuery(this).html();

                if (legend !== jQuery('section#section_'+el.id+' form').find("li.active a").html())
                {
                    jQuery('section#section_'+el.id+' form').find("li").removeClass("active");
                    jQuery(this).parent().addClass("active");
                    jQuery('section#section_'+el.id+' form').find("fieldset").addClass("hidden");
                    jQuery('section#section_'+el.id+' form').find("legend:contains("+legend+")").parent("fieldset").removeClass("hidden");
                }
            });


        });
        /*settings.form.on('click', ".nav-form a", function (e){
            e.preventDefault();
            let legend = jQuery(this).html();

            if (legend !== settings.form.find("li.active a").html())
            {
                settings.form.find("li").removeClass("active");
                jQuery(this).parent().addClass("active");
                settings.form.find("fieldset").addClass("hidden");
                settings.form.find("legend:contains("+legend+")").parent("fieldset").removeClass("hidden");
            }
        });*/



       /* settings.form.on('click', '#save', function (e){
            e.preventDefault();

            if (settings.form.valid()) {
                jQuery(this).waiting();
                if (jQuery('#id').val() === "0") {
                    createDetail();
                } else {
                    saveDetail();
                }
            }
        });*/

        settings.form.on('click', '#delete', function (e){
            e.preventDefault();
            confirmDelete();
        });


       /* settings.form.on('click', '.nav-actions .close', function (e){
            e.preventDefault();
            mostrarList();
        });
*/

        settings.new.on('click', "",function (e){
            e.preventDefault();
            load(0);

        });

        settings.table.on("rowClick", function(e, row){
            e.preventDefault();
            load(row.getData()["id"]);

        });



    };
    return {
        init: init,
        load:load,

    };
})();

