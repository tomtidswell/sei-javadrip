
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

* **Front-end**
  * [React](https://reactjs.org/)
  * [Chart.js](https://www.chartjs.org/) - for brightening up the customer analysis
  * [Spectre](https://picturepan2.github.io/spectre/getting-started.html) - CSS Framework


## User Journeys

Journey A - first time access
1. User chooses and saves location and name
2. Shows the javaDrip

Journey B - returning user
Shows the javaDrip

Journey C - user wants to change location
1. User chooses to switch cities   (or maybe detect current location based on browser location API)
2. User chooses and saves location
3. Shows javaDrip

---

## WIREFRAMES
1. - the javaDrip
2. - choosing and setting location

---

## PSEUDOCODE
A. - the javaDrip

Display title - "What to wear"

When clicked, the state changes, and does the following.....

Hardcode to London (placeholder for future for other locations)

Use the location to fetch the next morning's weather from the OpenWeatherMap API

Run the rules on the weather data to determine the clothes the user should wear,

Save the recommendations into state along with the weather data - that retriggers the render

Render the recommendation in the component

---

## RULES
Work out what the weather 'feels like' based on ???
If the feels like is under 10 deg, recommend a coat
If the feels like is under 15 deg, recommend a jumper
If it is raining, recommend an umberella
If it is snowing, recommend wellies and a coat

## Versioning

#### v1.0
[JavaDrip version 1](https://tomtidswell.github.io/sei-javadrip/)
One week project, ended with a demo and presentation. MVP was complete.

#### v2.0


## Contributors
I was one member of a team of two who created the initial release
* **Cliff Conolly** - *v1.0* - [GitHub](https://github.com/Cliff-Conolly/sei-javadrip)
* **Me** - *v1 onwards*

