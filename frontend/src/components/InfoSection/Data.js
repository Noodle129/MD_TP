export const homeObjOne = {
    id: 'about',
    lightBg: true,
    lightText: false,
    lightTextDesc: true,
    topLine: 'Air Quality',
    headline: 'Visualization of air analytics',
    description: 'Select a city and get information ' +
        'about the main pollutants, ' +
        'their concentration and what ' +
        'measures to take to reduce their impact.',
    buttonLabel: 'Get started',
    imgStart: true,
    img: require("../../Images/air_person.png"),
    alt: 'Person',
    dark: true,
    primary: true,
    darkText: true
}

export const homeObjTwo = {
    id: 'map',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Locations Map',
    headline: 'Insights of AQI by Geo-location',
    description: 'Access the map page so you can have real-time insights about the nearest station from your location!',
    buttonLabel: 'Get started',
    imgStart: false,
    img: require("../../Images/map.png"),
    alt: 'Map',
    dark: true,
    primary: true,
    darkText: false
}

export const homeObjThree = {
    id: 'model',
    lightBg: true,
    lightText: false,
    lightTextDesc: true,
    topLine: 'Predict AQI',
    headline: 'Air quality forecasting',
    description: 'Predict the air quality index of a city in the next 24 hours'
        + ' based on the current weather conditions and the historical data'
        + ' of the last 5 years.',
    buttonLabel: 'Get started',
    imgStart: true,
    img: require("../../Images/predict.png"),
    alt: 'Person writing in a whiteboard',
    dark: true,
    primary: true,
    darkText: true
}