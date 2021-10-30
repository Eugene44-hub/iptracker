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
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lon, lat],
                zoom: 13
            });
        })
})

mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5pY3MiLCJhIjoiY2t2MGM0b3N1MDFqdDJvbHNkcjlrZTNlMSJ9.fK6MzVndal6J3DSmNxsFsw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [3.328670, 6.452560],
    zoom: 10
});