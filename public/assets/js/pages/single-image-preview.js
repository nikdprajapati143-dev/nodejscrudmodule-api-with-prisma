/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/js/pages/single-image-preview.js ***!
  \****************************************************/
$(document).ready(function (e) {
  $('#image').change(function () {
    var fileInput = this;
    var maxFileSize = 10 * 1024 * 1024;
    var fileExtension = ['jpeg', 'jpg', 'png', 'webp'];
    var ImageTypeErrorMsg = $('#ImageTypeErrorMsg');
    var ImagePreviewRow = $('#ImagePreviewRow');
    var previewImage = $('#preview-image');
    var ExistingImage = $('#ExistingImage');
    ImageTypeErrorMsg.hide();
    var file = fileInput.files[0];
    if (!file) return;
    if (file.size > maxFileSize) {
      ImageTypeErrorMsg.fadeIn().text("Maximum upload image size: 10 MB").delay(5000).fadeOut("slow");
      fileInput.value = '';
      ImagePreviewRow.hide();
    } else if ($.inArray(file.name.split('.').pop().toLowerCase(), fileExtension) === -1) {
      ImageTypeErrorMsg.fadeIn().text("The image must be a file of type: jpg, png, jpeg and webp").delay(5000).fadeOut("slow");
      fileInput.value = '';
      ImagePreviewRow.hide();
    } else {
      ImagePreviewRow.show();
      previewImage.show();
      ExistingImage.hide();
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImage.attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
  window.Parsley.addValidator('filemaxmegabytes', {
    requirementType: 'string',
    validateString: function validateString(value, requirement, parsleyInstance) {
      var file = parsleyInstance.$element[0].files;
      var maxBytes = requirement;
      if (file.length == 0) {
        return true;
      }
      return file.length === 1 && file[0].size <= maxBytes;
    },
    messages: {
      en: 'Maximum file size should be 15MB in profile image'
    }
  });
});
/******/ })()
;