# Match Masters

Match Masters is a full-stack web application designed to provide live updates, schedules, results, and standings for various football leagues. It utilizes the Football-Data API to fetch real-time data about matches and leagues.
The website is fully functional and has a simplistic / modern design that uses real clubs emblems and other interesting features.

## Features
- Live Match Updates: Get the latest updates on matches currently in play.
- Match Schedules: View upcoming matches for the next 7 days.
- Match Results: Check results of matches that were played in the last week.
- League Standings: Stay updated with the current standings of different football leagues.

## Installation
To run Match Masters locally, you need to have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the Repository

`git clone https://github.com/UrsanCristian/match-masters`

`cd match-masters`

2. Install Dependencies

`npm install`

3. Setting Up the API Token

You need to have an API token from Football-Data. Replace `"Your Football-Data API Token"` in the index.js file with your actual API token.

You can get one for free easily just by registering on their official website 

`https://www.football-data.org/`

4. Running the Application


`npm index.js`

or

`nodemon index.js`


The application will start running on http://localhost:3000.

## Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- Axios (for API requests)
- CSS
- Bootstrap 

## Project Structure
- `index.js`: The main server file.
- `views/`: Contains EJS templates for different pages.
- `public/`: Contains static files like images, CSS, and client-side JavaScript.
- `styles/`: Contains CSS files for styling.

## Notes

The Free Tier API Token is limited to 10 requests / minute. MatchMasters Website can easily use more than that if you jump fast from a page to another and thats why you could get errors sometimes.

If you want to avoid this problems consider to upgrade your API plan.

For any other informations feel free to contact me.

Unfortunatly, the website is not hosted right now and it can only be used on an localhost server.

