//divs
const landingPageDiv = document.querySelector('#landingPage');
const studentEntryDiv = document.querySelector('#studentEntry');
const expertSignupDiv = document.querySelector('#expertSignup');
const videoPageDiv = document.querySelector('#videoPage');
const requestExpertForm = document.querySelector('#requestExpertForm');
const waitingForExpert = document.querySelector('#waitingForExpert');
const expertSignupForm = document.querySelector('#expertSignupForm');
const waitingForStudent = document.querySelector('#waitingForStudent');
const expertListing = document.querySelector('#expertListing');
const studentRegister = document.querySelector('#studentRegister');
const userStudent = document.querySelector('#userStudent');
const userExpert = document.querySelector('#userExpert');

//form values
const studentName = document.querySelector('#studentName');
const studentPass = document.querySelector('#studentPass');
const expertName = document.querySelector('#expertName');
const expertPass = document.querySelector('#expertPass');
const usName = document.querySelector('#usName');
const usPass = document.querySelector('#usPass');
const usSpl = document.querySelector('#usSpl');
const ueName = document.querySelector('#ueName');
const uePass = document.querySelector('#uePass');
const ueSpl = document.querySelector('#ueSpl');

//student button
const enterAsStudent = document.querySelector('#enterAsStudent');
enterAsStudent.addEventListener('click', function(evt) {
    studentName.value = '';
    studentPass.value = '';
    myUserType = 'student';
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'block';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
    requestExpertForm.style.display = 'block';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    evt.preventDefault();
});

//expert button
const enterAsExpert = document.querySelector('#enterAsExpert');
enterAsExpert.addEventListener('click', function(evt) {
    expertName.value = '';
    expertPass.value = '';
    myUserType = 'expert';
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'block';
    videoPageDiv.style.display = 'none';
    expertSignupForm.style.display = 'block';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'none';
    evt.preventDefault();
});

//student register button
sRegister.addEventListener('click', function(evt) {
    usName.value = '';
    usPass.value = '';
    usSpl.value = '';
    studentName.value = '';
    studentPass.value = '';
    requestExpertForm.style.display = 'none';
    studentRegister.style.display = 'block';
    waitingForExpert.style.display = 'none';
    evt.preventDefault();
});

//expert register button
eRegister.addEventListener('click', function(evt) {
    ueName.value = '';
    uePass.value = '';
    ueSpl.value = '';
    expertName.value = '';
    expertPass.value = '';
    expertSignupForm.style.display = 'none';
    expertRegister.style.display = 'block';
    waitingForStudent.style.display = 'none';
    evt.preventDefault();
});

//database
const request = window.indexedDB.open("mydb", 1);
request.onupgradeneeded = event => {
    const db = event.target.result;
    db.createObjectStore("studentstore", { autoIncrement: true });
    db.createObjectStore("expertstore", { autoIncrement: true });
};

request.onsuccess = () => {
    const db = request.result;

    //student registration
    const ssRegister = document.querySelector('#ssRegister');
    ssRegister.addEventListener('click', function(evt) {
        const transaction = db.transaction(['studentstore'], 'readwrite');
        const studentStore = transaction.objectStore('studentstore');
        let request = studentStore.openCursor();
        let exists = false;
        if ((usName.value === '') || (usPass.value === '')) {
            Swal.fire('Please fill the details');
        } else {
            request.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.username === usName.value.toLowerCase() && cursor.value.password === usPass.value.toLowerCase()) {
                        exists = true;
                        Swal.fire('Username not available try a different one?');
                        usName.value = '';
                        usPass.value = '';
                    }
                    cursor.continue();
                }
            };
        }
        setTimeout(() => {
            if (exists === false && usName.value && usPass.value) {
                Swal.fire('Registration successful');
                requestExpertForm.style.display = 'block';
                waitingForExpert.style.display = 'none';
                studentRegister.style.display = 'none';
                const transaction = db.transaction(['studentstore'], 'readwrite');
                const studentStore = transaction.objectStore('studentstore');
                studentStore.put({ username: usName.value.toLowerCase(), password: usPass.value.toLowerCase() });
            }
        }, 100);
        evt.preventDefault();
    });

    //expert registration
    const eeRegister = document.querySelector('#eeRegister');
    eeRegister.addEventListener('click', function(evt) {
        const transaction = db.transaction(['expertstore'], 'readwrite');
        const expertStore = transaction.objectStore('expertstore');
        let request = expertStore.openCursor();
        let exists = false;
        if ((ueName.value === '') || (uePass.value === '')) {
            Swal.fire('Please fill the details');
        } else {
            request.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.username === ueName.value.toLowerCase() && cursor.value.password === uePass.value.toLowerCase()) {
                        exists = true;
                        Swal.fire('Username not available try a different one?');
                        ueName.value = '';
                        uePass.value = '';
                    }
                    cursor.continue();
                }
            };
        }
        setTimeout(() => {
            if (exists === false && ueName.value && uePass.value) {
                Swal.fire('Registration successful')
                expertSignupForm.style.display = 'block';
                waitingForStudent.style.display = 'none';
                expertRegister.style.display = 'none';
                const transaction = db.transaction(['expertstore'], 'readwrite');
                const expertStore = transaction.objectStore('expertstore');
                expertStore.put({ username: ueName.value.toLowerCase(), password: uePass.value.toLowerCase() });
            }
        }, 100);
        evt.preventDefault();
    });

    //student request
    const requestExpert = document.querySelector('#requestExpert');
    requestExpert.addEventListener('click', function(evt) {
        const transaction = db.transaction(['studentstore'], 'readwrite');
        const studentStore = transaction.objectStore('studentstore');
        let request = studentStore.openCursor();
        let found = false;
        request.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.value.username === studentName.value.toLowerCase() && cursor.value.password === studentPass.value.toLowerCase()) {
                    found = true;
                    Swal.fire('Login Successful');
                    requestExpertForm.style.display = 'none';
                    waitingForExpert.style.display = 'block';
                    userStudent.innerHTML = studentName.value;
                    expertListing.style.display = 'none';
                    studentUserName = studentName.value || 'no name';
                    myName = studentUserName;
                    io.emit('signal', {
                        user_type: 'student',
                        user_name: studentUserName,
                        user_data: 'no data, just a student',
                        command: 'joinroom'
                    });
                    console.log('student ' + studentUserName + ' has joined.');
                }
                cursor.continue();
            }
        };
        setTimeout(() => {
            if (found === false) {
                Swal.fire('Please check your details');
                studentName.value = '';
                studentPass.value = '';
            }
        }, 100);
        evt.preventDefault();
    });

    //expert request
    const expertSignupButton = document.querySelector('#expertSignupButton');
    expertSignupButton.addEventListener('click', function(evt) {
        const transaction = db.transaction(['expertstore'], 'readwrite');
        const expertStore = transaction.objectStore('expertstore');
        let request = expertStore.openCursor();
        let found = false;
        request.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.value.username === expertName.value.toLowerCase() && cursor.value.password === expertPass.value.toLowerCase()) {
                    found = true;
                    Swal.fire('Login Successful');
                    expertSignupForm.style.display = 'none';
                    waitingForStudent.style.display = 'block';
                    userExpert.innerHTML = expertName.value;
                    expertUserName = expertName.value || 'no name';
                    myName = expertUserName;
                    io.emit('signal', {
                        user_type: 'expert',
                        user_name: expertUserName,
                        user_data: expertPass.value,
                        command: 'joinroom'
                    });
                    console.log('expert ' + expertUserName + ' has joined.');
                }
                cursor.continue();
            }
        };
        setTimeout(() => {
            if (found === false) {
                Swal.fire('Please check your details');
                expertName.value = '';
                expertPass.value = '';
            }
        }, 100);
        evt.preventDefault();
    });
}

//call expert button
const header = document.querySelector('.head-wrapper');
const callExpert = document.querySelector('#callExpert');
callExpert.addEventListener('click', function(evt) {
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    header.style.display = 'none';
    videoPageDiv.style.display = 'block';
    studentUserName = studentName.value || 'no name';
    io.emit('signal', {
        user_type: 'student',
        user_name: studentUserName,
        user_data: 'calling expert',
        command: 'callexpert'
    });
    console.log('student ' + studentUserName + ' is calling.');
    evt.preventDefault();
});

//menu toggler
const toggleMenu = document.querySelector('#toggleMenu');
const toggleHelp = document.querySelector('#toggleHelp');
const toggleAbout = document.querySelector('#toggleAbout');
const headerRight = document.querySelector('.header-right');
toggleMenu.addEventListener('click', function() {
    toggleMenu.classList.toggle('open');
    headerRight.classList.toggle('responsive');
    toggleAbout.classList.add('animated', 'slideInLeft', 'faster');
    toggleHelp.classList.add('animated', 'slideInLeft', 'faster');
});

//sidebar
opened = false;
const openNav = document.querySelector('.open-nav');
openNav.addEventListener('click', function() {
    if (!opened) {
        opened = true;
        document.querySelector('.sidenav').style.width = '300px';
        document.querySelector('body').style.marginRight = '300px';
    } else {
        document.querySelector('.sidenav').style.width = '0';
        document.querySelector('body').style.marginRight = '0';
        opened = false;
    }
});

const closeNav = document.querySelector('.close-nav');
closeNav.addEventListener('click', function(evt) {
    document.querySelector('.sidenav').style.width = '0';
    document.querySelector('body').style.marginRight = '0';
    opened = false;
    evt.preventDefault();
});

//debounced messaging
function debounce(fun, wait = 1, immediate = false) {
    let timeout;
    return function(...args) {
        let callNow = immediate && !timeout;
        clearInterval(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                fun.apply(this, args);
            }
        }, wait);
        if (callNow) {
            fun.apply(this, args);
        }
    };
}

const msgInput = document.querySelector('#myMessage');
msgInput.addEventListener('keydown', debounce(function(evt) {
    if (evt.keyCode === 13) {
        document.querySelector('#sendMessage').click();
    }
}, 500, true));

//modals
toggleAbout.addEventListener('click', function(evt) {
    Swal.fire({
        title: `<strong style="font-size: 1.15em; font-family: 'Josefin Sans', sans-serif;">About</strong>`,
        html: `
        <p style="text-align: justify; line-height: 28px; font-size: 1em;">
            Edufluence is a learning app that connects students and experts around the world. This is possible using the real time browser technology -> <a href="https://www.innoarchitech.com/blog/what-is-webrtc-and-how-does-it-work" target="_blank"><strong>WebRTC</strong></a><br><br>
            <span>WebRTC is a cutting edge serverless technology allows browsers(or peers) to talk to each other and transmit data directly without the need for a centralized server, ensuring maximum security.</span><br><br>
            <span>Edufluence supports the following features:</span>
            <ul style="text-align: justify; line-height:28px;">
                <li>Real time audio/video streaming.</li>
                <li>Direct messaging among the users.</li>
                <li>File transfer in a peer to peer manner.</li>
                <li>Screen sharing for a great learning experience.</li>
            </ul>
        </p>
        `,
        footer: `<i style="margin: 5px 7px 0 0;" class="fas fa-info-circle"></i><span>For screen sharing you must install this <a href="https://chrome.google.com/webstore/detail/edushare/pahmpnjhabkdbkbongmidpbielbcpggo" target="_blank">extension</span>`
    });
    evt.preventDefault();
});

toggleHelp.addEventListener('click', function(evt) {
    Swal.fire({
        title: `<strong style="font-size: 1.15em; font-family: 'Josefin Sans', sans-serif;">Help</strong>`,
        html: `
        <p style="text-align: justify; line-height: 28px; font-size: 1em;">
            To test just open the app in two tabs (can be in different devices too) and then follow these steps:
            <ul style="text-align: justify; line-height: 28px;">
                <li>Register and login as student in one tab.</li>
                <li>After logged in as student click on <span style="color: var(--primary-color)">'Request expert'</span>.</li>
                <li>Now in the other tab register and login as expert.</li>
                <li>After logged in as expert click on <span style="color: var(--primary-color)">'Wait for student'</span>.</li>
                <li>Go to the student tab and the screen would have changed, now click on <span style="color: var(--primary-color)">'Call expert'</span>.</li>
                <li>Enjoy your call with features such as video streaming, messaging, file and screen sharing.</li>
            </ol>
        </p>
        `,
        footer: `<i style="margin: 5px 7px 0 0;" class="fas fa-info-circle"></i><span>For screen sharing you must install this <a href="https://chrome.google.com/webstore/detail/edushare/pahmpnjhabkdbkbongmidpbielbcpggo" target="_blank">extension</span>`
    });
    evt.preventDefault();
});
