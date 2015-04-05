/**
 * RR - Awesome Mobile Menu
 */
var RR = (function (parent, $){
    "use strict";

    var slider = $(".bxslider");

    var desktop = function (){
        slider = $(".bxslider").bxSlider({
            autoStart       : true,
            pager           : false,
            maxSlides       : 4,
            slideWidth      : 138,
            slideMargin     : 50,
            moveSlides      : 4,
            prevText        : "",
            nextText        : ""
        });
    };

    var tablet = function (){
        slider = $(".bxslider").bxSlider({
            autoStart       : true,
            pager           : false,
            maxSlides       : 4,
            slideWidth      : 138,
            slideMargin     : 25,
            moveSlides      : 4,
            prevText        : "",
            nextText        : ""
        });
    };

    var mobile = function (){
        slider = $(".bxslider").bxSlider({
            autoStart       : true,
            pager           : true,
            moveSlides      : 1,
            prevText        : "",
            nextText        : ""
        });
    };

    var destroy = function (){
        slider.destroySlider();
    };


    /**
     * Export module method
     */
    parent.bxSlider = {
        desktop: desktop,
        tablet: tablet,
        mobile: mobile,
        destroy: destroy
    };

    return parent;

}(RR || {}, jQuery));