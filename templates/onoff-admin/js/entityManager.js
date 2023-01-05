const TOKEN = getCookie("access_token");
const api = axios.create({
    //baseURL: 'https://api.vinilofm.es/api/admin/',
    baseURL: 'http://localhost:8000/api/admin/',
    headers: {'Authorization': 'Bearer ' + TOKEN, 'Content.Type':'application/json'}
})


const EntityManager = (function(){
    'use strict';

    let _ft = null;
    let _pagination = null;
    let _rows = [];
    let _filter = "";
    let _search = "";
    let _params = {"per_page":100,"page":1, "order_by":"id", "order_dir":"desc"};
    let _detail = "";
    let _entity = "";

    const settings = {
        entity:"",
        table:"",
        actions:"",
        pager:"",
        filter:"",
        columns:[],
        form:"",
        search:"",
        render_select:false,
        render_tags:false,
        render_editor:false,
        render_noticia:false
    }

    let init = function (options) {
        console.log("init")
        jQuery.extend(settings, options)
        _entity = settings.entity;
        initTable();
        initCalendar();
        if (settings.render_select)
        {
            initSelect();
        }
        if (settings.render_tags)
        {
            initTags();
        }
        if (settings.render_editor)
        {
            initEditor();
        }

        loadTable(null,errorCallback)
        eventHandler()
    };

    let initCalendar = function ()
    {
        settings.form.serializeDateTime();
        settings.form.find("a.action.seldate").renderDate();
        settings.form.find("a.action.seltime").renderTime();

        settings.search.serializeDateTime();
        settings.search.find("a.action.seldate").renderDate();
        settings.search.find("a.action.seltime").renderTime();
    }

    let initTable = function ()
    {
        settings.table.addClass("loading");
        jQuery(function () {
            _ft = FooTable.init(settings.table,{
                "columns": settings.columns
            })
        })
    }

    let initSelect = function ()
    {
        api.get(`${_entity}/select`)
            .then((response) => {
                settings.form.renderSelect(response.data);

            })
            .catch ((error) => {
            })
    };

    let initTags = function ()
    {
        api.get(`${_entity}/tags`)
            .then((response) => {
                settings.form.renderTags(response.data);

            })
            .catch ((error) => {
            })
    };

    let initEditor = function()
    {
        tinyMCE.init({
            language: 'es',
            selector: '#'+settings.render_editor,
            contextmenu_never_use_native: true,
            //content_css: '/templates/onoff-admin/css/editor.css',
            plugins: "fullscreen, code, image, paste, link, lists, media",
            link_context_toolbar:true,
            block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
            default_link_target: '_blank',
            link_title:false,
            paste_block_drop:false,
            paste_data_images: false,
            //paste_as_text:true,
            contextmenu: 'link image',
            menubar: false,
            style_formats: [
                { title: 'Párrafo', block: 'p'},
                { title: 'H2', block: 'h2'},
                { title: 'H3', block: 'h3'}, ],
            toolbar: 'styleselect | bold | blockquote | numlist  bullist | link | media | addImage | undo redo | code | fullscreen',
            media_url_resolver: function (data, resolve/*, reject*/) {
                    var embedHtml = '<div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"><iframe src="' + data.url +
                        '" width="500" height="315" ></iframe></div>';
                    resolve({html: embedHtml});

            },
            setup: function (editor) {
                editor.ui.registry.addButton('addImage', {
                    text: 'Imagen',
                    icon: 'image',
                    onAction: function (_) {
                        imageTextArea = editor;
                        mediaCallback = imageTextareaCallback;
                        mostrarRelation();

                    }
                });
            }
        });

    }
    // API FUNCTIONS
    let loadTable = function (callback, errorCallback)
    {


        let send = {..._filter,  ..._params, ..._search};

        api.get(`${_entity}`, {params:send})
            .then((response) => {
                _rows = response.data.data;
                _pagination = response.data.meta["pagination"];
                renderTable();
                if (callback!=null) callback(response);
            })
            .catch ((error) => {
                errorCallback(error);
            })
    };

    let loadDetail = function (id,callback, errorCallback)
    {

        api.get(`${_entity}/${id}`)
            .then((response) => {
                _detail = response.data.data
                renderDetail()
                if (callback!=null) callback(response)
            })
            .catch ((error) => {
                errorCallback(error)
            })

    };

    let createDetail = function(callback, errorCallback)
    {
        let item = jQuery('#formData').serializer();
        if (settings.render_tags) {

            item.tags = jQuery('#tags input').serializeArray();
        }

        api.post(`${_entity}`, item)
            .then((response) => {
                callback(response)
            })
            .catch ((error) => {
                errorCallback(error)
            })

    }
    let saveDetail = function(callback, errorCallback)
    {
        let id = jQuery('#id').val();
        if (settings.render_editor)
        {
            tinyMCE.triggerSave();
        }


        let item = jQuery('#formData').serializer();
        if (settings.render_tags) {

            item.tags = jQuery('#tags input').serializeArray();
        }



        api.put(`${_entity}/${id}`, item)
            .then((response) => {
                callback(response)

            })
            .catch ((error) => {
                errorCallback(error)
            })

    }

    let deleteDetail = function (callback, errorCallback)
    {
        let id = jQuery('#id').val();
        api.delete(`${_entity}/${id}`)
            .then((response) => {
                callback(response)
            })
            .catch ((error) => {
                errorCallback(error)
            })
    }

    // Callback functions
    let errorCallback = function (error)
    {
        console.log(error);
        jQuery(this).removeWaiting();
        showError("Ofisat", error);
    }

    let loadTableCallback = function(response)
    {
        console.log(response);
        jQuery(this).removeWaiting();
        renderTable();
    }

    let deleteCallback = function (response)
    {
        jQuery(this).removeWaiting();
        mostrarList();
        showMessage("Ofisat", `Se ha eliminado registro`)

        let index = _ft.rows.array.findIndex((el)=> el.value.id===_detail.id)
        _ft.rows.delete(index);

        _detail = null;
    }
    let saveCallback = function (response)
    {
        jQuery(this).removeWaiting();
        let index = _ft.rows.array.findIndex((el)=> el.value.id===_detail.id)
        _ft.rows.update(index, response.data.data);


        _detail = response.data.data
        showMessage("Ofisat", `Se ha actualizado el registro`)

    }

    let createCallback = function(response)
    {
        jQuery(this).removeWaiting();


        _ft.rows.add(response.data.data);
        _detail = response.data.data
        jQuery('#id').val(_detail.id)
        if (settings.render_noticia)
        {


            jQuery('#view-noticia').addClass("hidden");
            jQuery('#save-noticia').removeClass("hidden");
        }
        showMessage("Vinilo Fm", `Se ha creado el nuevo registro`)

    }


    // RENDER FUNCTIONS
    let renderDetail = function (id)
    {
        if (id === 0)
        {
            jQuery('#formData').resetear();
            if (settings.render_editor) {
                tinyMCE.activeEditor.setContent("");
            }


        }
        else {
            settings.form.fill(_detail);
            if (settings.render_editor)
                tinyMCE.activeEditor.setContent(_detail.texto);


        }



        mostrarDetail();
        jQuery(this).removeWaiting();
    };

    let renderTable = function (){
        _ft.rows.load(_rows)

        if (_pagination["total_pages"] === 1)
        {
            settings.pager.addClass("hidden");
        }
        else
        {
            settings.pager.removeClass("hidden");
            if (_pagination["current_page"] === 1) {
                settings.pager.find(".prev").addClass("disabled")
                settings.pager.find(".next").removeClass("disabled")
            }
            if (_pagination["current_page"] === _pagination["total_pages"])
            {
                settings.pager.find(".next").addClass("disabled")
                settings.pager.find(".prev").removeClass("disabled")
            }
            settings.pager.find(".label-default").html(_pagination["current_page"] + " de " +_pagination["total_pages"]);
        }

        settings.table.removeClass("loading");
        jQuery(this).removeWaiting();
    };

    let _confirmDelete = function () {

        jQuery.confirm({
            'message'	: `Vas a eliminar un registro`,
            'buttons'	: {
                'Eliminar'	: {
                    'class'	: 'big',
                    'action': function(){
                        deleteDetail(deleteCallback, errorCallback)
                    }
                },
                'Cancelar'	: {
                    'class'	: 'subb big',
                    'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
                }
            }
        });
    };

    let eventHandler = function ()
    {
        //Previous Page
        settings.pager.on("click",   "[data-page='prev']", function (e) {
            e.preventDefault();
            console.log("previous page")
            _params.page = --_pagination["current_page"];
            loadTable(loadTableCallback,errorCallback);
        });

        //Next Page
        settings.pager.on("click",  "[data-page='next']", function (e) {
            e.preventDefault();
            console.log("next page")
            _params.page = ++_pagination["current_page"];
            loadTable(loadTableCallback, errorCallback);
        })

        //Filter
        settings.filter.on("click","li", function(e){
            e.preventDefault();
            console.log("filter");
            if (((jQuery(this).hasClass("active"))=== false))
            {
                _params.page = 1;
                _filter = jQuery(this).data("filter")
                settings.filter.find(".active").removeClass("active");
                jQuery(this).addClass("active");
                loadTable(loadTableCallback, errorCallback);
            }
        })



        // Table Order
        settings.table.on ("click", "thead tr .footable-sortable", function (e){
            e.preventDefault();
            _params.order_by = jQuery(this).data("field");
            _params.page = 1;
            if (jQuery(this).hasClass("footable-desc"))
            {
                _params.order_dir = "asc"
            }
            else
            {
                _params.order_dir = "desc"
            }
            loadTable(loadTableCallback, errorCallback);
        })

        // Table trigger edit
        settings.table.on("click","td.row-edit a",function(e){
            e.preventDefault();
            jQuery(this).waiting();
            loadDetail(jQuery(this).closest("a").data("id"), null, errorCallback);
        });

        //Actions List
        settings.actions.on("click","#openSearch", function(e){
            e.preventDefault();
            jQuery(this).closest("section").removeClass("config-list-active");
            jQuery(this).closest("section").toggleClass("search-list-active");
        });

        settings.actions.on("click","#openConfig", function(e){
            e.preventDefault();
            jQuery(this).closest("section").removeClass("search-list-active");
            jQuery(this).closest("section").toggleClass("config-list-active");
        });

        settings.actions.on("click","#new", function(e){
            e.preventDefault();
            renderDetail(0);
        });

        //Search Actions

        settings.search.on("click", ".delete", function(e){
            e.preventDefault();
            e.stopPropagation();
            settings.search.resetear();
            console.log("resetear form");

        })

        settings.search.on("click", ".filter", function(e){
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).waiting();
            _search = settings.search.serializer();
            loadTable(loadTableCallback, errorCallback);
            console.log("buscar");

        })

        // Config Actions

        settings.config.on("change","input", function (e) {
            e.preventDefault();
            if (jQuery(this).is(":checked"))
            {
                _ft.columns.get(jQuery(this).data("column")).hidden = false;
                _ft.columns.get(jQuery(this).data("column")).breakpoints = "min";
            }
            else
            {
                _ft.columns.get(jQuery(this).data("column")).hidden = true;
                _ft.columns.get(jQuery(this).data("column")).breakpoints = "all";
            }
            _ft.draw();
        })



        //Actions Detail

        settings.form.on('click', ".nav-form a", function (e){
            e.preventDefault();
            let legend = jQuery(this).html();

            if (legend !== settings.form.find("li.active a").html())
            {
                settings.form.find("li").removeClass("active");
                jQuery(this).parent().addClass("active");
                settings.form.find("fieldset").addClass("hidden");
                settings.form.find("legend:contains("+legend+")").parent("fieldset").removeClass("hidden");
                //jQuery("form table").trigger("footable_initialize");
            }
        });

        settings.form.on('click', '.nav-actions .remove', function (e){
            e.preventDefault();
            _confirmDelete();
        });

        settings.form.on('click', '.nav-actions .save', function (e){
            e.preventDefault();

            if (settings.form.valid()) {
                jQuery(this).waiting();
                if (jQuery('#id').val() === "0") {
                    createDetail(createCallback, errorCallback);
                } else {
                    saveDetail(saveCallback, errorCallback)
                }
            }
        });

        settings.form.on('click', '.nav-actions .close', function (e){
            e.preventDefault();
            mostrarList();
        });
    }
    return {
        init: init,
        loadDetail: loadDetail
    }

})();


// Formateadores de Celdas

function formatterEdit(value){
    return "<a class='button edit' data-id='"+value+"'>Ver</a>";
}

function formatterSiNo(value){
    return (parseInt(value)) ? '<span class="indicator positive"></span>' : '<span class="indicator negative"></span>';
}
function formatterRelativeTime(value){
    return (value ==="0000-00-00 00:00:00") ? "" : moment(value,"YYYY-MM-DD HH:mm:ss").fromNow();
}

function formatterNegative(value){
    return (value==="1") ? '<span class="negative"></span>' : '<span></span>';
}

function formatterRole(value){
    return (value==='ADMIN_USER') ? '<span class="cancel">ADMIN</span>' : '<span class="cancel">USER</span>';
}

