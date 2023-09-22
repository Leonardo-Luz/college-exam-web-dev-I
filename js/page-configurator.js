import element from './element.js';

export let createHeader = ( logoDirectory , indexDirectory , jogarDirectory , sobreMimDirectory ) =>
{
    let header = document.querySelector('header');

    let headerDiv = new element( 'div' , header );

    let headerList = new element( 'ul' , headerDiv.element );
    headerList.setAttributes( 'id' , 'nav-bar' );
    headerList.setAttributes( 'class' , 'background-with-border-sample shadow-box-sample');
    
    headerList.element.innerHTML = '';

    headerList.element.innerHTML = 
    `
        <li>
        <a href="`+ indexDirectory +`"><img src="`+ logoDirectory +`" alt="logo"></a>
        </li>
    
        <li>
            <a href="`+ jogarDirectory +`">JOGAR!</a>
        </li>
    
        <li>
            <a href="`+ sobreMimDirectory +`">Sobre mim</a>
        </li>
    `;    
}

export let createFooter = ( logoDirectory , indexDirectory , instagramDirectory , facebookDirectory , twitterDirectory) =>
{
    let footer = document.querySelector('footer');
    
    footer.innerHTML = '';

    footer.innerHTML = 
    `
        <div class="inFooter background-with-border-sample shadow-box-sample">
            <a href="`+ indexDirectory +`"><img src="`+ logoDirectory +`" alt="logo do site"></a>
    
            <div class="social-media">
                    <a href="https://www.instagram.com" target="new"><img src="`+ instagramDirectory +`" alt="logo instagram"></a>
                    <a href="https://www.facebook.com" target="new"><img src="`+ facebookDirectory +`" alt="logo facebook"></a>
                    <a href="https://www.twitter.com" target="new"><img src="`+ twitterDirectory +`" alt="logo twitter"></a>
            </div>
    
            <p class="copyright">CopyRight &copy; 2023 Leonardo Luz Fachel</p>
        </div>
    `;    
}









