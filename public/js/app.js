const landingPageDiv = document.querySelector('#landingPage');
const studentEntryDiv = document.querySelector('#studentEntry');
const expertSignupDiv = document.querySelector('#expertSignup');
const videoPageDiv = document.querySelector('#videoPage');

const studentName = document.querySelector('#studentName');
const studentPass = document.querySelector('#studentPass');
const expertName = document.querySelector('#expertName');
const expertPass = document.querySelector('#expertPass');
const enterAsStudent = document.querySelector('#enterAsStudent');
const requestExpert = document.querySelector('#requestExpert');
const requestExpertForm = document.querySelector('#requestExpertForm');
const waitingForExpert = document.querySelector('#waitingForExpert');
const waitingForExpertProgress = document.querySelector('#waitingForExpertProgress');
const expertSignupForm = document.querySelector('#expertSignupForm');
const expertSignupButton = document.querySelector('#expertSignupButton');
const waitingForStudent = document.querySelector('#waitingForStudent');
const expertListing = document.querySelector('#expertListing');
const callExpert = document.querySelector('#callExpert');
const enterAsExpert = document.querySelector('#enterAsExpert');
const studentRegister = document.querySelector('#studentRegister');
const toggleHelp = document.querySelector('#toggleHelp');
const helpInfo = document.querySelector('#helpInfo');
const toggleAbout = document.querySelector('#toggleAbout');
const aboutInfo = document.querySelector('#aboutInfo');
const toggleContact = document.querySelector('#toggleContact');
const contactInfo = document.querySelector('#contactInfo');
const toggleHome = document.querySelector('#toggleHome');

const usName = document.querySelector('#usName');
const usPass = document.querySelector('#usPass');
const usMail = document.querySelector('#usMail');
const usColl = document.querySelector('#usColl');
const usDept = document.querySelector('#usDept');

const ueName = document.querySelector('#ueName');
const uePass = document.querySelector('#uePass');
const ueMail = document.querySelector('#ueMail');
const ueColl = document.querySelector('#ueColl');
const ueSpl = document.querySelector('#ueSpl');

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
        if (!localStorage.getItem(usName.value.toLowerCase()) && !localStorage.getItem(usPass.value.toLowerCase())) {
            localStorage.setItem(usName.value.toLowerCase(), usName.value.toLowerCase());
            localStorage.setItem(usPass.value.toLowerCase(), usPass.value.toLowerCase());
            alert('Registered Successfully');
        } else {
            alert('Username not available try a different one?');
        }
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
        if (!localStorage.getItem(ueName.value.toLowerCase()) && !localStorage.getItem(uePass.value.toLowerCase())) {
            localStorage.setItem(ueName.value.toLowerCase(), ueName.value.toLowerCase());
            localStorage.setItem(uePass.value.toLowerCase(), uePass.value.toLowerCase());
            alert('Registered Successfully');
        } else {
            alert('Username not available try a different one?');
        }
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
        console.log('expert ' + expertUserName + ' has joined.');
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
    evt.preventDefault();
});
