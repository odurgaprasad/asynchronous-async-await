"use strict";

const btnContainer = document.querySelector(".btn-country");
const countryContainer = document.querySelector(".countries");

function renderHtmlElement(data, className = "") {
  const html = `
  <article class= "country ${className}">
        <img class="country__img" src=${Object.values(data.flags)[0]} />
        <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 100000000
            ).toFixed(2)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
        </div>
    </article>

  `;

  countryContainer.insertAdjacentHTML("beforeend", html);
  countryContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countryContainer.insertAdjacentText("beforeend", msg);
};

const getJSON = function (url, errorMsg = "Somthing went Wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg}(${response.status})`);
    }
    return response.json();
  });
};

// /////////////////////////////////////////////////////////
// // Our First Ajax call: XMLHttpRequest--1
// function getCountryName(country) {
//     const request = new XMLHttpRequest();

//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener("load", function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       // console.log(data.languages);
//       const html = `
//       <article class="country">
//           <img class="country__img" src=${data.flags.png} />
//           <div class="country__data">
//               <h3 class="country__name">${data.name.official}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${data.population.toFixed()}</p>
//               <p class="country__row"><span>🗣️</span>${
//                 Object.values(data.languages)[0]
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 Object.values(data.currencies)[0].name
//               }</p>
//           </div>
//       </article>
//     `;

//       countryContainer.insertAdjacentHTML("beforeend", html);
//       countryContainer.style.opacity = 1;
//     });
//   }

//   getCountryName("India");
//   getCountryName("usa");
//   getCountryName("Portugal");
//   getCountryName("germany");

//   //end

// H

/////////////////////////////////////////////////////////
// Welcome to callback hell--2

// function getCountryAndNeighbouring(country) {
//   const request = new XMLHttpRequest();

//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // console.log(data.languages);
//     renderHtmlElement(data);
//     const neighbour = data.borders?.[1];
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderHtmlElement(data2, "neighbour");
//     });
//   });
// }

// getCountryAndNeighbouring("India");
// getCountryAndNeighbouring("usa");

// callBackHell

// setTimeout(() => {
//   console.log("1 sec load");
//   setTimeout(() => {
//     console.log("2 sec load");
//     setTimeout(() => {
//       console.log("3 sec load");
//       setTimeout(() => {
//         console.log("4 sec load");
//       }, 4000);
//     }, 3000);
//   }, 2000);
// }, 1000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Promisess Function Expression-3 //example-1

// function getCountryNames(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderHtmlElement(data[1]);
//     });
// }

// getCountryNames("India");

// promises with arrow function -//example-2
// function getCountryNames(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderHtmlElement(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((data) => renderHtmlElement(data[0], "neighbour"))
//     .catch((err) => renderError(`Something went wrong ${err.message} 🚫🚫🚫`))
//     .finally(() => {
//       countryContainer.style.opacity = 1;
//     });
// }

// btnContainer.addEventListener("click", function () {
//   getCountryNames("India");
// });
// getCountryNames("djddkksodo");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Error handling Catch(automatic error showing) manul error handling (throw new Error(response.ok, response.st))
// function getCountryNames(country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     "Country is Not Found"
//   )
//     .then((data) => {
//       renderHtmlElement(data[0]);
//       const neighbour = "deffskldn";
//       // const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         "Country is Not Found"
//       );
//     })

//     .then((data) => renderHtmlElement(data[0], "neighbour"))
//     .catch((err) => renderError(`Something went wrong ${err.message} 🚫🚫🚫`))
//     .finally(() => {
//       countryContainer.style.opacity = 1;
//     });
// }

// btnContainer.addEventListener("click", function () {
//   getCountryNames("India");
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challange--1

// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // 1)
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((res) => {
//       // console.log(res.ok);
//       // console.log(res.status);

//       if (!res.ok)
//         throw new Error(`problem with the geocoding (${res.status})`);

//       return res.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country is not found (${res.status})`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data[0]);
//       return renderHtmlElement(data[0]);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2)
// function getData() {
//   const request = fetch("https://geocode.xyz/52.508,13.381?geoit=json")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

// getData();

// // 3)

// function getData() {
//   const request = fetch("https://geocode.xyz/52.508,13.381?geoit=json")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(`You are in ${data.state}, ${data.country}`);
//     });
// }

// getData();

// 4)

// function getData() {
//   fetch("https://geocode.xyz/52.508,13.381?geoit=json")
//     .then((response) => {
//       console.log(response.status);
//       response.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.state}, ${data.country}`);
//     })
//     .catch((err) => {
//       console.log(`Somthing went wrong:${err.message}`);
//     });
// }

// getData();

// 5)

// function getData(lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`problem with geoCoding ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.state}, ${data.country}`);
//     })
//     .catch((err) => {
//       console.log(`Somthing went wrong:${err.message}`);
//     });
// }

// getData(19.037, 72.873);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event Loop Practice--

// console.log("Test Start");
// setTimeout(() => console.log("0 sec time takern"), 0);
// Promise.resolve("promise resolve 1").then((res) => console.log(res));
// Promise.resolve("promise resolve 2").then((res) => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log("test End");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// building a simple promise

// const lotteryPromises = new Promise(function (resolve, reject) {
//   console.log("Lottery is happeing 🔮");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("You win 🎉");
//     } else {
//       reject("You Loose 💩");
//     }
//   }, 2000);
// });

// lotteryPromises
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// /// Promisifying promisess
// wait(2)
//   .then(() => {
//     console.log("1 second passed ");
//     return wait(1);
//   })
//   .then(() => console.log("2 seconds passed"));

// Promise.resolve("Resolve state").then((res) => console.log(res));
// Promise.reject(new Error("Rejected State")).catch((err) =>
//   console.error(err.message)
// );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Promisifying the Geolocation API:

// const getData = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err.message)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getData().then((pos) => console.log(pos));
// const whereAmI = function () {
//   getData()
//     .then((pos) => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then((res) => {
//       // console.log(res.ok);
//       // console.log(res.status);

//       if (!res.ok)
//         throw new Error(`problem with the geocoding (${res.status})`);

//       return res.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country is not found (${res.status})`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data[0]);
//       return renderHtmlElement(data[0]);
//     });
//   };

//   btnContainer.addEventListener("click", whereAmI);
// whereAmI(52.508, 13.381);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// consuming promises with Async/await

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;
//   console.log(lat, lng);
//   const res1 = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await res1.json();
//   console.log(dataGeo.country);

//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${dataGeo.country}`
//   );

//   const data = await res.json();
//   renderHtmlElement(data[0]);
//   console.log(data[0]);
//   countryContainer.style.opacity = 1;
// };

// whereAmI();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Error Handlig with try...catch
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     console.log(lat, lng);
//     const res1 = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!res1.ok) {
//       throw new Error("Country is not Found-1");
//     }
//     const dataGeo = await res1.json();
//     console.log(dataGeo.country);

//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );

//     if (!res.ok) {
//       throw new Error("Country is not Found-2");
//     }

//     const data = await res.json();
//     renderHtmlElement(data[0]);
//     console.log(data[0]);

//     return `You are in ${dataGeo.city},${dataGeo.country}`;
//     countryContainer.style.opacity = 1;
//   } catch (err) {
//     console.error(err.message);
//     throw err;
//   }
// };

// // whereAmI()(
// //   .then((city) => console.log(city))
// //   .catch((err) => console.error(err.message))
// //   .finally(() => console.log("Finished getting error"));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.error(err.message);
//   }
//   console.log("Finished getting error");
// })();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Running Promises in parallel;

// const get3Countries = async function (c1, c2, c3) {
//   try {
// const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
// const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
// const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
// console.log(data1.capital, data2.capital, data3.capital);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     data.map((d) => console.log(d[0].borders));
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// get3Countries("india", "pakistan", "bangladesh");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Other Promise Combinators:race,allSettled and any:

//Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/india`),
    getJSON(`https://restcountries.com/v3.1/name/america`),
    getJSON(`https://restcountries.com/v3.1/name/pakistan`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("it's too long "));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/india`),
  timeout(0.3),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err.message));

/// Promise.allsettled

Promise.allSettled([
  Promise.resolve("success"),
  Promise.reject("Rejected"),
  Promise.resolve("Another Success"),
]).then((res) => console.log(res));

Promise.all([
  Promise.resolve("success"),
  Promise.reject("Rejected"),
  Promise.resolve("Another Success"),
])
  .then((res) => console.log(res))
  .then((err) => console.log(new Error(`${err.message}`)));

//Promise.any
Promise.any([
  Promise.resolve("success"),
  Promise.reject("Rejected"),
  Promise.resolve("Another Success"),
])
  .then((res) => console.log(res))
  .then((err) => console.log(err));
