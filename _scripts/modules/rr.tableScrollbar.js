/**
 * Wrap all tables in a <div class='table' />
 */
var RR = (function (parent, $) {
    'use strict';

    $.fn.hasHorizontalScrollBar = function() {
        return this.get(0).scrollWidth > this.width();
    }

    var wrap = function(data) {
        var $contentTable = $('table');

        if ( !$contentTable.length )    return false;

        if ( !$contentTable.parent().hasClass('table') && $contentTable.parent().hasHorizontalScrollBar() ){
             $contentTable.wrap( "<div class='table'></div>" )
                .parent()
                .after('<button class="btn-print js-print-table" >Print Table</a>');
                // .after('<a class="btn-print js-print-table" href="/php/print.php?markup='+ _table +'">Print Table</a>');
                // .after('<a class="btn-print js-print-table" href="//FreeHTMLtoPDF.com/?convert='+ _table +'&size=US_Letter&orientation=landscape"">Print Table</a>');

            var $btnPrint = $('.js-print-table');
            $btnPrint.on('click', function (){
                // var markup = $contentTable
                //     .clone()
                //     .appendTo('body')
                //     .wrap( "<div class='printTable'></div>" );

                var _table = encodeURI($(this).prev().html()),
                    obj = {};

                obj = $(this).prev().html();

                console.log(obj);

                // window.location.href = "//FreeHTMLtoPDF.com/?convert";
                // window.location.href = "//FreeHTMLtoPDF.com/?html="+ _table +"&size=US_Letter&orientation=landscape";
                // window.location.href = "/php/print.php?markup="+ obj +"&size=US_Letter&orientation=landscape";

                $.post( '/php/print.php', function (data) {
                    console.log(data);

                });
            });
        } else {
            $('.row.container').wrap( "<div class='table no-scrollbar'></div>" );
        }
    };

    var unwrap = function (){
        var $wrappedTable = $('#content .table'),
            $btnPrint = $('.js-print-table');

        if ( $wrappedTable.length ){
            $btnPrint.off('click');

            $wrappedTable
                .find('table')
                    .unwrap()
                    .end()
                .next()
                .remove();
        }
    };

    parent.tableScrollbar = {
        wrap: wrap,
        unwrap: unwrap
    };

    return parent;

}(RR || {}, jQuery));