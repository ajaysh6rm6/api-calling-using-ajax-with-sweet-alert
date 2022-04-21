(function ($) {

  ///////////////contact_us//////////////////
  // Get value on button click and show sweet alert
  $("#contact_us").click(function () {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var fullname = $("input#fullname").val();
    var email = $("input#email").val();
    var subject = $("input#subject").val();
    var msg = $("textarea#msg").val();
    if (fullname == "") {
      swal("Error !", "Please enter your full name ?", "error");
    } else if (email == "") {
      swal("Error !", "Please enter your email ?", "error");
    } else if (!regex.test(email)) {
      swal("Error !", "Please enter valid email address ?", "error");
    } else if (subject == "") {
      swal("Error !", "Please enter your subject ?", "error");
    } else if (msg == "") {
      swal("Error !", "Please enter your msg ?", "error");
    } else {
      var settings = {
        "url": "https://wh07eet6fk.execute-api.us-east-1.amazonaws.com/v1/contactus",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "name": fullname,
          "email": email,
          "subject": subject,
          "message": msg
        }),
      };
      swal({
        title: "Are you sure ?",
        text: "You want to submit a request !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, confirm it !",
        closeOnConfirm: false
      }, function (isConfirm) {
        if (!isConfirm) return;
        $.ajax({
          ...settings,
          success: function (data) {
            swal("Done !", "Your request submitted succesfully !", "success");
            $("input#fullname").val("");
            $("input#email").val("");
            $("input#subject").val("");
            $("textarea#msg").val("");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            $("input#fullname").val("");
            $("input#email").val("");
            $("input#subject").val("");
            $("textarea#msg").val("");
            swal("Error !", "Please try again, if urgent please call me !", "error");
          }
        });
      });
    }
  });
  ///////////////contact_us//////////////////


})(jQuery); // End of use strict
