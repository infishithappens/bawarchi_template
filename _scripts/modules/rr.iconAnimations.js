/**
 * RR - Awesome Icon Animation
 */
var RR = (function (parent, $){
    'use strict';

    var $primaryNav = $('#primary-nav'),
        $lvl1 = $primaryNav.find('.lvl1'),
        $lvl2 = $primaryNav.find('.lvl2'),
        $lvl3 = $primaryNav.find('.lvl3'),
        $set = $lvl1.add( $lvl2 ).add( $lvl3 ),
        $tabHeight = $lvl1.find('li').height();

    var setup = function (){
        var $btn = $('.btn'),
            $hamburger = $('.icon-hamburger'),
            $hamCross = $('.icon-ham-cross'),
            $hamCrossAlt = $('.icon-ham-cross-alt'),
            $magnify = $('.icon-magnify'),
            $arrowToggle = $('.icon-arrow-toggle'),
            $plusMinus = $('.icon-plusminus-toggle');

        $btn.on('mouseover', function (e){
            var $this =  $(this),
                newHover = e.relatedTarget;

            if( newHover === $this[0] ) return;
            if( $.contains($this[0], newHover) ) return;
        }).on('mouseout', function (e){
            var $this =  $(this),
                newHover = e.relatedTarget;

            if( newHover === $this[0] ) return;
            if( $.contains($this[0], newHover) ) return;
        });

        $hamburger.on('mouseover', function (){
            var $this = $(this);

            if ( !$this.hasClass('active') ){
                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { y: -5, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { y: 5, ease: Expo.easeOut });
            }
        }).on('mouseout', function (){
            var $this = $(this);

            if ( !$this.hasClass('active') )
                TweenMax.to( $this.find('path:nth-child(1), path:nth-child(3)'), 0.5, { y: 0, ease: Expo.easeOut });
        });

        $hamCross.on('click', function (){
            var $this = $(this);

            if ( $this.hasClass('active') ){
                $this.removeClass('active');

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(2)'), 0.5, { opacity: 1, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
            } else {
                $this.addClass('active');

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { x: 4, y: 0, rotation: 45, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(2)'), 0.5, { opacity: 0, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { x: 4, y: 0, rotation: -45, ease: Expo.easeOut });
            }
        });


        var tl = new TimelineMax();

        tl.to( $hamCross.find('path:nth-child(1)'), 0.2, { top: 4, ease: Expo.easeInOut });
        tl.to( $hamCross.find('path:nth-child(3)'), 0.2, { top: -4, ease: Expo.easeInOut }, '-=0.2');

        tl.to( $hamCross.find('path:nth-child(2)'), 0.2, { opacity: 0, ease: Expo.easeInOut });
        tl.to( $hamCross.find('path:nth-child(1)'), 0.2, { rotation: 45, ease: Expo.easeInOut }, '-=0.2');
        tl.to( $hamCross.find('path:nth-child(3)'), 0.2, { rotation: -45, ease: Expo.easeInOut }, '-=0.2');


        // Stop the Timeline at 0 else the animation will play after initiation
        tl.pause();

        $hamCrossAlt.on('click', function (){
            var $this = $(this);

            if ( $this.hasClass('active') ){
                $this.removeClass('active');

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { rotation: 0, transformOrigin:"center center", ease: Expo.easeOut});
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { rotation: 0, transformOrigin:"center center", ease: Expo.easeOut});

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut, delay: 0.25 });
                TweenMax.to( $this.find('path:nth-child(2)'), 0.5, { opacity: 1, ease: Expo.easeOut, delay: 0.25 });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut, delay: 0.25 });
            } else {
                $this.addClass('active');

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { x: 0, y: 10, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { x: 0, y: -10, ease: Expo.easeOut });

                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { rotation: 45, transformOrigin:"center center", ease: Expo.easeOut, delay: 0.25 });
                TweenMax.to( $this.find('path:nth-child(2)'), 0.5, { opacity: 0, ease: Expo.easeOut });
                TweenMax.to( $this.find('path:nth-child(3)'), 0.5, { rotation: -45, transformOrigin:"center center", ease: Expo.easeOut, delay: 0.25 });
            }
        });


        $magnify.on('mouseover', function (){
            var $this = $(this);

            TweenMax.to( $this.find('svg'), 0.5, { scale: 1, ease: Expo.easeOut });
            TweenMax.to( $this.find('path:nth-child(2), path:nth-child(3)'), 0.5, { rotation: 180, scale: 1, opacity: 1, transformOrigin:'50% 50%', ease: Expo.easeOut, delay: 0.1 });
        }).on('mouseout', function (){
            var $this = $(this);

            TweenMax.to( $this.find('svg'), 0.5, { scale: 0.75, ease: Expo.easeOut });
            TweenMax.to( $this.find('path:nth-child(2), path:nth-child(3)'), 0.5, { rotation: 0, scale: 0, opacity: 0, transformOrigin:'50% 50%', ease: Expo.easeOut, delay: 0.1 });
        });


        $arrowToggle.on('mouseover', function (){
            var $this = $(this);

            if ( $this.hasClass('active') )
                TweenMax.to( $this.find('svg'), 0.5, { y: -5, ease: Expo.EaseOut });
            else
                TweenMax.to( $this.find('svg'), 0.5, { y: 5, ease: Expo.EaseOut });
        }).on('mouseout', function (){
            var $this = $(this);

            if ( $this.hasClass('active') )
                TweenMax.to( $this.find('svg'), 0.5, { y: -0, ease: Expo.EaseOut });
            else
                TweenMax.to( $this.find('svg'), 0.5, { y: 0, ease: Expo.EaseOut });
        }).on('click', function(){
            var $this = $(this);

            if ( $this.hasClass('active') ){
                $this.removeClass('active');
                TweenMax.to( $this.find('svg'), 0.3, { y: 0, transformOrigin:'50% 50%', rotation: 0, ease: Expo.EaseOut });
            } else {
                $this.addClass('active');
                TweenMax.to( $this.find('svg'), 0.3, { y: 0, transformOrigin:'50% 50%', rotation: 180, ease: Expo.EaseOut });
            }
        });

        $plusMinus.on('mouseover', function (){
            var $this = $(this);

            // if ( !$this.hasClass('active') )
                TweenMax.staggerTo( $this.find('path'), 0.5, { rotation: 180, scale: 1, ease: Expo.easeOut }, 0.05 );
        }).on('mouseout', function (){
            var $this = $(this);

            // if ( !$this.hasClass('active') )
                TweenMax.staggerTo( $this.find('path'), 0.5, { rotation: 0, scale: 0.75, ease: Expo.easeOut }, 0.05 );
        }).on('click', function (){
            var $this = $(this);

            if ( $this.hasClass('active') ){
                $this.removeClass('active');
                TweenMax.staggerTo( $this.find('path'), 0.5, { rotation: 360, ease: Expo.easeOut }, 0.05 );
                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { opacity: 1, ease: Expo.easeOut });
            } else {
                $this.addClass('active');
                TweenMax.staggerTo( $this.find('path'), 0.5, { rotation: 0, ease: Expo.easeOut }, 0.05 );
                TweenMax.to( $this.find('path:nth-child(1)'), 0.5, { opacity: 0, ease: Expo.easeOut });
            }
        }).find('path').each(function (){
            TweenMax.to( $(this), 0.5, { scale: 0.75, transformOrigin:'50% 50%', ease: Expo.easeOut });
        });
    };

    // Export module method
    parent.iconAnimation = {
        setup: setup
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    RR.iconAnimation.setup();
});