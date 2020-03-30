const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const jay=document.getElementById("btn1")
jay.addEventListener("click",(E)=>{
	E.preventDefault()
	console.log("coolpa")
	window.location.replace("info.html")
})