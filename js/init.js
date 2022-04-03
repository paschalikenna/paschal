jQuery(document).ready(function () {
  "use strict";
  paschal_tm_modalbox();
  paschal_tm_page_transition();
  paschal_tm_trigger_menu();
  paschal_tm_modalbox_news();
  paschal_tm_modalbox_about();
  paschal_tm_modalbox_portfolio();
  paschal_tm_my_progress();
  paschal_tm_mycounter();
  paschal_tm_projects();
  paschal_tm_portfolio();
  paschal_tm_cursor();
  paschal_tm_imgtosvg();
  paschal_tm_popup();
  paschal_tm_data_images();
  paschal_tm_contact_form();
  paschal_tm_owl_carousel();
  paschal_tm_location();
  jQuery(window).load("body", function () {
    paschal_tm_my_load();
  });
});
function paschal_tm_modalbox() {
  "use strict";
  jQuery(".paschal_tm_all_wrap").prepend(
    '<div class="paschal_tm_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>'
  );
}
function paschal_tm_page_transition() {
  "use strict";
  var section = jQuery(".paschal_tm_section");
  var allLi = jQuery(".transition_link li");
  var button = jQuery(".transition_link a");
  var wrapper = jQuery(".paschal_tm_all_wrap");
  var enter = wrapper.data("enter");
  var exit = wrapper.data("exit");
  button.on("click", function () {
    var element = jQuery(this);
    var href = element.attr("href");
    if (element.parent().hasClass("paschal_tm_button")) {
      jQuery('.menu .transition_link a[href="' + href + '"]').trigger("click");
      hashtag();
      return false;
    }
    var sectionID = jQuery(href);
    var parent = element.closest("li");
    if (!parent.hasClass("active")) {
      allLi.removeClass("active");
      wrapper.find(section).removeClass("animated " + enter);
      if (wrapper.hasClass("opened")) {
        wrapper.find(section).addClass("animated " + exit);
      }
      parent.addClass("active");
      wrapper.addClass("opened");
      wrapper
        .find(sectionID)
        .removeClass("animated " + exit)
        .addClass("animated " + enter);
      jQuery(section).addClass("hidden");
      jQuery(sectionID).removeClass("hidden").addClass("active");
    }
    return false;
  });
}
function paschal_tm_trigger_menu() {
  "use strict";
  var hamburger = jQuery(".paschal_tm_topbar .trigger .hamburger");
  var mobileMenu = jQuery(".paschal_tm_mobile_menu");
  var mobileMenuList = jQuery(".paschal_tm_mobile_menu ul li a");
  hamburger.on("click", function () {
    var element = jQuery(this);
    if (element.hasClass("is-active")) {
      element.removeClass("is-active");
      mobileMenu.removeClass("opened");
    } else {
      element.addClass("is-active");
      mobileMenu.addClass("opened");
    }
    return false;
  });
  mobileMenuList.on("click", function () {
    jQuery(".paschal_tm_topbar .trigger .hamburger").removeClass("is-active");
    mobileMenu.removeClass("opened");
    return false;
  });
}
function paschal_tm_modalbox_news() {
  "use strict";
  var modalBox = jQuery(".paschal_tm_modalbox");
  var list = jQuery(".paschal_tm_news ul li");
  var closePopup = modalBox.find(".close");
  list.each(function () {
    var element = jQuery(this);
    var details = element.find(".list_inner").html();
    var buttons = element.find(
      ".details .title a,.paschal_tm_full_link,.paschal_tm_read_more a"
    );
    var mainImage = element.find(".main");
    var imgData = mainImage.data("img-url");
    var title = element.find(".title");
    var titleHref = element.find(".title a").html();
    buttons.on("click", function () {
      jQuery("body").addClass("modal");
      modalBox.addClass("opened");
      modalBox.find(".description_wrap").html(details);
      mainImage = modalBox.find(".main");
      mainImage.css({ backgroundImage: "url(" + imgData + ")" });
      title = modalBox.find(".title");
      title.html(titleHref);
      paschal_tm_imgtosvg();
      return false;
    });
  });
  closePopup.on("click", function () {
    modalBox.removeClass("opened");
    modalBox.find(".description_wrap").html("");
    jQuery("body").removeClass("modal");
    return false;
  });
}
function paschal_tm_modalbox_about() {
  "use strict";
  var modalBox = jQuery(".paschal_tm_modalbox_about");
  var opener = jQuery(".paschal_tm_about .paschal_tm_button a");
  var closer = modalBox.find(".close");
  opener.on("click", function () {
    modalBox.addClass("opened");
    paschal_tm_my_progress();
    paschal_tm_mycounter();
    return false;
  });
  closer.on("click", function () {
    modalBox.removeClass("opened");
    return false;
  });
}
function paschal_tm_modalbox_portfolio() {
  "use strict";
  var modalBox = jQuery(".paschal_tm_modalbox");
  var button = jQuery(".paschal_tm_portfolio .popup_info");
  button.on("click", function () {
    var element = jQuery(this);
    var parent = element.closest("li");
    var details = parent.find(".details_all_wrap").html();
    var title = parent.find(".entry").data("title");
    var category = parent.find(".entry").data("category");
    modalBox.addClass("opened");
    modalBox.find(".description_wrap").html(details);
    modalBox.find(".top_image").html(parent.find(".popup_info").html());
    modalBox
      .find(".portfolio_main_title")
      .html("<h3>" + title + "</h3>" + "<span>" + category + "</span>");
    paschal_tm_popup();
  });
}
function paschal_tm_projects() {
  "use strict";
  jQuery(".paschal_tm_portfolio_animation_wrap").each(function () {
    jQuery(this)
      .on("mouseenter", function () {
        if (jQuery(this).data("title")) {
          jQuery(".paschal_tm_portfolio_titles").html(
            jQuery(this).data("title") +
              '<span class="work__cat">' +
              jQuery(this).data("category") +
              "</span>"
          );
          jQuery(".paschal_tm_portfolio_titles").addClass("visible");
        }
        jQuery(document).on("mousemove", function (e) {
          jQuery(".paschal_tm_portfolio_titles").css({
            left: e.clientX - 10,
            top: e.clientY + 25,
          });
        });
      })
      .on("mouseleave", function () {
        jQuery(".paschal_tm_portfolio_titles").removeClass("visible");
      });
  });
}
function paschal_tm_portfolio() {
  "use strict";
  if (jQuery().isotope) {
    var list = jQuery(".paschal_tm_portfolio .portfolio_list");
    var filter = jQuery(".paschal_tm_portfolio .portfolio_filter ul");
    if (filter.length) {
      filter.find("a").on("click", function () {
        var selector = jQuery(this).attr("data-filter");
        list.isotope({
          filter: selector,
          animationOptions: { duration: 750, easing: "linear", queue: false },
        });
        return false;
      });
      filter.find("a").on("click", function () {
        filter.find("a").removeClass("current");
        jQuery(this).addClass("current");
        return false;
      });
    }
  }
}
function paschal_tm_my_progress() {
  "use strict";
  jQuery(".paschal_progress .bar_in").css({ width: "0px" });
  jQuery(".paschal_progress .bar").removeClass("open");
  function tdProgress(container) {
    container.find(".progress_inner").each(function () {
      var progress = jQuery(this);
      var pValue = parseInt(progress.data("value"), 10);
      var pColor = progress.data("color");
      var pBarWrap = progress.find(".bar");
      var pBar = progress.find(".bar_in");
      pBar.css({ width: pValue + "%", backgroundColor: pColor });
      setTimeout(function () {
        pBarWrap.addClass("open");
      });
    });
  }
  jQuery(".paschal_progress").each(function () {
    var pWrap = jQuery(this);
    pWrap.waypoint({
      handler: function () {
        tdProgress(pWrap);
      },
      offset: "90%",
    });
  });
}
function paschal_tm_preloader() {
  "use strict";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
    ? true
    : false;
  var preloader = $("#preloader");
  if (!isMobile) {
    setTimeout(function () {
      preloader.addClass("preloaded");
    }, 800);
    setTimeout(function () {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}
function paschal_tm_mycounter() {
  "use strict";
  jQuery(".paschal_tm_counter").removeClass("stop");
  jQuery(".paschal_tm_counter").each(function () {
    var el = jQuery(this);
    el.waypoint({
      handler: function () {
        if (!el.hasClass("stop")) {
          el.addClass("stop").countTo({
            refreshInterval: 50,
            formatter: function (value, options) {
              return value
                .toFixed(options.decimals)
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
            },
          });
        }
      },
      offset: "95%",
    });
  });
}
function paschal_tm_my_load() {
  "use strict";
  var speed = 500;
  setTimeout(function () {
    paschal_tm_preloader();
  }, speed);
}
function paschal_tm_cursor() {
  "use strict";
  var myCursor = jQuery(".mouse-cursor");
  if (myCursor.length) {
    if ($("body")) {
      const e = document.querySelector(".cursor-inner"),
        t = document.querySelector(".cursor-outer");
      let n,
        i = 0,
        o = !1;
      (window.onmousemove = function (s) {
        o ||
          (t.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (e.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (n = s.clientY),
          (i = s.clientX);
      }),
        $("body").on("mouseenter", "a, .cursor-pointer", function () {
          e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
        }),
        $("body").on("mouseleave", "a, .cursor-pointer", function () {
          ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
            (e.classList.remove("cursor-hover"),
            t.classList.remove("cursor-hover"));
        }),
        (e.style.visibility = "visible"),
        (t.style.visibility = "visible");
    }
  }
}
function paschal_tm_imgtosvg() {
  "use strict";
  jQuery("img.html").each(function () {
    var jQueryimg = jQuery(this);
    var imgClass = jQueryimg.attr("class");
    var imgURL = jQueryimg.attr("src");
    jQuery.get(
      imgURL,
      function (data) {
        var jQuerysvg = jQuery(data).find("svg");
        if (typeof imgClass !== "undefined") {
          jQuerysvg = jQuerysvg.attr("class", imgClass + " replaced-svg");
        }
        jQuerysvg = jQuerysvg.removeAttr("xmlns:a");
        jQueryimg.replaceWith(jQuerysvg);
      },
      "xml"
    );
  });
}
function paschal_tm_popup() {
  "use strict";
  jQuery(".gallery_zoom").each(function () {
    jQuery(this).magnificPopup({
      delegate: "a.zoom",
      type: "image",
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
  });
  jQuery(".popup-youtube, .popup-vimeo").each(function () {
    jQuery(this).magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  });
  jQuery(".soundcloude_link").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });
}
function paschal_tm_data_images() {
  "use strict";
  var data = jQuery("*[data-img-url]");
  data.each(function () {
    var element = jQuery(this);
    var url = element.data("img-url");
    element.css({ backgroundImage: "url(" + url + ")" });
  });
}
function paschal_tm_contact_form() {
  "use strict";
  jQuery(".contact_form #send_message").on("click", function () {
    var name = jQuery(".contact_form #name").val();
    var email = jQuery(".contact_form #email").val();
    var message = jQuery(".contact_form #message").val();
    var subject = jQuery(".contact_form #subject").val();
    var success = jQuery(".contact_form .returnmessage").data("success");
    jQuery(".contact_form .returnmessage").empty();
    if (name === "" || email === "" || message === "") {
      jQuery("div.empty_notice").slideDown(500).delay(2000).slideUp(500);
    } else {
      jQuery.post(
        "modal/contact.html",
        {
          ajax_name: name,
          ajax_email: email,
          ajax_message: message,
          ajax_subject: subject,
        },
        function (data) {
          jQuery(".contact_form .returnmessage").append(data);
          if (
            jQuery(".contact_form .returnmessage span.contact_error").length
          ) {
            jQuery(".contact_form .returnmessage")
              .slideDown(500)
              .delay(2000)
              .slideUp(500);
          } else {
            jQuery(".contact_form .returnmessage").append(
              "<span class='contact_success'>" + success + "</span>"
            );
            jQuery(".contact_form .returnmessage")
              .slideDown(500)
              .delay(4000)
              .slideUp(500);
          }
          if (data === "") {
            jQuery("#contact_form")[0].reset();
          }
        }
      );
    }
    return false;
  });
}
function paschal_tm_owl_carousel() {
  "use strict";
  var carousel = jQuery(".partners .owl-carousel");
  var rtlMode = false;
  if (jQuery("body").hasClass("rtl")) {
    rtlMode = "true";
  }
  carousel.owlCarousel({
    loop: true,
    items: 4,
    lazyLoad: false,
    margin: 50,
    autoplay: true,
    autoplayTimeout: 7000,
    rtl: rtlMode,
    dots: true,
    nav: false,
    navSpeed: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1040: { items: 3 },
      1200: { items: 3 },
      1600: { items: 4 },
      1920: { items: 4 },
    },
  });
  paschal_tm_imgtosvg();
}
function paschal_tm_location() {
  "use strict";
  var button = jQuery(".href_location");
  button.on("click", function () {
    var element = jQuery(this);
    var address = element.text();
    address = address.replace(/\ /g, "+");
    var text = "https://maps.google.com/?q=";
    window.open(text + address);
    return false;
  });
}
