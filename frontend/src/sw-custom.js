// Para que lleguen las notificaciones push
self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    console.log(data.badge);
    // Para saber si la notficación es silenciosa
    if (data.tag == "silent") {
        event.waitUntil(
            db.collection('notifications').add({
                date: data.data.fecha,
                title: data.title,
                body: data.body,
                shown: false
            }))
    } else {
        var title = data.title;
        var message = data.body;

        event.waitUntil(
            db.collection('notifications').add({
                date: data.data.fecha,
                title: data.title,
                body: data.body,
                shown: false
            }),


            self.registration.showNotification(title, {
                body: message,
                icon: data.icon,
                badge: data.badge,
                actions: data.actions
            }))
    }


});

//Para abrir la app cuando clicas
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

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