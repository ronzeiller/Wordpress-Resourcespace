jQuery(function ($) {
    $(document).ready(function () {
        $('#insert-my-media').click(open_media_window);
    });

    function open_media_window() {

        if ($("#classic-editor-dialog").length == 0) {
            $("#wpwrap").append(`<div id="classic-editor-dialog"><div id="searchFrom"></div></div>`);
            window.vueApp = window.displaySearchFrom(true, 'classicInsert');
        } else {
            delete window.vueApp;
            $("#classic-editor-dialog").remove();
            $("#wpwrap").append(`<div id="classic-editor-dialog"><div id="searchFrom"></div></div>`);
            window.vueApp = window.displaySearchFrom(true, 'classicInsert');
        }
    }
});