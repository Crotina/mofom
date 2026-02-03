const main_btn = document.getElementById("controlBtn");
const ipt = document.getElementById("v8");
const iframe_ = document.getElementById("ifr");

function redirect (){
    console.log(main_btn + "and" + ipt.value);
 iframe_.src = ipt.value;
}