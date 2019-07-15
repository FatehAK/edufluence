# Edufluence
Edufluence is a learning app that connects students and experts around the world. Its primary goal is to help students acquire knowledge by consulting with the experts and using the real time browser technology **WebRTC** to simplify the process. The app uses **Node.js** for its backend, **ExpressJS** for route management with **EJS** (Embedded JavaScript) for dynamic templating and **Socket.io** for signaling. The app is deployed to the **Heroku Cloud** for easy access.

View the app live - https://edufluence.herokuapp.com

### Tech Stack
* Node.js backend
* ExpressJS for routes
* Socket.io for signaling
* HTML5, CSS, Javascript(ES6)
* Heroku for hosting

### Why WebRTC ?
WebRTC is a cutting edge serverless technology allows browsers(or peers) to talk to each other and transmit data directly without the need for a centralized server. WebRTC makes it possible to establish peer-to-peer connectivity to other web browsers easily. 

Traditionally, building such an application from scratch requires a number of frameworks and libraries that deal with typical issues like packet loss, connection dropping, and NAT traversal. With WebRTC, all of this comes built-in into the browser by default. There is isn’t any need for plugins or third-party software, hence assisting in development.

### Features
* Real time 1:1 Audio/Video P2P streaming.
* Send messages with privacy guarantees.
* File sharing with chunking to speed up transfer and ensure reliability.
* Screen sharing (full screen or tabs) for a great learning experience.
* A/V controls to pause/unpause video or mute/unmute audio.
* Fully responsive to be used on mobile devices as well.

### Local Development
To get started developing right away:

* Install all project dependencies with `npm install`
* Start the development server with `node server.js`
* The dev server should be running at `localhost:3000`
