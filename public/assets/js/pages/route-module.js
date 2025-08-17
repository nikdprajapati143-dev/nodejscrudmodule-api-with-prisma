
let stopTimeCounter = 1;
let rowIndex = 1;
// Track selected areas
let selectedAreas = new Set();
document.addEventListener('DOMContentLoaded', function () {

    flatpickr("#start_date,#end_date,#dates", {
        dateFormat: "Y-m-d",
        // time_24hr: true,
        minDate: "today", // Disable past dates
        defaultDate: null // No default date selected
    });

    // Initialize Flatpickr for the start time
    flatpickr("#start_time,#end_time,.stop_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false, // Use 24-hour time format
        minuteIncrement: 15,
        // minTime: "00:00", // Minimum time
        // maxTime: "23:59", // Maximum time
    });
});


// Function to refresh dropdown options
// Function to refresh dropdown options
function refreshAreaDropdowns() {
    const allDropdowns = $('select[name="area[]"]');

    allDropdowns.each(function () {
        const $dropdown = $(this);
        const currentValue = $dropdown.val(); // Preserve the current selection

        // Rebuild options
        let areaOptions = `<option value="">Select Area</option>`;
        areas.forEach(function (area) {
            if (!selectedAreas.has(area.id) || area.id === currentValue) {
                areaOptions += `<option value="${area.id}">${area.name}</option>`;
            }
        });

        $dropdown.html(areaOptions); // Update options
        $dropdown.val(currentValue); // Restore the selected value
    });
}
// Add new stop and area row
$(document).on('click', '.add-stop', function () {
    rowIndex++;
    // Build the options dynamically
    var areaOptions = `<option value="">Select Area</option>`;
    areas.forEach(function (area) {
        // if (!selectedAreas.has(area.id)) {
        areaOptions += `<option value="${area.id}"  data-lat="${area.lat}" data-lng="${area.lng}">${area.name}</option>`;
        //}
    });

    // New row with dynamically created dropdown options
    var newRow = `
            <div class="stop-wrapper row">
                <!-- Select Area Dropdown -->
                <div class="form-group col-md-4">
                    <select class="form-control area-select" name="area[]" id="area_${rowIndex}" data-commonid="${rowIndex}" required data-parsley-required-message="Please select area">
                        ${areaOptions}
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <input type="text" name="stop_time[]" class="form-control stop_time"  placeholder="Select Stop Time" value=""  required id="stop_time_${rowIndex}" data-parsley-trigger="keyup" data-parsley-required-message="Please select Stop Time" >
                    <span class="parsley-errors-list" id="error_stop_time_${rowIndex}"></span>
                </div>

                <!-- Route Stop Input -->
                <div class="form-group col-md-4">
                <div class="row stop-row">
                    <div class="input-group">
                        <div class="col-md-10">
                            <input type="hidden" name="stop_lat[]" id="stop_lat_${rowIndex}">
                            <input type="hidden" name="stop_lng[]" id="stop_lng_${rowIndex}">
                            <input type="text" name="stops[]" class="form-control stops-input"  id="stops_${rowIndex}" placeholder="Enter Stop Name" id="stops" required data-parsley-trigger="keyup" data-parsley-minlength="2"  data-parsley-minlength-message="Stop Name must contain at least 2 characters" data-parsley-required-message="Please enter Route Stop" data-parsley-no-adjacent-duplicates readonly>
                        </div>
                        <div class="col-md-2">
                        <div class="btn-group float-right">
                                    <a href="javascript:void(0);" class="btn btn-outline-blue waves-effect waves-light btn-md remove-stop" data-row-id="stopRow_${rowIndex}">
                                        <i class="fa fa-minus"></i>
                                    </a>

                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>`;

    $('#stopRows').append(newRow);
    $('.area-select').select2({
        width: '100%'
    });

    // Reinitialize Flatpickr for all `.stop_time` inputs
    flatpickr(".stop_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
        minuteIncrement: 15,
        // minTime: "00:00", // Minimum time
        // maxTime: "23:59", // Maximum time
    });
    // initializeFlatpickr();
    //$(this).closest('form').parsley();

});
// When opening the modal to edit existing stop:
//===============Start nEw Method save stop not duplicate stop enter ==============//
/*$(document).on('focus', '.area-select, .stops-input', function () {
    commonId = $(this).closest('.stop-wrapper').find('.area-select').data('commonid');
});*/
//===============End nEw Method save stop not duplicate stop enter ==============//


// Remove stop and area row
$(document).on('click', '.remove-stop', function () {
    $(this).closest('.stop-wrapper').remove();
    $('#route_form').parsley().reset();
});

// Remove stop row
/*$(document).on('click', '.remove-stop', function () {
    $(this).closest('.stop-row').remove();
});*/


// Function to remove a row for stops
/*$(document).on('click', '.remove-stop', function () {
    // Only remove if there's more than one row
    if ($('#stopRows .stop-row').length > 1) {
        $(this).closest('.stop-row').remove();
    }
});*/
// Custom Parsley validator for no adjacent duplicates first method is working
window.Parsley.addValidator('noAdjacentDuplicates', {
    validateString: function (value, requirement, instance) {
        // Get all stop name inputs
        const allStops = $('input[name="stops[]"]').map(function () {
            return $(this).val().trim();
        }).get();

        // Get current input index
        const currentIndex = $('input[name="stops[]"]').index(instance.$element);

        // Check against previous stop
        if (currentIndex > 0 && allStops[currentIndex - 1] === value) {
            return false;
        }

        // Check against next stop
        if (currentIndex < allStops.length - 1 && allStops[currentIndex + 1] === value) {
            return false;
        }

        return true;
    },
    messages: {
        en: 'Adjacent stops cannot have the same name'
    }
});

