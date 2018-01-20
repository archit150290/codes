$(document).ready(function(){
    $("#editform #image").hide();
    $("#editimage").click(function(){
        $("#image").click();
    })
    $("#image").on("change", function(e){
        readURL(this);
    })
})

//=read image base 64 to display it on frontend
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        console.log(e.target.result)
        $("#editimage").attr("src", e.target.result)
        //$('#blah').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  
