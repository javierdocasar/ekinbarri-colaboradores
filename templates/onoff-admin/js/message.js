function showError (title, message)
{
    try
    {
        var html_aviso_error 	= "<div class=\"error\" id=\"system-message\"><a class=\"close\" data-dismiss=\"alert\">\xD7</a><h4 class=\"message\">#title</h4><p>#message</p></div>";

        html_aviso = html_aviso_error.replace(/#title/g, title);
        html_aviso = html_aviso.replace(/#message/g, message);
        jQuery("#system-message-container *").remove();
        jQuery("#system-message-container").append(html_aviso);

        jQuery('#system-message-container').on('click', function(event) {
            event.preventDefault();
            jQuery('#system-message-container *').remove();
        });
    }
    catch(err)
    {
        alert("showError: "+err);
    }

}


function showMessage (title, message)
{
    try
    {
        var html_aviso_error 	= "<div class=\"message\" id=\"system-message\"><a class=\"close\" data-dismiss=\"alert\">\xD7</a><h4 class=\"message\">#title</h4><p>#message</p></div>";

        html_aviso = html_aviso_error.replace(/#title/g, title);
        html_aviso = html_aviso.replace(/#message/g, message);
        jQuery("#system-message-container *").remove();
        jQuery("#system-message-container").append(html_aviso);

        jQuery('#system-message-container').on('click', function(event) {
            event.preventDefault();
            jQuery('#system-message-container *').remove();
        });
        setTimeout(function(){
            jQuery('#system-message-container *').slideUp(300);
        }, 3000);



    }
    catch(err)
    {
        alert("showError: "+err);
    }

}
