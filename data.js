class Details {
    constructor(ip) {
        this.url = `https://ipapi.co/${ip}/json/`;
    }

    async getIP() {
        const data = await fetch(this.url);

        const json = await data.json();

        return {
            json
        }
    }
}

const go = document.querySelector('#go');
const ipAdd = document.querySelector('#ip');
const showIP = document.querySelector('.ip');
const address = document.querySelector('.add');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');


go.addEventListener('click', e => {
    const ip = ipAdd.value;

    const details = new Details(`${ip}`)

    details.getIP()
        .then(data => {
            showIP.textContent = data.json.ip;
            address.textContent = data.json.region;
            timezone.textContent = data.json.timezone;
            isp.textContent = data.json.org;
            let lat = data.json.latitude;
            let lon = data.json.longitude;
            // console.log(data.json.lat)
            // console.log(data.json.lon)
            console.log(data)

            mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5pY3MiLCJhIjoiY2t2MGM0b3N1MDFqdDJvbHNkcjlrZTNlMSJ9.fK6MzVndal6J3DSmNxsFsw';
            const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [lon, lat], // starting position
                zoom: 9 // starting zoom
            });

            map.addControl(new mapboxgl.NavigationControl());
            map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));

            const marker = new mapboxgl.Marker({
                    color: "red",
                    draggable: true
                }).setLngLat([lon, lat])
                .addTo(map);


        })
})

mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5pY3MiLCJhIjoiY2t2MGM0b3N1MDFqdDJvbHNkcjlrZTNlMSJ9.fK6MzVndal6J3DSmNxsFsw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));


// Set marker options.

// Create a new marker.

// map.addControl(
//     new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         localGeocoder: coordinatesGeocoder,
//         zoom: 4,
//         placeholder: 'Try: -40, 170',
//         mapboxgl: mapboxgl,
//         reverseGeocode: true
//     })
// );

// map.touchZoomRotate.enable()
// map.scrollZoom.enable();
// map.boxZoom.enable();
// map.dragRotate.enable();
// map.dragPan.enable();
// map.keyboard.enable();
// map.doubleClickZoom.enable();
// map.dragPan.enable()