function TableRelationManager(options)
{
    let _table = null;
    let _rows = null;
    let _pager_params = null;
    let _order_params = null;
    let _header_filter_params = null;
    let _page = 1;
    let _tableOptions = {layout:"fitColumns",  persistence: false,dataSendParams:"sorter", paginationSize:500, height:"100%",
        groupHeader: function(value, count, data, group){
            return value ;
        },
        groupToggleElement:false,};
    /*let _tableOptions = {layout:"fitColumns", renderVertical:"basic",
        persistence: false,
        dataSendParams:"sorter", paginationSize:50, maxHeight:"100%",
        groupHeader: function(value, count, data, group){
            return value ;
        },
        groupToggleElement:false,
    };*/
    let _activeFilters = false;
    let _detail = null;


    var settings = {
        entity:null,
        id_relation:null,
        field_relation:null,
        table:null,
        table_groupby:null,
        cellClick:null,
        columns:null,
        detail:false,
        totals:null,
        totals_show: false,
    }
    jQuery.extend(settings, options)

    let init = function () {
        console.log("init");
        initTable();
        initDetail();
        eventHandler();
    };

    let initTable = function ()
    {
        if (settings.totals) {
            settings.totals_show ? settings.totals.removeClass("hidden") : settings.totals.addClass("hidden");
        }
        _table = new Tabulator(settings.table, {columns:settings.columns, persistenceID:settings.entity, groupBy:settings.table_groupby, ..._tableOptions, });
    }
    let initDetail = function()
    {
        if (settings.detail)
        {
            var settingsDetail = {
                entity:settings.entity,
                form:jQuery('#form-'+settings.entity),
                table:_table,
                table_id:settings.table,
                new:jQuery('#'+settings.entity+' #new'),
                id_relation:settings.id_relation,
                relations: null,
            }
            _detail = new DetailRelationManager(settingsDetail);
            _detail.init();

        }
    }
    let loadTable = function (reloadTotals)
    {


        jQuery(settings.table + ".tabulator-tableholder").addClass("off");

        if (typeof _table.getSorters==="function")
        {
            let sorter = _table.getSorters()
            if (sorter.length) {
                _order_params = {field: sorter[0].field, dir: sorter[0].dir}
            }
        }

        let params = {page:_page, header_filter:_header_filter_params, search:[{field:settings.field_relation, "type":"=", value:settings.id_relation.val()}], order: _order_params}

        api.get(`${settings.entity}?XDEBUG_SESSION_START=PHPSTORM`,{params:params} )
            .then((response) => {
                _rows = response.data.data;

                if (response.data.meta) {
                    _pager_params = response.data.meta["pagination"];
                }
                _table.setData(_rows);
                _activeFilters = true;
                jQuery(settings.table + ".tabulator-tableholder").removeClass("off");


            })
            .catch ((error) => {
            })

        if (reloadTotals && settings.totals && settings.totals_show) {
            resetTotals();
            api.get(`${settings.entity}/counters`, {params: params})
                .then((response) => {
                    renderTotals(response.data);
                })
                .catch((error) => {
                })
        }
    }

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

        //SORTER
        _table.on("headerClick", function(e, column){
            e.preventDefault();
            e.stopPropagation();
            _page = 1;
            loadTable(false);
        });

        // Header Filter
        _table.on("dataFiltering", function(filters){
            if (_activeFilters === true) {
                _header_filter_params = filters;
                _page = 1;
                loadTable(true);
            }

        })

        _table.on("dataLoading", function(data){
            _activeFilters  = false;
        });

        _table.on("dataProcessed", function(){
            _activeFilters  = true;
        });


    }
    return {
        init: init,
        loadTable: loadTable

    }
};


