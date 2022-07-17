(function ($) {
    'use strict';

    var $window = $(window);

    // :: 1.0 Masonary Gallery Active Code


    // Plugin settings
    var plgn = () => {
        var proCata = $('.amado-pro-catagory');
        var singleProCata = ".single-products-catagory";

        if ($.fn.imagesLoaded) {
            proCata.imagesLoaded(function () {
                proCata.isotope({
                    itemSelector: singleProCata,
                    percentPosition: true,
                    masonry: {
                        columnWidth: singleProCata
                    }
                });
            });
        }
        return "plgn is work";
    };

    // Custom resizing images

    //How resize images (find min size and resize all or by max size image)
    // elements (images or divs etc.)
    // var prepereParams = {
    //     width:  'min', //max, min
    //     height: 'min', //max, min
    //     squer: false
    // };

    var prepereImgs = (images, prepereParams) => {


        var sizes = {
            w: false,
            h: false,
        };

        var exprW = (savedW, elemW) => {
            if (prepereParams.width === 'min') {
                return savedW > elemW;
            }
            if (prepereParams.width === 'max') {
                return savedW < elemW;
            }
        };

        var exprH = (savedH, elemH) => {
            if (prepereParams.height === 'min') {
                return savedH > elemH;
            }
            if (prepereParams.height === 'max') {
                return savedH < elemH;
            }
        };

        images.each(function (index, image) {

            //Remove styles. If window resized needed reload old sizes in css
            $(image).removeAttr( 'style' );

            let w = $(image).width();
            let h = $(image).height();

            // let w = $(image).prop('naturalWidth');
            // let h = $(image).prop('naturalHeight');

            // console.log(w);

            if (exprW(sizes.w, w) || !sizes.w) {
                sizes.w = w;
            }

            if (exprH(sizes.h, h) || !sizes.h) {
                sizes.h = h;
            }

            console.log(w, h);

        });

        // console.log(sizes);

        images.each(function (index, image) {
            $(image).css("height", sizes.h);   // Set new height
            $(image).css("width", sizes.w);    // Set new width
        });
    };



    var homePicsPrepere = () => {
        return new Promise((myResolve, myReject) => {
            var proCata = $(document).find('.amado-pro-catagory');

            var images = proCata.find('img');
            prepereImgs(
                images,
                {
                    width: 'min', //max, min
                    height: 'max', //max, min
                }
            );
            myResolve('Images resized'); // when successful
        }).then(
            (message) => {
                // console.log($(window).width());
                return plgn();
            }
        ).then(
            (message) => {
                // console.log(message);
            }
        );
    }

    homePicsPrepere();

    // Shop prepere size images
    var shopPicsPrepere = () => {
        var imgsWrap = $(document).find('.products-wrap');
        var imgs = imgsWrap.find('.product-img > img');
        // console.log(imgs);
        prepereImgs(
            imgs,
            {
                width: 'min', //max, min
                height: 'max', //max, min
            }
        );
    }

    shopPicsPrepere();

    $(window).on('resize', function () {
        homePicsPrepere();
        shopPicsPrepere();
    });


    // if ($.fn.imagesLoaded) {
    //     proCata.imagesLoaded(function () {
    //         proCata.isotope({
    //             itemSelector: singleProCata,
    //             percentPosition: true,
    //             masonry: {
    //                 columnWidth: singleProCata
    //             }
    //         });
    //     });
    // }

    // :: 2.1 Search Active Code
    var amadoSearch = $('.search-nav');
    var searchClose = $('.search-close');

    amadoSearch.on('click', function () {
        $('body').toggleClass('search-wrapper-on');
    });

    searchClose.on('click', function () {
        $('body').removeClass('search-wrapper-on');
    });

    // :: 2.2 Mobile Nav Active Code
    var amadoMobNav = $('.amado-navbar-toggler');
    var navClose = $('.nav-close');

    amadoMobNav.on('click', function () {
        $('.header-area').toggleClass('bp-xs-on');
    });

    navClose.on('click', function () {
        $('.header-area').removeClass('bp-xs-on');
    });

    // :: 3.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: 4.0 Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 0) {
            $('.header_area').addClass('sticky');
        } else {
            $('.header_area').removeClass('sticky');
        }
    });

    // :: 5.0 Nice Select Active Code
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    // :: 6.0 Magnific Active Code
    if ($.fn.magnificPopup) {
        $('.gallery_img').magnificPopup({
            type: 'image'
        });
    }

    // :: 7.0 Nicescroll Active Code
    if ($.fn.niceScroll) {
        $(".cart-table table").niceScroll();
    }

    // :: 8.0 wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: 9.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: 10.0 PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // :: 11.0 Slider Range Price Active Code
    $('.slider-range-price').each(function () {
        var min = jQuery(this).data('min');
        var max = jQuery(this).data('max');
        var unit = jQuery(this).data('unit');
        var value_min = jQuery(this).data('value-min');
        var value_max = jQuery(this).data('value-max');
        var label_result = jQuery(this).data('label-result');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = label_result + " " + unit + ui.values[0] + ' - ' + unit + ui.values[1];
                console.log(t);
                t.closest('.slider-range').find('.range-price').html(result);
            }
        });
    });

})(jQuery);