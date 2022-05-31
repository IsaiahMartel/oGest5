self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.title;
    var message = data.message;

    // self.clickTarget = data.clickTarget;

    event.waitUntil(
        db.collection('notifications').add({
            title: data.title,
            body: data.message,
            icon: data.icon,
            actions: data.actions,
            showed: false
        }),


        self.registration.showNotification(title, {
            body: message,
            icon: data.icon,
            actions: data.actions
        }))

    // idbKeyval.get('fetchNotificationDataUrl')
    // .then(message => fetch(message))
    // .then(response => response.json())
    // .then(json => self.registration.showNotification(title, {
    //     body: message,
    //     icon: data.icon,
    //     actions: data.actions
    // })))

});


// self.addEventListener('sync', (event) => {
//     if (event.target === 'post-data') {
//         event.waitUntil(addData());
//     }
// });

// function addData() {
//     // indexdb

//     fetch("http://localhost:8000/api/mobile/getProjects"), {
//         method: 'POST',
//         headers: {

//         },
//         body: JSON.stringify(),
//     }).then(() => PromiseRejectionEvent.resolve()).catch(() => Promise.reject)
// }