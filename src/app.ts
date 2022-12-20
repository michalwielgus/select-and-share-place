import axios from 'axios';
import '../app.css';

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

const form = document.querySelector('form')!;
const addressInput = document.querySelector('#address')! as HTMLInputElement;

declare global {
  interface Window {
    initMap: () => void;
  }
}

declare var google: any;

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  const response = await axios.get<GoogleGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress,
    )}&key=${process.env.GOOGLE_API_KEY}`,
  );

  if (response.data.status !== 'OK') {
    throw new Error('Could not fetch location!');
  }

  const coordinates = response.data.results[0].geometry.location;
  function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 10,
        center: coordinates,
      },
    );
    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }

  initMap();
}
form.addEventListener('submit', searchAddressHandler);
