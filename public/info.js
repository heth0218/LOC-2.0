
const hello=async ()=>{
    const fname=document.getElementById('fname').value;
    const lname=document.getElementById('lname').value;
    const age=document.getElementById('age').value;
    const gender=document.getElementById('gender').value;
    const college=document.getElementById('college').value;
    const phone=document.getElementById('phone').value;
    const field=document.getElementById('field').value;
    const year=document.getElementById('year').value;
    const item=localStorage.getItem('user');
    const data={fname,lname,age,gender,college,phone,field,year,item};
    const option={
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    };
    console.log(data);
    const resp=await fetch('/register',option);
    const json=await resp.json();
    console.log(json);
    };
    
    const hello2=async ()=>{
      const fname=document.getElementById('fname2').value;
      const lname=document.getElementById('lname2').value;
      const age=document.getElementById('age2').value;
      const gender=document.getElementById('gender2').value;
      const college=document.getElementById('college2').value;
      const phone=document.getElementById('phone2').value;
      const field=document.getElementById('field2').value;
      const item=localStorage.getItem('user');
      const year="-1";
      const data={year,fname,lname,age,gender,college,phone,field,year,item};
      const option={
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      };
      console.log(data);
      const resp=await fetch('/register2',option);
      const json=await resp.json();
      console.log(json);
      };