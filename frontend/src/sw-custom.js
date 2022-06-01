let i = 0;
self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};


    if (event.data) {
        data = event.data.json();
    }
    console.log(data.tag);

    if (data.tag == "silent") {
        console.log("tag = silent " + data.tag)
        event.waitUntil(
            db.collection('notifications').add({
                date: data.data.fecha,
                title: data.title,
                body: data.body,
                icon: data.icon,
                actions: data.actions,
                showed: false
            }))
    } else {
        var title = data.title;
        var message = data.body;

        console.log(data);

        // self.clickTarget = data.clickTarget;

        event.waitUntil(
            db.collection('notifications').add({
                date: data.data.fecha,
                title: data.title,
                body: data.body,
                icon: data.icon,
                actions: data.actions,
                showed: false
            }),


            self.registration.showNotification(title, {
                body: message,
                icon: data.icon,
                actions: data.actions
            }))
    }


});



//Esto para probar a abrir la app cuando clicas
self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                    return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});




// Otherwise, we need to ask the user for permission




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