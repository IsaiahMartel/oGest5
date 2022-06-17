const version = 3;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let imageName = `imageCache-${version}`;
let options = {
    ignoreSearch: false,
    ignoreMethod: false,
    ignoreVary: false,
};
//starter html and css and js files
let assets = ['/', '/index.html', '/css/main.css', '/js/app.js', '/404.html'];
//starter images
let imageAssets = ['/img/1011-800x600.jpg', '/img/distracted-boyfriend.jpg'];
//TODO:
let DB = null;


self.addEventListener('activate', (ev) => {
    // when the service worker has been activated to replace an old one.
    //Extendable Event
    console.log('activated');
    // delete old versions of caches.
    ev.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                .filter((key) => {
                    if (key != staticName && key != imageName) {
                        return true;
                    }
                })
                .map((key) => caches.delete(key))
            ).then((empties) => {
                //empties is an Array of boolean values.
                //one for each cache deleted
                //TODO:
                openDB();
            });
        })
    );
});

const openDB = (callback) => {
    let req = indexedDB.open('my-db', version);
    req.onerror = (err) => {
        //could not open db
        console.warn(err);
        DB = null;
    };
    req.onupgradeneeded = (ev) => {
        console.log("upgradeneeded")
        let db = ev.target.result;
        if (!db.objectStoreNames.contains('notifications')) {
            db.createObjectStore('notifications', {
                keyPath: "id",
                autoIncrement: true
            });
        }
    };
    req.onsuccess = (ev) => {
        DB = ev.target.result;
        console.log('db opened and upgraded as needed');
        if (callback) {
            callback();
        }
    };
};

const saveNotification = (notification) => {
    if (notification && DB) {
        let tx = DB.transaction('notifications', 'readwrite');
        tx.onerror = (err) => {
            //failed transaction
        };
        tx.oncomplete = (ev) => {
            //finished saving... send the message
            console.log("guardado ")
        };
        let store = tx.objectStore('notifications');

        let req = store.add(notification);

        req.onsuccess = (ev) => {
            console.log("guardado con exito")
        };
    } else {
        console.log('No data was provided.')

    }
};


// Para que lleguen las notificaciones push
self.addEventListener('push', function(event) {
    console.log("notificacion")
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }

    if (DB) {
        saveNotification(data);
    } else {
        openDB(() => {
            saveNotification(data);
        });
    }

    if (data.tag != "silent") {
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            actions: data.actions

        })
    } else {
        console.log(data)
    }


    self.addEventListener('updatefound', event => {
        console.log("update found")
        caches.keys().then(function(names) {
            for (let name of names)
                caches.delete(name);
        });
    })

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