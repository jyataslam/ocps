// © Copyright 2019 - Archi v2.8 by Designesia

jQuery(document).ready(function () {
    $("#menu-btn").click(() => {
        !$(".header-mobile").hasClass("height-auto")
            ? $(".header-mobile").addClass("background-black")
            : $(".header-mobile").removeClass("background-black");
    });

    var de_header_style = 1; // 1 - solid, 2 - transparent
    var de_header_layout = 1; // 1 - default, 2 - extended
    var de_header_color = 1; // 1 - default, 2 - light style
    var de_header_sticky = 1; // 1 - sticky, 2 - scroll
    var de_header_mobile_sticky = 2; // 1 - sticky, 2 - scroll
    var de_menu_separator = 1; // 1 - dotted, 2 - border, 3 - circle, 4 - square, 5 - plus, 6 - strip, 0 - none
    var de_color_style = 1; // 1 - default, 2 - light style
    var de_font_style = 1; // 1 - default, 2 - alternate font style

    var mobile_menu_show = 0;
    var grid_size = 10;
    var col = 4;
    var tmp_col = col;
    var sr = 466 / 700;
    var $container = jQuery("#gallery");
    var v_count = "0";

    if (de_color_style == 2) {
        $("body").addClass("de_light");
    }
    if (de_font_style == 2) {
        $("head").append(
            '<link rel="stylesheet" href="css/font-style-2.css" type="text/css" />'
        );
    }
    if (de_header_style == 2) {
        $("header").addClass("transparent");
    }
    if (de_menu_separator == 2) {
        $("#mainmenu").addClass("line-separator");
    } else if (de_menu_separator == 3) {
        $("#mainmenu").addClass("circle-separator");
    } else if (de_menu_separator == 4) {
        $("#mainmenu").addClass("square-separator");
    } else if (de_menu_separator == 5) {
        $("#mainmenu").addClass("plus-separator");
    } else if (de_menu_separator == 6) {
        $("#mainmenu").addClass("strip-separator");
    } else if (de_menu_separator == 0) {
        $("#mainmenu").addClass("no-separator");
    }
    if (de_header_layout == 2) {
        $("header").addClass("de_header_2");
        $("header .info").show();
    }
    if (de_header_color == 2) {
        $("header").addClass("header-light");
    }
    if (de_header_sticky == 2) {
        $("header").addClass("header-scroll");
    }
    if (de_header_mobile_sticky == 1) {
        $("header").addClass("header-mobile-sticky");
    }

    fetchInstagram();

    // --------------------------------------------------
    // magnificPopup
    // --------------------------------------------------

    var startWindowScroll = 0;
    jQuery(".simple-ajax-popup-align-top").magnificPopup({
        type: "ajax",
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: "auto",
        callbacks: {
            beforeOpen: function () {
                startWindowScroll = $(window).scrollTop();
            },
            open: function () {
                if ($(".mfp-content").height() < $(window).height()) {
                    $("body").on("touchmove", function (e) {
                        e.preventDefault();
                    });
                }
            },
            close: function () {
                $(window).scrollTop(startWindowScroll);
                $("body").off("touchmove");
            },
        },
    });

    jQuery(".simple-ajax-popup").magnificPopup({
        type: "ajax",
    });

    // zoom gallery
    jQuery(".zoom-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr("title");
                //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            },
        },
        gallery: {
            enabled: true,
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find("img");
            },
        },
    });

    // popup youtube, video, gmaps

    jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
    });

    // image popup

    $(".image-popup-vertical-fit").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-img-mobile",
        image: {
            verticalFit: true,
        },
    });

    $(".image-popup-fit-width").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        image: {
            verticalFit: false,
        },
    });

    $(".image-popup-no-margins").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
        image: {
            verticalFit: true,
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
        },
    });

    $(".image-popup-gallery").magnificPopup({
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr("title");
                //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            },
        },
        gallery: {
            enabled: true,
        },
    });

    /* --------------------------------------------------
     * custom background
     * --------------------------------------------------*/
    function custom_bg() {
        $("div,section").css("background-color", function () {
            return jQuery(this).data("bgcolor");
        });
        $("div,section").css("background", function () {
            return jQuery(this).data("bgimage");
        });
        $("div,section").css("background-size", function () {
            return "cover";
        });
    }

    // wow jquery

    new WOW().init();

    // --------------------------------------------------
    // init
    // --------------------------------------------------
    function init_de() {
        enquire.register("screen and (max-width: 993px)", {
            match: function () {
                $("header").addClass("header-mobile");
            },
            unmatch: function () {
                $("header").removeClass("header-mobile");
            },
        });

        var $window = jQuery(window);
        jQuery('section[data-type="background"]').each(function () {
            var $bgobj = jQuery(this); // assigning the object

            jQuery(window).scroll(function () {
                enquire.register("screen and (min-width: 993px)", {
                    match: function () {
                        var yPos = -(
                            $window.scrollTop() / $bgobj.data("speed")
                        );
                        var coords = "50% " + yPos + "px";
                        $bgobj.css({ backgroundPosition: coords });
                    },
                });
            });
            document.createElement("article");
            document.createElement("section");
        });

        jQuery(".de-team-list").each(function () {
            jQuery(this)
                .find("img")
                .on("load", function () {
                    var w = jQuery(this).css("width");
                    var h = jQuery(this).css("height");
                    //nh = (h.substring(0, h.length - 2)/2)-48;

                    jQuery(this)
                        .parent()
                        .parent()
                        .find(".team-pic")
                        .css("height", h);
                    jQuery(this)
                        .parent()
                        .parent()
                        .find(".team-desc")
                        .css("width", w);
                    jQuery(this)
                        .parent()
                        .parent()
                        .find(".team-desc")
                        .css("height", h);
                    jQuery(this)
                        .parent()
                        .parent()
                        .find(".team-desc")
                        .css("top", h);
                })
                .each(function () {
                    if (this.complete) $(this).load();
                });
        });

        jQuery(".de-team-list")
            .on("mouseenter", function () {
                var h;
                h = jQuery(this).find("img").css("height");
                jQuery(this)
                    .find(".team-desc")
                    .stop(true)
                    .animate({ top: "0px" }, 350, "easeOutQuad");
                jQuery(this)
                    .find("img")
                    .stop(true)
                    .animate({ "margin-top": "-100px" }, 400, "easeOutQuad");
            })
            .on("mouseleave", function () {
                var h;
                h = jQuery(this).find("img").css("height");
                jQuery(this)
                    .find(".team-desc")
                    .stop(true)
                    .animate({ top: h }, 350, "easeOutQuad");
                jQuery(this)
                    .find("img")
                    .stop(true)
                    .animate({ "margin-top": "0px" }, 400, "easeOutQuad");
            });

        // --------------------------------------------------
        // portfolio hover
        // --------------------------------------------------
        jQuery(".overlay").fadeTo(1, 0);

        // gallery hover

        jQuery(".item .picframe")
            .on("mouseenter", function () {
                var w = jQuery(this).find("img").css("width");
                var h = jQuery(this).find("img").css("height");
                jQuery(this).parent().find(".overlay").width(w);
                jQuery(this).parent().find(".overlay").height(h);
                jQuery(this)
                    .parent()
                    .find(".overlay")
                    .stop(true)
                    .fadeTo(300, 0.9);
                var picheight = jQuery(this).find("img").css("height");
                var newheight;
                newheight =
                    picheight.substring(0, picheight.length - 2) / 2 - 10;
                //alert(newheight);
                jQuery(this)
                    .parent()
                    .find(".pf_text")
                    .stop(true)
                    .animate({ "margin-top": newheight }, 300, "easeOutCubic");
            })
            .on("mouseleave", function () {
                var newheight;
                var picheight = jQuery(this).find("img").css("height");
                newheight =
                    picheight.substring(0, picheight.length - 2) / 2 - 10;
                jQuery(this)
                    .parent()
                    .find(".pf_text")
                    .stop(true)
                    .animate(
                        { "margin-top": newheight - 30 },
                        300,
                        "easeOutCubic"
                    );
                jQuery(this)
                    .parent()
                    .find(".overlay")
                    .stop(true)
                    .fadeTo(300, 0);
            });

        jQuery(".grid.border").css("padding-top", grid_size);
        jQuery(".grid.border").css("padding-left", grid_size);

        jQuery(".overlay").fadeTo(1, 0);
        // team hover
    }

    function grid_gallery() {
        jQuery(".grid-item").each(function () {
            var this_col = Number(jQuery(this).parent().attr("data-col"));
            var this_gridspace = Number(
                jQuery(this).parent().attr("data-gridspace")
            );
            var this_ratio = eval($(this).parent().attr("data-ratio"));
            jQuery(this).parent().css("padding-left", this_gridspace);
            var w =
                ($(document).width() - (this_gridspace * this_col + 1)) /
                    this_col -
                this_gridspace / this_col;
            var gi = $(this);
            var h = w * this_ratio;
            gi.css("width", w);
            gi.css("height", h);
            gi.find(".pf_title").css("margin-top", h / 2 - 10);
            gi.css("margin-right", this_gridspace);
            gi.css("margin-bottom", this_gridspace);
            if (gi.hasClass("large")) {
                $(this).css("width", w * 2 + this_gridspace);
                $(this).css("height", h * 2 + this_gridspace);
            }
            if (gi.hasClass("large-width")) {
                $(this).css("width", w * 2 + this_gridspace);
                $(this).css("height", h);
            }
            if (gi.hasClass("large-height")) {
                $(this).css("height", h * 2 + this_gridspace);
                gi.find(".pf_title").css("margin-top", h - 20);
            }
        });
    }

    init_de();
    grid_gallery();

    // --------------------------------------------------
    // preloader
    // --------------------------------------------------

    //calling jPreLoader function with properties
    jQuery("body").jpreLoader(
        {
            splashID: "#jSplash",
            splashFunction: function () {
                //passing Splash Screen script to jPreLoader
                jQuery("#jSplash").children("section").not(".selected").hide();
                jQuery("#jSplash").hide().fadeIn(800);
                init_de();
                var timer = setInterval(function () {
                    splashRotator();
                }, 1500);
            },
        },
        function () {
            //jPreLoader callback function
            clearInterval();

            jQuery(function () {
                var v_url = document.URL;

                if (v_url.indexOf("#") != -1) {
                    var v_hash = v_url.substring(v_url.indexOf("#") + 1);

                    jQuery("html, body").animate(
                        {
                            scrollTop: jQuery("#" + v_hash).offset().top - 70,
                        },
                        200
                    );
                    return false;
                }
            });
        }
    );

    // End of jPreLoader script

    function splashRotator() {
        var cur = jQuery("#jSplash").children(".selected");
        var next = jQuery(cur).next();

        if (jQuery(next).length != 0) {
            jQuery(next).addClass("selected");
        } else {
            jQuery("#jSplash")
                .children("section:first-child")
                .addClass("selected");
            next = jQuery("#jSplash").children("section:first-child");
        }

        jQuery(cur)
            .removeClass("selected")
            .fadeOut(100, function () {
                jQuery(next).fadeIn(100);
            });
    }

    // --------------------------------------------------
    // function
    // --------------------------------------------------

    function video_autosize() {
        jQuery(".de-video-container").each(function () {
            var height_1 = jQuery(this).css("height");
            var height_2 = jQuery(this).find(".de-video-content").css("height");
            var newheight =
                (height_1.substring(0, height_1.length - 2) -
                    height_2.substring(0, height_2.length - 2)) /
                2;
            jQuery(this).find(".de-video-overlay").css("height", height_1);
            jQuery(this)
                .find(".de-video-content")
                .animate({ "margin-top": newheight }, "fast");
        });
    }

    window.onresize = function (event) {
        enquire.register("screen and (min-width: 993px)", {
            match: function () {
                jQuery("#mainmenu").show();
                jQuery("header").removeClass("height-auto");
                mobile_menu_show = 1;
                col = tmp_col;
            },
            unmatch: function () {
                jQuery("#mainmenu").hide();
                mobile_menu_show = 0;
                jQuery("#menu-btn").show();
                col = 2;
            },
        });

        // header bottom setting begin
        var mq = window.matchMedia("(max-width: 993px)");
        if (mq.matches) {
            jQuery(".header-bottom,.header-center").css("display", "block");
            jQuery(".header-bottom,.header-center").css("top", "0");
        }
        // header bottom setting close

        init();
        video_autosize();
        centery();

        $("header").removeClass("smaller");
        $("header").removeClass("logo-smaller");
        $("header").removeClass("clone");
        jQuery("#menu-btn").removeClass("clicked");
        jQuery("#menu-btn").addClass("unclick");

        grid_gallery();
    };

    function init() {
        var sh = jQuery("#de-sidebar").css("height");
        var dh = jQuery(window).innerHeight();
        var h = parseInt(sh) - parseInt(dh);
        var header_height = parseInt(jQuery("header").height(), 10);
        var screen_height = parseInt(jQuery(window).height(), 10);
        var header_mt = screen_height - header_height;
        var mq = window.matchMedia("(min-width: 993px)");
        var ms = window.matchMedia("(min-width: 768px)");

        window.addEventListener("scroll", function (e) {
            if (mq.matches) {
                var distanceY =
                        window.pageYOffset ||
                        document.documentElement.scrollTop,
                    shrinkOn = 100,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }
                }
            }

            if (mq.matches) {
                jQuery("header").addClass("clone", 1000, "easeOutBounce");

                // header autoshow on scroll begin
                var $document = $(document);
                var vscroll = 0;

                if ($document.scrollTop() >= 50 && vscroll == 0) {
                    jQuery("header.autoshow").removeClass("scrollOff");
                    jQuery("header.autoshow").addClass("scrollOn");
                    vscroll = 1;
                } else {
                    jQuery("header.autoshow").removeClass("scrollOn");
                    jQuery("header.autoshow").addClass("scrollOff");
                    vscroll = 0;
                }
                // header autoshow on scroll close

                // header bottom on scroll begin
                var header_height = parseInt(jQuery("header").height(), 10);
                var screen_height = parseInt(jQuery(window).height(), 10);
                var header_mt = screen_height - header_height;
                var header_mt_half = header_mt / 2;

                if ($document.scrollTop() >= header_mt) {
                    jQuery(".header-bottom").css("position", "fixed");
                    jQuery(".header-bottom").css("top", "0");
                } else if ($document.scrollTop() <= header_mt) {
                    jQuery(".header-bottom").css("position", "absolute");
                    jQuery(".header-bottom").css("top", header_mt);
                }

                if ($document.scrollTop() >= header_mt_half) {
                    jQuery(".header-center").css("position", "fixed");
                    jQuery(".header-center").css("top", "0");
                } else if ($document.scrollTop() <= header_mt_half) {
                    jQuery(".header-center").css("position", "absolute");
                    jQuery(".header-center").css("top", header_mt_half);
                }
                // header bottom on scroll close

                // side header on scroll begin
                if (jQuery("header").hasClass("side-header")) {
                    if (jQuery(document).scrollTop() >= h) {
                        jQuery("#de-sidebar").css("position", "fixed");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery("#de-sidebar").css("top", -h);
                        }
                        jQuery("#main").addClass("col-md-offset-3");
                    } else {
                        jQuery("#de-sidebar").css("position", "relative");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery("#de-sidebar").css("top", 0);
                        }
                        jQuery("#main").removeClass("col-md-offset-3");
                    }
                }
                // side header on scroll close
            }
        });

        if (mq.matches) {
            jQuery(".header-bottom,.header-center").css("position", "absolute");
            jQuery(".header-bottom,.header-center").css("top", header_mt);
        }
    }
    window.onload = init();

    // --------------------------------------------------
    // owlCarousel
    // --------------------------------------------------

    jQuery("#gallery-carousel").owlCarousel({
        items: 4,
        navigation: false,
        pagination: false,
    });

    jQuery("#gallery-carousel-2").owlCarousel({
        items: 2,
        navigation: false,
        pagination: false,
    });

    jQuery("#gallery-carousel-3").owlCarousel({
        items: 3,
        navigation: false,
        pagination: false,
    });

    jQuery("#gallery-carousel-4").owlCarousel({
        items: 4,
        navigation: false,
        pagination: false,
    });

    jQuery(".carousel-gallery").owlCarousel({
        items: 4,
        navigation: false,
        pagination: false,
    });

    jQuery("#blog-carousel").owlCarousel({
        items: 2,
        navigation: false,
        pagination: true,
    });

    jQuery("#testimonial-carousel").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 1],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        navigation: false,
    });

    jQuery("#logo-carousel").owlCarousel({
        items: 6,
        navigation: false,
        pagination: false,
        autoPlay: true,
    });

    jQuery("#contact-carousel").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: true,
    });

    jQuery(".text-slider").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        mouseDrag: false,
        touchDrag: false,
        autoPlay: 4000,
        transitionStyle: "fade",
    });

    jQuery(".simple-slider").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        mouseDrag: false,
        touchDrag: false,
        autoPlay: 4000,
        transitionStyle: "fade",
    });

    jQuery(".carousel-single-navi").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: true,
        pagination: false,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fade",
    });

    jQuery(".blog-slide").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: false,
    });

    // Custom Navigation owlCarousel
    $(".next").on("click", function () {
        $(this).parent().parent().find(".blog-slide").trigger("owl.next");
    });
    $(".prev").on("click", function () {
        $(this).parent().parent().find(".blog-slide").trigger("owl.prev");
    });

    jQuery(".owl-custom-nav").each(function () {
        var owl = $(".owl-custom-nav").next();
        var ow = parseInt(owl.css("height"), 10);
        $(this).css("margin-top", ow / 2 - 10);

        owl.owlCarousel();

        // Custom Navigation Events
        $(".btn-next").on("click", function () {
            owl.trigger("owl.next");
        });
        $(".btn-prev").on("click", function () {
            owl.trigger("owl.prev");
        });
    });

    // --------------------------------------------------
    // custom positiion
    // --------------------------------------------------

    function centery() {
        var $doc_height = jQuery(window).innerHeight();
        jQuery("#homepage #content.content-overlay").css(
            "margin-top",
            $doc_height
        );
        jQuery(".full-height").css("height", $doc_height);
        var picheight = jQuery(".center-y").css("height");
        picheight = parseInt(picheight, 10);
        jQuery(".center-y").css(
            "margin-top",
            ($doc_height - picheight) / 2 - 90
        );
        jQuery(".full-height .de-video-container").css("height", $doc_height);
    }

    centery();

    // --------------------------------------------------
    // blog list hover
    // --------------------------------------------------
    jQuery(".blog-list")
        .on("mouseenter", function () {
            var v_height;
            var v_width;

            if (typeof v_height !== "undefined") {
                v_height = jQuery(this).find(".blog-slide").css("height");
                v_width = jQuery(this).find(".blog-slide").css("width");
                var newheight =
                    v_height.substring(0, v_height.length - 2) / 2 - 40;
                jQuery(this).find(".owl-arrow").css("margin-top", newheight);
                jQuery(this).find(".owl-arrow").css("width", v_width);
                jQuery(this).find(".owl-arrow").fadeTo(150, 1);
            }
            //alert(v_height);
        })
        .on("mouseleave", function () {
            jQuery(this).find(".owl-arrow").fadeTo(150, 0);
        });

    //  logo carousel hover
    jQuery("#logo-carousel img")
        .on("mouseenter", function () {
            jQuery(this).fadeTo(150, 0.5);
        })
        .on("mouseleave", function () {
            jQuery(this).fadeTo(150, 1);
        });

    /* --------------------------------------------------
     * show gallery item sequence
     * --------------------------------------------------*/
    function sequence() {
        var sq = jQuery(".sequence .sq-item .picframe");
        var count = sq.length;
        sq.addClass("zoomIn");
        for (var i = 0; i <= count; i++) {
            var sqx = jQuery(".sequence > .sq-item:eq(" + i + ") .picframe");
            sqx.attr("data-wow-delay", i / 15 + "s");
        }
    }

    sequence();

    // document on load
    jQuery(window).load(function () {
        video_autosize();
        grid_gallery();
        custom_bg();

        // --------------------------------------------------
        // filtering gallery
        // --------------------------------------------------

        $container.isotope({
            itemSelector: ".item",
            filter: "*",
        });
        jQuery("#filters a").on("click", function () {
            var $this = jQuery(this);
            if ($this.hasClass("selected")) {
                return false;
            }
            var $optionSet = $this.parents();
            $optionSet.find(".selected").removeClass("selected");
            $this.addClass("selected");

            var selector = jQuery(this).attr("data-filter");
            $container.isotope({
                filter: selector,
            });
            return false;
        });

        $(".grid").isotope({
            itemSelector: ".grid-item",
        });

        // --------------------------------------------------
        // revolution slider
        // --------------------------------------------------
        var revapi;

        revapi = jQuery("#revolution-slider").revolution({
            delay: 5000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 10,
            fullWidth: "on",
            fullScreen: "on",
            fullScreenOffsetContainer: "",
            touchenabled: "on",
            navigationType: "none",
            dottedOverlay: "",
        });

        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery(".de_tab").find(".de_tab_content > div").hide();
        jQuery(".de_tab").find(".de_tab_content > div:first").show();
        jQuery("li").find(".v-border").fadeTo(150, 0);
        jQuery("li.active").find(".v-border").fadeTo(150, 1);

        jQuery(".de_nav li").click(function () {
            jQuery(this).parent().find("li").removeClass("active");
            jQuery(this).addClass("active");
            jQuery(this).parent().parent().find(".v-border").fadeTo(150, 0);
            jQuery(this).parent().parent().find(".de_tab_content > div").hide();

            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this)
                .parent()
                .parent()
                .find(".de_tab_content > div:eq(" + indexer + ")")
                .fadeIn(); //uses whatever index the link has to open the corresponding box
            jQuery(this).find(".v-border").fadeTo(150, 1);
        });

        // request quote function

        var rq_step = 1;

        jQuery("#request_form .btn-right").click(function () {
            var rq_name = $("#rq_name").val();
            var rq_email = $("#rq_email").val();
            var rq_phone = $("#rq_phone").val();

            if (rq_step == 1) {
                if (rq_name.length == 0) {
                    $("#rq_name").addClass("error_input");
                } else {
                    $("#rq_name").removeClass("error_input");
                }
                if (rq_email.length == 0) {
                    $("#rq_email").addClass("error_input");
                } else {
                    $("#rq_email").removeClass("error_input");
                }
                if (rq_phone.length == 0) {
                    $("#rq_phone").addClass("error_input");
                } else {
                    $("#rq_phone").removeClass("error_input");
                }
            }

            if (
                rq_name.length != 0 &&
                rq_email.length != 0 &&
                rq_phone.length != 0
            ) {
                jQuery("#rq_step_1").hide();
                jQuery("#rq_step_2").fadeIn();
            }
        });

        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery(".de_review").find(".de_tab_content > div").hide();
        jQuery(".de_review").find(".de_tab_content > div:first").show();
        //jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
        jQuery(".de_review").find(".de_nav li:first").fadeTo(150, 1);

        jQuery(".de_nav li").click(function () {
            jQuery(this).parent().find("li").removeClass("active");
            //jQuery(this).parent().find('li').fadeTo(150,.5);
            jQuery(this).addClass("active");
            jQuery(this).fadeTo(150, 1);
            jQuery(this).parent().parent().find(".de_tab_content > div").hide();

            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this)
                .parent()
                .parent()
                .find(".de_tab_content > div:eq(" + indexer + ")")
                .show(); //uses whatever index the link has to open the corresponding box
        });

        // --------------------------------------------------
        // toggle
        // --------------------------------------------------
        jQuery(".toggle-list h2").addClass("acc_active");
        jQuery(".toggle-list h2").toggle(
            function () {
                jQuery(this).addClass("acc_noactive");
                jQuery(this).next(".ac-content").slideToggle(200);
            },
            function () {
                jQuery(this).removeClass("acc_noactive").addClass("acc_active");
                jQuery(this).next(".ac-content").slideToggle(200);
            }
        );

        var mb;

        // --------------------------------------------------
        // navigation for mobile
        // --------------------------------------------------

        jQuery("#menu-btn").on("click", function () {
            if (mobile_menu_show == 0) {
                jQuery("#mainmenu").slideDown();
                jQuery("header").addClass("height-auto");
                mobile_menu_show = 1;
                jQuery(this).removeClass("unclick");
                jQuery(this).addClass("clicked");
            } else {
                $("#mainmenu").slideUp("fast", function () {
                    jQuery("header").removeClass("height-auto");
                    mobile_menu_show = 0;
                });
                jQuery(this).removeClass("clicked");
                jQuery(this).addClass("unclick");
            }
        });

        // one page navigation
        /**
         * This part causes smooth scrolling using scrollto.js
         * We target all a tags inside the nav, and apply the scrollto.js to it.
         */

        jQuery("#homepage nav a, .scroll-to").click(function (evn) {
            if (this.href.indexOf("#") != -1) {
                evn.preventDefault();
                jQuery("html,body").scrollTo(this.hash, this.hash);
            }
        });

        jQuery("a.btn").click(function (evn) {
            if (this.href.indexOf("#") != -1) {
                evn.preventDefault();
                jQuery("html,body").scrollTo(this.hash, this.hash);
            }
        });

        jQuery(".de-gallery .item .icon-info").on("click", function () {
            jQuery(".page-overlay").show();
            url = jQuery(this).attr("data-value");

            jQuery("#loader-area .project-load").load(url, function () {
                jQuery("#loader-area").slideDown(500, function () {
                    jQuery(".page-overlay").hide();
                    jQuery("html, body").animate(
                        {
                            scrollTop: jQuery("#loader-area").offset().top - 70,
                        },
                        500,
                        "easeOutCubic"
                    );

                    //

                    jQuery(".image-slider").owlCarousel({
                        items: 1,
                        singleItem: true,
                        navigation: false,
                        pagination: true,
                        autoPlay: false,
                    });

                    jQuery(".container").fitVids();

                    jQuery("#btn-close-x").on("click", function () {
                        jQuery("#loader-area").slideUp(500, function () {
                            jQuery("html, body").animate(
                                {
                                    scrollTop:
                                        jQuery("#section-portfolio").offset()
                                            .top - 70,
                                },
                                500,
                                "easeOutCirc"
                            );
                        });

                        return false;
                    });
                });
            });
        });

        jQuery(".de-gallery .item").on("click", function () {
            $("#navigation").show();
        });

        // --------------------------------------------------
        // custom page with background on side
        // --------------------------------------------------
        jQuery(".side-bg").each(function () {
            jQuery(this)
                .find(".image-container")
                .css(
                    "height",
                    jQuery(this).find(".image-container").parent().css("height")
                );
        });

        var target = $(".center-y");
        var targetHeight = target.outerHeight();

        jQuery(".animated").fadeTo(0, 0);
        jQuery(".animated").each(function () {
            var imagePos = jQuery(this).offset().top;
            var timedelay = jQuery(this).attr("data-delay");

            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow + 300) {
                jQuery(this).fadeTo(1, 500);
                var $anim = jQuery(this).attr("data-animation");
            }
        });

        // btn arrow up
        jQuery(".arrow-up").on("click", function () {
            jQuery(".coming-soon .coming-soon-content").fadeOut(
                "medium",
                function () {
                    jQuery("#hide-content").fadeIn(600, function () {
                        jQuery(".arrow-up").animate(
                            { bottom: "-40px" },
                            "slow"
                        );
                        jQuery(".arrow-down").animate({ top: "0" }, "slow");
                    });
                }
            );
        });

        // btn arrow down
        jQuery(".arrow-down").on("click", function () {
            jQuery("#hide-content").fadeOut("slow", function () {
                jQuery(".coming-soon .coming-soon-content").fadeIn(
                    800,
                    function () {
                        jQuery(".arrow-up").animate({ bottom: "0px" }, "slow");
                        jQuery(".arrow-down").animate({ top: "-40" }, "slow");
                    }
                );
            });
        });

        // document scroll //
        jQuery(document).scroll(function () {
            var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
            if (scrollPercent >= 0) {
                target.css("opacity", scrollPercent);
            }

            if (location.hash !== "") {
                jQuery("#homepage nav li a").each(function () {
                    if (this.href.indexOf("#") != -1) {
                        var href = jQuery(this).attr("href");
                        if (
                            jQuery(window).scrollTop() >
                            jQuery(href).offset().top - 140
                        ) {
                            jQuery("nav li a").removeClass("active");
                            jQuery(this).addClass("active");
                        }
                    }
                });
            }

            // counter //
            jQuery(".timer").each(function () {
                var imagePos = jQuery(this).offset().top;

                var topOfWindow = jQuery(window).scrollTop();
                if (imagePos < topOfWindow + 500 && v_count == "0") {
                    jQuery(function ($) {
                        // start all the timers
                        jQuery(".timer").each(count);

                        function count(options) {
                            v_count = "1";
                            var $this = jQuery(this);
                            options = $.extend(
                                {},
                                options || {},
                                $this.data("countToOptions") || {}
                            );
                            $this.countTo(options);
                        }
                    });
                }
            });

            // progress bar //
            jQuery(".de-progress").each(function () {
                var pos_y = jQuery(this).offset().top;
                var value = jQuery(this)
                    .find(".progress-bar")
                    .attr("data-value");

                var topOfWindow = jQuery(window).scrollTop();
                if (pos_y < topOfWindow + 500) {
                    jQuery(this)
                        .find(".progress-bar")
                        .animate({ width: value }, "slow");
                }
            });

            jQuery(".animated").each(function () {
                var imagePos = jQuery(this).offset().top;
                var timedelay = jQuery(this).attr("data-delay");

                var topOfWindow = jQuery(window).scrollTop();
                if (imagePos < topOfWindow + 500) {
                    jQuery(this)
                        .delay(timedelay)
                        .queue(function () {
                            jQuery(this).fadeTo(1, 500);
                            var $anim = jQuery(this).attr("data-animation");
                            jQuery(this).addClass($anim).clearQueue();
                        });
                }
            });

            jQuery(".nav-exit").on("click", function () {
                $.magnificPopup.close();
            });
        }); // document scroll end //

        // $.stellar({
        //   horizontalScrolling: false,
        //   verticalOffset: 0,
        // });
    }); // document load end //

    // mainmenu create span
    jQuery("#mainmenu li a").each(function () {
        if ($(this).next("ul").length > 0) {
            $("<span></span>").insertAfter($(this));
        }
    });

    // mainmenu arrow click
    jQuery("#mainmenu > li > span").on("click", function () {
        var iteration = $(this).data("iteration") || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: curHeight }, 400, "easeInOutQuint");

                break;

            case 2:
                $(this).removeClass("active");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: "0" }, 400, "easeInOutQuint");
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data("iteration", iteration);
    });

    jQuery("#mainmenu > li > ul > li > span").on("click", function () {
        var iteration = $(this).data("iteration") || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this)
                    .parent()
                    .parent()
                    .parent()
                    .find("ul:first")
                    .css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: curHeight }, 400, "easeInOutQuint");

                break;

            case 2:
                $(this).removeClass("active");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: "0" }, 400, "easeInOutQuint");
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data("iteration", iteration);
    });

    jQuery("#mainmenu > li > ul > li > ul > li span").on("click", function () {
        var iteration = $(this).data("iteration") || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this)
                    .parent()
                    .parent()
                    .parent()
                    .find("ul:first")
                    .css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: curHeight }, 400, "easeInOutQuint");

                break;

            case 2:
                $(this).removeClass("active");
                $(this)
                    .parent()
                    .find("ul:first")
                    .animate({ height: "0" }, 400, "easeInOutQuint");
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data("iteration", iteration);
    });

    //jQUery('footer').append('<a href="#" id="back-to-top"></a>');

    if ($("#back-to-top").length) {
        var scrollTrigger = 500, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $("#back-to-top").addClass("show");
                } else {
                    $("#back-to-top").removeClass("show");
                }
            };
        backToTop();
        $(window).on("scroll", function () {
            backToTop();
        });
        $("#back-to-top").on("click", function (e) {
            e.preventDefault();
            $("html,body").animate(
                {
                    scrollTop: 0,
                },
                700
            );
        });

        $("section,div").css("background-color", function () {
            return jQuery(this).data("bgcolor");
        });

        $("div").css("background-image", function () {
            return jQuery(this).data("bgimage");
        });
    }

    // --------------------------------------------------
    // looping background
    // --------------------------------------------------
    $(function () {
        var x = 0;
        setInterval(function () {
            x -= 1;
            $(".bg-loop").css("background-position", x + "px 0");
        }, 50);
    });

    // new added

    jQuery(".expand").each(function () {
        $(this)
            .find("h4")
            .on("click", function () {
                var iteration = $(this).data("iteration") || 1;
                switch (iteration) {
                    case 1:
                        $(this).next(".hidden-content").slideDown(300);
                        $(this).addClass("active");
                        break;

                    case 2:
                        $(this).next(".hidden-content").slideUp(300);
                        $(this).removeClass("active");
                        break;
                }
                iteration++;
                if (iteration > 2) iteration = 1;
                $(this).data("iteration", iteration);
            });
    });
});

// CUSTOM JAVASCRIPT
// Handle all scroll events
$(document).scroll(function () {
    $(this).scrollTop() > 100
        ? $("#hero-svg").attr("class", "hero-svg-top shrink-logo")
        : $("#hero-svg").attr("class", "hero-svg-top");
    $(this).scrollTop() > 100
        ? $(".header-mobile").css("background-color", "#162a2d")
        : $(".header-mobile").css("background-color", "transparent");
});

// Function to fetch Instagram feed
function fetchInstagram() {
    const url =
        "https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=IGQVJVS3BPcEc5aDNTaG9MMTY5TE42aTJNd1E4d0V2amRhNlpELTJCNDB3R0M0M0pzZAkpZAZA2VGdjBjNS04Vk9FcmM4anltZAnRmSll4clZABVlJVeGo0QTNuQWlxRlNEM3ZADcm9Ba0VUa1NIMVlTWXNsMQZDZD";
    var token =
        "IGQVJVS3BPcEc5aDNTaG9MMTY5TE42aTJNd1E4d0V2amRhNlpELTJCNDB3R0M0M0pzZAkpZAZA2VGdjBjNS04Vk9FcmM4anltZAnRmSll4clZABVlJVeGo0QTNuQWlxRlNEM3ZADcm9Ba0VUa1NIMVlTWXNsMQZDZD"; //new token from new instagram api
    // userid = 17841403327248436, new user id from new instagram api
    var count = 0;

    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "GET",
        data: {
            access_token: token,
        },
        success: function (data) {
            for (index in data.data) {
                if (data.data[index].media_type === "VIDEO") {
                    $(".instagram-photo-container").append(
                        '<div class="instagram-photo"><a href="https://www.instagram.com/drbunkis/" target="_blank"><video class="instagram-fetched" src="' +
                            data.data[index].media_url +
                            '"></a></div>'
                    );
                    count++;
                    if (count === 9) {
                        return;
                    }
                } else {
                    $(".instagram-photo-container").append(
                        '<div class="instagram-photo"><a href="https://www.instagram.com/drbunkis/" target="_blank"><img class="instagram-fetched" src="' +
                            data.data[index].media_url +
                            '"></a></div>'
                    );
                    count++;
                    if (count === 9) {
                        return;
                    }
                }
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
}

// Check what native maps app the user is using
function mapsSelector() {
    if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPod") != -1 ||
        navigator.platform.indexOf("iPad") != -1
    )
        window.open(
            "maps://maps.google.com/maps?daddr=33.669702,-117.865944&amp;ll="
        );
    /* else use Google */ else
        window.open(
            "https://maps.google.com/maps?daddr=33.669702,-117.865944&amp;ll="
        );
}
