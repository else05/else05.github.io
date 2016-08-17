/*-----------------------------------------------------------------------------------
 /*
 /* Script for Resume
 /*
 -----------------------------------------------------------------------------------*/


/*----------------------------------------------------*/
/* Preloader
 ------------------------------------------------------ */

$(window).load(function(){

    $('.loader').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350);

});


jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* Initializing jQuery Nice Scroll
     ------------------------------------------------------ */

    $("html").niceScroll({
        cursorcolor:"#11abb0", // Set cursor color
        cursorwidth: "8", // Sety cursor width
        cursorborder: "" // Set cursor border color, default left none
    });


    /*----------------------------------------------------*/
    /* FitText Settings
     ------------------------------------------------------ */

    setTimeout(function() {
        $('h1.responsive-headline').fitText(1, { minFontSize: '28px', maxFontSize: '72px' });
    }, 100);


    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------ */

    $('.smoothscroll').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });


    /*----------------------------------------------------*/
    /* Appear Animation
     ------------------------------------------------------*/
    new WOW().init();

    /*----------------------------------------------------*/
    /* Parallax for Header Content
     ------------------------------------------------------*/
    $(window).scroll(function(e){
        parallax();
    });


    function parallax() {
        var scrollPosition = $(window).scrollTop();
        $('.banner').css('margin-top', (0 - (scrollPosition * .8)) + 'px');
    }

    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
     ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#left-nav a");

    sections.waypoint({

        handler: function(event, direction) {

            var active_section;

            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#left-nav a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
     /* equal to the browser height.
     ------------------------------------------------------ */

    $('header').css({ 'height': $(window).height() });
    $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
    });


    /*----------------------------------------------------*/
    /*  On scroll blur header
     ------------------------------------------------------*/
    (function() {
        $(window).scroll(function() {
            var oVal;
            oVal = $(window).scrollTop() / 100;
            return $(".header-overlay").css("opacity", oVal);
        });

    }).call(this);



    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
     ------------------------------------------------------*/

    $('#menu').click(function(){
        $(document.body).toggleClass("show-menu");
        $('.menu').toggleClass("close-menu");
    });


    var Menu = {

        el: {
            ham: $('.menu'),
            menuTop: $('.menu-top'),
            menuMiddle: $('.menu-middle'),
            menuBottom: $('.menu-bottom')
        },

        init: function() {
            Menu.bindUIactions();
        },

        bindUIactions: function() {
            Menu.el.ham
                .on(
                    'click',
                    function(event) {
                        Menu.activateMenu(event);
                        event.preventDefault();
                    }
                );
        },

        activateMenu: function() {
            Menu.el.menuTop.toggleClass('menu-top-click');
            Menu.el.menuMiddle.toggleClass('menu-middle-click');
            Menu.el.menuBottom.toggleClass('menu-bottom-click');
        }
    };

    Menu.init();

    /* Animate Left Menu */


    /*----------------------------------------------------*/
    /*	Modal Popup
     ------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

        type:'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*----------------------------------------------------*/
    /*	3D Tag
     ------------------------------------------------------*/
    $('.burning').burn();
    var entries = [
        { label: 'java', url: '#', target: '_top' },
        { label: 'Bootstrap', url: '#', target: '_top' },
        { label: 'SpringMVC', url: '#', target: '_top' },
        { label: 'Spring-Boot', url: '#', target: '_top' },
        { label: 'Mybatis', url: '#', target: '_top' },
        { label: 'Oracle', url: '#', target: '_top' },
        { label: 'MySql', url: '#', target: '_top' },
        { label: 'HTML', url: '#', target: '_top' },
        { label: 'CSS', url: '#', target: '_top' },
        { label: 'Activiti', url: '#', target: '_top' },
        { label: 'Velocity', url: '#', target: '_top' },
        { label: 'Spring', url: '#', target: '_top' },
        { label: 'WebSocket', url: '#', target: '_top' },
        { label: 'QuarZ', url: '#', target: '_top' },
        { label: 'MongoDB', url: '#', target: '_top' },
        { label: 'jQuery', url: '#', target: '_top' },
        { label: 'Ajax', url: '#', target: '_top' },
        { label: 'Git', url: 'https://github.com/', target: '_top' },
        { label: 'Tomcat', url: '#', target: '_top' },
        { label: 'Maven', url: '#', target: '_top' },
        { label: 'Spring-data', url: '#', target: '_top' },
        { label: 'Freemarker', url: '#', target: '_top' },
        { label: 'JavaScript', url: '#', target: '_top' },
        { label: 'Bootstrap', url: '#', target: '_top' },
        { label: 'Junit', url: '#', target: '_top' },
        { label: 'Intellij', url: '#', target: '_top' },
        { label: 'Linux', url: '#', target: '_top' },
        { label: 'JSP', url: '#', target: '_top' }
    ];

    var settings = {

        entries: entries,
        width: $('#map').width(),
        height: $('#map').height(),
        radius: '65%',
        radiusMin: 75,
        bgDraw: true,
        bgColor: 'none',
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: 0.5,
        fontFamily: 'Consolas',
        fontSize: '20',
        fontColor: '#fff',
        fontWeight: 'normal',//bold
        fontStyle: 'normal',//italic
        fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        fontToUpperCase: false

    };

    //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
    $( '#tag-cloud' ).svg3DTagCloud( settings );
});







