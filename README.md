# Edufluence
Edufluence aims to connect students and experts around the world to make knowledge open to all. It makes use of the underlying real-time browser technology **WebRTC** to provide a rich learning experience. The app uses **Node.js** for its backend, **ExpressJS** for route management with **EJS** (Embedded JavaScript) for dynamic templating and **Socket.io** for signaling. The app is deployed to the **Heroku Cloud** for easy access.

View the app live - https://edufluence.herokuapp.com

### Tech Stack
* Node.js backend
* ExpressJS for routes
* Socket.io for signaling
* HTML5, CSS3, Javascript(ES6)
* Heroku for hosting

### Why WebRTC ?
WebRTC is a cutting edge serverless technology allows browsers(or peers) to talk to each other and transmit data directly without the need for a centralized server. WebRTC makes it possible to establish peer-to-peer connectivity to other web browsers easily. 

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
