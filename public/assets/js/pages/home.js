$(document).ready(() => {
    $("#date_year").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
    });

    $("#startDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        endDate: "currentDate",
        maxDate: "currentDate",
    });

    $("#endDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        endDate: "currentDate",
        maxDate: "currentDate",
    });

    window.week = function (route) {
        //alert("The week was clicked.");
        $("#year_select").css("display", "none");
        $("#month_select").css("display", "none");
        $("#start_date").css("display", "none");
        $("#end_date").css("display", "none");
        redirect(route);
    };

    $("#month").click(function () {
        //alert("The month was clicked.");
        $("#year_select").css("display", "none");
        $("#month_select").css("display", "block");
        $("#start_date").css("display", "none");
        $("#end_date").css("display", "none");
    });

    window.monthly = function (route) {
        var month = $("#monthselect").val();
        var routes = route + "/" + month;
        if (month) {
            redirect(routes);
        }
    };

    $("#year").click(function () {
        //alert("The month was clicked.");
        $("#year_select").css("display", "block");
        $("#month_select").css("display", "none");
        $("#start_date").css("display", "none");
        $("#end_date").css("display", "none");
    });

    window.yearly = function (route) {
        var year = $("#date_year").val();
        var routes = route + "/" + year;

        if (year) {
            redirect(routes);
        }
    };

    $("#date").click(function () {
        //alert("The month was clicked.");
        $("#year_select").css("display", "none");
        $("#month_select").css("display", "none");
        $("#start_date").css("display", "block");
        $("#end_date").css("display", "none");
        $("#startDateValue").val("1");
    });

    window.datewise = function (route) {
        var date = $("#startDate").val();
        var value = $("#startDateValue").val();
        var routes = route + "/" + date;
        if (date && value == 1) {
            redirect(routes);
        } else {
            $("#endDate").datepicker("setStartDate", date);
        }
    };

    $("#date_range").click(function () {
        //alert("The month was clicked.");
        $("#year_select").css("display", "none");
        $("#month_select").css("display", "none");
        $("#start_date").css("display", "block");
        $("#end_date").css("display", "block");
        $("#startDateValue").val("0");
    });

    window.dateRange = function (route) {
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var routes = route + "/" + startDate + "/" + endDate;
        if (date) {
            redirect(routes);
        }
    };

    var isRequestInProgress = false;
    function redirect(routes) {
        // Check if a request is already in progress
        if (isRequestInProgress) {
            return;
        }
        // Set the flag to indicate that a request is now in progress
        isRequestInProgress = true;
        $.ajax({
            url: routes,
            type: "GET",
            dataType: "json",
            success: function (status) {

                $('#users_count').text(status.users_count);
                $('#freelance_drivers_count').text(status.freelance_drivers_count);
                $('#transportation_drivers_count').text(status.transportation_drivers_count);
                $('#driver_license_pending_count').text(status.driver_license_pending_count);
                $('#total_earnings').text(status.total_earnings);
                $('#total_pending_route_requests').text(status.total_pending_route_requests);
                $('#total_pending_trip_cancellations').text(status.total_pending_trip_cancellations);
                $('#support_tickets_count').text(status.support_tickets_count);
                $('#onboarded_drivers_count').text(status.onboarded_drivers_count);
                $('#total_completed_trips').text(status.total_completed_trips);
                $('#total_upcoming_trips').text(status.total_upcoming_trips);
                $('#total_cancelled_trips').text(status.total_cancelled_trips);

                // $('#total_earnings').text(status.total_earnings);

            },
            error: function (xhr, status, error) {
                // Handle the error if needed
                console.error("Error: " + status + " - " + error);
            },
            complete: function () {
                // Reset the flag when the request is complete, regardless of success or failure
                isRequestInProgress = false;
            }
        });
    }

});
