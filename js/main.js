$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  //------- Active Nice Select --------//

  $("select").niceSelect();

  $(".navbar-nav li.dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").stop(true, true).delay(200).fadeIn(500);
    },
    function () {
      $(this).find(".dropdown-menu").stop(true, true).delay(200).fadeOut(500);
    }
  );

  $(".img-pop-up").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  // Search Toggle
  $("#search_input_box").hide();
  $("#search").on("click", function () {
    $("#search_input_box").slideToggle();
    $("#search_input").focus();
  });
  $("#close_search").on("click", function () {
    $("#search_input_box").slideUp(500);
  });

  /*==========================
		javaScript for sticky header
		============================*/
  $(".sticky-header").sticky();

  /*=================================
    Javascript for banner area carousel
    ==================================*/
  $(".active-banner-slider").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: [
      "<img src='img/banner/prev.png'>",
      "<img src='img/banner/next.png'>",
    ],
    dots: false,
  });

  /*=================================
    Javascript for product area carousel
    ==================================*/
  $(".active-product-area").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: [
      "<img src='img/product/prev.png'>",
      "<img src='img/product/next.png'>",
    ],
    dots: false,
  });

  /*=================================
    Javascript for single product area carousel
    ==================================*/
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: true,
  });

  /*=================================
    Javascript for exclusive area carousel
    ==================================*/
  $(".active-exclusive-product-slider").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: [
      "<img src='img/product/prev.png'>",
      "<img src='img/product/next.png'>",
    ],
    dots: false,
  });
});
