$(document).on("click", ".deleteuser", function () {
    var id = $(this).attr("rel");
    var url = window.location.origin + "/users/delete/" + id;
    $.ajax({
        url: url,
        success: function (result) {
            if(result.status == 200){
                alert(result.data);
            }else{
                alert("Soemthing went wrong");
            }
        }
    });
})

$(document).on("click", "#edituserimage", function(){
    $(".edituserimage").click();
})


$(".edituserimage").change(function() {
    readURL(this);
});

function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('#edituserimage').attr('src', e.target.result);
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }