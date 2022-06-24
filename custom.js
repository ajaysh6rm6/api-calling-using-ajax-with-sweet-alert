$(document).ready(function () {
    $("#index_quote_submit").click(function (event) {
        event.preventDefault();
        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var YourName = $("input#YourName").val();
        var YourEmail = $("input#YourEmail").val();
        var SelectAService = $("select#SelectAService").val();
        var Msg = $("textarea#Msg").val();
        if (YourName == "") {
            swal("Warning !", "Please enter your name ?", "warning");
        } else if (YourEmail == "") {
            swal("Warning !", "Please enter your email ?", "warning");
        } else if (!email_regex.test(YourEmail)) {
            swal("Warning !", "Please enter valid email address ?", "warning");
        } else if (SelectAService == "") {
            swal("Warning !", "Please select a service ?", "warning");
        } else if (Msg == "") {
            swal("Warning !", "Please enter your msg ?", "warning");
        } else {
            var settings = {
                "url": "https://............",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "name": YourName,
                    "email": YourEmail,
                    "service": SelectAService,
                    "message": Msg
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
                        $("input#YourName").val("");
                        $("input#YourEmail").val("");
                        $("select#SelectAService").val("");
                        $("textarea#Msg").val("");
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $("input#YourName").val("");
                        $("input#YourEmail").val("");
                        $("select#SelectAService").val("");
                        $("textarea#Msg").val("");
                        swal("Error !", "Please try again, if urgent please call us !", "error");
                    }
                });
            });
        }
    });
});

//FOR ONCLICK SUBMIT CALLING API USING AJAX

<!-- <script>
        $(document).ready(function () {
            $("#formsubmit").submit(function (event) {
                event.preventDefault();
                var applications = $("select#applications").val(),
                    region = $("select#region").val(),
                    action = $("select#action").val(),
                    settings = {
                        "url": "https://a4l181sq2i.execute-api.ap-southeast-1.amazonaws.com/v1/ec2-api",
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({
                            "instance_id": ["i-031b44fbcd9750ebb"],
                            "region": region,
                            "action": action
                        }),
                    };
                $.ajax({
                    ...settings,
                    success: function (data) {
                        var msg_describe = data.Reservations,
                            msg_stop_start= data.msg ;
                        if (action == "describe-ec2") {
                            swal("Done !",msg_describe, "success");
                            $("form")[0].reset();
                        } else {
                            swal("Done !",msg_stop_start, "success");
                            $("form")[0].reset();                           
                        }                        
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        swal("Error !", "Api not responding !", "error");
                        $("form")[0].reset();
                    }
                });

            });
        });
    </script> -->
