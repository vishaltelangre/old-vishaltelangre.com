/*******************************
 -jQuery Animate Overflow-
 (c)2013 Gregory J Schoppe
    http://gschoppe.com
 *******************************/

(function( $ ) {
    // Plugin definition.
    $.fn.animateOverflow = function (options) {
         var opts = $.extend( {
                                animation  : 'pingpong',
                                step_speed : 30,
                                delay      : 600,
                                divider    : ' | '
                              }, options );
 
        return this.each(function() {
            
            $(this).css('overflow', 'hidden').wrapInner('<span style=\"white-space: nowrap;\">');
            var contentWidth = $(this).children('span').width();
            var boxWidth = $(this).width();

            if (contentWidth > boxWidth) {
                var startIndent = parseInt($(this).css('text-indent'));
                var currIndent  = startIndent;
                switch (opts.animation) {
                    case 'pingpong' :
                        var left = true;
                        pingpongscrollstep(this, contentWidth, startIndent, currIndent, left, opts.step_speed, opts.delay);
                        break;
                    case 'linear' :
                        var inner = $(this).children('span');
                        $(inner).html($(inner).html() + opts.divider);
                        var looplength = $(inner).width();
                        $(inner).html($(inner).html() + $(inner).html() + $(inner).html());
                        linearscrollstep(this, startIndent, currIndent, looplength, opts.step_speed, opts.delay);
                        break;
                }
            }
        });
    };
    function pingpongscrollstep(element, contentWidth, startIndent, currIndent, is_left, step_speed, delay) {
        if($(element).length != 0) {
            thisdelay = step_speed;
            if(is_left) {
                if(contentWidth + currIndent > $(element).width()) {
                    currIndent = currIndent - 1;
                    $(element).css('text-indent', currIndent);
                } else {
                    is_left = false;
                    thisdelay = delay;
                }
            } else {
                if(currIndent < startIndent) {
                    currIndent = currIndent + 1;
                    $(element).css('text-indent', currIndent);
                } else {
                    is_left = true;
                    thisdelay = delay;
                }
            }
            setTimeout(function(){
                pingpongscrollstep(element, contentWidth, startIndent, currIndent, is_left, step_speed, delay);
            }, thisdelay);
        }
    };
    function linearscrollstep(element, startIndent, currIndent, looplength, step_speed, delay) {
        if($(element).length != 0) {
            thisdelay = step_speed;
            if(startIndent-currIndent >= looplength*2) {
                currIndent = startIndent - looplength;
                thisdelay = delay;
            } else {
                currIndent = currIndent - 1;
                if(startIndent-currIndent == looplength) {
                    thisdelay = delay;
                }
            }
            $(element).css('text-indent', currIndent);
            setTimeout(function(){
                linearscrollstep(element, startIndent, currIndent, looplength, step_speed, delay);
            }, thisdelay);
        }
    }

// End of closure.
})( jQuery );