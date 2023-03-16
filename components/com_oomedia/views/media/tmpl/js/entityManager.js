const TOKENMEDIA = getCookie("access_token");
const apimedia = axios.create({

    baseURL: 'https://ekinbarri-colaboradores-api.onoff.studio/index.php/api/admin/',
    headers: {'Authorization': 'Bearer ' + TOKENMEDIA, 'Content.Type':'application/json'}
})




const MediaManager = (function(){
    'use strict';
    let _baseRepositorio = "https://onoff.studio/ekinbarri/colaboradores-api/storage/app/documentos/"
    let _entity = "";
    let _path = "";
    let _previousPath = "";
    let _data = "";

    const settings = {
        entity:"",
        path:"/"
    }

    let init = function (options) {
        jQuery.extend(settings, options)
        _entity = settings.entity;
        _path = settings.path;
        _previousPath = null;
        loadData(null,errorCallback)
        eventHandler()
    };


    // API FUNCTIONS
    let loadData = function ()
    {
        var root = "local";

        let send = {"path":_path,"root":root};
        apimedia.get(`${_entity}`, {params:send})
            .then((response) => {
                _data = response.data;
                render();

            })
            .catch ((error) => {
                errorCallback(error);
            })
    };


    // API FUNCTIONS
    let createFolder = function ()
    {

        let newFolder = jQuery('#folder').val();
        let send = {"path":_path+"/"+newFolder,"root":"local"};

        apimedia.post(`${_entity}/folder`, send)
            .then((response) => {

                loadData();

            })
            .catch ((error) => {
                errorCallback(error);
            })
    };


    // API FUNCTIONS
    let uploadFile = function ()
    {


        var root = "local";
        var formData = new FormData();
        var imagefile = document.querySelector('#image-upload');
        formData.append("image", imagefile.files[0]);
        formData.append("path",_path);
        formData.append("root",root);

        apimedia.post(`${_entity}/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                loadData();

            })
            .catch ((error) => {
                errorCallback(error);
            })
    };




    let deleteDetail = function (type, path)
    {
        var root = "local";
        let send = {"path":path, "type":type};
        apimedia.delete(`${_entity}`, {params:send,"root":root})
            .then((response) => {
                jQuery("li[data-path='"+path+"']").remove()
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
        showError("Error", error);
    }

    let render = function (){
        jQuery("#mediaselector").html("");

        if ((_path!=="/") &&(_path!==".")) {
            var el = jQuery("<li data-path='" + _data.previous + "' data-type='dir' class='back'>")
            el.append("<a><span class='name'>Anterior</span></a>");
            jQuery("#mediaselector").append(el);
        }

        _data.directories.forEach(function(item, index){
            var pos = item.lastIndexOf("/");
            var name = item.substring(pos);

            var el  = jQuery("<li data-path='"+item +"' data-type='dir' class='folder'>")

            el
                .append("<input type='checkbox' class='selector'/>")
                .append("<a><span class='name'>"+name+"</span></a>");

            jQuery("#mediaselector").append(el);
        });

        _data.files.forEach(function(item, index){
            var pos = item.lastIndexOf("/");
            var name = item.substring(pos);
            var el  = jQuery("<li data-path='"+item +"' data-type='file' class='file'>");

            el

                .append("<input type='checkbox' class='selector'/>")
                .append("<img src='"+_baseRepositorio +  item +"'></img>")
                .append("<a target='_blank' href='"+_baseRepositorio +  item +"'><span class='name'>"+name+"</span></a>");

            jQuery("#mediaselector").append(el);
        });

        jQuery(".bc").html("");
        var parsePath = _path.split("/");
        var path = "";
        var parseCount = parsePath.length;
        parsePath.forEach(function(item, index){

            if ((item!== '') && (item!=='.')) {
                path += "/" + item;
                var el = null;

                if (index <= parseCount - 2) {
                    el = jQuery("<a  data-path='" + path + "' class='level'>" + item + "</a>");
                } else {
                    el = jQuery("<span class='level last'>" + item + "</span>")
                }
                jQuery(".bc").append(el);
            }
        })


    };

    let _confirmDelete = function () {

        jQuery.confirm({
            'message'	: `Vas a eliminar las imagenes y carpetas seleccionadas`,
            'buttons'	: {
                'Eliminar'	: {
                    'class'	: 'big',
                    'action': function(){
                        jQuery("input.selector:checked").each(function (){
                            var type = jQuery(this).parent().data("type");
                            var path = jQuery(this).parent().data("path");
                            var payload = {"type":type, "path":path};
                            deleteDetail( type,path);
                        })

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

        jQuery("#mediaselector").on("click", "li", function (e){


            if (!jQuery(e.target).hasClass("selector"))
            {

                var type = jQuery(this).data("type");
                if (type === "dir") {
                    e.preventDefault();
                    e.stopPropagation();
                    _path = jQuery(this).data("path")
                    loadData();
                    jQuery(this).find("a").addClass('waiting');

                } else {
                }
            }
        })

        jQuery(".bc").on("click", "a", function (e){
            _path = jQuery(this).data("path")
            loadData();
        });



        jQuery('#create-folder').on("click", function (e){
            e.preventDefault();
            e.stopPropagation();
            createFolder();
        });

        jQuery('#close-media').on("click", function (e){
            e.preventDefault();
            e.stopPropagation();
            mostrarDetail();
        });

        jQuery('#new-file').on("click", function (e){
            e.preventDefault();
            e.stopPropagation();
            jQuery('#image-upload').trigger("click")


        })

        jQuery('#new-folder').on("click", function (e){
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).closest("section").toggleClass("edit-list-active");


        })



        jQuery('#create-folder').on("click", function (e){
            e.preventDefault();
            e.stopPropagation();
            createFolder();

        })

        jQuery('#image-upload').on("change",function (e){
            var imagefile = document.querySelector('#image-upload')
            uploadFile();
        });
        jQuery('#delete-media').on("click", function (e){
            e.preventDefault();
            _confirmDelete();
        });

    }
    return {
        init: init
    }

})();

let settings = {
    entity: "media",
    path:"/"
}

MediaManager.init(settings);