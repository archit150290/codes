$(document).ready(function () {
    //
    $('.attached-item1').on('click', function () {
        var src = $(this).attr('bigimg');

        var img = '<img src="' + src + '" class="img-responsive no-hand"/>';

        //start of new code new code
        var index = $(this).attr('index');
        var typeimg = $(this).attr('type');

        var html = '';
        var nextimg = (parseInt(index) + 1);
        if (typeimg == "image") {

            var total = $('.attached-item1').length;
        } else {


            var total = $('.attached-emojis').length;
        }
        html += '<div style="height:40px;clear:both;display:block;">';
        if (total > 1) {
            if (total >= nextimg)
            {
                html += '<a class="controls next" style="display:block;" imgindex="' + nextimg + '" type="' + typeimg + '" >NEXT &raquo;</a>';
            } else {
                html += '<a class="controls next" style="display:none;" imgindex="' + nextimg + '" type="' + typeimg + '" >NEXT &raquo;</a>';
            }
            if ((index - 1) > 0)
            {
                html += '<a class="controls previous" style="display:block;" imgindex="' + (index - 1) + '" type="' + typeimg + '"  >&laquo; PREVIOUS</a>';
            } else {
                html += '<a class="controls previous" style="display:none;" imgindex="' + (index - 1) + '" type="' + typeimg + '"  >&laquo; PREVIOUS</a>';
            }
        }
        html += '</div>';
        html += img;

        $('#myPhotoModal').modal();
        $('#myPhotoModal').on('shown.bs.modal', function () {
            $('#myPhotoModal .modal-body').html(html);
            //new code
            //$('a.controls').trigger('click');
        })
        $('#myPhotoModal').on('hidden.bs.modal', function () {
            $('#myPhotoModal .modal-body').html('');

        });




    });


    $('.attached-emojis').on('click', function () {
        var src = $(this).attr('bigimg');
        var img = '<img src="' + src + '" class="img-responsive no-hand"/>';

        //start of new code new code
        var index = $(this).attr('index');
        var typeimg = $(this).attr('type');
        var html = '';
        var nextimg = (parseInt(index) + 1);
        if (typeimg == "image") {

            var total = $('.attached-item1').length;
        } else {


            var total = $('.attached-emojis').length;
        }
        html += img;
        html += '<div style="height:25px;clear:both;display:block;">';
        if (total > 1) {
            if (total >= nextimg)
            {
                html += '<a class="controls next" style="display:block;" imgindex="' + nextimg + '" type="' + typeimg + '" >NEXT &raquo;</a>';
            } else {
                html += '<a class="controls next" style="display:none;" imgindex="' + nextimg + '" type="' + typeimg + '" >NEXT &raquo;</a>';
            }
            if ((index - 1) > 0)
            {
                html += '<a class="controls previous" style="display:block;" imgindex="' + (index - 1) + '" type="' + typeimg + '"  >&laquo; PREVIOUS</a>';
            } else {
                html += '<a class="controls previous" style="display:none;" imgindex="' + (index - 1) + '" type="' + typeimg + '"  >&laquo; PREVIOUS</a>';
            }
        }
        html += '</div>';

        $('#myPhotoModal').modal();
        $('#myPhotoModal').on('shown.bs.modal', function () {
            $('#myPhotoModal .modal-body').html(html);
            //new code
            //$('a.controls').trigger('click');
        })
        $('#myPhotoModal').on('hidden.bs.modal', function () {
            $('#myPhotoModal .modal-body').html('');
        });




    });

    $(document).on('click', 'a.controls', function () {
        var imgindex = $(this).attr('imgindex');
        console.log(imgindex);
        var typeimg1 = $(this).attr('type');
        //detail_img_<?php echo $index;?>
        console.log(imgindex);
        if (typeimg1 == "image") {
            var src = $('.detail_img_' + imgindex).attr('bigimg');
            var total = $('.attached-item1').length;
        } else {
            var src = $('.detail_emojis_' + imgindex).attr('bigimg');

            var total = $('.attached-emojis').length;
        }
        console.log(src);
        $('#myPhotoModal .modal-body img').attr('src', src);

        var newPrevIndex = parseInt(imgindex) - 1;
        var newNextIndex = parseInt(imgindex) + 1;

        if ($(this).hasClass('previous')) {
            $(this).attr('imgindex', newPrevIndex);
            $('a.next').attr('imgindex', newNextIndex);
        } else {
            $(this).attr('imgindex', newNextIndex);
            $('a.previous').attr('imgindex', newPrevIndex);
        }


        //alert(total);
        console.log(total + "---" + imgindex);
        //hide next button
        if (total == imgindex) {
            $('a.next').hide();
        } else {
            $('a.next').show()
        }
        //hide previous button
        if (newPrevIndex === 0) {
            $('a.previous').hide();
        } else {
            $('a.previous').show()
        }


        return false;
    });
    //

    $(document).on("click", ".ndorse_click", function (event) {
        console.log($(this).attr("user_id"));
        console.log($(this).attr("endorse_type"));
        if ($(this).attr("endorse_type") == "user") {
            window.location.href = siteurl + "client/profile/" + $(this).attr("user_id");
        }


    });
    $(document).on("click", "#savereply", function () {
        var eid = $(this).attr("data-eid");

        var replymsg = $("#reply").val().trim();
        if (replymsg == "") {
            $("#replyerr").html("Please enter reply").show();
            return;
        } else {
            $("#replyerr").html("").hide();
        }
        $.ajax({
            type: "POST",
            url: siteurl + 'cajax/endorsereply',
            data: {eid: eid, reply: replymsg},
            success: function (data, textStatus, xhr) {
                var jsonparser = $.parseJSON(data);
                $("#myModalreply").modal("hide");
                if (jsonparser["result"]["status"]) {
                    alertbootboxcb(jsonparser["result"]["msg"], function () {
                        window.location.reload();
                    });
                } else {
                    alertbootbox(jsonparser["result"]["msg"]);
                }
            },
        });
    });

    $(document).on("click", ".like-img-post", function () {
        var postid = $(this).attr("post");
        var like = $(this).attr("like");
        //console.log(postid);
        //return false;
        if (like == 0) {
            like = 1;
        } else {
            like = 0;
        }
        //console.log("LIKE : " + like);
        $.ajax({
            type: "POST",
            url: siteurl + 'cajax/likepost',
            data: {postid: postid, like: like},
            success: function (data, textStatus, xhr) {
                var jsonparser = $.parseJSON(data);
                var msg = jsonparser["result"]["msg"];
                var like_count = jsonparser["result"]["data"]["like_count"];

                if (like == 1) {
                    //console.log("Liked");
                    $("#likes_endorse_" + postid).attr("like", 1);
                    $("#likes_" + postid).attr("like", 1);
                } else {
                    //console.log("Disliked");
                    $("#likes_endorse_" + postid).attr("like", 0);
                    $("#likes_" + postid).attr("like", 0);
                }
                var likeCaption = " Like";
                if(like_count > 1)
                    likeCaption = " Likes";
                
                $(document).find("#likes_range_" + postid).html(like_count + likeCaption);

                if (jsonparser["result"]["result"] == true) {
                    $("#flashmessage").addClass("alert-success");
                } else {
                    $("#flashmessage").addClass("alert-danger");
                }

                $("#flashmessage").html(msg + '<span class="closeflashmsg pull-right">X</span>');
            },
        });

    });

}); //document ready end
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
