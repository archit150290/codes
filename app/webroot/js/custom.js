$(document).on('ready', function() {
       $("#menu-toggle").click(function(e) {
	      e.preventDefault();
	      $("#wrapper").toggleClass("toggled");
       });

        //$(".dots").click(function(e) {
           $(document).on("click", ".dots", function(e){
                var rel = $(this).attr("rel");
                $("."+rel).toggle();
                $('.dots').not(this).each(function(){
                    $(this).siblings(".arrow_box").hide();
                });
            });
	      //$('[data-toggle="popover"]').popover();
});







