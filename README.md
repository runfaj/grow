# Grow Assignment

### Quick Setup

* Install node
* Run `npm install`
* Run `npm run dev`
* The browser should open localhost:3030 for the webpack dev server and node should be running at localhost:3000.

Other commands are visible in the package.json file. The node server is not configured to run anything out of the dist folder currently.

### Sample React App with Node Server

The main code is in "src/react". I thought about doing an Angular version as well, but the code would have been so similar (and sharing the same api and css), it didn't seem necessary. If you'd like to see that, I can add relatively quickly.

### Star Wars Endpoints

Because the React project and these endpoints are contained in the same app, I split up the routes a bit. You can access the React endpoints via /whoismy/... and the star wars via /starwars/...

Example: http://localhost:3000/starwars/people?sortBy=name
