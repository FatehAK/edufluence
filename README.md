# Edufluence
Edufluence is a learning app that connects students and experts around the world. The primary goal is to help students acquire the necessary knowledge by consulting with the experts and using the real time browser technology **WebRTC** to simplify the process.

Visit the site in action at - https://edufluence.herokuapp.com

### Tech Stack
* HTML, CSS, Javascript (ES6)
* Node.js Backend
* Socket.io for signaling
* Netlify for hosting

### Why WebRTC ?
WebRTC is a cutting edge serverless technology allows browsers(or peers) to talk to each other and transmit data directly without the need for a centralized server, ensuring maximum security. WebRTC makes it possible to establish peer-to-peer connectivity to other web browsers easily. 

Traditionally, building such an application from scratch requires a number of frameworks and libraries that deal with typical issues like packet loss, connection dropping, and NAT traversal. With WebRTC, all of this comes built-in into the browser by default. There is isn’t any need for plugins or third-party software, hence assisting in development.

### Features
* Real time 1:1 audio/video p2p streaming.
* Send messages directly with privacy guarantees.
* File sharing with chunking to speed up transfer and ensure reliability.
* Screen sharing (full screen or tabs) for a great learning experience.
* A/V controls to pause/unpause video or mute/unmute audio.
* Fully responsive and can be used on mobile devices as well.

### Local Development
To get started developing right away:

* Install all project dependencies with `npm install`
* Start the development server with `node server.js`
* The dev server should be running at `localhost:3000`
