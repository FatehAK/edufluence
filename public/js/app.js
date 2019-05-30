let landingPageDiv = document.querySelector('#landingPage');
let studentEntryDiv = document.querySelector('#studentEntry');
let expertSignupDiv = document.querySelector('#expertSignup');
let videoPageDiv = document.querySelector('#videoPage');

let studentName = document.querySelector('#studentName');
let studentPass = document.querySelector('#studentPass');
let expertName = document.querySelector('#expertName');
let expertPass = document.querySelector('#expertPass');
let enterAsStudent = document.querySelector('#enterAsStudent');
let requestExpert = document.querySelector('#requestExpert');
let requestExpertForm = document.querySelector('#requestExpertForm');
let waitingForExpert = document.querySelector('#waitingForExpert');
let waitingForExpertProgress = document.querySelector('#waitingForExpertProgress');
let expertSignupForm = document.querySelector('#expertSignupForm');
let expertSignupButton = document.querySelector('#expertSignupButton');
let waitingForStudent = document.querySelector('#waitingForStudent');
let expertListing = document.querySelector('#expertListing');
let callExpert = document.querySelector('#callExpert');
let enterAsExpert = document.querySelector('#enterAsExpert');
let studentRegister = document.querySelector('#studentRegister');
let toggleHelp = document.querySelector('#toggleHelp');
let helpInfo = document.querySelector('#helpInfo');
let toggleAbout = document.querySelector('#toggleAbout');
let aboutInfo = document.querySelector('#aboutInfo');
let toggleContact = document.querySelector('#toggleContact');
let contactInfo = document.querySelector('#contactInfo');
let toggleHome = document.querySelector('#toggleHome');

let usName = document.querySelector('#usName');
let usPass = document.querySelector('#usPass');
let usMail = document.querySelector('#usMail');
let usColl = document.querySelector('#usColl');
let usDept = document.querySelector('#usDept');

let ueName = document.querySelector('#ueName');
let uePass = document.querySelector('#uePass');
let ueMail = document.querySelector('#ueMail');
let ueColl = document.querySelector('#ueColl');
let ueSpl = document.querySelector('#ueSpl');

toggleHome.addEventListener('click', function() {
    landingPageDiv.style.display = 'block';
    helpInfo.style.display = 'none';
    aboutInfo.style.display = 'none';
    contactInfo.style.display = 'none';
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
});

toggleHelp.addEventListener('click', function() {
    landingPageDiv.style.display = 'none';
    helpInfo.style.display = 'block';
    aboutInfo.style.display = 'none';
    contactInfo.style.display = 'none';
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
});

toggleAbout.addEventListener('click', function() {
    landingPageDiv.style.display = 'none';
    aboutInfo.style.display = 'block';
    helpInfo.style.display = 'none';
    contactInfo.style.display = 'none';
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
});

toggleContact.addEventListener('click', function() {
    landingPageDiv.style.display = 'none';
    aboutInfo.style.display = 'none';
    helpInfo.style.display = 'none';
    contactInfo.style.display = 'block';
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
});

enterAsStudent.addEventListener('click', function(evt) {
    studentName.value = '';
    studentPass.value = '';
    landingPageDiv.style.display = 'none';
    helpInfo.style.display = 'none';
    studentEntryDiv.style.display = 'block';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
    myUserType = 'student';
    requestExpertForm.style.display = 'block';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    evt.preventDefault();
});

sRegister.addEventListener('click', function(evt) {
    usName.value = '';
    usPass.value = '';
    usColl.value = '';
    usMail.value = '';
    usDept.value = '';
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    studentRegister.style.display = 'block';
    evt.preventDefault();
});

ssRegister.addEventListener('click', function(evt) {
    studentName.value = '';
    studentPass.value = '';
    requestExpertForm.style.display = 'block';
    waitingForExpert.style.display = 'none';
    studentRegister.style.display = 'none';
    pushdata();
    evt.preventDefault();
});

function pushdata() {
    if ((usName.value === '') || (usPass.value === '')) {
        alert('Please fill the details');
        requestExpertForm.style.display = 'none';
        studentRegister.style.display = 'block';
    } else {
        localStorage.setItem(usName.value.toLowerCase(), usName.value.toLowerCase());
        localStorage.setItem(usPass.value.toLowerCase(), usPass.value.toLowerCase());
        alert('Registered Successfully');
    }
}

requestExpert.addEventListener('click', function(evt) {
    if (localStorage.getItem(studentName.value.toLowerCase()) && localStorage.getItem(studentPass.value.toLowerCase())) {
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
    } else {
        alert('Please check your details');
        studentName.value = '';
        studentPass.value = '';
    }
    evt.preventDefault();
});

enterAsExpert.addEventListener('click', function(evt) {
    expertName.value = '';
    expertPass.value = '';
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'block';
    videoPageDiv.style.display = 'none';
    myUserType = 'expert';
    expertSignupForm.style.display = 'block';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'none';
    evt.preventDefault();
});

eRegister.addEventListener('click', function(evt) {
    ueName.value = '';
    uePass.value = '';
    ueMail.value = '';
    ueColl.value = '';
    ueSpl.value = '';
    expertSignupForm.style.display = 'none';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'block';
    evt.preventDefault();
});

eeRegister.addEventListener('click', function(evt) {
    expertName.value = '';
    expertPass.value = '';
    expertSignupForm.style.display = 'block';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'none';
    pushedata();
    evt.preventDefault();
});

function pushedata() {
    if ((ueName.value === '') || (uePass.value === '')) {
        alert('Please fill the details');
        expertSignupForm.style.display = 'none';
        expertRegister.style.display = 'block';
    } else {
        localStorage.setItem(ueName.value.toLowerCase(), ueName.value.toLowerCase());
        localStorage.setItem(uePass.value.toLowerCase(), uePass.value.toLowerCase());
        alert('Registered Successfully');
    }
}

expertSignupButton.addEventListener('click', function(evt) {
    if (localStorage.getItem(expertName.value.toLowerCase()) && localStorage.getItem(expertPass.value.toLowerCase())) {
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
        console.log('Mr. ' + expertUserName + ' has joined.');
    } else {
        alert('Please check your details');
        expertName.value = '';
        expertPass.value = '';
    }
    evt.preventDefault();
});

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
    if (!rtcPeerConn) {
        startSignaling();
    }
    evt.preventDefault();
});
