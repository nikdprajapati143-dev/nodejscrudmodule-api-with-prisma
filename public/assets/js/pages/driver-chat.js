function forReadMessage() {
    socket.emit('READ_MESSAGE', {
        status: 'seen',
        receiver_id: userId,
        receiver_type: 'driver',
    });
}

forReadMessage();

function formatDateString(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if necessary
    const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if necessary
    const formattedDate = `${dayOfWeek} ${day} ${year} ${hours}:${minutes}`;
    return formattedDate;
}

// Handle incoming messages
socket.on('RECEIVE_MESSAGE', function (data) {
    console.log('Received message:', data);
    if (data.sender_id == userId && data.senderType == 'driver') {
        forReadMessage();
        const messageHtml = `
        <li class="clearfix">
            <div class="message-data">
                <span class="message-data-time">${formatDateString(data.created_at)}</span>
            </div>
            <div class="message my-message" style="max-width: 400px">${data.content}</div>
        </li>
  `;
        $('.chat-history ul').append(messageHtml);
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
    }
});

// Handle sending messages
socket.on('SEND_MESSAGE', function (data) {
    console.log("SEND_MESSAGE", data);
    if (data.status === true) {
        // If status is true, append the saved message HTML
        var msgAppend = `
            <li class="clearfix">
                <div class="message-data text-right">
                    <span class="message-data-time">${formatDateString(data.created_at)}</span>
                </div>
                <div class="message other-message float-right" style="max-width: 400px">${data.content}</div>
            </li>`;
        $('.chat-history ul').append(msgAppend);
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
        msgAppend = "";
        // Scroll to bottom

    }
});

$(".send-btn").on("click", function () {

    var msg = $("#msg_text").val();

    if (msg.trim() === "") return;

    socket.emit('SEND_MESSAGE', {
        receiver_id: userId,
        receiver_type: "driver",
        content: msg,
        content_type: "text"
    });


    $("#msg_text").val('');
});


$("#msg_text").on("keypress", function (e) {
    if (e.which === 13) { // Enter key pressed
        $(".send-btn").click();
    }
});
