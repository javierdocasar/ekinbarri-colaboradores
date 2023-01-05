function DetailRelationManager(options)
{
    let _uid = null;
    let _detail = null;

    var settings = {
        entity:null,
        form:null,
        table:null,
        table_id:null,
        new:null,
        relations:[]
    }

    jQuery.extend(settings, options)

    let init = function (options) {
        initCalendar();
        eventHandler();
    };

    let load = function (id)
    {
        if (id === 0)
        {
            settings.form.resetear();
            jQuery(".relation").addClass("hidden");
            jQuery("#relation-"+settings.entity).removeClass("hidden");

            mostrarRelation();

        }
        else {
            api.get(`${settings.entity}/${id}`)
                .then((response) => {
                    _detail = response.data.data
                    renderDetail()

                })
                .catch((error) => {

                })
        }

    };

    let initCalendar = function ()
    {
        settings.form.serializeDateTime();
        settings.form.find("a.action.seldate").renderDate();
        settings.form.find("a.action.seltime").renderTime();
    }


    let renderDetail = function ()
    {

        settings.form.fill(_detail);
        jQuery(".relation").addClass("hidden");
        jQuery("#relation-"+settings.entity).removeClass("hidden");

        mostrarRelation();


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
                settings.table.updateData([response.data.data])
                showMessage("Master", `Se ha actualizado correctamente el registro`)

            })
            .catch ((error) => {
                console.log(error)
            })

    }
    let eventHandler = function ()
    {
        settings.form.on('click', ".nav-form a", function (e){
            e.preventDefault();
            let legend = jQuery(this).html();

            if (legend !== settings.form.find("li.active a").html())
            {
                settings.form.find("li").removeClass("active");
                jQuery(this).parent().addClass("active");
                settings.form.find("fieldset").addClass("hidden");
                settings.form.find("legend:contains("+legend+")").parent("fieldset").removeClass("hidden");

            }
        });
        settings.new.on('click', "",function (e){
            e.preventDefault();
            load(0);

        });


        settings.form.on('click', '.nav-actions .save', function (e){
            e.preventDefault();

            if (settings.form.valid()) {
                jQuery(this).waiting();
                if (jQuery('#id').val() === "0") {
                    createDetail();
                } else {
                    saveDetail()
                }
            }
        });

        /*jQuery(document).on("click", settings.table_id+" .row-edit", function (e){
            e.preventDefault();
            load(jQuery(this).data("id"))
        })*/
        settings.table.on("rowClick", function(e, row){
            e.preventDefault();
            load(row.getData()["id"]);

        });
        // Nuevo


        // Guardar
        settings.form.on('click', '.nav-actions .close', function (e){
            e.preventDefault();
            mostrarDetail();
        });
    }
    return {
        init: init,
        load:load,

    }
};

