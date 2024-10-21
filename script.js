document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-address');
    const addressInput = document.getElementById('address-result');
    const locateButton = document.getElementById('locate-button');
    const numberOfRoomsInput = document.getElementById('number-of-rooms');
    const apartmentTypeSelect = document.getElementById('apartment-type');
    const roofingTypeSelect = document.getElementById('roofing-type');
    const gatePresentSelect = document.getElementById('gate-present');
    const predictButton = document.getElementById('predict-button');
    const priceInput = document.querySelector('.price input');
    const mapDiv = document.getElementById('map');
    
    let map;
    let marker;

    // Generate random address
    const generateRandomAddress = () => {
        const streets = ['itolu', 'gbokoto', 'Fpi', 'okeola', 'orita St'];
        const cities = ['Ilaro'];
        const states = ['Ogun State'];

        const randomStreet = streets[Math.floor(Math.random() * streets.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomState = states[Math.floor(Math.random() * states.length)];

        return `${Math.floor(Math.random() * 20) + 1} ${randomStreet}, ${randomCity}, ${randomState}`;
    };

    generateButton.addEventListener('click', () => {
        addressInput.value = generateRandomAddress();
    });

    // Initialize the map
    function initMap() {
        const initialLocation = { lat: 6.895584234416547, lng: 2.976286565382183 }; //  location
        map = new google.maps.Map(mapDiv, {
            zoom: 15,
            center: initialLocation,
        });
        marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
        });
    }

    // Locate address when the button is clicked
    locateButton.addEventListener('click', () => {
        const address = addressInput.value;
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                if (marker) {
                    marker.setMap(null); // Remove the previous marker
                }
                marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });

    // Predict price functionality
    predictButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission if it's within a form
        predictPrice();
    });

    function predictPrice() {
        const numberOfRooms = parseInt(numberOfRoomsInput.value);
        const apartmentType = parseInt(apartmentTypeSelect.value);
        const roofingType = parseInt(roofingTypeSelect.value);
        const gatePresent = parseInt(gatePresentSelect.value);

        let basePrice = 50000; // Base price

        // Price calculation
        const roomPrice = numberOfRooms * 20000;
        const apartmentPrice = apartmentType === 1 ? 30000 : 50000;
        const roofingPrice = roofingType === 1 ? 10000 : 20000;
        const gatePrice = gatePresent === 1 ? 5000 : 0;

        const totalPrice = basePrice + roomPrice + apartmentPrice + roofingPrice + gatePrice;

        priceInput.value = `₦${totalPrice.toLocaleString()}`;
    }

    // Initialize the map
    initMap();
});