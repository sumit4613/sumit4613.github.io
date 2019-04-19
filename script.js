$(window).on("load", function() {
    $(".loader .inner").fadeOut(500, function() {
        $(".loader").fadeOut(750);
    });

    // Portfolio
    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });
})


$(document).ready(function() {
    // Scroll
    $('.scrollto').click(function(e) {
        e.preventDefault();
        var scrollElm = $(this).attr('href');
        var scrollTo = $(scrollElm).offset().top;
        $('html, body').animate({ scrollTop: scrollTo - 50}, "slow");
    })
    // Slides
    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    });

    var typed = new Typed(".typed", {
        strings: ["Student.", "Web Developer.", "Python Developer.", "Blockchain Enthusiast."],
        typeSpeed: 90,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    // Skills
    var owl = $("#skills-slide")
    owl.owlCarousel({
        autoPlay:true,
        items: 4,
        itemsDesktop:[1000,4],
        itemsDesktopSmall:[900,3],
        itemsTablet:[600,2],
        itemsMobile:[480,1],
    });

    // Animatons
    var windowH = $(window).height();

    $(window).bind('resize', function () {
        windowH = $(window).height();
    });
    $('.hidethis').bind('inview', function (event, visible) {
        if (visible === true) {
            $(this).removeClass('hidethis');
        }
    });
    var servicesTopOffset = $(".about .about-inner").offset().top;
    var timelineTopOffset = $(".timeline").offset().top;
    var skillsTopOffset = $('.skills').offset().top;

    $(window).scroll(function() {
        // fixed navbar
        if(window.pageYOffset > windowH)
        {
            $('.navbar-flat').addClass('navbar-fixed-top');
            $('.firstSec').addClass('fixed');
        }
        else
        {
            $('.navbar-flat').removeClass('navbar-fixed-top');
            $('.firstSec').removeClass('fixed');
        }
        // Timeline animation
        if(window.pageYOffset > timelineTopOffset-windowH+200)
        {
            $('.timeline li').addClass('fadeInUp');
        }

        // Skills Chart Animation
        if(window.pageYOffset > skillsTopOffset - windowH + 200) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
    });

    $("[data-fancybox]").fancybox();

    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });

});