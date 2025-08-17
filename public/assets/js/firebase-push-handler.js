const firebaseConfig = {
    apiKey: firebase_api_key,
    authDomain: firebase_auth_domain,
    projectId: firebase_project_id,
    storageBucket: firebase_bucked_id,
    messagingSenderId: firebase_msg_sender_id,
    appId: firebase_app_id,
    measurementId: firebase_measurement_id
};

var onetime = 1;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Explicitly register the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
            // Check notification permission and request if needed
            checkNotificationPermission();
            // Call initNotification() only after Service Worker registration succeeds
            initNotification();
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

// Check notification permission and request if needed
function checkNotificationPermission() {
    if (Notification.permission !== 'granted') {
        askNotificationPermission();
    }
}
// Ask for notification permission
function askNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.warn('Notification permission denied.');
        }
    });
}

// A promise that resolves with the FCM token or rejects with an error
window.getUserDeviceFcmToken = function () {
    return new Promise((accept, reject) => {
        messaging
            .requestPermission()
            .then(function () {
                return messaging.getToken();
            }).then((token) => {
                // console.log('FCM Token:', token);
                saveFCMTokenToServer(token);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
// The default initialization
window.initNotification = function () {
    let userLoggedIn = JSON.parse(document.getElementById("userLoggedIn").value);
    var savedToken = getLocalStorageData("is_save_token");
    // console.log("Saved token: " + savedToken);
    // if (userLoggedIn && !savedToken) {
    getUserDeviceFcmToken().then(token => {
        storeUpdatedDeviceToken(token);
    });
    // }
};
// Store the FCM token on the server for the logged-in user
window.saveFCMTokenToServer = function (fcmToken) {
    $.ajax({
        url: JSON.parse(document.getElementById("saveDeviceTokenUrl").value),
        type: "POST",
        data: { device_token: fcmToken },
        dataType: "JSON",
        success: function (response) {
            setLocalStorageData("is_save_token", "YES")
            // console.log("Device token saved.", response);
        },
        error: function (data) {
            // alert("Error");
            console.log("Error:", data);
        },
    });
}


// Handle incoming messages when the app is in the foreground
messaging.onMessage(function (payload) {
    console.log("payload", payload);
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    new Notification(title, options);
});
