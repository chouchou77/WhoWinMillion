var sel = document.querySelector("select")
var body = document.querySelector("body")
var sg = document.querySelector("#startGame")
var game = document.querySelector("#game")
var exit = document.querySelector("#exit")
var answer = document.querySelectorAll(".answer")
var question = document.querySelector("#question")
var time = document.querySelector("#time")
var help = document.querySelectorAll(".help")
var phone = document.querySelector(".phone")
var Public = document.querySelector(".public")
var tow = document.querySelector(".tow")
if(window.innerWidth <= 500 || window.innerHeight > window.innerWidth){
  body.style.display = "none"
  alert("please rotate your phone and refresh")
}
else {
  body.style.display = "block"
}
var levels = [0,100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000]
let lev = 0;
let ph = 0
let pu = 0
let to = 0
function ex(){
  game.style.display = "none";
  if(sel.value === "en"){
    body.style.backgroundImage = "url('../images/backin.jpeg')";
  }else{
    body.style.backgroundImage = "url('../images/backar.jpeg')";
  }
  sg.style.display = "block"
  sel.style.display = "block"
  localStorage.clear()
  lev = 0
  ph = 0
  pu = 0
  to = 0
  for(let z=0;z<help.length;z++){
    help[z].style.pointerEvent= "auto"
    help[z].style.backgroundColor= "#0565c9"
    help[z].style.border= "5px solid #1206b4"
  }
}
function main(){
  if(sel.value === "en"){
    body.dir = "ltr"
    body.style.backgroundImage = "url('../images/backin.jpeg')";
    sg.innerText = "START GAME"
    sg.onclick = function jk() {
      body.style.backgroundImage = "url('../images/frontin.jpeg')";
      sg.style.display = "none"
      sel.style.display = "none"
      game.style.display = "block"
      exit.innerText = "exit"
      let count = 50;
      var cou = setInterval(()=>{
        time.innerText = count;
        count--;
        exit.onclick = ()=>{
          ex();
          clearInterval(cou)
        }
        if(count<0){
          alert("time out");
          ex();
          clearInterval(cou)
        }
      },1000)
      let data = new XMLHttpRequest;
      data.open("GET","js/QuestionEn.json")
      data.onload = function jk() {
        var c = Math.floor(Math.random()*100);
        let da = JSON.parse(data.responseText)[c]
        question.innerText = da.question
        for(j=0,i=0;i<answer.length,j<da.answers.length;j++,i++){
            answer[i].innerText = da.answers[j]
        }
        phone.onclick = () => {
          if(ph === 0){
            alert(`your friend tell you:${da.correct}`)
            phone.style.pointerEvent= "none"
            phone.style.backgroundColor= "#696969"
            phone.style.border= "5px solid #434242"
            ph++
          }else{
            phone.onclick = null
          }
        }
        Public.onclick = () => {
          if(pu === 0){
            alert(`the public vote for:${da.correct}`)
            Public.style.pointerEvent= "none"
            Public.style.backgroundColor= "#696969"
            Public.style.border= "5px solid #434242"
            pu++
          }else{
            phone.onclick = null
          }
        }
        tow.onclick = () => {
          if(to === 0){
            let co = da.answers[0]
            if(da.answers[0] === da.correct){
              co = da.answers[1]
            }
            alert(`you have 2 choices:"${da.correct}" and "${co}"`)
            tow.style.pointerEvent= "none"
            tow.style.backgroundColor= "#696969"
            tow.style.border= "5px solid #434242"
            to++
          }else{
            phone.onclick = null
          }
        }
        for(let i=0;i<answer.length;i++){
          answer[i].onclick = () => {
            if(answer[i].innerText === da.correct){
              answer[i].style.backgroundColor = "green"
              setTimeout(function(){
              lev++
              alert(`you got ${levels[lev]}$`)
              jk()
              count = 50
              for(let i=0;i<answer.length;i++){
                answer[i].style.backgroundColor = "#0565c9"
              }
              if(lev === 15){
                alert(`you got ${levels[lev]}$`)
                ex()
                clearInterval(cou)
              }},100)
            }
            else{
              answer[i].style.backgroundColor = "red"
              setTimeout(function(){
              alert("OOOPS, you lose")
              alert(`you win ${levels[lev]}$`)
              answer[i].style.backgroundColor = "#0565c9"
              ex()
              clearInterval(cou)},100)
            } 
          }
        }
      }
      data.send()
    }
  }
  /*arabic*/
  else if(sel.value === "ar"){
    body.dir = "rtl"
    body.style.backgroundImage = "url('../images/backar.jpeg')";
    sg.innerText = "إبدأ اللعبة"
    sg.style.fontSize = "1.1rem"
    sg.onclick = function jk() {
      body.style.backgroundImage = "url('../images/frontar.jpeg')";
      sg.style.display = "none"
      sel.style.display = "none"
      game.style.display = "block"
      exit.innerText = "إنسحب"
      let count = 50;
      var cou = setInterval(()=>{
        time.innerText = count;
        count--;
        exit.onclick = () => {
          ex();
          clearInterval(cou)
        }
        if(count<0){
          ex()
          alert("إنتهى الوقت")
          clearInterval(cou)
        }
      },1000)
      let data = new XMLHttpRequest;
      data.open("GET","js/QuestionsAr.json")
      data.onload = () => {
        let c = Math.floor(Math.random()*100);
        let da = JSON.parse(data.responseText)[c]
        question.innerText = da.question
        for(j=0,i=0;i<answer.length,j<da.answers.length;j++,i++){
            answer[i].innerText = da.answers[j]
        }
        phone.onclick = () => {
          if(ph === 0){
            alert(`قال صديقك:${da.correct}`)
            phone.style.pointerEvent= "none"
            phone.style.backgroundColor= "#696969"
            phone.style.border= "5px solid #434242"
            ph++
          }else{
            phone.onclick = null
          }
        }
        Public.onclick = () => {
          if(pu === 0){
            alert(`الجمهور صوت على:${da.correct}`)
            Public.style.pointerEvent= "none"
            Public.style.backgroundColor= "#696969"
            Public.style.border= "5px solid #434242"
            pu++
          }else{
            phone.onclick = null
          }
        }
        tow.onclick = () => {
          if(to === 0){
            let co = da.answers[0]
            if(da.answers[0] === da.correct){
              co = da.answers[1]
            }
            alert(`لديك خيارين:"${da.correct}" و "${co}"`)
            tow.style.pointerEvent= "none"
            tow.style.backgroundColor= "#696969"
            tow.style.border= "5px solid #434242"
            to++
          }else{
            phone.onclick = null
          }
        }
        for(let i=0;i<answer.length;i++){
          answer[i].onclick = () => {
            if(answer[i].innerText === da.correct){
              answer[i].style.backgroundColor = "green"
              setTimeout(function(){
              lev++
              alert(`تحصلت على: ${levels[lev]}$`)
              jk()
              clearInterval(cou)
              for(let i=0;i<answer.length;i++){
                answer[i].style.backgroundColor = "#0565c9"
              }
              if(lev === 15){
                alert(`لقد ربحت: ${levels[lev]}$`)
                location.reload()
              }},100)
            }
            else{
              answer[i].style.backgroundColor = "red"
              setTimeout(function(){
              alert("مع الأسف، لقد خسرت")
              alert(`لقد حصلت على: ${levels[lev]}$`)
              answer[i].style.backgroundColor = "#0565c9"
              ex()
              clearInterval(cou)},100)
            } 
          }
        }
      }
      data.send()
    }
  }
  else {
    console.log("please don't touch the code")
  }
}
sel.addEventListener("change",() => main())
main()