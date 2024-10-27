const map = L.map('map').setView([37.8, -96], 4);  // Adjusted zoom to show US view

// Add tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate three sets of random coordinates
const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Function to add markers and fetch locality data
coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.lat, coord.lng]).addTo(map)
    .bindPopup(`Marker ${index + 1}`)
    .openPopup();

  // Fetch locality data using BigDataCloud API
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
      const locality = data.locality || "Locality not found";
      document.getElementById(`marker${index + 1}`).textContent = `Marker ${index + 1} (Lat: ${coord.lat}, Lng: ${coord.lng}): ${locality}`;
    })
    .catch(error => {
      document.getElementById(`marker${index + 1}`).textContent = `Marker ${index + 1}: Error retrieving locality`;
      console.error(error);
    });
});