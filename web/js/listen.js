//Events Listeners
var tropi = document.querySelector("#tropi");
var tropiMas = tropi.querySelector(".botonMas");
var tropiMenos = tropi.querySelector(".botonMenos");
var tropiDes = tropi.querySelector(".des");
var tropiImg = tropi.querySelector(".img");
tropiMas.addEventListener("click", function () {
    verMas(tropi, tropiMas, tropiMenos, tropiDes, tropiImg);
}, false);
tropiMenos.addEventListener("click", function () {
    verMenos(tropi, tropiMas, tropiMenos, tropiDes);
}, false);

var voz = document.querySelector("#voz");
var vozMas = voz.querySelector(".botonMas");
var vozMenos = voz.querySelector(".botonMenos");
var vozDes = voz.querySelector(".des");
var vozImg = voz.querySelector(".img");
vozMas.addEventListener("click", function () {
    verMas(voz, vozMas, vozMenos, vozDes, vozImg);
}, false);
vozMenos.addEventListener("click", function () {
    verMenos(voz, vozMas, vozMenos, vozDes);
}, false);

var hora = document.querySelector("#hora");
var horaMas = hora.querySelector(".botonMas");
var horaMenos = hora.querySelector(".botonMenos");
var horaDes = hora.querySelector(".des");
var horaImg = hora.querySelector(".img");
horaMas.addEventListener("click", function () {
    verMas(hora, horaMas, horaMenos, horaDes, horaImg);
}, false);
horaMenos.addEventListener("click", function () {
    verMenos(hora, horaMas, horaMenos, horaDes);
}, false);

var entre = document.querySelector("#entre");
var entreMas = entre.querySelector(".botonMas");
var entreMenos = entre.querySelector(".botonMenos");
var entreDes = entre.querySelector(".des");
var entreImg = entre.querySelector(".img");
entreMas.addEventListener("click", function () {
    verMas(entre, entreMas, entreMenos, entreDes, entreImg);
}, false);
entreMenos.addEventListener("click", function () {
    verMenos(entre, entreMas, entreMenos, entreDes);
}, false);

var tribu = document.querySelector("#tribu");
var tribuMas = tribu.querySelector(".botonMas");
var tribuMenos = tribu.querySelector(".botonMenos");
var tribuDes = tribu.querySelector(".des");
var tribuImg = tribu.querySelector(".img");
tribuMas.addEventListener("click", function () {
    verMas(tribu, tribuMas, tribuMenos, tribuDes, tribuImg);
}, false);
tribuMenos.addEventListener("click", function () {
    verMenos(tribu, tribuMas, tribuMenos, tribuDes);
}, false);


var vene = document.querySelector("#vene");
var veneMas = vene.querySelector(".botonMas");
var veneMenos = vene.querySelector(".botonMenos");
var veneDes = vene.querySelector(".des");
var veneImg = vene.querySelector(".img");
veneMas.addEventListener("click", function () {
    verMas(vene, veneMas, veneMenos, veneDes, veneImg);
}, false);
veneMenos.addEventListener("click", function () {
    verMenos(vene, veneMas, veneMenos, veneDes);
}, false);