const templateConfig = "<div class='form-element checkbox'><input  value='1' data-field='#field#' type='checkbox' name='config-#index#' id='config-#index#'><label for='config-#index#'>#title#</label></div>";

const TableManager = (function () {
    let _table = null;
    let _detail = null;
    let _rows = null;
    let _pager_params = null;
    let _order_params = null;
    let _header_filter_params = null;
    let _tab_filter_params = null;
    let _filter_items = [];
    let _search_params = null;
    let _tab_params = null;
    let _page = 1;
    let _tableOptions = {layout:"fitDataFill", renderVertical:"basic",
        persistence: {sort: false, filter: false, group: false, page: false, columns: ["title","width", "visible", "frozen"], },
        dataSendParams:"sorter", paginationSize:50, maxHeight:"100%",
        groupHeader: function(value, count, data, group){
            return value ;
        },
        groupToggleElement:false,
        };
    let _activeFilters = false;



    var settings = {
        entity:null,
        table:null,
        table_groupby: null,
        actions:null,
        totals:null,
        totals_show: true,
        tab_filter:null,
        tab_filter_show: true,
        tab_filter_items:null,
        search: null,
        search_load:false,
        config:null,
        pager:null,
        columns:null,
        detail:false,
        sections:null,
        header_field:null,
        relations:[],
        rowFormatter:null,
        redirect:null,
    };

    let init = function (options) {
        console.log("init");
        jQuery.extend(settings, options);
        initFilters();
        initTable();
        loadTable(true);
        initDetail();
        if (settings.redirect) {
            if (settings.redirect.type =="detail") {
                DetailMultipleManager.load(settings.redirect.id);
            }
            else
            {
                DetailManager.load(settings.redirect.id)
            }
        }
        initCalendar();
        initSearch();
        eventHandler();
    };

    let initTable = function ()
    {
        settings.totals_show?settings.totals.removeClass("hidden"):settings.totals.addClass("hidden");
        settings.tab_filter_show?settings.tab_filter.removeClass("hidden"):settings.tab_filter.addClass("hidden");

        _table = new Tabulator(settings.table, {columns:settings.columns, rowFormatter:settings.rowFormatter, persistenceID:settings.entity, groupBy:settings.table_groupby,..._tableOptions});
    };
    let initDetail = function()
    {
        if (settings.detail)
        {
            var settingsDetail = {
                entity: settings.entity,
                form: jQuery('#formData'),
                table: _table,
                new: jQuery('#new'),
                relations: settings.relations,
                select: settings.select,
                header_field: settings.header_field,
                sections:settings.sections,
            };
            if (settings.detail_multiple)
            {

                _detail = DetailMultipleManager.init(settingsDetail);
            }else
            {

                _detail = DetailManager.init(settingsDetail);
            }
        }
    };
    let initCalendar = function ()
    {
        settings.search.serializeDateTime();
        settings.search.find("a.action.seldate").renderDate();
        settings.search.find("a.action.seltime").renderTime();
    };
    let initSearch = function ()
    {
        if (settings.search_load) {
            api.get(`${settings.entity}/search`)
                .then((response) => {
                    settings.search.renderSearch(response.data);

                })
                .catch((error) => {
                });
        }
    };
    let initFilters = function (){
        if (settings.tab_filter_items.type =="static")
        {
            _filter_items = settings.tab_filter_items.static;
        }
        else

        {
            params = settings.tab_filter_items.dynamic;
            api.get(`${settings.entity}/filters`,{params:params})
                .then((response) => {
                    var filters = {filter0:{field:"id_barco", type:"=",value:"all"}};
                    var tmpl = "<li class='' data-filter='filter#ID#'><a href='#'>#VALUE#</a></li>";
                    var catHtml = "";

                    jQuery(response.data).each(function(index)
                    {
                        const obj = {};
                        const i = index +1;
                        let tmplItem = tmpl;
                        Reflect.set(obj, 'filter'+i,{field:settings.tab_filter_items.dynamic.relation, type:'=', value:response.data[index].id});
                        Object.assign(filters, obj);
                        tmplItem = tmplItem.replace("#ID#", i);
                        tmplItem = tmplItem.replace("#VALUE#", response.data[index].value);
                        catHtml += tmplItem;



                    });
                    _filter_items = filters;
                    settings.tab_filter.find('ul').append(catHtml);



                })
                .catch((error) => {
                });
        }
    };

    let loadTable = function (reloadTotals)
    {

        //_tableLoading = true;
        //_table.blockRedraw();

        jQuery(settings.table + " .tabulator-tableholder").addClass("off");

        if (typeof _table.getSorters==="function")
        {
            let sorter = _table.getSorters();
            if (sorter.length) {
                _order_params = {field: sorter[0].field, dir: sorter[0].dir};
            }
        }

        let params = {page:_page, header_filter:_header_filter_params, tab_filter:_tab_filter_params,search:_search_params, order: _order_params};
        if (settings.redirect) {
            if (settings.redirect.type == "list") {
                params = {page: 1, search: settings.redirect.params};
            }
        }




        api.get(`${settings.entity}?XDEBUG_SESSION_START=PHPSTORM`,{params:params} )
            .then((response) => {
                _rows = response.data.data;
                _pager_params = response.data.meta["pagination"];
                _tab_params = response.data.meta["tabs"];
                _table.setData(_rows);
                renderPaginator();
                disableTabs();
                jQuery('#textSearch').html(settings.search.searchText());
                jQuery(settings.table + " .tabulator-tableholder").removeClass("off");



            })
            .catch ((error) => {
            })

        if (reloadTotals && settings.totals_show) {
            resetTotals();
            api.get(`${settings.entity}/counters?XDEBUG_SESSION_START=PHPSTORM`, {params: params})
                .then((response) => {
                    renderTotals(response.data);
                })
                .catch((error) => {
                })
        }
    }

    let renderPaginator = function ()
    {
        if (_pager_params["total_pages"] === 1)
        {
            settings.pager.addClass("hidden");
        }
        else
        {
            settings.pager.removeClass("hidden");
            if (_pager_params["current_page"] === 1) {
                settings.pager.find(".prev").addClass("disabled");
                settings.pager.find(".next").removeClass("disabled");
            }
            else if (_pager_params["current_page"] === _pager_params["total_pages"])
            {
                settings.pager.find(".next").addClass("disabled");
                settings.pager.find(".prev").removeClass("disabled");
            }
            else
            {
                settings.pager.find(".next").removeClass("disabled");
                settings.pager.find(".prev").removeClass("disabled");
            }

            settings.pager.find(".label-default").html(_pager_params["current_page"] + " de " + _pager_params["total_pages"]);
        }

    }

    let disableTabs = function ()
    {
        if (settings.tab_filter_items.type =="dynamic") {
            var interval = setInterval(function () {
                if (Object.keys(_filter_items).length === 0) {

                } else {
                    settings.tab_filter.find("li").addClass("off");
                    jQuery(Object.values(_filter_items)).each(function (index, value) {
                        settings.tab_filter.find("[data-filter='filter0']").removeClass("off");
                        if (_tab_params.includes(value.value) && value.value != 'all') {
                            console.log(value.value);
                            settings.tab_filter.find("[data-filter='filter" + index + "']").removeClass("off");
                        }
                    });
                    clearInterval(interval);
                }
            }, 100);
        }

    };
    let renderTotals = function (totals)
    {
        for (const [key, value] of Object.entries(totals)) {
            settings.totals.find("#total_"+key).html(value);
        }
    }

    let resetTotals = function ()
    {
        settings.totals.find("dd").html("—")
    }

    let eventHandler = function ()
    {
        //
        _table.on("tableBuilding", function(){
            let htmlConfig = "";
            _table.options.columns.forEach(function(value, index){
                htmltemp = replaceAll('#index#', index, templateConfig);
                htmltemp = replaceAll('#title#', value.title, htmltemp);
                htmltemp = replaceAll('#field#', value.field, htmltemp);
                htmlConfig +=htmltemp;
            })
            settings.config.html(htmlConfig);

        })

        _table.on("tableBuilt", function(){
            let layout = _table.getColumnLayout();
            layout.forEach(function(value, index){
                settings.config.find("*[data-field='"+value.field+"']").prop("checked", value.visible)

            });

        });

        settings.config.on("change","input", function (e) {
            _table.toggleColumn(jQuery(this).data("field"))

        });

        // Paginador
        settings.pager.on("click",   "[data-page='prev']", function (e) {
            e.preventDefault();
            console.log("previous page")
            _page = --_pager_params["current_page"];
            loadTable(false);
        });

        settings.pager.on("click",  "[data-page='next']", function (e) {
            e.preventDefault();
            console.log("next page")
            _page = ++_pager_params["current_page"];
            loadTable(false);
        });


        //Tab Filter
        settings.tab_filter.on("click","li", function(e){
            e.preventDefault();
            console.log("filter");
            let tab = jQuery(this).data("filter");
            _tab_filter_params =  _filter_items[tab];
            settings.tab_filter.find(".active").removeClass("active");
            jQuery(this).addClass("active");
            _page = 1;
            loadTable(true);

        });
        // Header Filter
        _table.on("dataFiltering", function(filters){
            if (_activeFilters === true) {
                _header_filter_params = filters;
                _page = 1;
                loadTable(true);
            }

        });

        _table.on("dataLoading", function(data){
            _activeFilters  = false;
        });

        _table.on("dataProcessed", function(){
            _activeFilters  = true;
        });

        // Search

        settings.search.on("click", ".filter", function(e){
            e.preventDefault();
            e.stopPropagation();
            //jQuery(this).waiting();
            _page = 1;
            settings.redirect = null;
            _search_params = settings.search.serializerSearch();
            loadTable(true);
            settings.actions.find("#openSearch").trigger("click");

        })

        // Show / Hide fields

        settings.actions.on("click","#openConfig", function(e){
            e.preventDefault();
            jQuery(this).closest("section").removeClass("search-list-active");
            jQuery(this).closest("section").toggleClass("config-list-active");
        });
        settings.actions.on("click","#openFilter", function(e){
            e.preventDefault();
            _table.blockRedraw();
            var columns = _table.getColumnDefinitions();
            columns.forEach(function(value, index){

                if (value.headerFilter == true)
                {
                    _table.updateColumnDefinition(value.field, {headerFilter:false});
                }
                else if (typeof value.headerFilter != 'undefined')
                {
                    _table.updateColumnDefinition(value.field, {headerFilter:true});
                }
            })
            _table.restoreRedraw();
            //_table.updateColumnDefinition(value.field, {headerFilter:false})
        });

        settings.actions.on("click","#openSearch", function(e){
            e.preventDefault();
            jQuery(this).closest("section").removeClass("config-list-active");
            jQuery(this).closest("section").toggleClass("search-list-active");
        });

        settings.actions.on("click","#export", function(e){
            e.preventDefault();
            jQuery(this).waiting();
            let fields = _table.getColumnLayout();
            let search_text = settings.search.searchText();
            let params = {page:_page, header_filter:_header_filter_params, tab_filter:_tab_filter_params,search:_search_params, search_text: search_text, order: _order_params, fields:fields}
            api.get(`${settings.entity}/export?XDEBUG_SESSION_START=PHPSTORM`,{responseType: 'arraybuffer', params:params})
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    jQuery(this).removeWaiting();
                })
                .catch ((error) => {
                    jQuery(this).removeWaiting();
                });

        });

        //SORTER
        _table.on("headerClick", function(e, column){
            e.preventDefault();
            e.stopPropagation();
            _page = 1;
            loadTable(false);
        });

        window.addEventListener('resize', function(){

            _table.redraw(true); //trigger full rerender including all data and rows
        });

    }
    return {
        init: init
    }
})();


// FORMATTERS
var fmtEstado = function(cell, formatterParams, onRendered){ //plain text value
    return (cell.getValue()=='PROCESADO') ? '<span class="indicator positive">PROCESADO</span>' : '<span class="indicator negative">CARGADO</span>';
    //return "<i class='fa fa-print'></i>";
};

var fmtBoxEstado = function(cell, formatterParams, onRendered){ //plain text value
    return ((cell.getValue()=='NUEVO') || (cell.getValue()=='MODIFICADO')) ? '<span class="indicator positive">'+cell.getValue().toUpperCase()+'</span>' : '<span class="indicator" >'+cell.getValue().toUpperCase()+'</span>';
    //return "<i class='fa fa-print'></i>";
};

var fmtSiNo = function(cell, formatterParams, onRendered){ //plain text value
    return (parseInt(cell.getValue())) ? '<span class="indicator positive"></span>' : '<span class="indicator negative"></span>';
    //return "<i class='fa fa-print'></i>";
};

var fmtEdit = function(cell, formatterParams, onRendered){ //plain text value
    return "<a class='button row-edit edit' data-id='"+cell.getValue()+"'>&nbsp;</a>";
};

function fmtBox(cell, formatterParams, onRendered){
    return '<span class="">'+cell.getValue().toUpperCase()+'</span>';
}

function fmtDate(cell, formatterParams, onRendered){
    return moment(cell.getValue()).format("DD-MM-YYYY")
}

function fmtDateTime(cell, formatterParams, onRendered){
    return moment(cell.getValue()).format("DD-MM-YYYY HH:mm")
}

var fmtNovedad = function(cell, formatterParams, onRendered){ //plain text value
    return (parseInt(cell.getValue())) ? '<span class="indicator positive"></span>' : '';
    //return "<i class='fa fa-print'></i>";
};

var fmtCantidad = function(cell, formatterParams, onRendered){ //plain text value
    return (parseInt(cell.getValue())) ?(parseInt(cell.getValue()))+ "t.":"";
    //return "<i class='fa fa-print'></i>";
};