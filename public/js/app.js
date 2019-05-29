let landingPageDiv = document.querySelector("#landingPage");
let studentEntryDiv = document.querySelector("#studentEntry");
let expertSignupDiv = document.querySelector("#expertSignup");
let videoPageDiv = document.querySelector("#videoPage");

let studentName = document.querySelector("#studentName");
let studentPass = document.querySelector("#studentPass");
let expertName = document.querySelector("#expertName");
let expertPass = document.querySelector("#expertPass");
let enterAsStudent = document.querySelector("#enterAsStudent");
let requestExpert = document.querySelector("#requestExpert");
let requestExpertForm = document.querySelector("#requestExpertForm");
let waitingForExpert = document.querySelector("#waitingForExpert");
let waitingForExpertProgress = document.querySelector("#waitingForExpertProgress");
let expertSignupForm = document.querySelector("#expertSignupForm");
let expertSignupButton = document.querySelector("#expertSignupButton");
let waitingForStudent = document.querySelector("#waitingForStudent");
let expertListing = document.querySelector("#expertListing");
let callExpert = document.querySelector("#callExpert");
let enterAsExpert = document.querySelector("#enterAsExpert");
let studentRegister = document.querySelector("#studentRegister");
let toggleHelp = document.querySelector("#toggleHelp");
let helpInfo = document.querySelector("#helpInfo");
let toggleAbout = document.querySelector("#toggleAbout");
let aboutInfo = document.querySelector("#aboutInfo");
let toggleContact = document.querySelector("#toggleContact");
let contactInfo = document.querySelector("#contactInfo");
let toggleHome = document.querySelector("#toggleHome");

let usName = document.querySelector("#usName");
let usPass = document.querySelector("#usPass");
let usMail = document.querySelector("#usMail");
let usColl = document.querySelector("#usColl");
let usDept = document.querySelector("#usDept");

let ueName = document.querySelector("#ueName");
let uePass = document.querySelector("#uePass");
let ueMail = document.querySelector("#ueMail");
let ueColl = document.querySelector("#ueColl");
let ueSpl = document.querySelector("#ueSpl");

let data = [];
let spass = [];
let edata = [];
let epass = [];

function homeToggle() {
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
}
toggleHome.addEventListener('click', homeToggle, false);

function helpToggle() {
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
}
toggleHelp.addEventListener('click', helpToggle, false);

function aboutToggle() {
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
}
toggleAbout.addEventListener('click', aboutToggle, false);

function contactToggle() {
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
}
toggleContact.addEventListener('click', contactToggle, false);

enterAsStudent.addEventListener('click', function(ev) {
    studentName.value = "";
    studentPass.value = "";
    landingPageDiv.style.display = 'none';
    helpInfo.style.display = 'none';
    studentEntryDiv.style.display = 'block';
    expertSignupDiv.style.display = 'none';
    videoPageDiv.style.display = 'none';
    myUserType = "student";
    requestExpertForm.style.display = 'block';
    waitingForExpert.style.display = 'none';
    expertListing.style.display = 'none';
    studentRegister.style.display = 'none';
    ev.preventDefault();
}, false);

sRegister.addEventListener('click', function(ev) {
    usName.value = "";
    usPass.value = "";
    usColl.value = "";
    usMail.value = "";
    usDept.value = "";
    requestExpertForm.style.display = 'none';
    waitingForExpert.style.display = 'none';
    studentRegister.style.display = 'block';
    ev.preventDefault();
}, false);

ssRegister.addEventListener('click', function(ev) {
    studentName.value = "";
    studentPass.value = "";
    requestExpertForm.style.display = 'block';
    waitingForExpert.style.display = 'none';
    studentRegister.style.display = 'none';
    pushdata();
    ev.preventDefault();
}, false);

function pushdata() {
    if ((usName.value == "") || (usPass.value == "")) {
        alert("Please fill the details");
        requestExpertForm.style.display = 'none';
        studentRegister.style.display = 'block';
    } else {
        data.push(usName.value.toLowerCase());
        spass.push(usPass.value.toLowerCase());
        alert("Registered Successfully");
    }
}
requestExpert.addEventListener('click', function(ev) {
    if ((data.includes(studentName.value.toLowerCase())) && (spass.includes(studentPass.value.toLowerCase()))) {
        alert("Login Successful");
        requestExpertForm.style.display = 'none';
        waitingForExpert.style.display = 'block';
        expertListing.style.display = 'none';
        studentUserName = studentName.value || 'no name';
        myName = studentUserName;
        io.emit('signal', { "user_type": "student", "user_name": studentUserName, "user_data": "no data, just a student", "command": "joinroom" });
        console.log("student " + studentUserName + " has joined.");
    } else {
        alert("Please check your details");
    }
    ev.preventDefault();
}, false);

enterAsExpert.addEventListener('click', function(ev) {
    expertName.value = "";
    expertPass.value = "";
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    expertSignupDiv.style.display = 'block';
    videoPageDiv.style.display = 'none';
    myUserType = "expert";
    expertSignupForm.style.display = 'block';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'none';
    ev.preventDefault();
}, false);

eRegister.addEventListener('click', function(ev) {
    ueName.value = "";
    uePass.value = "";
    ueMail.value = "";
    ueColl.value = "";
    ueSpl.value = "";
    expertSignupForm.style.display = 'none';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'block';
    ev.preventDefault();
}, false);

eeRegister.addEventListener('click', function(ev) {
    expertName.value = "";
    expertPass.value = "";
    expertSignupForm.style.display = 'block';
    waitingForStudent.style.display = 'none';
    expertRegister.style.display = 'none';
    pushedata();
    ev.preventDefault();
}, false);

function pushedata() {
    if ((ueName.value == "") || (uePass.value == "")) {
        alert("Please fill the details");
        expertSignupForm.style.display = 'none';
        expertRegister.style.display = 'block';
    }
    else {
        edata.push(ueName.value.toLowerCase());
        epass.push(uePass.value.toLowerCase());
        alert("Registered Successfully");
    }
}

expertSignupButton.addEventListener('click', function(ev) {
    if ((edata.includes(expertName.value.toLowerCase())) && (epass.includes(expertPass.value.toLowerCase()))) {
        alert("Login Successful");
        expertSignupForm.style.display = 'none';
        waitingForStudent.style.display = 'block';
        expertUserName = expertName.value || 'no name';
        myName = expertUserName;
        io.emit('signal', { "user_type": "expert", "user_name": expertUserName, "user_data": expertPass.value, "command": "joinroom" });
        console.log("Mr. " + expertUserName + " has joined.");
    } else { alert("Please check your details"); }
    ev.preventDefault();
}, false);

callExpert.addEventListener('click', function(ev) {
    landingPageDiv.style.display = 'none';
    studentEntryDiv.style.display = 'none';
    videoPageDiv.style.display = 'block';
    studentUserName = studentName.value || 'no name';
    io.emit('signal', { "user_type": "student", "user_name": studentUserName, "user_data": "calling expert", "command": "callexpert" });
    console.log("student " + studentUserName + " is calling.");
    if (!rtcPeerConn) startSignaling();
    ev.preventDefault();
}, false);
