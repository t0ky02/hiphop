$(function () {
    var $nav = $(".navbar-ftop");
    var $dropm     = $(".dropdown-menu");
    var $brandText = $(".navbar-brand-text");
    var isHipHopAdded = false;
  
    $(document).scroll(function () {
      if ($(this).scrollTop() > $nav.height() && !isHipHopAdded) {
        $nav.addClass('scrolled').removeClass('unscrolled');
        $dropm.removeClass('dropdown-menu-dark');
        // Tambahkan teks "HipHop"
        $brandText.addClass('navbar-brand-text').text($brandText.text() + " HipHop");
        isHipHopAdded = true;
      } else if ($(this).scrollTop() <= $nav.height() && isHipHopAdded) {
        $nav.addClass('unscrolled').removeClass('scrolled');
        $dropm.addClass('dropdown-menu-dark');
  
        // Hapus teks "HipHop" jika ada
        $brandText.removeClass('navbar-brand-text').text($brandText.text().replace(" HipHop", ""));
        isHipHopAdded = false;
      }
    });
  });
  
let $open = document.querySelector('.open');
if($(window).open){ 
    $open.classList.add('fadein');
    //setTimeout(() => {
    //cap.classList.add('bouncing');
    //}, 1000);
}

$(document).ready(function(){
  // Add smooth scrolling to all links
 //var $nav_link = $(".navbar-link");
  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
        console.log("Scroll animation completed.");
      });
    } // End if
  });
});

