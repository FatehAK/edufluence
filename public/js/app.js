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
    waitingForExpert.style.display = 'none';
    studentRegister.style.display = 'block';
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
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'block';
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
            alert('Please fill the details');
        } else {
            request.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.username === usName.value.toLowerCase() && cursor.value.password === usPass.value.toLowerCase()) {
                        exists = true;
                        alert('Username not available try a different one?');
                        usName.value = '';
                        usPass.value = '';
                    }
                    cursor.continue();
                }
            };
        }
        setTimeout(() => {
            if (exists === false && usName.value && usPass.value) {
                alert('Registration successful')
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
            alert('Please fill the details');
        } else {
            request.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.username === ueName.value.toLowerCase() && cursor.value.password === uePass.value.toLowerCase()) {
                        exists = true;
                        alert('Username not available try a different one?');
                        ueName.value = '';
                        uePass.value = '';
                    }
                    cursor.continue();
                }
            };
        }
        setTimeout(() => {
            if (exists === false && ueName.value && uePass.value) {
                alert('Registration successful')
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
                console.log(cursor.value);
                if (cursor.value.username === studentName.value.toLowerCase() && cursor.value.password === studentPass.value.toLowerCase()) {
                    found = true;
                    alert('Login Successful');
                    requestExpertForm.style.display = 'none';
                    waitingForExpert.style.display = 'block';
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
                alert('Please check your details');
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
                console.log(cursor.value);
                if (cursor.value.username === expertName.value.toLowerCase() && cursor.value.password === expertPass.value.toLowerCase()) {
                    found = true;
                    alert('Login Successful');
                    expertSignupForm.style.display = 'none';
                    waitingForStudent.style.display = 'block';
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
                alert('Please check your details');
                expertName.value = '';
                expertPass.value = '';
            }
        }, 100);
        evt.preventDefault();
    });
}

//call expert button
const callExpert = document.querySelector('#callExpert');
callExpert.addEventListener('click', function(evt) {
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
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
