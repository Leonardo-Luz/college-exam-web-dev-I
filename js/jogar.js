import { createAlertBox , deleteAlertBox } from './alert-box.js';
import * as xadrez from './xadrez.js';
import element from './element.js';


/*
    cronometro usando setInterval()
*/

let gameWindown = document.getElementById('game-windown');
let timer;
let time;
let minute;
let timerOn = false;
let handler;

let setMenu = () =>
{
    clearInterval(handler);
    time = 0;
    minute = 0;
    timerOn = false;
    timer = undefined;

    gameWindown.innerHTML = '';

    let start = new element('button' , gameWindown);
    let options = new element('button' , gameWindown);
    let back = new element('button' , gameWindown);

    back.setAttributes( 'class' , 'button-sample');
    start.setAttributes( 'class' , 'button-sample');
    options.setAttributes( 'class' , 'button-sample');

    back.setText(' <- Voltar');
    start.setText('Iniciar');
    options.setText('Opções');

    back.setEvent('click' , function(){
        window.location.href = '../index.html';
    });

    start.setEvent( 'click' , startGame );



    options.setEvent('click' , );
}

let startTimer = () => {
    time++;

    if(time%60 == 0 && time != 0)
    {
        time = 0;
        minute ++;
    }

    if(time < 10)
        if(minute < 10)
            timer.element.innerHTML = '0' + minute + ' : 0' +  time;
        else
            timer.element.innerHTML = minute + ' : 0' +  time;
    else
        if(minute < 10)
            timer.element.innerHTML = '0' + minute + ' : ' +  time;
        else
            timer.element.innerHTML = minute + ' : ' +  time;
}

let startGame = () =>
{
    gameWindown.innerHTML = '';
    
    gameWindown.setAttribute('class' , 'move-exemple');

    let header = new element('div', gameWindown);
    header.setAttributes('class' , 'container-in-row')

    let backToMenu = new element('button' , header.element);
    backToMenu.setText('Menu');
    backToMenu.setAttributes('class' , 'no-hover-button-sample');
    backToMenu.setEvent('click' , setMenu);

    timer = new element('div' , header.element);
    timer.setAttributes('class' , 'cronometro');
    timer.element.innerHTML = '0' + minute + ' : 0' +  time;
    timerOn = true;

    handler = setInterval( startTimer , 1000 );

    xadrez.createMap(0);
}


setMenu();