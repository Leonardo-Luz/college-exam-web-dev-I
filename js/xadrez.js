import element from './element.js';

export let pieces = {
    pawn: [],
    queen: [],
    king: [],
    rook: [],
    bishop: [],
    knight: []
}

let blackPlayer = false;
let moving = false;
let moveTiles = [];
let pawnTiles = [];

let inMap = 0;

let mainMap = [[],[],[],[],[],[],[],[]]

mainMap[0] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[1] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[2] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[3] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[4] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[5] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[6] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[7] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[8] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[9] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[10] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[11] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[12] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[13] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[14] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
mainMap[15] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

let maps = [[],[]]

maps[0][0] = ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'];
maps[0][1] = ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
maps[0][2] = ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'];
maps[0][3] = ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
maps[0][4] = ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'];
maps[0][5] = ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
maps[0][6] = ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'];
maps[0][7] = ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];

maps[1][0] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
maps[1][1] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'];
maps[1][2] = [ null , null , null , null , null , null , null , null ];
maps[1][3] = [ null , null , null , null , null , null , null , null ];
maps[1][4] = [ null , null , null , null , null , null , null , null ];
maps[1][5] = [ null , null , null , null , null , null , null , null ];
maps[1][6] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'];
maps[1][7] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

let windown = document.getElementById('game-windown');

export class pieces_ extends element
{
    constructor( toAppend, whichPiece, vy , vx )
    {
        super( 'img' , toAppend );
        this.piece = whichPiece;
        this.side = '';
        this.firstMove = true;
        this.y = vy;
        this.x = vx;
        this.alive = true;
        this.element.addEventListener('click', this.startMove );

        this.setAttributes('x', this.x);
        this.setAttributes('y', this.y);

        if(this.piece == 'pawn')
            this.movespeed = 2;
        else
            this.movespeed = 7;
    }
    whichTeam( index )
    {
        if(index < 4)
        {
            this.element.setAttribute('class', 'piece white-');
            this.element.setAttribute('src', '../images/' + this.piece + 'W.png');
            this.side = 'white';
        }
        else
        {
            this.element.setAttribute('class', 'piece black-');
            this.element.setAttribute('src', '../images/' + this.piece + 'B.png');
            this.side = 'black';
        }
    }
    startMove = () =>
    {
        if(!moving && this.side == 'white' && !blackPlayer)
        {
            moving = true;
            this.setMove();
        }
        else if(!moving && this.side == 'black' && blackPlayer)
        {
            moving = true;
            this.setMove();
        }
        else if(moving)
        {
            for(let i = 0; i < moveTiles.length; i++)
            {
                if(moveTiles[i].element.getAttribute('was') == 'white')
                {
                    moveTiles[i].element.setAttribute('class', 'xadrez-tile white');
                    moveTiles[i].element.removeEventListener('click', this.Moving );
                }
                else if(moveTiles[i].element.getAttribute('was') == 'black')
                {
                    moveTiles[i].element.setAttribute('class', 'xadrez-tile black');  
                    moveTiles[i].element.removeEventListener('click', this.Moving );
                }
            }

            for(let i = 0; i < pawnTiles.length; i++)
            {
                if(pawnTiles[i].element.getAttribute('was') == 'white')
                {
                    pawnTiles[i].element.setAttribute('class', 'xadrez-tile white');
                    pawnTiles[i].element.firstChild.removeEventListener('click', this.Moving );
                }
                else if(pawnTiles[i].element.getAttribute('was') == 'black')
                {
                    pawnTiles[i].element.setAttribute('class', 'xadrez-tile black');  
                    pawnTiles[i].element.firstChild.removeEventListener('click', this.Moving );
                }
            }

            moveTiles = [];
            pawnTiles = [];
            moving = false;
        }
    }

    setMove()
    {

        let temp = this.y;

        if(moving)
        {
            for(let i = 0; i < 8; i++)
            for(let j = 0; j < 8; j++)
            {
                if(
                    this.piece == 'pawn' &&
                    this.side == 'white')
                {
                    this.whitePawnMove( i , j );
                    this.pawnAtack();
                }
                else if(
                    this.piece == 'pawn' &&
                    this.side == 'black')
                {
                    this.blackPawnMove( i , j );
                    this.pawnAtack();
                }
                else if( this.piece == 'bishop' )                                   
                {
                    this.bishopMove( i , j , temp );
                    if(i >= this.y && j == 7)
                    {
                        temp ++;
                    }
                    else if(j == 7) temp --;
                }
                else if( this.piece == 'rook' )                                  
                {
                    this.rookMove( i , j );
                }
                else if( this.piece == 'knight')
                {
                    this.knightMove( i , j );
                }
                else if( this.piece == 'queen')
                {
                    this.queenMove( i , j , temp );
                    if(i >= this.y && j == 7)
                    {
                        temp ++;
                    }
                    else if(j == 7) temp --;
                }
                else if( this.piece == 'king')
                {
                    this.kingMove( i , j );
                }
                else
                {
                    console.log("Erro!");
                    this.startMove();
                }
            }
        }

        if(moveTiles.length == 0 && pawnTiles.length == 0)
        {
            this.startMove();
        }
    }

    whitePawnMove( i , j )
    {
        if
            (
                i <= this.y + this.movespeed    &&      i >= this.y && 
                j <= this.x                     &&      j >= this.x &&
                !(j == this.x                   &&      i == this.y)
            )
        {
            if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
            {
                moveTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.addEventListener( 'click', this.Moving );
            }
        }
    }

    blackPawnMove( i , j )
    {
        if
        (
            i <= this.y     &&      i >= this.y - this.movespeed && 
            j <= this.x     &&      j >= this.x &&
            !(j == this.x   &&      i == this.y)
        )
        {
            if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
            {
                moveTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.addEventListener( 'click', this.Moving );
            }
        }
    }

    bishopMove( i , j , temp )
    {
        if
        (
            ( j == this.x + temp || j == this.x - temp ) &&
            !(j == this.x   &&      i == this.y)
        )
        {
            if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
            {
                moveTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.addEventListener( 'click', this.Moving );    
            }
            else if(mainMap[i][j].element.firstChild.getAttribute('class') != 'piece ' + this.side + '-')
            {
                pawnTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );    
            }
        }
    }

    rookMove( i , j )
    {
        if
        (j == this.x &&
        (i <= this.y + this.movespeed &&
        i >= this.y - this.movespeed) ||
        (i == this.y &&
        (j <= this.x + this.movespeed &&
        j >= this.x - this.movespeed)
        ))
        {
            if(!(i == this.y && j == this.x))
            {
                if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
                {
                    moveTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.addEventListener( 'click', this.Moving );    
                }
                else if(mainMap[i][j].element.firstChild.getAttribute('class') != 'piece ' + this.side + '-')
                {
                    pawnTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );    
                }
            }    
        }
    }

    kingMove( i , j)
    {
        if
        (
            j >= this.x - 1 &&
            j <= this.x + 1 &&
            i >= this.y - 1 &&
            i <= this.y + 1 &&
            !(j == this.x   &&      i == this.y)
        )
        {
            if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
            {
                moveTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.addEventListener( 'click', this.Moving );    
            }
            else if(mainMap[i][j].element.firstChild.getAttribute('class') != 'piece ' + this.side + '-')
            {
                pawnTiles.push(mainMap[i][j]);
                mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );    
            }
        }

    }

    queenMove( i , j , temp )
    {
        if
        (j == this.x &&
        (i <= this.y + this.movespeed &&
        i >= this.y - this.movespeed) ||
        (i == this.y &&
        (j <= this.x + this.movespeed &&
        j >= this.x - this.movespeed) ||
        ( j == this.x + temp || j == this.x - temp )
        ))
        {
            if(!(i == this.y && j == this.x))
            {
                if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
                {
                    moveTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.addEventListener( 'click', this.Moving );    
                }
                else if(mainMap[i][j].element.firstChild.getAttribute('class') != 'piece ' + this.side + '-')
                {
                    pawnTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );    
                }
            }
        }
    }

    knightMove( i , j )
    {
        if
        ((j == this.x + 1 ||
        j == this.x - 1) &&
        (i == this.y + 2 ||
        i == this.y - 2) ||
        ((i == this.y + 1 ||
        i == this.y - 1) &&
        (j == this.x + 2 ||
        j == this.x - 2 )
        ))
        {
            if(!(i == this.y && j == this.x))
            {
                if(mainMap[i][j].element.firstChild == null || mainMap[i][j].element.firstChild == 'undefined')
                {
                    moveTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.addEventListener( 'click', this.Moving );    
                }
                else if(mainMap[i][j].element.firstChild.getAttribute('class') != 'piece ' + this.side + '-')
                {
                    pawnTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );    
                }
            }    
        }
    }

    pawnAtack()
    {

        if(this.piece != 'pawn') return;

        if(moving)
        for(let i = 0; i < 8; i++)
        for(let j = 0; j < 8; j++)
        {
            if
            (
                !(j == this.x && i == this.y) &&
                !(j == this.x && i != this.y) &&
                mainMap[i][j].element.firstChild != null &&
                this.piece == 'pawn'                 
            )
            {
                if
                (
                    i <= this.y + 1 &&
                    i >= this.y + 1 && 
                    j <= this.x + 1 &&
                    j >= this.x - 1 &&                        
                    this.side == 'white' &&
                    mainMap[i][j].element.firstChild.getAttribute('class') == 'piece black-'                    
                )
                {
                    pawnTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );
                }
                else if(
                    i <= this.y - 1 &&
                    i >= this.y - 1 && 
                    j <= this.x + 1 &&
                    j >= this.x - 1 &&                        
                    this.side == 'black' &&
                    mainMap[i][j].element.firstChild.getAttribute('class') == 'piece white-'                    
                )
                {
                    pawnTiles.push(mainMap[i][j]);
                    mainMap[i][j].element.setAttribute('class', 'move xadrez-tile' );
                    mainMap[i][j].element.firstChild.addEventListener( 'click', this.Moving );
                }
            }                                    
        }
    }

    Moving = ( event ) =>
    {
        this.firstMove = false;
        if(this.piece == 'pawn' && !this.firstMove) this.movespeed = 1;
        
        let vx = parseInt(event.target.getAttribute('x'), 10);
        let vy = parseInt(event.target.getAttribute('y'), 10);

        let child_ = mainMap[this.y][this.x].element.firstChild;

        if(event.target != null && blackPlayer && event.target.getAttribute('class') == 'piece white-') // refazer !
        {
            event.target.alive = false;
            event.target.parentNode.removeChild(event.target);
        }
        else if(event.target != null && !blackPlayer && event.target.getAttribute('class') == 'piece black-')
        {
            event.target.parentNode.removeChild(event.target);
        }


        mainMap[vy][vx].element.appendChild(child_);

        this.y = vy;
        this.x = vx;

        this.setAttributes('x', this.x);
        this.setAttributes('y', this.y);

        blackPlayer = !blackPlayer;

        this.startMove();
    }

}

export let placePieces = ( i , x ) =>
{
    if(maps[1][i][x] == 'pawn')
    {
        let piece = pieces.pawn.push = new pieces_( mainMap[i][x].element , 'pawn', i , x);
        piece.whichTeam(i);
    }
    else if(maps[1][i][x] == 'rook')
    {
        let piece = pieces.rook.push = new pieces_( mainMap[i][x].element , 'rook', i , x);
        piece.whichTeam(i);
    }
    else if(maps[1][i][x] == 'queen')
    {
        let piece = pieces.queen.push = new pieces_( mainMap[i][x].element, 'queen', i , x );
        piece.whichTeam(i);
    }
    else if(maps[1][i][x] == 'king')
    {
        let piece = pieces.king.push = new pieces_( mainMap[i][x].element, 'king', i , x );
        piece.whichTeam(i);
    }
    else if(maps[1][i][x] == 'bishop')
    {
        let piece = pieces.bishop.push = new pieces_( mainMap[i][x].element , 'bishop', i , x );
        piece.whichTeam(i);
    }
    else if(maps[1][i][x] == 'knight')
    {
        let piece = pieces.knight.push = new pieces_(mainMap[i][x].element , 'knight', i , x );
        piece.whichTeam(i);
    }
}

export let createMap = ( ) =>
{
    let gameWindown = new element('div' , windown);
    gameWindown.setAttributes('id' , 'xadrez');
    gameWindown = gameWindown.element;

    for(let i = 0; i < 8; i++)
    {
        for(let x = 0; x < 8; x++)
        {
            if(maps[0][i][x] == 'white')
            {
                mainMap[i][x] = new element('div', gameWindown);
                mainMap[i][x].element.setAttribute('class', 'xadrez-tile white');   
                mainMap[i][x].element.setAttribute('x', x);   
                mainMap[i][x].element.setAttribute('y', i);
                mainMap[i][x].element.setAttribute('was', 'white');               
                placePieces( i , x );
            }
            else if(maps[0][i][x] == 'black')
            {
                mainMap[i][x] = new element('div', gameWindown);
                mainMap[i][x].element.setAttribute('class', 'xadrez-tile black');   
                mainMap[i][x].element.setAttribute('x', x);   
                mainMap[i][x].element.setAttribute('y', i);
                mainMap[i][x].element.setAttribute('was', 'black');
                placePieces( i , x );
            }
            else
            {
                console.log('erro');
            }
        }
    }    
}

export let exempleMap = ( windown , piece ) =>
{

    let gameWindown = new element('div' , windown);
    gameWindown.setAttributes('id' , 'xadrez');
    gameWindown = gameWindown.element;

    for(let i = 0; i < 8; i++)
    {
        for(let x = 0; x < 8; x++)
        {
            if(maps[0][i][x] == 'white')
            {
                mainMap[i][x] = new element('div', gameWindown);
                mainMap[i][x].element.setAttribute('class', 'xadrez-tile white');   
                mainMap[i][x].element.setAttribute('x', x);   
                mainMap[i][x].element.setAttribute('y', i);
                mainMap[i][x].element.setAttribute('was', 'white');
                if((i == 3 && x == 3) || (i == 4 && x == 4))
                {
                    if(piece == 'Peão')
                    {
                        let piece = pieces.pawn.push = new pieces_( mainMap[i][x].element , 'pawn', i , x);
                        piece.whichTeam(i);
                    }
                    else if(piece == 'Torre')
                    {
                        let piece = pieces.rook.push = new pieces_( mainMap[i][x].element , 'rook', i , x);
                        piece.whichTeam(i);                
                    }
                    else if(piece == 'Rainha')
                    {
                        let piece = pieces.queen.push = new pieces_( mainMap[i][x].element, 'queen', i , x );
                        piece.whichTeam(i);                
                    }
                    else if(piece == 'Rei')
                    {
                        let piece = pieces.king.push = new pieces_( mainMap[i][x].element, 'king', i , x );
                        piece.whichTeam(i);                
                    }
                    else if(piece == 'Bispo')
                    {
                        let piece = pieces.bishop.push = new pieces_( mainMap[i][x].element , 'bishop', i , x );
                        piece.whichTeam(i);                
                    }
                    else if(piece == 'Cavalo')
                    {
                        let piece = pieces.knight.push = new pieces_(mainMap[i][x].element , 'knight', i , x );
                        piece.whichTeam(i);                
                    }
                }
            }
            else if(maps[0][i][x] == 'black')
            {
                mainMap[i][x] = new element('div', gameWindown);
                mainMap[i][x].element.setAttribute('class', 'xadrez-tile black');   
                mainMap[i][x].element.setAttribute('x', x);   
                mainMap[i][x].element.setAttribute('y', i);
                mainMap[i][x].element.setAttribute('was', 'black');
            }
            else
            {
                console.log('erro');
            }
        }
    }    
}

