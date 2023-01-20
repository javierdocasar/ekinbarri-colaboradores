relationsTable = [];
columns=[
    {title:"Empresa", field:"empresa", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, cssClass:"green" },
    {title:"Acrónimo", field:"acronimo", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Código", field:"codigo", vertAlign:"middle", sorter:"string", resizable:true, },
    {title:"Activo", field:"activo",  vertAlign:"middle", sorter:"boolean", hozAlign:"center", formatter:fmtSiNo,maxWidth:60,},

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
        entity: "empresas",
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
});
