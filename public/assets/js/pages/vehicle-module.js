
$(document).ready(function() {
        // $('#vehicle_manufacturer').on('change', function() {
        //     var manufacturerId = $(this).val();
        //     // var url = '{{route("company.get.vehicle.model",":id")}};'

        //     if (manufacturerId) {
        //         var url = getVehicleModelUrl.replace(':id', manufacturerId);
        //         $.ajax({
        //             // url: url.replace(':id',manufacturerId),
        //             url: url,
        //             type: 'GET',
        //             dataType: 'json',
        //             success: function(data) {
        //                 $('#vehicle_model').val(data.vehicle_model);
        //             },
        //             error: function() {
        //                 $('#vehicle_model').val('');
        //             }
        //         });
        //     } else {
        //         $('#vehicle_model').val('');
        //     }
        // });


        /*$('#vehicle_type').on('change', function() {
            $('#vehicle_model').empty();
            $('#vehicle_model').append('<option value="">Select Vehicle Model</option>');
            var vehicleTypeId = $(this).val();
            var url = getVehicleManufacturerUrl.replace(':id', vehicleTypeId);
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    $('#vehicle_manufacturer').empty();
                    $('#vehicle_manufacturer').append('<option value="">Select Vehicle Manufacturer</option>');
                    $.each(data.vehicle_manufacturer, function(index, manufacturer) {
                        $('#vehicle_manufacturer').append('<option value="' + manufacturer.id + '">' + manufacturer.name + '</option>');
                    });
                },

            });
        });*/
        function loadVehicleModels(manufacturerId,selectedModelId = null) {
            if (manufacturerId) {
                var url = getVehicleModelUrl.replace(':id', manufacturerId);
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // Clear the vehicle model dropdown
                        $('#vehicle_model').empty();

                        // Check if vehicle models are returned
                        if (data.vehicle_models.length > 0) {
                            // Add default option
                            $('#vehicle_model').append('<option value="">Select Vehicle Model</option>');

                            // Loop through the models and add them as options
                            $.each(data.vehicle_models, function(index, model) {
                                // console.log('model',model.id)
                                var selected = (selectedModelId && selectedModelId == model.id) ? ' selected' : '';
                                $('#vehicle_model').append('<option value="' + model.id + '" '+selected+'>' + model.name + '</option>');
                            });
                        } else {
                            // Add empty option if no models are returned
                            $('#vehicle_model').append('<option value="">No models available</option>');
                        }
                    },
                    error: function() {
                        $('#vehicle_model').empty().append('<option value="">Error loading models</option>');
                    }
                });
            } else {
                // If no manufacturer is selected, clear the vehicle model dropdown
                $('#vehicle_model').empty().append('<option value="">Select Vehicle Model</option>');
            }
        }
        $('#vehicle_manufacturer').on('change', function() {
            var manufacturerId = $(this).val();
            loadVehicleModels(manufacturerId);
        });

        $('#vehicle_type').on('change', function() {
            $('#vehicle_model').empty();
            $('#vehicle_model').append('<option value="">Select Vehicle Model</option>');
            var vehicleTypeId = $(this).val();
            loadVehicleManufacturers(vehicleTypeId);
        });




        function loadVehicleManufacturers(vehicleTypeId,selectedManufacturerId = null) {
            // alert(selectedManufacturerId);
            if (vehicleTypeId) {
                var url = getVehicleManufacturerUrl.replace(':id', vehicleTypeId);
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        $('#vehicle_manufacturer').empty();
                        $('#vehicle_manufacturer').append('<option value="">Select Vehicle Manufacturer</option>');
                        $.each(data.vehicle_manufacturer, function(index, manufacturer) {
                            var selected = (selectedManufacturerId && selectedManufacturerId == manufacturer.id) ? ' selected' : '';
                            $('#vehicle_manufacturer').append('<option value="' + manufacturer.id + '" '+selected+'>' + manufacturer.name + '</option>');
                        });
                    },
                });
            }
        }


        var manufacturerId = $('#vehicle_manufacturer').val();
        var selectedModelId = modelId;
        var vehicleTypeId = $('#vehicle_type').val();
        var selectedManufacturerId = vehicleManufacturerId;
        // console.log('manufacturerId',manufacturerId,'selectedModelId',selectedModelId);
        loadVehicleModels(manufacturerId,selectedModelId);
        loadVehicleManufacturers(vehicleTypeId,selectedManufacturerId);


         // Initialize Parsley
         $('#vehicleForm').parsley();

         // Store validation status
         let validationStatus = {
             vehicle_registration: false,
             vehicle_number_plate: false,

         };

         // Function to check field uniqueness
         function checkFieldUnique(field, value, route, fieldName) {
            const vehicleID = $('#vehicle_id').val();
             if (!value || value.length < 2) return Promise.resolve(false);

               // Clear existing errors first
             $(`#${field}`).parsley().removeError('remote');

             return new Promise((resolve) => {
                 $.ajax({
                     url: route,
                     data: {
                        [field]: value,
                        vehicleId: vehicleID,
                    },
                     type: 'POST',
                     success: function(response) {
                         $(`#${field}`).parsley().removeError('remote');
                         if (response.status === 'error') {
                             $(`#${field}`).parsley().addError('remote', {
                                 message: response.message,
                                 updateClass: true
                             });
                             validationStatus[field] = false;
                             resolve(false);
                         } else {
                             $(`#${field}`).parsley().removeError('remote');
                             validationStatus[field] = true;
                             resolve(true);
                         }
                     },
                     error: function() {
                         validationStatus[field] = false;
                         resolve(false);
                     }
                 });
             });
         }

         // Form submit handler
         $('#vehicleForm').on('submit', function(e) {
             e.preventDefault();

             // Validate form first

             if ($('#vehicleForm').parsley().validate()) {
                 // Disable submit button
                 $('#submitBtn').prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Processing...');

                 // Get form values
                 const formData = {
                     vehicle_registration: $('#vehicle_registration').val(),
                     vehicle_number_plate: $('#vehicle_number_plate').val(),
                 };

                 // Check all fields for uniqueness
                 Promise.all([
                     checkFieldUnique('vehicle_registration', formData.vehicle_registration, vehicleRegistrationCheckUrl, 'Vehicle Registration'),
                     checkFieldUnique('vehicle_number_plate', formData.vehicle_number_plate, vehicleNumberPlateCheckUrl, 'Vehicle Number Plate'),
                 ]).then((results) => {

                     // Check if all validations passed
                     if (results.every(Boolean)) {
                         // All validations passed, submit the form
                         this.submit();
                     } else {
                         // Show error message
                         // Swal.fire({
                         //     icon: 'error',
                         //     title: 'Validation Error',
                         //     text: 'Please fix the validation errors before submitting.',
                         // });

                         $('#submitBtn').prop('disabled', false).html('Submit');
                     }
                 }).catch(() => {
                     $('#submitBtn').prop('disabled', false).html('Submit');
                 });
             }
         });

         // Add remote validation for each field on blur
         $('#vehicle_registration').on('blur', function() {
             if ($(this).val().length > 0) {
                 // Remove existing errors first
                 $(this).parsley().removeError('remote');
                 checkFieldUnique('vehicle_registration', $(this).val(), vehicleRegistrationCheckUrl, 'Email')
                 .then((isValid) => {
                     if (!isValid) {
                         $(this).parsley().validate();
                     }
                 });
             }
         });

         $('#vehicle_number_plate').on('blur', function() {
             if ($(this).val().length > 0) {
                 $(this).parsley().removeError('remote');
                 checkFieldUnique('vehicle_number_plate', $(this).val(), vehicleNumberPlateCheckUrl, 'Mobile Number')
                 .then((isValid) => {
                     if (!isValid) {
                         $(this).parsley().validate();
                     }
                 });
             }
         });


});

