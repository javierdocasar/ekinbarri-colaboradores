relationsTable = [];
columns=[
    {title:"NIF", field:"nif", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, cssClass:"green" , headerFilter:true},
    {title:"Empresa", field:"empresa", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, cssClass:"green" , headerFilter:true},
    {title:"Asociacion", field:"asociacion", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, headerFilter:true},
    {title:"Dirección", field:"direccion", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Localidad", field:"localidad", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"CP", field:"codigo-postal", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Provincia", field:"provincia", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Teléfono", field:"telefono", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Mail", field:"mail", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},


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

columnsActuaciones = [
    {title:"Fecha", field:"fecha", vertAlign:"middle", sorter:"string", resizable:true, frozen:true, cssClass:"green", headerFilter:true},
    {title:"Contacto", field:"contacto", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Modo", field:"modo_contacto", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Consultor", field:"consultor", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},
    {title:"Observaciones", field:"observaciones", vertAlign:"middle", sorter:"string", resizable:true, headerFilter:true},

];
columnsContactos = [
    {title:"Contacto", field:"contacto", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Cargo", field:"cargo", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Teléfono", field:"telefono", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"EMail", field:"mail", vertAlign:"middle", sorter:"string", resizable:true},
    {title:"Fecha", field:"created_At",  vertAlign:"middle", sorter:"date"},

];


relations = {
    "empresascontactos":{entity: "empresascontactos", field_relation: "id_empresa", id_relation:jQuery(".detail #id"), columns:columnsContactos, table:"#tableDataContactos", totals:  null,  totals_show: false, detail:true},
    "empresasactuaciones":{entity: "empresasactuaciones", field_relation: "id_empresa", id_relation:jQuery(".detail #id"), columns:columnsActuaciones, table:"#tableDataActuaciones", totals:  null,  totals_show: false, detail:true},


};


jQuery(window).on('load', function() {

    let settings = {
        entity: "empresas",
        table: "#tableData",
        totals:  jQuery(".list #mon-totals"),
        totals_show: true,
        actions: jQuery(".list #nav-actions"),
        tab_filter: jQuery(".list #nav-filter"),
        tab_filter_items:tab_filter_items,
        tab_filter_show: false,
        search: jQuery('.list #search-form'),
        config: jQuery('.list #config-form'),
        pager: jQuery(".list #nav-pager"),
        columns: columns,

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
