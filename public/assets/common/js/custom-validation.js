window.Parsley.addValidator('notFutureYear', {
    validateString: function(value) {
        var currentYear = new Date().getFullYear();
        return parseInt(value) <= currentYear;
    },
    messages: {
        en: 'The year cannot be in the future'
    }
});
