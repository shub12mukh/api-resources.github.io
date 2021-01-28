
var highResTime = performance.now();
var networkIAPI = window.navigator.connection || window.navigator.mozConnection;
networkIAPI.onchange = () => {
	alert('Went offline');
}
var orientation_ = window.screen;
orientation_.orientation.onchange = () => {
	console.log('orientation changed');
}
document.getElementById('highTimeRes').innerHTML = "Page loaded in " + highResTime + " miliseconds";
if(networkIAPI !== undefined){
	document.getElementById('networkApi').innerHTML = "You're in " + networkIAPI.effectiveType + " network";
}
if('orientation' in screen){
	document.getElementById('orientationState').innerHTML = "Currently you're in " + '<code>' + orientation_.orientation.type + '</code>';
}
function vibrateOnce(){
	if('vibrate' in navigator){
		navigator.vibrate(2000);
	}
}
function vibrateThrice(){
	if('vibrate' in navigator){
		navigator.vibrate([2000,2000,2000]);
	}
}
function vibrateEnd(){
	if('vibrate' in navigator){
		navigator.vibrate(0);
	}
}
function lockPortraitPrimary(){
	window.screen.orientation
	.lock("portrait-primary")
	.then(
		(sucess) => { callToSuccessFunction(sucess) },
		(failure) => { callToErrorFunction(failure) } 
	);
}
function callToErrorFunction(message){
	document.getElementById('error').innerHTML = message;
}
function callToSuccessFunction(message){
}
function convertToSpeech(){
	var text_ = document.getElementById("textFromInput").value
	if(text_ !== null){
		if(text_ === null || text_ === ''){
			alert("Enter text");
			return;
		}
		var speech = new SpeechSynthesisUtterance();
		speech.text = text_;
		speech.lang = 'en-US';
		speech.onend = function(){
			document.getElementById("textFromInput").value = ""; 
		}
		speechSynthesis.speak(speech);
	}
}
function shrinkNavBar(){
	document.getElementById("nav_bar").style.width = "0";
	document.getElementById("main-body").style.marginLeft = "0";
}
function openNavBar(){
	document.getElementById("nav_bar").style.width = "25%";
	document.getElementById("main-body").style.marginLeft = "25%";
}
function changeStyle(evt, idSelector){
	var allE = document.getElementsByName("non-active");
	var tabContent = document.getElementsByName("tab-content");
	for(var i=0;i<tabContent.length;i++){
		tabContent[i].style.display = "none";
	}
	for(var i=0;i<allE.length;i++){
		allE[i].className = "";
	}
	evt.currentTarget.className = "nav-active";
	document.getElementById(idSelector).style.display = "block";
}
function onLoaded(){
	document.getElementById("highResTimeAPINav").className = "nav-active";
	document.getElementById("highResTimeAPINav").click();
}
function detectO(){
	if('orientation' in screen){
		document.getElementById('orientationState').innerHTML = "Currently you're in " + '<code>' + orientation_.orientation.type + '</code>'
	}
}
function switchTab(evt, tabSelector){
	var tabContent = document.getElementsByName("inner-tab-content");
	for(var i=0;i<tabContent.length;i++){
		tabContent[i].style.display = "none";
	}
	document.getElementById(tabSelector).style.display = "block";
}
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
var recognizing;
let recognition = new window.SpeechRecognition();
recognition.onresult = (event) => {
	let interimTranscript = '';
	for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
		let transcript = event.results[i][0].transcript;
		if (event.results[i].isFinal) {
			reset();
			finalTranscript += transcript;
		} else {
			interimTranscript += transcript;
		}
	}
	document.getElementById("spoken").innerHTML = '<code>' + finalTranscript + '</code>';
}
function toggleSpeaking(){
	if(recognizing){
		recognition.stop();
		reset();
	} else {
		finalTranscript = '';
		recognition.start();
		recognizing = true;
		document.getElementById("startStopSpeakingBtn").innerHTML = "Stop";
		document.getElementById("spoken").innerHTML = "";
	}
}
function reset() {
  recognizing = false;
  document.getElementById("startStopSpeakingBtn").innerHTML = "Speak";
}
