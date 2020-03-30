
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


const jay=document.getElementById('btn1');

    jay.addEventListener('click',async(e)=>{
        e.preventDefault;
		console.log('ccooollppaa');
		const name=document.getElementById('name').value
const password=document.getElementById('password').value
const email=document.getElementById('email').value
	const data={name,password,email}
	const option={
		method:"POST",
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(data)
	};
	console.log(data)
	const resp=await fetch('/data',option);
	const json=await resp.json();
	console.log(json)
	localStorage.setItem("user",JSON.stringify(json))
        window.location.replace('info.html')
    })


const hello2=async()=>{
	const password=document.getElementById('password1').value
	const email=document.getElementById('email1').value
	const data={
		password,email
	}
	const option={
		method:"POST",
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(data)
	};
	console.log(data)
	const resp=await fetch('/sign',option);
	const json=await resp.json();
	console.log(json)

}
