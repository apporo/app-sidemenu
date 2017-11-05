Zepto(function($) {
  $(".micejs-sidemenu .btn-nav").on("click tap", function() {
    $(".micejs-sidemenu .nav-container").toggleClass("show-nav hide-nav").removeClass("hidden");
    $(this).toggleClass("animated");
  });
});
