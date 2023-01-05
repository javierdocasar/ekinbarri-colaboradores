const templateConfig = "<div class='form-element checkbox'><input  value='1' data-field='#field#' type='checkbox' name='config-#index#' id='config-#index#'><label for='config-#index#'>#title#</label></div>";

const ReportManager = (function () {
    let _table = null;
    let _rows = null;
    let _pager_params = null;
    let _order_params = null;
    let _header_filter_params = null;
    let _tab_filter_params = null;
    let _tab_month_params = null;
    let _tab_year_params = null;
    let _tab_group_params = null;
    let _tab_categories_params = null;
    let _tab_view_params = null;
    let _categories_items = [];
    let _filter_items = [];
    let _view_items = [];
    let _search_params = null;
    let _tab_params = null;
    let _page = 1;
    let _view_id = 0;
    let _tableOptions = {layout:"fitColumns", renderVertical:"basic",
        dataSendParams:"sorter", paginationSize:50, maxHeight:"100%",
        groupHeader: function(value, count, data, group){
            return value ;
        },
        groupToggleElement:false,
        columnCalcs:"groups",
        columnDefaults:{
            tooltip:true,
            headerTooltip:true
        }
        };

    let _activeFilters = false;

    var settings = {
        entity:null,
        table:null,
        table_groupby: null,
        actions:null,
        totals:null,
        totals_show: true,
        totals_dynamic: false,
        totals_wait:false,
        tab_filter:null,
        tab_filter_show: true,
        tab_filter_items:null,
        tab_filter_type: "tags",
        tab_view:null,
        tab_view_show: false,
        tab_view_items:null,
        tab_view_type: "select",
        tab_categories:null,
        tab_categories_show: true,
        tab_categories_items:null,
        tab_month:null,
        tab_year:null,
        tab_group:null,
        search: null,
        search_load:false,
        config:null,
        pager:null,
        columns:null,
        load_table:true,
        reload:true,
        rowFormatter:null,
    };

    let init = function (options) {
        console.log("init");
        jQuery.extend(settings, options);
        settings.search.fieldmask();
        initCategories();
        initFilters();
        initViews();
        initTable();
        initCalendar();
        initSearch();



    };

    let initTable = function ()
    {
        if (settings.totals_show)
        {
            settings.totals.removeClass("hidden");
        }
        else {
            settings.totals.addClass("hidden");
        }
        if (settings.tab_categories_show)
        {
            settings.tab_categories.removeClass("hidden");
        }
        else {
            settings.tab_categories.addClass("hidden");
        }
        if (settings.columns.type == 'static') {
            _table = new Tabulator(settings.table, {
                columns: settings.columns.static,
                rowFormatter: settings.rowFormatter,
                persistenceID: settings.entity,
                groupBy: settings.table_groupby, ..._tableOptions
            });
            if (settings.load_table) {
                loadTable(true);
            }
            eventHandler();
        }
        else
        {
            api.get(`informes/${settings.entity}/columns/${_view_id}`)
                .then((response) => {
                    _table = new Tabulator(settings.table, {
                        columns: response.data,
                        rowFormatter: settings.rowFormatter,
                        persistenceID: settings.entity,
                        groupBy: settings.table_groupby, ..._tableOptions
                    });
                    if (settings.load_table) {
                        loadTable(true);
                    }
                    eventHandler();
                })
                .catch((error) => {
                });
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
            api.get(`informes/${settings.entity}/search`)
                .then((response) => {
                    settings.search.renderSearch(response.data);


                })
                .catch((error) => {
                });
        }
    };

    let initCategories = function (){
        if (settings.tab_categories_show) {
            if (settings.tab_categories_items.type == "static") {
                _categories_items = settings.tab_categories_items.static;
            } else {
                params = settings.tab_categories_items.dynamic;
                api.get(`informes/${settings.entity}/categories`, {params: params})
                    .then((response) => {
                        var categories = {category0: {field: "id_barco", type: "=", value: "all"}};
                        var tmpl = "<li class='' data-category='category#ID#'><a href='#'>#VALUE#</a></li>";
                        var catHtml = "";

                        jQuery(response.data).each(function (index) {
                            const obj = {};
                            const i = index + 1;
                            let tmplItem = tmpl;
                            Reflect.set(obj, 'category' + i, {
                                field: settings.tab_categories_items.dynamic.relation,
                                type: '=',
                                value: response.data[index].id
                            });
                            Object.assign(categories, obj);
                            tmplItem = tmplItem.replace("#ID#", i);
                            tmplItem = tmplItem.replace("#VALUE#", response.data[index].value);
                            catHtml += tmplItem;

                        });
                        _categories_items = categories;
                        settings.tab_categories.find('ul').append(catHtml);
                    })
                    .catch((error) => {
                    });
            }
        }
    };
    let initFilters = function (){
        if (settings.tab_filter_show) {
            if (settings.tab_filter_items.type == "static") {

                _filter_items = settings.tab_filter_items.static;
            } else {
                params = settings.tab_filter_items.dynamic;
                api.get(`informes/${settings.entity}/filters`, {params: params})
                    .then((response) => {

                        var filters;
                        if (settings.tab_filter_type == 'tags') {
                            filters = {category0: {field: "", type: "=", value: "all"}};
                            var tmpl = "<li class='' data-filter='filter#ID#'><a href='#'>#VALUE#</a></li>";
                            var catHtml = "";

                            jQuery(response.data).each(function (index) {
                                const obj = {};
                                const i = index + 1;
                                let tmplItem = tmpl;
                                Reflect.set(obj, 'filter' + i, {
                                    field: settings.tab_filter_items.dynamic.relation,
                                    type: '=',
                                    value: response.data[index].id
                                });
                                Object.assign(filters, obj);
                                tmplItem = tmplItem.replace("#ID#", i);
                                tmplItem = tmplItem.replace("#VALUE#", response.data[index].value);
                                catHtml += tmplItem;

                            });
                            _filter_items = filters;
                            settings.tab_filter.find('ul').append(catHtml);
                        } else {
                            filters = {category0: {field: "", type: "=", value: "all"}};

                            jQuery(response.data).each(function (index) {
                                const obj = {};
                                const i = index + 1;

                                Reflect.set(obj, 'filter' + i, {
                                    field: settings.tab_filter_items.dynamic.relation,
                                    type: '=',
                                    value: response.data[index].id
                                });
                                Object.assign(filters, obj);
                                settings.tab_filter.find('select').append(jQuery('<option>', {
                                    value: "filter" + i,
                                    text: response.data[index].value
                                }));
                            });

                            _filter_items = filters;

                        }
                    })
                    .catch((error) => {
                    });
            }
        }
    };
    let initViews = function (){
        if (settings.tab_view_show) {
            if (settings.tab_view_items.type == "static") {

                _view_items = settings.tab_view_items.static;
                _view_id = _view_items["view1"].value;
            } else {
            }
        }
    };
    let loadTable = function (reloadTotals, reloadData)
    {
        jQuery(settings.table + " .tabulator-tableholder").addClass("off");

        if (typeof _table.getSorters==="function")
        {
            let sorter = _table.getSorters();
            if (sorter.length) {
                _order_params = {field: sorter[0].field, dir: sorter[0].dir};
            }
        }
        let reload = true;
        if (!settings.reload && !reloadData)
        {
            reload = false;
        }
        let params = {reload:reload,page:_page, header_filter:_header_filter_params, tab_month:_tab_month_params,tab_year:_tab_year_params, tab_group: _tab_group_params,
            tab_categories:_tab_categories_params,tab_view:_view_id, tab_filter:_tab_filter_params,search:_search_params, order: _order_params};
        api.get(`informes/${settings.entity}?XDEBUG_SESSION_START=PHPSTORM`,{params:params} )
            .then((response) => {
                if (settings.totals_wait) {
                    resetTotals();
                    api.get(`informes/${settings.entity}/counters/${_view_id}?XDEBUG_SESSION_START=PHPSTORM`, {params: params})
                        .then((response) => {
                            renderTotals(response.data);
                        })
                        .catch((error) => {
                        });
                }
                _rows = response.data.data;
                _pager_params = response.data.meta["pagination"];
                _tab_params = response.data.meta["tabs"];



                _table.setData(_rows);

                renderPaginator();
                disableTabs();

                jQuery('#textSearch').html(settings.search.searchText());
                jQuery(settings.table + " .tabulator-tableholder").removeClass("off");


                if (settings.tab_group.find(".active").data("groupby")== false)
                {

                    _table.setGroupBy([]);
                }
                else
                {
                    _table.setGroupBy(settings.table_groupby);

                }


            })
            .catch ((error) => {
            });

        if (reloadTotals && settings.totals_show && !settings.totals_wait) {
            resetTotals();
            api.get(`informes/${settings.entity}/counters/${_view_id}?XDEBUG_SESSION_START=PHPSTORM`, {params: params})
                .then((response) => {
                    renderTotals(response.data);
                })
                .catch((error) => {
                });
        }
    };

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

    };

    let disableTabs = function ()
    {

        var interval = setInterval(function() {
            if (Object.keys(_categories_items).length===0)
            {

            }
            else {
                settings.tab_categories.find("li").addClass("off");
                jQuery(Object.values(_categories_items)).each(function(index, value){
                    settings.tab_categories.find("[data-category='category0']").removeClass("off");
                    if (_tab_params.includes(value.value) && value.value != 'all')
                    {
                        console.log(value.value);
                        settings.tab_categories.find("[data-category='category"+index+"']").removeClass("off");
                    }
                });
                clearInterval(interval);
            }
        },100);

    };
    let renderTotals = function (totals)
    {
        var tmpl = "<dl class='#CLASS# important'><dt>#LABEL#</dt><dd id='total_#KEY#'>#VALUE#</dd></dl>";

        if (settings.totals_dynamic)
        {
            var totHtml = "";

            for (const [key, value] of Object.entries(totals)) {
                let tmplTotal = tmpl;
                tmplTotal = tmplTotal.replace("#LABEL#", value.label);
                tmplTotal  = tmplTotal .replace("#CLASS#", value.class);
                tmplTotal  = tmplTotal .replace("#KEY#", key);
                tmplTotal  = tmplTotal .replace("#VALUE#", value.value);
                totHtml += tmplTotal;

            }
            settings.totals.html(totHtml);
        }
        else {
            for (const [key, value] of Object.entries(totals)) {
                settings.totals.find("#total_" + key).html(value);
            }
        }
    };

    let resetTotals = function ()
    {
        settings.totals.find("dd").html("—");
    };

    let eventHandler = function ()
    {

        _table.on("tableBuilding", function(){
            let htmlConfig = "";
            _table.options.columns.forEach(function(value, index){
                htmltemp = replaceAll('#index#', index, templateConfig);
                htmltemp = replaceAll('#title#', value.title, htmltemp);
                htmltemp = replaceAll('#field#', value.field, htmltemp);
                htmlConfig +=htmltemp;
            });
            settings.config.html(htmlConfig);

        });

        _table.on("tableBuilt", function(){
            let layout = _table.getColumnLayout();
            layout.forEach(function(value, index){
                settings.config.find("*[data-field='"+value.field+"']").prop("checked", value.visible);

            });

        });

        settings.config.on("change","input", function (e) {
            _table.toggleColumn(jQuery(this).data("field"));

        });

        // Paginador
        settings.pager.on("click",   "[data-page='prev']", function (e) {
            e.preventDefault();
            console.log("previous page");
            _page = --_pager_params["current_page"];
            loadTable(false, false);
        });

        settings.pager.on("click",  "[data-page='next']", function (e) {
            e.preventDefault();
            console.log("next page");
            _page = ++_pager_params["current_page"];
            loadTable(false, false);
        });


        //Tab Filter
        if (settings.tab_categories) {
            settings.tab_categories.on("click", "li", function (e) {
                e.preventDefault();
                console.log("category");
                let tab = jQuery(this).data("category");
                _tab_categories_params = _categories_items[tab];
                settings.tab_categories.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;

                loadTable(true, false);

            });
        }
        if (settings.tab_filter) {
            settings.tab_filter.on("click", "li", function (e) {
                e.preventDefault();
                let tab = jQuery(this).data("filter");

                _tab_filter_params = _filter_items[tab];
                //if (settings.columns.dynamic) {

                if (tab == 'todos') {
                    if (settings.columns.type == 'static') {
                        _table.setColumns(_tab_filter_params.columns);
                    }
                } else {
                    if (_tab_filter_params.columns) {
                        _table.setColumns(_tab_filter_params.columns);
                    }
                }
                //}
                settings.tab_filter.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;

                loadTable(true, false);

            });
            settings.tab_filter.on("change","select", function(e){
                e.preventDefault();



                let tab = jQuery(this).val();

                _tab_filter_params = _filter_items[tab];
                settings.tab_filter.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;


                loadTable(true, false);

            });
        }
        if (settings.tab_view) {

            settings.tab_view.on("change","select", function(e){
                e.preventDefault();

                let tab = jQuery(this).val();

                _tab_view_params = _view_items[tab];
                _view_id = _tab_view_params.value;
                settings.tab_view.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;

                api.get(`informes/${settings.entity}/columns/${_view_id}`)
                    .then((response) => {
                        _table.setColumns(response.data);
                            loadTable(true);
                    })
                    .catch((error) => {
                    });


                //loadTable(true, false);

            });
        }

        if (settings.tab_month) {
            settings.tab_month.on("click", "li", function (e) {
                e.preventDefault();
                let mes = jQuery(this).data("month");
                _tab_month_params = mes;
                settings.tab_month.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;

                loadTable(true, false);

            });
        }

        if (settings.tab_year) {
            settings.tab_year.on("click", "li", function (e) {
                e.preventDefault();
                let year = jQuery(this).data("year");
                _tab_year_params = year;
                settings.tab_year.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;

                loadTable(true, false);

            });
        }

        if (settings.tab_group) {
            settings.tab_group.on("click", "li", function (e) {
                e.preventDefault();

                _tab_group_params = jQuery(this).data('group');
                settings.tab_group.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                _page = 1;


                loadTable(true, false);

            });
        }


        // Header Filter
        _table.on("dataFiltering", function(filters){
            if (_activeFilters === true) {
                _header_filter_params = filters;
                _page = 1;

                loadTable(true,false);
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
            _page = 1;

            _search_params = settings.search.serializerSearch();
            loadTable(true, true);
            settings.actions.find("#openSearch").trigger("click");

        });

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
            });
            _table.restoreRedraw();
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

            let params = {page:_page, header_filter:_header_filter_params, tab_month:_tab_month_params,tab_year:_tab_year_params, tab_group: _tab_group_params,
                tab_categories:_tab_categories_params,tab_view:_view_id, tab_filter:_tab_filter_params,search:_search_params, order: _order_params, fields:fields};
            //let params = {page:_page, header_filter:_header_filter_params, tab_categories:_tab_categories_params,search:_search_params, order: _order_params, fields:fields};
            api.get(`informes/${settings.entity}/export?XDEBUG_SESSION_START=PHPSTORM`,{responseType: 'arraybuffer', params:params})
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
            loadTable(false,false);
        });

        window.addEventListener('resize', function(){

            _table.redraw(true); //trigger full rerender including all data and rows
        });

    };
    return {
        init: init
    };
})();


// FORMATTERS
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
    return moment(cell.getValue()).format("DD-MM-YYYY");
}

function fmtDateTime(cell, formatterParams, onRendered){
    return moment(cell.getValue()).format("DD-MM-YYYY HH:mm");
}

var fmtNovedad = function(cell, formatterParams, onRendered){ //plain text value
    return (parseInt(cell.getValue())) ? '<span class="indicator positive"></span>' : '';
    //return "<i class='fa fa-print'></i>";
};
var fmtColorGreen = function(cell, formatterParams, onRendered){ //plain text value
    return (parseInt(cell.getValue())) ?(parseInt(cell.getValue()))+ "t.":"";
    //return "<i class='fa fa-print'></i>";
};