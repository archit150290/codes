$(function() {
    $(window).resize(function() {
       // $('.autoheight').height($(window).height() - $('.autoheight').offset().top - 130);
		$('.pantry-itemHeight').height($(window).height() - $('.pantry-itemHeight').offset().top - 200);
		$('.pantry-scrollHeight').height($(window).height() - $('.pantry-scrollHeight').offset().top - 380);
		 //$('.left_submenu').height($(window).height() - $('.left_submenu').offset().top - 70);
		  $.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
		 $(".pantry-item .lisiting").mCustomScrollbar({theme:"dark-3"});
    });
    $(".knob").knob();
    $(window).resize();
});


    /*$(window).resize(function() {
		$('.pantry-itemHeight').height($(window).height() - $('.pantry-itemHeight').offset().top - 200);
		$('.pantry-scrollHeight').height($(window).height() - $('.pantry-scrollHeight').offset().top - 380);
		 //$('.left_submenu').height($(window).height() - $('.left_submenu').offset().top - 70);
		 $.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
		 $(".pantry-item .lisiting").mCustomScrollbar({theme:"dark-3"});
		 $(".knob").knob();
		 
		 
    });
    $(window).resize();*/
