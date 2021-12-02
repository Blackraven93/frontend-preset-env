import "./test/css/test.scss";

const content = document.querySelector(".content");

// Kelvin -> Celsius 온도 변환기
const convertToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

// 요청 받은 json을 element에 넣는 함수
const handleCreateElement = (tag, text, temperature) => {
  const container = document.createElement("div");
  const createdTag = document.createElement(tag);
  console.log(text);
  createdTag.innerText = `${temperature}°C`;

  container.appendChild(createdTag);

  return container;
};

// request 요청
const handleAjaxRequest = (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", URL, true);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = () => {
    // 왜 이건 가능하지..?
    const responseOk = xhr.response;

    content.appendChild(
      handleCreateElement(
        "p",
        responseOk,
        convertToCelsius(responseOk.main.temp)
      )
    );
  };
};

// 위치값을 가져와 출력
const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  handleAjaxRequest(latitude, longitude);

  navigator.geolocation.clearWatch(getGeoInfo);
});
