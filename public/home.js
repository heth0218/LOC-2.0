(function($) {
  
    $('#search-button').on('click', function(e) {
      if($('#search-input-container').hasClass('hdn')) {
        e.preventDefault();
        $('#search-input-container').removeClass('hdn')
        return false;
      }
    });
    
    $('#hide-search-input-container').on('click', function(e) {
      e.preventDefault();
      $('#search-input-container').addClass('hdn')
      return false;
    });
    
  })(jQuery);

/*questions js*/
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});

const myFunction1=async()=> {
  var x = document.getElementById("phase1");
  var y=document.getElementById('jenish1').innerHTML;
  console.log(y)
  if(x.style.color=="black"){
  x.style.color = "blue";
  const resp=await fetch(`/like/${y}`);
  const json=await resp.json();
  console.log(json)
  }else{
    x.style.color = "black";
  }

}

function myFunction2() {
  var x = document.getElementById("phase2");
  if(x.style.color=="black"){
  x.style.color = "blue";
  }else{
    x.style.color = "black";
  }
}

function myFunction3() {
  var x = document.getElementById("phase3");
  if(x.style.color=="black"){
  x.style.color = "blue";
  }else{
    x.style.color = "black";
  }
}

function myFunction4() {
  var x = document.getElementById("phase4");
  if(x.style.color=="black"){
  x.style.color = "blue";
  }else{
    x.style.color = "black";
  }
}

function myFunction5() {
  var x = document.getElementById("phase5");
  if(x.style.color=="black"){
  x.style.color = "blue";
  }else{
    x.style.color = "black";
  }
}
function Display1(){
var x1 = document.getElementById("one").value;
document.getElementById("one1").innerText = x1;
}

function Display2(){
  var x1 = document.getElementById("two").value;
  document.getElementById("two2").innerText = x1;
  }

function Display3(){
  var x1 = document.getElementById("three").value;
  document.getElementById("three3").innerText = x1;
  }

function Display4(){
  var x1 = document.getElementById("four").value;
  document.getElementById("four4").innerText = x1;
  }

function Display5(){
  var x1 = document.getElementById("five").value;
  document.getElementById("five5").innerText = x1;
  }

