"use strict";

function Machine( params ){
    this._enable = false;

    this.enable = function(){
        this._enable = true;
    };

    this.disable = function(){
        this._enable = false;
    }
}

function CoffeeMachine(power, capacity) {

  Machine.call( this );
  var pow = power;
  var waterAmount = 0;
  var timerID ;
  var WATER_HEAT_CAPACITY = 4200;
  var parentDisable = this.disable;

  this.getTimerID = function(){
    return  !!timerID;
  }

   function getTimeToBoil() {

    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.addWater = function( addQuantiti ) {
  this.setWaterAmount( addQuantiti + waterAmount );

  };

  this.getWaterAmount = function() {
    return waterAmount;
  };
  this.getPower = function(){
    return power;
  };

  function onReady() {
      alert( 'Кофе готов!' );

    };

  this.setOnReady = function( fun ){
        onReady = fun;
    };

  this.disable = function(){
    parentDisable.call(this);
    clearTimeout( timerID );
    timerID = false;
  };

  this.run = function() {
    if( this._enable ){
    timerID = setTimeout(function(){
     timerID = null; 
     onReady(); 
     }, getTimeToBoil());
    }
    console.log( 'CoffeMachine is turn off!' );
  };

}

function compair(){

var coffeeMachine = new CoffeeMachine(100000, 400);

coffeeMachine.addWater(200);
coffeeMachine.addWater(100);
 coffeeMachine.addWater(100); // Нельзя залить больше, чем 400

console.log( coffeeMachine.getTimerID() );
coffeeMachine.run();

coffeeMachine.enable();
coffeeMachine.run();

console.log( coffeeMachine.getTimerID() );

coffeeMachine.setOnReady(function() {

  
  console.log( 'Готов кофе: ' + coffeeMachine.getTimerID()  + 'мл' ); // Кофе готов: 150 мл

});

coffeeMachine.disable();

console.log( coffeeMachine.getTimerID() );
};



$( document ).ready( function(){
        compair();
       
    
})
         /////   Bird color   //////
/*
function birdColor() {                       ///  change color to bird in table
    var table = document.querySelectorAll('.birds');
    for (var i = 0; i < table.length; i++) {
        table[i].addEventListener('click', changeImg);
    }
}     /////   1
function checkNesting(value) {                ///  change color to bird in table
    while (value.tagName != 'TABLE' && value.tagName != 'TH') {
        if (value.tagName == 'TR') {
            return value;
        }
        value = value.parentNode;
    }
    return
}  /////    2
function changeImg( event ) {                         ///  change color to bird in table

    var tr = checkNesting( event.target );

    if(!tr) return;
    var td = tr.getElementsByTagName('td');
    var tbody = tr.parentElement.querySelectorAll('.table__td--bird');
    for( var i = 0 ; i < tbody.length ; i++){
        tbody[i].style.backgroundPositionY = -70 + 'px';
    }
    td[1].style.backgroundPositionY = 24 + 'px';

} ///////   3

           /////     border Color   //////

function tableBorderColor() {                        /// change the color
                                                      // of the table-border when you hover
    var tableBlock = document.querySelectorAll('.tableBlock__wrapper-cell');
    for(var i = 0 ; i < tableBlock.length ; i++){
        tableBlock[ i ].addEventListener('mouseover', changeColor);
        tableBlock[ i ].addEventListener('mouseout', beforChangeColor);
    }
}  ///   1
function beforChangeColor() {        // color table after MOUSEOUT !!
    this.style.borderColor = '';
}  ////     2
function changeColor() {             ///  color table when the mouse!!!
    var target = this;
    //var value = this.previousElementSibling;

    target.style.borderColor = '#e0953a' ;
}/////   3

             //////   Slider   /////

function slider() {              ///  slider addEventListener
    var sliderSection = document.querySelectorAll('.slider-section__cell--blue');
    for( var i = 0 ; i < sliderSection.length ; i++){
        sliderSection[i].addEventListener('click', moveImg);
    }
}
function moveImg( event ) {                 /// slider move img
    var target = event.target;
    if(target.nodeName != 'SPAN' && target.nodeName != 'LI')
        return;

    var parentCont = target.parentElement;
    while(!parentCont.classList.contains("slider-img")){
        parentCont = parentCont.parentElement;
    }

    //var wind = parentCont.querySelector('.slider-img__wind');
    var arrPic = parentCont.querySelectorAll('.slider-img__contImg--slideList');
    var arrNav = parentCont.querySelectorAll('.slider-img__contImg-list-item');
    var pos = 0;
    var arrLength = arrPic.length;

    if( target.nodeName === 'LI' ){
        removeClass( arrNav, 'slider-img__contImg-list-here' );

        target.classList.add( 'slider-img__contImg-list-here' );
        pos = searchElementWithClass( arrNav, 'slider-img__contImg-list-here' );

        removeClass( arrNav, 'slider-img__contImg-list-here' );
        removeClass( arrPic, "slider-img__block" );

        arrNav[ pos ].classList.add( 'slider-img__contImg-list-here' );
        arrPic[ pos ].classList.add( "slider-img__block" );

    }else{

        pos = searchElementWithClass( arrPic, "slider-img__block" );

        removeClass( arrNav, 'slider-img__contImg-list-here' );
        removeClass( arrPic, "slider-img__block" );

        var newPosition = changePositionSlider( target, pos, arrLength );

        arrNav[ newPosition ].classList.add( 'slider-img__contImg-list-here' );
        arrPic[ newPosition ].classList.add( "slider-img__block" );

    }
}
function searchElementWithClass( arr, className) {

    var positionPush = 0;

    arr.forEach( function ( elem, index ) {
       if( elem.classList.contains( className ) ) {
           positionPush = index;
       }
    });

    return positionPush;
}
function removeClass( arr, className ) {

    arr.forEach( function ( elem, index, arr) {
        if( elem.classList.contains( className ) ){
            elem.classList.remove( className );
        }
    })
}
function changePositionSlider( targetElement, currentPosition, arrLength ) {

    var pos = currentPosition;

    if( targetElement.dataset.about === 'next' ) {
        ++pos;
        if (pos > arrLength - 1)
            pos = 0;
    }else{
        --pos;
        if( pos < 0 )
            pos = arrLength - 1;
    }

    return pos;
}

  ///////     TIMER     ///////
function timerStock(){  /// Timer

    var date = new Date();
    var endTime = new Date(date.getFullYear(), date.getMonth(), 25);
    var timer = endTime - date ;

    if( date > endTime){
       var timeBlock = document.body.querySelector('.stockTime__time');
       timeBlock.classList.add('stockTime__time--out');
       timeBlock.innerHTML = "FULL TIME";
    }

    ////   DAY

     var day = parseInt( timer/(1000 * 3600 * 24) );
    if( day < 10 ){
        day = '0' + day ;
    }
    day = day.toString();

    ///  HOUR
    var hour = parseInt( timer /( 1000 * 3600)) % 24;

    if( hour < 10 ){
        hour = '0' + hour;
    }

    hour = hour.toString();

    /// MINUTES

    var min = parseInt( timer /( 1000 * 60)) % 60;

    if( min < 10 ){
        min = '0' + min;
    }

    min = min.toString();

    ////   SECOND

    var sec = parseInt( timer /( 1000)) % 60;

    if( sec < 10 ){
        sec = '0' + sec;
    }

    sec = sec.toString();


    document.getElementById('dayTenth').innerHTML = day[0];
    document.getElementById('daySingle').innerHTML = day[1];

    document.getElementById('hourTenth').innerHTML = hour[0];
    document.getElementById('hourSingle').innerHTML = hour[1];

    document.getElementById('minTenth').innerHTML = min[0];
    document.getElementById('minSingle').innerHTML = min[1];

    document.getElementById('secTenth').innerHTML = sec[0];
    document.getElementById('secSingle').innerHTML = sec[1];

    setTimeout(timerStock, 1000)
}


$(document).ready(function () {
    birdColor();
    tableBorderColor();
    slider();
    timerStock();

});

*/

