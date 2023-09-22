import element from './element.js';

export let alertBoxPosition = document.getElementById("alert-box-position");

export let isAlerting = false;
export let alertBox;

export let createAlertBox = ( ) =>
{
    alertBoxPosition.style.zIndex = '99';

    isAlerting = true;
    alertBox = document.createElement('div');

    alertBoxPosition.appendChild(alertBox);

    alertBox.setAttribute('id', 'alert-box');
    alertBox.setAttribute('class', 'shadow-box-sample background-with-border-sample');
}

export let deleteAlertBox = ( ) =>
{
    alertBoxPosition.removeChild( alertBox );
    isAlerting = false;

    alertBoxPosition.style.zIndex ='-1';
}
