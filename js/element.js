export default class element
{
    constructor( whichElement , toAppend )
    {
        this.element = document.createElement( whichElement );
        toAppend.appendChild(this.element)
    }
    removeThis()
    {
        this.element.parentNode.removeChild(this.element)
    }
    setAttributes( type , inside )
    {
        this.element.setAttribute( type , inside );
    }
    setEvent( type , inside )
    {
        this.element.addEventListener( type , inside );
    }
    setText( text )
    {
        this.element.innerHTML = text;
    }
}