window.changeStatusold = function (
    changesStatusUrl,
    tableName = null,
    redirectUrl = null
) {
    Swal.fire({
        title: "Are you sure that you want to change status of this record?",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#28D094",

        confirmButtonText: "Yes, change it!",

        cancelButtonText: "No, cancel please!",
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                "Status Changed!",
                "Your record has been changed.",
                "success"
            );
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.onreadystatechange = function () {
                if (tableName) {
                    $(`#${tableName}`).DataTable().ajax.reload();
                } else {
                    window.location.href =
                        redirectUrl + "?n=" + new Date().getTime();
                    // Simulate an HTTP redirect:
                }
            };

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById('loader').style.display = 'none';
                    if(moduleName !='')
                    {
                      if (xmlhttp.responseText) {
                          var response = JSON.parse(xmlhttp.responseText);
                          if (response.status === 'error') {
                                Swal.fire("Error", response.message, "error");
                            }
                      }
                      else
                      {
                        Swal.fire("Status Changed!", "Your record has been changed.", "success");
                      }
                    }
                    else
                    {
                        Swal.fire("Status Changed!", "Your record has been changed.", "success");
                    }
                    if (tableName) {
                      // $("#".concat(tableName)).DataTable().ajax.reload();
                      $(`#${tableName}`).DataTable().ajax.reload();
                      } else if (redirectUrl) {
                            window.location.href = redirectUrl + '?n=' + new Date().getTime();
                      }
                }
            };


            xmlhttp.open("GET", changesStatusUrl, true);

            xmlhttp.send();
        } else {
            Swal.fire(
                "Cancelled",
                "Your record status change is cancelled :)",
                "error"
            );
        }
    });
};



window.changeStatus = function (
    changesStatusUrl,
    tableName = null,
    redirectUrl = null
) {
    Swal.fire({
        title: "Are you sure that you want to change the status of this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28D094",
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel please!",
    }).then((result) => {
        if (result.value) {
            // Swal.fire("Status Changed!", "Your record has been changed.", "success");

            let xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // document.getElementById("loader").style.display = "none";

                    let response;
                    try {
                        response = JSON.parse(xmlhttp.responseText);
                    } catch (e) {
                        response = {};
                    }

                    if (response.status === "error") {
                        Swal.fire("Error", response.message, "error");
                    } else {
                        Swal.fire("Status Changed!", "Your record has been changed.", "success");
                    }

                    // **Ensure DataTable reloads properly**
                    if (tableName && $(`#${tableName}`).length > 0) {
                        $(`#${tableName}`).DataTable().ajax.reload(null, false); // Keep the current page
                    } else if (redirectUrl) {
                        window.location.href = redirectUrl + "?n=" + new Date().getTime();
                    }
                }
            };

            xmlhttp.open("GET", changesStatusUrl, true);
            xmlhttp.send();
        } else {
            Swal.fire("Cancelled", "Your record status change is cancelled :)", "error");
        }
    });
};



window.changeKYCStatus = function (changesStatusUrl, tableName = null, redirectUrl = null, type = 'change', module = null) {
    let swalConfig = {
        title: "Are you sure that you want to change status of this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28D094",
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel please!",
    };
    console.log('module', module);
    console.log('tablename', tableName);
    if (type === 'reject' && (module == null || module == '')) {
        swalConfig.input = 'textarea';
        swalConfig.inputPlaceholder = 'Enter rejection reason';
        swalConfig.inputValidator = (value) => {
            if (!value) {
                return 'You need to write something!';
            }
        };
    }

    Swal.fire(swalConfig).then((result) => {
        if (result.value) {
            let reason = type === 'reject' ? result.value : '';

            Swal.fire(
                "Status Changed!",
                "Your record has been changed.",
                "success"
            );

            let url = new URL(changesStatusUrl);
            if (reason) {
                url.searchParams.append('reason', reason);
            }

            fetch(url, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                if (response.ok) {
                    if (tableName) {
                        $(`#${tableName}`).DataTable().ajax.reload();
                    } else {
                        window.location.href = redirectUrl + "?n=" + new Date().getTime();
                    }
                } else {
                    Swal.fire("Error", "An error occurred while changing the status", "error");
                }
            });
        } else {
            Swal.fire(
                "Cancelled",
                "Your record status change is cancelled :)",
                "error"
            );
        }
    });
};


window.biddingApproveRejectStatus = function (changesStatusUrl, tableName = null, redirectUrl = null, type = 'change', module = null) {
    let swalConfig = {
        title: "Are you sure that you want to change status of this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28D094",
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel please!",
    };
    console.log('module', module);
    console.log('tablename', tableName);
    if (type === 'reject' && (module == null || module == '')) {
        swalConfig.input = 'textarea';
        swalConfig.inputPlaceholder = 'Enter rejection reason';
        swalConfig.inputValidator = (value) => {
            if (!value) {
                return 'You need to write something!';
            }
        };
    }

    Swal.fire(swalConfig).then((result) => {
        if (result.value) {
            let reason = type === 'reject' ? result.value : '';

            Swal.fire(
                "Status Changed!",
                "Your record has been changed.",
                "success"
            );

            let url = new URL(changesStatusUrl);
            if (reason) {
                url.searchParams.append('reason', reason);
            }

            fetch(url, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                if (response.ok) {
                    if (tableName) {
                        $(`#${tableName}`).DataTable().ajax.reload();
                    } else {
                        window.location.href = redirectUrl + "?n=" + new Date().getTime();
                    }
                } else {
                    Swal.fire("Error", "An error occurred while changing the status", "error");
                }
            });
        } else {
            Swal.fire(
                "Cancelled",
                "Your record status change is cancelled :)",
                "error"
            );
        }
    });
};





window.deleteRecord = function (
    deleteUrl,
    tableName = null,
    redirectUrl = null
) {
    Swal.fire({
        title: "Are you sure that you want to delete this record?",

        text: "You will not be able to recover record!",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#28D094",

        confirmButtonText: "Yes, delete it!",

        cancelButtonText: "No, cancel please!",
    }).then((result) => {
        console.log(tableName);
        if (result.value) {
            // Swal.fire("Deleted!", "Your record has been deleted.", "success");

            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }


            // xmlhttp.onreadystatechange = function () {
            //     if (tableName) {
            //         $(`#${tableName}`).DataTable().ajax.reload();
            //     } else {
            //         window.location.href = redirectUrl;
            //     }
            // };

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    const response = JSON.parse(xmlhttp.responseText);

                    if (response.status === "error") {
                        Swal.fire("Error", response.message, "error");
                    } else {
                        Swal.fire("Deleted!", "Your record has been deleted.", "success");

                        if (tableName) {
                            $(`#${tableName}`).DataTable().ajax.reload();
                        } else if (redirectUrl) {
                            window.location.href = redirectUrl;
                        }
                    }
                }
            };

            xmlhttp.open("GET", deleteUrl, true);

            xmlhttp.send();
        } else {
            Swal.fire("Cancelled", "Your record status is safe :)", "error");
        }
    });
};

$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$("#logout").click(function (e) {
    Swal.fire({
        title: "Are you sure you want to Logout?",
        showCancelButton: true,
        confirmButtonColor: "#28D094",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.value) {
            $("#logout-form").submit();

            // $.ajax({
            //     url: $(this).data("route"),
            //     type: "POST",
            //     success: function (data) {
            //         console.log(data);
            //         if (data.status) {
            //             window.location.href = data.redirect_url;
            //         }
            //         // location.reload();
            //     },
            //     error: function (data) {
            //         if (data.status) {
            //             window.location.href = data.redirect_url;
            //         }
            //     },
            // });
        } else {
            Swal.fire("Cancelled", "", "error");
        }
    });
});



/***************************************************
 * date picker
****************************************************/
flatpickr('.flatpickr', {
    // enableTime: true,
    dateFormat: "Y-m-d",
    minDate: "today", // Optionally set minimum date
    // You can customize Flatpickr options as needed
});


flatpickr('.dateofbirth', {
    // enableTime: true,
    dateFormat: "Y-m-d",
    maxDate: "today", // Optionally set minimum date
    // You can customize Flatpickr options as needed
});
/***************************************************
 * image preview code
****************************************************/
// Get references to the input field and image tag
// Wait for the DOM to be fully loaded
$(document).ready(function () {
    // Get references to the input field and image tag
    const $input = $('.image-input');
    const $preview = $('.image-preview');
    // Listen for changes in the input field
    $input.on('change', function () {
        // Check if a file is selected
        if (this.files && this.files[0]) {
            // Create a FileReader object to read the selected file
            const reader = new FileReader();
            // Set the source of the image tag to the data URL of the selected file
            reader.onload = function (e) {
                $preview.attr('src', e.target.result);
                $preview.removeClass('d-none');
            };
            // Read the selected file as a data URL
            reader.readAsDataURL(this.files[0]);
        }
    });
});
