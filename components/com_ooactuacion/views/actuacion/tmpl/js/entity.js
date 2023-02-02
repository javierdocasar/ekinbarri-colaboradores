relationsTable = [];
columns=[
    {title:"Fecha", field:"fecha", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, cssClass:"green" },
    {title:"Empresa", field:"empresa", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Contacto", field:"contacto", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Modo", field:"modo_contacto", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Consultor", field:"consultor", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Observaciones", field:"observaciones", vertAlign:"middle", sorter:"string", resizable:true},

];


relations = {


};


tab_filter_items = {
    type: "static",
    static: {
        todos: {field: "activo", type: "=", value: "all"},
        filter1: {field: "activo", type: "=", value: "filtro1"},
        filter2: {field: "activo", type: "=", value: "filtro2"},
    }
};





jQuery(window).on('load', function() {

    let settings = {
        entity: "actuaciones",
        table: "#tableData",
        totals:  jQuery(".list #mon-totals"),
        totals_show: true,
        actions: jQuery(".list #nav-actions"),
        tab_filter: jQuery(".list #nav-filter"),
        tab_filter_show: true,
        search: jQuery('.list #search-form'),
        config: jQuery('.list #config-form'),
        pager: jQuery(".list #nav-pager"),
        columns: columns,
        tab_filter_items:tab_filter_items,
        detail:true,
        select:true,
        relations:relations


    };


    tManager = TableManager.init(settings);



    for (const [key, value] of Object.entries(relations))
    {
        let settings = {
            entity: key,
            table: value.table,
            columns: value.columns,
            field_relation: value.field_relation,
            id_relation: value.id_relation,
            totals: value.totals,
            totals_show: value.totals_show,
            detail: value.detail
        };
        relationsTable[key] = new TableRelationManager(settings);
        relationsTable[key].init();
    }

    jQuery('#id_empresa').on("change", function (e){
        e.preventDefault();
        e.stopPropagation();

        let id = jQuery("#id_empresa").val();
        api.get(`actuaciones/contactos/${id}`)
            .then((response) => {

                response.data['id_contacto'].forEach(function (element, index) {

                    jQuery('#id_contacto').append(jQuery('<option>', {
                        value: element.id,
                        text : element.value
                    }));
                })


            })
            .catch((error) => {
            });
    })
});

