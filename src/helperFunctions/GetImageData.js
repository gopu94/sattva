import React from 'react';
import Geolocation from 'react-native-geolocation-service';

const API = '9141e8d6dc114f2fa3ea7b5def58fa4e';

const getCurrentCityAndCountry = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    );
    const data = await response.json();
    const city = data.address.city;
    const country = data.address.country;
    return {city, country};
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw new Error('Failed to fetch location data');
  }
};

const getCurrentTemperature = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}&units=metric`,
    );
    const data = await response.json();
    const temperature = data.main.temp;
    return temperature;
  } catch (error) {
    console.error('Error fetching temperature:', error);
    throw new Error('Failed to fetch temperature data');
  }
};

// const GetImageData = async () => {
//   let data = {};
//   Geolocation.getCurrentPosition(
//     async position => {
//       const {latitude, longitude} = position.coords;
//       await getCurrentCityAndCountry(latitude, longitude)
//         .then(({city, country}) => {
//           console.log('locationssss', city, country);
//           data = {city, country};
//           //   return {city, country};
//         })
//         .catch(error => {
//           console.log(error);
//         });
//       await getCurrentTemperature(latitude, longitude)
//         .then(temp => {
//           console.log('temppp', temp);
//           data.temp = temp;
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     },
//     error => {
//       console.log(error);
//     },
//     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//   );
//   return data;
// };

const GetImageData = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const cityCountry = await getCurrentCityAndCountry(
            latitude,
            longitude,
          );
          const temperature = await getCurrentTemperature(latitude, longitude);
          const imageData = {...cityCountry, temp: temperature};
          resolve(imageData);
        } catch (error) {
          console.error('Error:', error);
          reject(error);
        }
      },
      error => {
        console.error('Error getting current position:', error);
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

export default GetImageData;
