(function($) {
    'use strict';

    var _body = $('body');
    var _window = $(window);

    function load_slick_carousel($element) {
        $element.slick({
            arrows: $element.data("nav") ? !0 : !1,
            dots: $element.data("dots") ? !0 : !1,
            draggable: $element.data("draggable") ? !1 : !0,
            infinite: $element.data("infinite") ? !1 : !0,
            autoplay: $element.data("autoplay") ? !0 : !1,
            prevArrow: '<i class="slick-arrow fa fa-angle-left"></i>',
            slidesToScroll: $element.data("slidestoscroll") ? $element.data("columns") : 1,
            nextArrow: '<i class="slick-arrow fa fa-angle-right"></i>',
            slidesToShow: $element.data("columns"),
            asNavFor: $element.data("asnavfor") ? $element.data("asnavfor") : !1,
            vertical: $element.data("vertical") ? !0 : !1,
            verticalSwiping: $element.data("verticalswiping") ? $element.data("verticalswiping") : !1,
            rtl: (_body.hasClass("rtl") && !$element.data("vertical")) ? !0 : !1,
            centerMode: $element.data("centermode") ? $element.data("centermode") : !1,
            centerPadding: $element.data("centerpadding") ? $element.data("centerpadding") : !1,
            focusOnSelect: $element.data("focusonselect") ? $element.data("focusonselect") : !1,
            fade: ($element.data("fade") && !_body.hasClass("rtl")) ? !0 : !1,
            cssEase: 'linear',
            autoplaySpeed: 5000,
            pauseOnHover: !1,
            pauseOnFocus: !1,
            responsive: [{
                breakpoint: 1441,
                settings: {
                    slidesToShow: $element.data("columns1440") ? $element.data("columns1440") : $element.data("columns"),
                    slidesToScroll: $element.data("columns1440") ? $element.data("columns1440") : $element.data("columns"),
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: $element.data("columns1"),
                    slidesToScroll: $element.data("columns1"),
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: $element.data("columns2"),
                    slidesToScroll: $element.data("columns2"),
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: $element.data("columns3"),
                    slidesToScroll: $element.data("columns3"),
                    vertical: !1,
                    verticalSwiping: !1,
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: $element.data("columns4"),
                    slidesToScroll: $element.data("columns4"),
                    vertical: !1,
                    verticalSwiping: !1,
                }
            }]
        })

        slide_check_nav_slick($element);
        
        // Zoom product image
        var $single_product = $('.shop-details');
        
        if ($single_product.length > 0 && $single_product.hasClass('zoom')) {
            var _data = $single_product.data();
            var $image_thumbnail = $('.img-item.slick-current', '.shop-details .image-additional');
            if (($(window).width()) >= 768) {
                product_zoom_image($('img', $image_thumbnail), _data);
            }
        }

        $element.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            if ($single_product.length > 0 && $single_product.hasClass('zoom')) {
                $('.zoomContainer').remove();
                var _data = $single_product.data();
                var $image_thumbnail = $('.img-item.slick-current', '.shop-details .image-additional');
                if (($(window).width()) >= 768) {
                    product_zoom_image($('img', $image_thumbnail), _data);
                }
            }
        });
    }

    function slide_check_nav_slick($element) {
        if ($('.slick-arrow', $element).length > 0) {
            if ($('.fa-angle-left', $element).length > 0) {
                var $prev = $('.fa-angle-left', $element).clone();
                $('.fa-angle-left', $element).remove();
                if ($element.parent().find('.fa-angle-left').length == 0) {
                    $prev.prependTo($element.parent());
                }
                $prev.click(function() {
                    $element.slick('slickPrev');
                });
            }
            if ($('.fa-angle-right', $element).length > 0) {
                var $next = $('.fa-angle-right', $element).clone();
                $('.fa-angle-right', $element).remove();
                if ($element.parent().find('.fa-angle-right').length == 0) {
                    $next.appendTo($element.parent());
                }
                $next.click(function() {
                    $element.slick('slickNext');
                })
            }
        } else {
            $('.fa-angle-left', $element.parent()).remove();
            $('.fa-angle-right', $element.parent()).remove();
        }
    }

    function click_button_mobile_menu() {
        $('#show-megamenu').on('click', function() { 
            if ($('.site-mobile-navigation').hasClass('active')) { 
                $('.site-mobile-navigation').removeClass('active');
            } else { 
                $('.site-mobile-navigation').addClass('active');
            }

            return !1;
        });

        $('#show-verticalmenu').on('click', function() {
            if ($('.site-mobile-vertical').hasClass('active')) {
                $('.site-mobile-vertical').removeClass('active');
            } else {
                $('.site-mobile-vertical').addClass('active');
            }

            return !1;
        })
    }

    function load_mobile_menu() {
        var wd_width = _window.width();
        var $main_menu = $('.menu', '#main-navigation');
        if (wd_width <= 991) {
            if ($('#mobile-main-menu').length < 1 && $main_menu.length > 0) {
                var $menu = $main_menu.parent().clone();
                $menu.attr('id', 'mobile-main-menu');
                $($menu).find('.menu').removeAttr('id');
                $('#page').append('<div class="site-mobile-navigation"><span id="remove-megamenu" class="remove-megamenu icon-remove">Close</span></div>');
                $('.site-mobile-navigation').append($menu);
                $menu.mmenu({
                    offCanvas: !1,
                    'navbar': {
                        'title': !1
                    }
                });
                remove_mobile_menu();
            }
            if ($('#mobile-vertical-menu').length < 1) {
                var $vertical = $('.bwp-vertical-navigation > div').clone();
                $vertical.attr('id', 'mobile-vertical-menu');
                $($vertical).find('.menu').removeAttr('id');
                $('#page').append('<div  class="site-mobile-vertical"><span id="remove-verticalmenu" class="remove-verticalmenu icon-remove">' + $('.bwp-navigation').data('text_close') + '</span></div>');
                $('.site-mobile-vertical').append($vertical);
                $vertical.mmenu({
                    offCanvas: !1,
                    'navbar': {
                        'title': !1
                    }
                });
                remove_mobile_menu();
            }
        } else {
            $('.site-mobile-navigation').remove();
            $('.site-mobile-vertical').remove()
        }
    }

    function remove_mobile_menu() {
        $('#remove-megamenu').on('click', function() {
            $('.site-mobile-navigation').removeClass('active');
            return !1
        });
        $('#remove-verticalmenu').on('click', function() {
            $('.site-mobile-vertical').removeClass('active');
            return !1
        })
    }

    function countdown_product() {
        $('.product-countdown').each(function(event) {
            var $this = $(this);
            var $id = $(this).data('id');
            var $current_time = new Date().getTime();
            var $sttime = $(this).data('sttime');
            var $countdown_time = $this.data('cdtime');
            var $day = $this.data('day') ? $this.data('day') : 'D';
            var $hour = $this.data('hour') ? $this.data('hour') : 'H';
            var $min = $this.data('min') ? $this.data('min') : 'M';
            var $sec = $this.data('sec') ? $this.data('sec') : 'S';
            var $austDay = new Date();
            $austDay = new Date($countdown_time * 1000);
            if ($sttime > $current_time) {
                $this.remove();
                return;
            }
            if ($countdown_time.length > 0 && $current_time > $countdown_time) {
                $this.remove();
                return;
            }
            if ($countdown_time.length <= 0) {
                $this.remove();
                return;
            }
            $this.countdown($austDay, function(event) {
                $(this).html(event.strftime('<span class="countdown-content"><span class="days"><span class="countdown-amount">%D</span><span class="countdown-text">' + $day + '</span></span><span class="countdown-section hours"><span class="countdown-amount">%H</span><span class="countdown-text">' + $hour + '</span></span><span class="countdown-section mins"><span class="countdown-amount">%M</span><span class="countdown-text">' + $min + '</span></span><span class="countdown-section secs"><span class="countdown-amount">%S</span><span class="countdown-text">' + $sec + '</span></span></span>'))
            }).on('finish.countdown', function(event) {
                $this.remove();
                $id = $this.data('id');
                $target = this;
                $this.hide('slow', function() {
                    $(this).remove();
                });
                $price = $this.data('price');
                $('#' + $id + ' .item-price > span').hide('slow', function() {
                    $('#' + $id + ' .item-price > span').remove();
                });
                $('#' + $id + ' .item-price').append('<span><span class="amount">' + $price + '</span></span>');
            })
        })
    }

    function product_single_image() {
        if ($('.shop-details').length) {
            var $element = $('.shop-details');
            var _data = $element.data();
            if ($element.hasClass('zoom')) { 
                if (_data.product_layout_thumb == 'one_column' || _data.product_layout_thumb == 'grid') {
                    product_load_image(_data);
                }
            }
        }
    }

    function product_load_image(_data) { 
        var $element = $('.image-additional');
        if (($(window).width()) >= 768) {
            $('.img-item', $element).each(function() {
                var $parent_img = $('a', $(this));
                product_zoom_image($('img', $parent_img), _data);
            })
        }
    }

    function product_zoom_image($element, _data) {
        if ($('.image-thumbnail').length > 0) {
            var $gallery = 'image-thumbnail';
        } else {
            var $gallery = !1;
        }
        $element.elevateZoom({
            zoomType: _data.zoomtype,
            scrollZoom: _data.zoom_scroll,
            lensSize: _data.lenssize,
            lensShape: _data.lensshape,
            containLensZoom: _data.zoom_contain_lens,
            gallery: $gallery,
            cursor: 'crosshair',
            galleryActiveClass: 'active',
            lensBorder: _data.lensborder,
            borderSize: _data.bordersize,
            borderColour: _data.bordercolour,
        })
    }

  $(document).ready(function() {
        // Page Loader
        setTimeout(function () {
            $('.page-preloader').fadeOut();
            click_button_mobile_menu();
            load_mobile_menu();

            // --- 🚀 【花禾佈置：全自動 SEO 掃描引擎 - 標籤+背景圖全能版】 ---
            function run_flower_seo() {
                var url = window.location.href;
                var isIndex = window.location.pathname.indexOf('index.html') > -1 || window.location.pathname == '/' || window.location.pathname == '';

                // 1. 處理首頁
                if (isIndex) {
                    document.title = "花禾空間佈置 - 婚禮佈置｜氣球派對｜性別派對｜抓周佈置";
                    var homeDesc = "花禾空間佈置提供專業婚禮設計、氣球派對、性別派對與抓周佈置。服務範圍涵蓋新北、台北、桃園、新竹地區，為您客製專屬活動氛圍。";
                    $('meta[name="description"]').attr('content', homeDesc);
                    $('meta[property="og:description"]').attr('content', homeDesc);
                    return;
                }

                // 2. 自動抓取標題 (相容各頁面)
                var possibleTitles = $('h1, h2, .title, .section-title, .breadcrumb li.active, .breadcrumb span:last-child');
                var foundTitle = "";
                possibleTitles.each(function() {
                    var txt = $(this).text().trim();
                    if (txt && txt !== "商品分類表" && txt !== "商品介紹" && txt !== "首頁" && txt !== "SHOP") {
                        foundTitle = txt;
                        return false; 
                    }
                });

                if (foundTitle) {
                    var finalTitle = "";
                    if (url.indexOf('product.html') > -1) {
                        finalTitle = foundTitle + " - 花禾專業婚禮氣球派對";
                    } else if (url.indexOf('group.html') > -1) {
                        finalTitle = foundTitle + "專案系列 | 專業活動設計 - 花禾空間佈置";
                    } else if (url.indexOf('product-list.html') > -1) {
                        finalTitle = foundTitle + "推薦 | 派對活動專用 - 花禾空間佈置";
                    } else {
                        finalTitle = foundTitle + " | 花禾空間佈置";
                    }
                    document.title = finalTitle;

                    // --- 🌟 【終極修正】同時處理 <img> 與 .square-img (背景圖) ---
                    // 掃描全頁面圖片標籤與背景圖容器
                    $('img, .square-img, .bg-img').each(function() {
                        var $this = $(this);
                        var isImgTag = $this.is('img');
                        var style = $this.attr('style') || "";
                        var imgSrc = isImgTag ? ($this.attr('src') || "") : style;

                        // 只要路徑包含 products (代表作品圖)，就強制補上 SEO 註解
                        if (imgSrc.indexOf('products') > -1) {
                            var seoText = foundTitle + " - 花禾專業婚禮氣球派對設計作品";
                            
                            if (isImgTag) {
                                // 處理一般圖片標籤
                                $this.attr('alt', seoText);
                            } else {
                                // 處理背景圖 (如 .square-img)：使用 aria-label 讓 Google 讀得到
                                $this.attr('aria-label', seoText);
                                $this.attr('role', 'img'); 
                            }
                            $this.attr('title', foundTitle + " | 花禾佈置");
                        }
                    });
                }
            }

            // 啟動巡邏機制：每 0.5 秒修正一次，共 10 次
            var retry = 0;
            var seoInterval = setInterval(function() {
                run_flower_seo();
                retry++;
                if (retry > 10) clearInterval(seoInterval);
            }, 500);

            // --- 原本的插件載入 ---
            $('.slick-sliders').each(function () { load_slick_carousel($(this)); });
            $('.shop-details .slick-carousel').each(function() { load_slick_carousel($(this)); });
            product_single_image();

        }, 1500);
        
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(this).closest('.block').find('.slick-sliders').slick('refresh');
        });

        // Countdown
        countdown_product();

        // Back Top button
        _window.scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.back-top').addClass('button-show')
            } else {
                $('.back-top').removeClass('button-show')
            }
        });
        $('.back-top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return !1
        })
        
        // Form Login
        $('.active-login').on('click', function(e) {
            e.preventDefault();

            if ($('.form-login-register').hasClass('active')) {
                $('.form-login-register').removeClass('active')
            } else {
                $('.form-login-register').addClass('active')
            }
        });
        $('.remove-form-login-register').on('click', function() {
            if ($('.form-login-register').hasClass('active')) {
                $('.form-login-register').removeClass('active')
            }
        })
        $('.button-next-reregister').on('click', function() {
            if ($('.form-login').hasClass('active')) {
                $('.form-login').removeClass('active');
                $('.form-register').addClass('active')
            }
        });
        $('.button-next-login').on('click', function() {
            if ($('.form-register').hasClass('active')) {
                $('.form-register').removeClass('active');
                $('.form-login').addClass('active')
            }
        })

        // Search toggle
        $('.search-toggle').on('click.break', function(event) {
            $('.page-wrapper').toggleClass('opacity-style');
            var wrapper = $('.search-overlay');
            wrapper.toggleClass('search-visible')
        });
        $('.close-search', '.search-overlay').on('click.break', function(event) {
            $('.page-wrapper').toggleClass('opacity-style');
            var wrapper = $('.search-overlay');
            wrapper.toggleClass('search-visible')
        })

        // Ajax search
        $('.ajax-search .input-search').on('keydown', function() {
            setTimeout(function($e) {
                var character = $e.val();
                if (character.length >= 2) {
                    $('.ajax-search .result-search-products-content').show();
                    $('.ajax-search .result-search-products .items-search').hide();
                    $('.ajax-search .result-search-products').addClass('loading');
                    $('.ajax-search .result-search-products').show();
                    setTimeout(function() {
                        $('.ajax-search .result-search-products').removeClass('loading');
                        $('.ajax-search .result-search-products .items-search').show();
                    }, 1000)
                } else {
                    $('.ajax-search .result-search-products-content').hide();
                }
            }, 200, $(this))
        })

        // Cart
        $('.cart-empty-wrap').hide();
        $('.cart-list-wrap').show();
        $('.cart-remove').on('click', function() {
            if ($('.ruper-topcart.popup').hasClass('active')) {
                $('.ruper-topcart.popup').removeClass('active')
            }
            if (_body.hasClass('not-scroll')) {
                _body.removeClass('not-scroll')
            }
        });
        $('.cart-icon').on('click', function() {
            if (!_body.hasClass('not-scroll') && $('.ruper-topcart').hasClass('popup')) {
                _body.addClass('not-scroll')
            }
        });
        $('.remove-cart-shadow').on('click', function() {
            if ($('.ruper-topcart.popup').hasClass('active')) {
                $('.ruper-topcart.popup').removeClass('active')
            }
            if (_body.hasClass('not-scroll')) {
                _body.removeClass('not-scroll')
            }
        })
        $('.mini-cart-item a.remove').on('click', function(e) {
            e.preventDefault();

            var mini_cart = $(this).closest('.mini-cart');

            // Remove item
            $(this).closest('li').remove();
           
            // Update cart count
            mini_cart.find('.cart-count').text(mini_cart.find('.cart-list-wrap .cart-list li').length);

            // Show empty cart if has not any item
            if (!mini_cart.find('.cart-list-wrap .cart-list li').length) {
                mini_cart.find('.cart-empty-wrap').show();
                mini_cart.find('.cart-list-wrap').hide();
            }
        })
        $('.dropdown-menu.cart-popup').on('click.bs.dropdown', function (e) {
            e.stopPropagation();       
        });

        // Add To Cart button
        $('.btn-add-to-cart .button').on('click', function(e) {
            e.preventDefault();

            var btn_atc = $(this);
            btn_atc.addClass('loading');
            setTimeout(function(){ 
                btn_atc.removeClass('loading');
                btn_atc.addClass('added');
                btn_atc.closest('div').append('<a href="shop-cart.html" class="added-to-cart product-btn" title="View cart" tabindex="0">View cart</a>'); 
                
                // Display message
                $('body').append('<div class="cart-product-added"><div class="added-message">Product was added to cart successfully!</div>');
                setTimeout(function() {
                    $('.cart-product-added').remove();
                }, 2000)
            }, 1000);
        })
        
        // Wishlist button
        $('.btn-wishlist .product-btn').on('click', function(e) {
            e.preventDefault();

            var btn_wishlist = $(this);

            if (btn_wishlist.hasClass('added')) {
                $('.wishlist-popup').addClass('show');
            } else {
                btn_wishlist.addClass('adding');
                btn_wishlist.html('Add to wishlist...');
                setTimeout(function(){ 
                    btn_wishlist.removeClass('adding');
                    btn_wishlist.addClass('added');
                    btn_wishlist.html('Browse wishlist');
                    $('.wishlist-popup').addClass('show');
                    setTimeout(function(){ 
                        $('.wishlist-notice').removeClass('wishlist-notice-show');
                    }, 1000);
                }, 1000);
            }
        })
        $('.wishlist-popup .wishlist-popup-close').on('click', function(e) {
            e.preventDefault();

            $('.wishlist-popup').removeClass('show');
        })
        $(document).on('click touch', '.wishlist-popup', function(e) {
            var wishlist_content = $('.wishlist-popup-content');
            if ($(e.target).closest(wishlist_content).length == 0) {
                $('.wishlist-popup').removeClass('show');
            }
        })
        $('.wishlist-popup .wishlist-continue').on('click', function(e) {
            $('.wishlist-popup').removeClass('show');
        })
        $('.wishlist-item-remove span').on('click', function(e) {
            $(this).addClass('removing');
            $('.wishlist-notice').text('Removed from wishlist!');
            $('.wishlist-notice').addClass('wishlist-notice-show');
            var wishlist_items  = $(this).closest('.wishlist-items');
            var wishlist_item   = $(this).closest('.wishlist-item');
            setTimeout(function(){ 
                $('.wishlist-notice').removeClass('wishlist-notice-show');
                wishlist_item.remove();
                $('.wishlist-count').text(wishlist_items.find('tbody tr').length);
                if (!wishlist_items.find('tbody tr').length) {
                    wishlist_items.before('<div class="wishlist-empty">There are no products on the wishlist!</div>');
                }
            }, 1000);
        })

        // Compare button
        $('.btn-compare .product-btn').on('click', function(e) {
            var btn_compare = $(this);

            btn_compare.addClass('adding');
            setTimeout(function(){ 
                btn_compare.removeClass('adding');

                $('.compare-popup').addClass('active');
            }, 1000);
        })
        $('.compare-popup .compare-table-close').on('click', function(e) {
            e.preventDefault();

            $('.compare-popup').removeClass('active');
        })
        
        // Quickview button
        $('.product-quickview .quickview-button').on('click', function(e) {
            e.preventDefault();

            var btn_quickview = $(this);

            btn_quickview.addClass('loading');
            setTimeout(function(){ 
                btn_quickview.removeClass('loading');
                $('.quickview-popup').addClass('active');
            }, 1000);
        })
        $('.quickview-popup .quickview-close').on('click', function(e) {
            e.preventDefault();

            $('.quickview-popup').removeClass('active');
        })
        $(document).on('click touch', '.quickview-popup', function(e) {
            var quickview_content = $('.quickview-container');
            if ($(e.target).closest(quickview_content).length == 0) {
                $('.quickview-popup').removeClass('active');
            }
        })
        $('.quantity .plus').on('click', function(e) {
            var qty = parseInt($(this).closest('.quantity').find('.qty').val());
            $(this).closest('.quantity').find('.qty').val(qty + 1);
        })
        $('.quantity .minus').on('click', function(e) {
            var qty = parseInt($(this).closest('.quantity').find('.qty').val());
            if (qty > 1) {
                $(this).closest('.quantity').find('.qty').val(qty - 1);
            }
        })

        // Load video popup
        var $video_src;  
        $('.video-wrap .video').click(function() {
            $video_src = $(this).data('src');
        });
        $('#video-popup').on('shown.bs.modal', function (e) {
            $('#video').attr('src', $video_src);
        })
        $('#video-popup').on('hide.bs.modal', function (e) {
            $('#video').attr('src', $video_src); 
        })

        // Loadmore
        $('.btn.loadmore').on('click', function(e) {
            e.preventDefault();

            var btn_loadmore = $(this);

            btn_loadmore.addClass('loading');
            setTimeout(function(){ 
                btn_loadmore.closest('.block-products').find('.products-list .row > div.hide').show();

                btn_loadmore.remove();
            }, 1000);
        })

        // Lookbook
        if (screen.width <= 480) {
            $('.item-lookbook').each(function () {
                var offset = $(this).offset();
                var offset_left = parseInt(offset.left);
                $(this).find('.content-lookbook').css('left', '-' + (offset_left - 14) + 'px');
                $(this).find('.content-lookbook').css('top', 'auto');
                $(this).find('.content-lookbook').css('bottom', '36px');
                $(this).find('.content-lookbook').css('width', (parseInt(screen.width) - 30) + 'px');
            });
        }

        // Toggle menu full
        $('.menu-full .menu-toggle').on('click', function(e) {
            $(this).closest('.menu-full').find('.site-navigation').addClass('active');
        });
        $('.menu-full .close-menu-full').on('click', function(e) {
            $(this).closest('.menu-full').find('.site-navigation').removeClass('active');
        });

        // Price filter
        if ($('#price-filter').length) {
            $('#price-filter').slider({
                from: 0,
                to: 100,
                step: 1,
                smooth: true,
                round: 0,
                dimension: '&nbsp;$',
                skin: 'plastic'
            });
        }

        // Shop cart remove item
        $('.shop-cart-empty').hide();
        $('.shop-cart .product-remove a').on('click', function(e) {
            e.preventDefault();

            // Remove item
            $(this).closest('tr').remove();
           
            // Update cart total
            $('.shop-cart .cart-subtotal .price').text($('.shop-cart .product-subtotal .price').text());
            $('.shop-cart .order-total .price').text($('.shop-cart .product-subtotal .price').text());

            // Show empty cart if has not any item
            if ($('.shop-cart .cart-items tr').length == 2) {
                $('.shop-cart').hide();
                $('.shop-cart-empty').show();
            }
        });

        // Custom radio
        $('.custom-radio li .payment-box').hide();
        $('.custom-radio li .input-radio:checked').closest('li').find('.payment-box').show();
        $('.custom-radio li').on('click', function(e) {
            $(this).closest('.custom-radio').find('li input').prop('checked', false); 
            $(this).find('input').prop('checked', true);

             $(this).closest('.custom-radio').find('li .payment-box').hide();
             $(this).find('.payment-box').show();
        });

        // Custom select
        if ($('.custom-select').length) {
            $('.custom-select').select2();
        }

        // Shop Checkout
        $('.shop-checkout .create-account').hide();
        $('.shop-checkout .account-fields .input-checkbox').change(function() {
            $('.shop-checkout .create-account').toggle();
        });
        
        $('.shop-checkout .shipping-address').hide();
        $('.shop-checkout .shipping-fields .input-checkbox').change(function() {
            $('.shop-checkout .shipping-address').toggle();
        });
    });
})(jQuery);