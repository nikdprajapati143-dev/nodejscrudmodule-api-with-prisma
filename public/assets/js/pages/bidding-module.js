
// let stopTimeCounter = 1;
let rowIndex = 1;
// Track selected areas
let selectedAreas = new Set();
document.addEventListener('DOMContentLoaded', function () {

    // alert('Hello');
    flatpickr("#start_date,#end_date,#dates", {
        dateFormat: "Y-m-d",
        // time_24hr: true,
        minDate: "today", // Disable past dates
        defaultDate: null // No default date selected
    });

    // Initialize Flatpickr for the start time
    flatpickr(".start_time,#end_time,.stop_time,.drop_off_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false, // Use 24-hour time format
        minuteIncrement: 15,
        // minTime: "00:00", // Minimum time
        // maxTime: "23:59", // Maximum time
    });

});


// document.addEventListener('DOMContentLoaded', function () {

//     // Initialize Flatpickr for the time fields
//     const startTimePicker = flatpickr(".start_time", {
//         enableTime: true,
//         noCalendar: true,
//         dateFormat: "h:i K",
//         time_24hr: false,
//         minuteIncrement: 15,
//         onChange: function (selectedDates, dateStr) {
//             validateTime();
//         }
//     });

//     const dropOffTimePicker = flatpickr(".drop_off_time", {
//         enableTime: true,
//         noCalendar: true,
//         dateFormat: "h:i K",
//         time_24hr: false,
//         minuteIncrement: 15,
//         onChange: function (selectedDates, dateStr) {
//             validateTime();
//         }
//     });

//     function validateTime() {
//         let startTime = document.querySelector('.start_time').value;
//         let pickupTime = document.getElementById('pickup_time').value;
//         let dropOffTime = document.querySelector('.drop_off_time').value;

//         if (startTime && pickupTime) {
//             let start = new Date(`1970-01-01 ${convertTo24Hour(startTime)}`);
//             let pickup = new Date(`1970-01-01 ${convertTo24Hour(pickupTime)}`);

//             if (start > pickup) {
//                 alert("Start time cannot be later than pickup time.");
//                 document.querySelector('.start_time').value = '';
//             }
//         }

//         if (pickupTime && dropOffTime) {
//             let pickup = new Date(`1970-01-01 ${convertTo24Hour(pickupTime)}`);
//             let dropOff = new Date(`1970-01-01 ${convertTo24Hour(dropOffTime)}`);

//             if (dropOff <= pickup) {
//                 alert("Drop-off time must be after pickup time.");
//                 document.querySelector('.drop_off_time').value = '';
//             }
//         }
//     }

//     function convertTo24Hour(timeStr) {
//         let [time, modifier] = timeStr.split(' ');
//         let [hours, minutes] = time.split(':').map(Number);

//         if (modifier === 'PM' && hours !== 12) hours += 12;
//         if (modifier === 'AM' && hours === 12) hours = 0;

//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     }

// });

/* OLd code
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Flatpickr for the time fields
    flatpickr(".start_time, .drop_off_time,.stop_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
        minuteIncrement: 15,
        onChange: function () {
            $('#biddingform').parsley().validate();
        }
    });

    // Custom Parsley Validator for Start Time
    window.Parsley.addValidator('startTime', {
        validateString: function (value) {
            let startTime = value;
            let pickupTime = document.getElementById('pickup_time').value;

            if (!startTime || !pickupTime || pickupTime === '-') {
                return true; // Skip validation if pickupTime is not set
            }

            let start = new Date(`1970-01-01 ${convertTo24Hour(startTime)}`);
            let pickup = new Date(`1970-01-01 ${convertTo24Hour(pickupTime)}`);

            return start <= pickup;
        },
        messages: {
            en: "Start time cannot be later than pickup time."
        }
    });

    // Custom Parsley Validator for Drop-Off Time
    window.Parsley.addValidator('dropOffTime', {
        validateString: function (value) {
            let dropOffTime = value;
            let pickupTime = document.getElementById('pickup_time').value;

            if (!dropOffTime || !pickupTime || pickupTime === '-') {
                return true; // Skip validation if pickupTime is not set
            }

            let dropOff = new Date(`1970-01-01 ${convertTo24Hour(dropOffTime)}`);
            let pickup = new Date(`1970-01-01 ${convertTo24Hour(pickupTime)}`);

            return dropOff > pickup;
        },
        messages: {
            en: "Drop-off time must be after pickup time."
        }
    });

    window.Parsley.addValidator('stopTime', {
        validateString: function (value, requirement, instance) {
            const stopTime = value;
            const pickupTime = document.getElementById('pickup_time').value;
            const dropOffTime = document.getElementById('drop_off_time').value;
            const stopTimes = Array.from(document.querySelectorAll('.stop_time'))
                .map(input => input.value)
                .filter(time => time !== ''); // Get all entered stop times

            if (!stopTime || !pickupTime || !dropOffTime || pickupTime === '-') {
                return true; // Skip validation if required times are missing
            }

            // Convert times to 24-hour format
            const pickup = new Date(`1970-01-01T${convertTo24Hour(pickupTime)}:00`);
            const dropOff = new Date(`1970-01-01T${convertTo24Hour(dropOffTime)}:00`);
            const stop = new Date(`1970-01-01T${convertTo24Hour(stopTime)}:00`);

            let errorMsg = ""; // Dynamic message

            // Ensure stop time is not the same as pickup or drop-off time
            if (stop.getTime() === pickup.getTime()) {
                errorMsg = "Stop time cannot be the same as Pickup time.";
                return $.Deferred().reject(errorMsg);
            }
            if (stop.getTime() === dropOff.getTime()) {
                errorMsg = "Stop time cannot be the same as Drop-off time.";
                return $.Deferred().reject(errorMsg);
            }

            // Ensure stop time is unique
            let isUnique = true;
            stopTimes.forEach(time => {
                const otherStop = new Date(`1970-01-01T${convertTo24Hour(time)}:00`);
                if (stop.getTime() === otherStop.getTime() && stopTime !== time) {
                    isUnique = false;
                    errorMsg = "Stop time must be unique.";
                }
            });

            return isUnique ? true : $.Deferred().reject(errorMsg);
        },
        messages: {
            en: "Invalid stop time."
        }
    });
    // Function to Convert Time to 24-Hour Format
    function convertTo24Hour(timeStr) {
        let [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    // Apply Parsley.js validation on form submit
    $('#biddingform').parsley();
});*/

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Flatpickr
    flatpickr(".start_time, .drop_off_time, .stop_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
        minuteIncrement: 15,
        onChange: function () {
            $('#biddingform').parsley().validate();
        }
    });

    // Helper: Convert 12-hour format to 24-hour
    function convertTo24Hour(timeStr) {
        let [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Helper: Get all stop times
    function getAllStopTimes() {
        let stopTimes = [];
        document.querySelectorAll('.stop_time').forEach(function (el) {
            if (el.value) {
                stopTimes.push(el.value);
            }
        });

        return stopTimes;
    }

    // Bind stop time logic
    document.addEventListener('change', function (e) {

        /*if (e.target.classList.contains('stop_time')) {
            const currentStopTimeInput = e.target;
            const currentStopTime = currentStopTimeInput.value;

            const allStopTimes = getAllStopTimes();
            getDriverList('assign_driver', driverUrl, currentStopTime);
            getVehicleList('assign_vehicle', vehicleUrl, currentStopTime);

            $(currentStopTimeInput).parsley().removeError('stop_time_error');

            if (allStopTimes.length > 1) {
                const lastStopTimeIndex = allStopTimes.length - 1;
                const lastStopTime = allStopTimes[lastStopTimeIndex];
                const previousStopTimes = allStopTimes.slice(0, lastStopTimeIndex);

                const lastStopTime24 = convertTo24Hour(lastStopTime);
                const previousStopTimes24 = previousStopTimes.map(convertTo24Hour);

                const isInvalid = previousStopTimes24.some(time => lastStopTime24 <= time);

                if (isInvalid) {
                    $(currentStopTimeInput).parsley().addError('stop_time_error', {
                        message: 'Stop time must be greater than the previous stop times.',
                        updateClass: true
                    });
                } else {
                    $(currentStopTimeInput).parsley().removeError('stop_time_error');
                }
            }
        }*/


        /*if (e.target.classList.contains('stop_time')) {
            const currentStopTimeInput = e.target;
            const currentStopTime = currentStopTimeInput.value;

            handleTimeChange(currentStopTime, true);
        }
        else if (e.target.classList.contains('start_time')) {
            const startTime = e.target.value;
            handleTimeChange(startTime);
        }
        else if (e.target.classList.contains('drop_off_time')) {
            const dropOffTime = e.target.value;
            handleTimeChange(dropOffTime);
        }*/

        if (e.target.classList.contains('stop_time')) {
            handleTimeChange(e.target.value, e.target);
        }
        else if (e.target.classList.contains('start_time')) {
            handleTimeChange(e.target.value);
        }
        else if (e.target.classList.contains('drop_off_time')) {
            handleTimeChange(e.target.value);
        }
    });

    // Function to handle time changes and update driver/vehicle lists
    // Function to handle time changes and update driver/vehicle lists
    function handleTimeChange(timeValue, inputElement = null) {
        if (timeValue) {
            getDriverList('assign_driver', driverUrl, timeValue);
            getVehicleList('assign_vehicle', vehicleUrl, timeValue);

            if (inputElement && inputElement.classList.contains('stop_time')) {
                const allStopTimes = getAllStopTimes();
                $(inputElement).parsley().removeError('stop_time_error');

                if (allStopTimes.length > 1) {
                    const lastStopTimeIndex = allStopTimes.length - 1;
                    const lastStopTime = allStopTimes[lastStopTimeIndex];
                    const previousStopTimes = allStopTimes.slice(0, lastStopTimeIndex);

                    const lastStopTime24 = convertTo24Hour(lastStopTime);
                    const previousStopTimes24 = previousStopTimes.map(convertTo24Hour);

                    const isInvalid = previousStopTimes24.some(time => lastStopTime24 <= time);

                    if (isInvalid) {
                        $(inputElement).parsley().addError('stop_time_error', {
                            message: 'Stop time must be greater than the previous stop times.',
                            updateClass: true
                        });
                    } else {
                        $(inputElement).parsley().removeError('stop_time_error');
                    }
                }
            }
        }
    }

    // Parsley custom validator for Start Time
    window.Parsley.addValidator('startTime', {
        validateString: function (value) {
            let pickupTime = document.getElementById('pickup_time').value;
            if (!value || !pickupTime || pickupTime === '-') return true;

            let start = new Date(`1970-01-01T${convertTo24Hour(value)}:00`);
            let pickup = new Date(`1970-01-01T${convertTo24Hour(pickupTime)}:00`);
            return start <= pickup;
        },
        messages: {
            en: "Start time cannot be later than pickup time."
        }
    });

    // Parsley custom validator for Drop-Off Time
    window.Parsley.addValidator('dropOffTime', {
        validateString: function (value) {
            let pickupTime = document.getElementById('pickup_time').value;
            if (!value || !pickupTime || pickupTime === '-') return true;

            let dropOff = new Date(`1970-01-01T${convertTo24Hour(value)}:00`);
            let pickup = new Date(`1970-01-01T${convertTo24Hour(pickupTime)}:00`);
            return dropOff > pickup;
        },
        messages: {
            en: "Drop-off time must be after pickup time."
        }
    });

    // Parsley custom validator for Stop Time uniqueness and logic
    window.Parsley.addValidator('stopTime', {
        validateString: function (value) {
            const pickupTime = document.getElementById('pickup_time').value;
            const dropOffTime = document.getElementById('drop_off_time').value;

            if (!value || !pickupTime || !dropOffTime || pickupTime === '-') return true;

            const stop = new Date(`1970-01-01T${convertTo24Hour(value)}:00`);
            const pickup = new Date(`1970-01-01T${convertTo24Hour(pickupTime)}:00`);
            const dropOff = new Date(`1970-01-01T${convertTo24Hour(dropOffTime)}:00`);
            const stopTimes = getAllStopTimes();

            if (stop.getTime() === pickup.getTime()) {
                return $.Deferred().reject("Stop time cannot be the same as Pickup time.");
            }
            if (stop.getTime() === dropOff.getTime()) {
                return $.Deferred().reject("Stop time cannot be the same as Drop-off time.");
            }

            let isUnique = stopTimes.filter(t => convertTo24Hour(t) === convertTo24Hour(value)).length === 1;

            if (!isUnique) {
                return $.Deferred().reject("Stop time must be unique.");
            }

            return true;
        },
        messages: {
            en: "Invalid stop time."
        }
    });

    // Initialize Parsley on the form
    $('#biddingform').parsley();
});


function getDriverList(set_id, route_url, endTime = null) {

    // var DatesAarray = $('#hidden_dates_input').val();
    var route_id = $('#route_id').val();
    var startTime = $('#start_time').val();
    console.log('route_id', route_id);
    console.log('startTime', startTime);
    var request_type = $('#request_type').val();
    // console.log('DatesAarray for driver', DatesAarray);
    // console.log('url', route_url);
    // console.log('set_id', set_id);
    if (request_type == '1' && $('#start_date').val() != '') {
        var start_date = $('#start_date').val();
        // console.log('start_date', start_date);
        DatesAarray = JSON.stringify([start_date]);
        // console.log('DatesAarray for driver one time', DatesAarray);
    }
    // check not empty
    if (endTime != null) {
        $.ajax({
            url: route_url,
            type: "POST",
            data: {
                // dates: DatesAarray,
                route_id: route_id,
                endTime: endTime,
                startTime: startTime,
                // _token: "{{ csrf_token() }}",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            },
            dataType: 'json',
            success: function (data) {
                console.log('data', data);
                $('#' + set_id).empty();
                $('#' + set_id).append('<option value="">Select Driver</option>');
                for (var i = 0; i < data.length; i++) {
                    // console.log('data[i].id', data[i].id, 'data[i].name', data[i].name);
                    $('#' + set_id).append('<option value="' + data[i].id + '">' + data[i].name +
                        '</option>');
                }
            },
            error: function (data) {
                console.log('error', data);
            }
        });
    }
}

function getVehicleList(set_id, route_url, endTime = null) {
    // console.log('set_id', set_id);
    // console.log('route_url', route_url);
    // console.log('endTime', endTime);
    var route_id = $('#route_id').val();
    var startTime = $('#start_time').val();
    console.log('route_id', route_id);
    console.log('startTime', startTime);

    var request_type = $('#request_type').val();
    // console.log('DatesAarry for vehicle', DatesAarray);
    // console.log('url', route_url);
    // console.log('set_id', set_id);

    if (request_type == '1' && $('#start_date').val() != '') {
        var start_date = $('#start_date').val();
        // console.log('start_date', start_date);
        DatesAarray = JSON.stringify([start_date]);
        // console.log('DatesAarray for driver one time', DatesAarray);
    }

    if (endTime != null) {
        $.ajax({
            url: route_url,
            type: "POST",
            data: {
                // dates: DatesAarray,
                route_id: route_id,
                endTime: endTime,
                startTime: startTime,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }

            },
            dataType: 'json',
            success: function (data) {
                console.log('data', data);
                $('#' + set_id).empty();
                $('#' + set_id).append('<option value="">Select Vehicle</option>');
                for (var i = 0; i < data.length; i++) {
                    $('#' + set_id).append('<option value="' + data[i].id + '" data-total_seats="' + data[i].total_seats + '" >' + data[i]
                        .vehicle_registration + '</option>');
                }
            },
            error: function (data) {
                console.log('error', data);
            }
        });
    } else {
        console.log('DatesAarray is empty or undefined or endTime is null');
    }
}


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

// Remove stop and area row
$(document).on('click', '.remove-stop', function () {
    $(this).closest('.stop-wrapper').remove();
    // const $row = $(this).closest('.stop-wrapper');
    // const $areaDropdown = $row.find('select[name="area[]"]');
    // const areaValue = $areaDropdown.val();

    // if (areaValue) {
    //     selectedAreas.delete(areaValue); // Remove the area from the selected list
    // }

    // $row.remove();
    // refreshAreaDropdowns();
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


// Validates first stop is not same as pickup point (both name and coordinates)
/*window.Parsley.addValidator('firstStopNotPickup', {
    validateString: function (value, requirement, instance) {
        if (!$('#add_more_stops').is(':checked') || $('input[name="stops[]"]').length === 0) {
            return true;
        }

        const pickupPoint = $('#pickup_point').val().trim();
        const pickupLat = $('#boarding_lat').val();
        const pickupLng = $('#boarding_lng').val();

        const firstStop = $('input[name="stops[]"]').first().val().trim();
        const firstStopLat = $('input[name="stop_lat[]"]').first().val();
        const firstStopLng = $('input[name="stop_lng[]"]').first().val();

        // Check both name and coordinates
        return !(firstStop === pickupPoint &&
            firstStopLat === pickupLat &&
            firstStopLng === pickupLng);
    },
    messages: {
        en: 'First stop cannot be the same as the passenger pickup point (name and location)'
    }
});*/

// // Validates last stop is not same as drop point (both name and coordinates)
/*window.Parsley.addValidator('lastStopNotDrop', {
    validateString: function (value, requirement, instance) {
        if (!$('#add_more_stops').is(':checked') || $('input[name="stops[]"]').length === 0) {
            return true;
        }

        const dropPoint = $('#drop_point').val().trim();
        const dropLat = $('#drop_off_lat').val();
        const dropLng = $('#drop_off_lng').val();

        const lastStop = $('input[name="stops[]"]').last().val().trim();
        const lastStopLat = $('input[name="stop_lat[]"]').last().val();
        const lastStopLng = $('input[name="stop_lng[]"]').last().val();

        // Check both name and coordinates
        return !(lastStop === dropPoint &&
            lastStopLat === dropLat &&
            lastStopLng === dropLng);
    },
    messages: {
        en: 'Last stop cannot be the same as the passenger drop point (name and location)'
    }
});*/
