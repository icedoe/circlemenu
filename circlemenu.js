(function($) {
    // plugin
    $.fn.circleMenu =function(menuItems, options) {
        console.log('circleMenu('+menuItems +', '+options +')');
        // plugin code
        var menu ={}, html, origin, degDiff, radius;

        options =$.extend({}, $.fn.circleMenu.defaults, options);
        origin =options.size/2;
        degDiff =(Math.PI*2)/menuItems.length;
        radius =origin -options.padding -options.itemSize;

        $('body').css('position', 'relative');

        html =$("<div class='menuHolder'></div>")
            .height(options.size)
            .width(options.size)
            .css({
                'position': 'absolute',
                'backgroundColor': options.backgroundColor,
                'borderRadius': '50%',
                'zIndex': 10
            })
            .hide()
            .appendTo('html');

        for(var n=0; n<menuItems.length; n++) {
            var posX =Math.sin(degDiff*n)*radius,
                posY =Math.cos(degDiff*n)*radius,
                item =$("<div class='menuItem'></div>")
                    .height(options.itemSize)
                    .width(options.itemSize)
                    .css({
                        'position': 'absolute',
                        'left': origin+posX-options.itemSize/2,
                        'top': origin-posY-options.itemSize/2,
                        'backgroundColor': 'transparent',
                        'border': '2px solid transparent',
                        'borderRadius': '50%'
                    })
                    .appendTo(html);

                $('<img>')
                    .attr('src', menuItems[n].icon)
                    .height('100%')
                    .width('100%')
                    .css('backgroundColor', 'transparent')
                    .click(menuItems[n].callback)
                    .appendTo(item);
        }

        $('div.menuItem').hover(
            function() {$(this).css('borderColor', 'white'); },
            function() {$(this).css('borderColor', 'transparent'); }
            );

        return this.each(function() {
            // code done to each
            $(this).mouseenter(function(e) {
                console.log('mouseenter: '+e.pageX +', ' +e.pageY);
                html.css({
                    'left': e.pageX -origin,
                    'top': e.pageY -origin
                })
                .mouseleave(function() {
                    $(this).fadeOut('fast');
                })
                .fadeIn('fast');
                console.log('left:' +html.css('left') +', top: '+html.css('top'));
                console.log(html);
            });
        });
    };
    $.fn.circleMenu.defaults = {
        'size': 200,
        'itemSize': 32,
        'padding': 0,
        'backgroundColor': 'rgba(0, 0, 0, 0.5)'
    };
})(jQuery);
