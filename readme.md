
# JavaDrip

## Plan your day while you sip

The idea for the app came from a discussion about how to start your day well and make sure there were no nasty surprises on the way to work. The premise was to build an app that would give a quick morning briefing to start your day in the best way.

We settled on an MVP which would:
* advise the best clothes for the user to wear based on the current weather forecast
* also give a weather snapshot 
* advise on the current travel conditions 

All of this would sit in a simple and clean user interface.

The first version of this app was built over three days as part of a two person team, with a subsequent version being finalised as a solo project by myself.

## Built With

* [React](https://reactjs.org/)
* [Bulma](https://bulma.io) - CSS Framework

## Contributors
I was one member of a team of two who created the initial release
* [**Cliff Conolly**](https://github.com/Cliff-Conolly/sei-Javadrip) - *v1.0*
* **Me** - *v1 onwards*

## Functionality

### User Journeys

Journey A - first time access
1. User chooses and saves location and name
2. Shows the JavaDrip

Journey B - returning user
1. Shows the JavaDrip

Journey C - user wants to change location
1. User chooses to switch cities   (or maybe detect current location based on browser location API)
2. User chooses and saves location
3. Shows JavaDrip


### the JavaDrip

In the initial state, three small tiles appear, and when clicked will expand

* Display title - "What to wear". When clicked, the state changes, and expands to include:
    * Hardcode the location to London (placeholder for future for other locations)
    * Use the location to fetch the next morning's weather from the OpenWeatherMap API
    * Run the rules on the weather data to determine the clothes the user should wear:
        - Work out what the weather 'feels like' based on assessing wind chill and temperature
        - If the feels like is under 10 deg, recommend a coat
        - If the feels like is under 15 deg, recommend a jumper
        - If it is raining, recommend an umberella
        - If it is snowing, recommend wellies and a coat
    * Save the recommendations into state along with the weather data - that retriggers the render
    * Render the recommendation in the component

* Display title - "Travel status". When clicked, the state changes, and expands to include:
    * Shows a breakdown of each TfL tube line, and a summary of whether there is a good / bad service
    * Each can be clicked to see a more detailed description of the status

* Display title - "Bikes nearby". When clicked, the state changes, and expands to include:
    * Using the users saved postcode, assess which is the closest bike point and then display:
        - The location description
        - The number of available bikes
        - The number of free bike slots

### The location / user switching

This uses local storage to save the users home city and postcode.


## Versioning

#### v1.0
[JavaDrip version 1](https://tomtidswell.github.io/sei-Javadrip/)
One week project, ended with a demo and presentation. MVP was complete.

#### v2.0
_...in progress_

