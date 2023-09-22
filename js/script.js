import element from '/js/element.js';
import * as alertBox from '/js/alert-box.js';
import * as xadrez from '/js/xadrez.js';

let showMove = document.getElementsByClassName('show-move');
            
for(let i = 0; i < showMove.length; i++)
{
    showMove[i].addEventListener('click', ()=>
    {
        alertBox.createAlertBox();

        let margin = new element('div', alertBox.alertBox);
        margin.setAttributes('class' , 'container-margin move-exemple')
        margin.setAttributes('id' , 'game-windown')

        let title_ = new element('h1', margin.element);
        title_.setText(showMove[i].getAttribute('show-move'));

        xadrez.exempleMap(margin.element , showMove[i].getAttribute('show-move'));

        let button_ = new element('button', margin.element);
        button_.setText('Sair');
        button_.setAttributes('class' , 'button-sample background-with-border-sample');
        button_.setEvent('click' , ()=>{
            alertBox.deleteAlertBox();
        });
    });
}

let referenciaDiv = document.getElementById('referencias');

let dropDown = document.getElementById('drop-down');

let referenciaExpand = () =>
{
    dropDown.style.transform = "rotate(180deg)";

    newLink('Icones Redes Sociais' , 'https://br.pinterest.com/pin/54043264267765909/');
    newLink('Icones Xadrez & Logo' , 'https://en.wikipedia.org/wiki/Chess_piece');
    newLink('Icone Seta para Baixo' , 'https://www.veryicon.com/icons/miscellaneous/monochrome-icon-2/drop-down-40.html');

    dropDown.addEventListener('click', referenciaCompress);

    dropDown.removeEventListener('click' , referenciaExpand);
}

dropDown.addEventListener('click', referenciaExpand);

let newLink = ( text , link ) =>
{
    let referenciaLink = new element('a' , referenciaDiv);
    referenciaLink.setText('- ' + text + '- ');
    referenciaLink.setAttributes( 'class' , 'underline' );
    referenciaLink.setAttributes( 'href' , link );
    referenciaLink.setAttributes( 'target', 'new');
}

let referenciaCompress = () =>
{
    referenciaDiv.innerHTML = '';

    dropDown.style.transform = "rotate(0deg)";

    dropDown.addEventListener('click', referenciaExpand);
}