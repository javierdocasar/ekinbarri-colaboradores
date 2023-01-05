(function($){

    $.confirm = function(params){

        if($('#modal-container').length){
            // A confirm is already shown on the page:
            return false;
        }

        var buttonHTML = '';
        $.each(params.buttons,function(name,obj){

            // Generating the markup for the buttons:

            buttonHTML += '<button class="'+obj['class']+'">'+name+'</button>';

            if(!obj.action){
                obj.action = function(){};
            }
        });

        var markup = [
            '<div id="modal-container">',
            '<div id="modal-content">',
            '<h1>',params.message,'</h1>',
            '<p>',
            buttonHTML,
            '</p></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        var buttons = $('#modal-content button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
            buttons.eq(i++).click(function(){

                // Calling the action attribute when a
                // click occurs, and hiding the confirm.

                obj.action();
                $.confirm.hide();
                return false;
            });
        });
    }

    $.confirm.hide = function(){
        $('#modal-container').fadeOut(function(){
            $(this).remove();
        });
    }

})(jQuery);