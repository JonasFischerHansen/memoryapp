        const tileImgs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        let tilesFlipped = [];
        let tilesMatch = [];
        function drawBoard(event) {         
            event.preventDefault();
            welcome.style.display = 'none'; 
            board.style.display = 'flex';
            let gameTiles = playGame.numberOfTiles.value;
            let gameTileImgs = tileImgs.slice(0, gameTiles/2);
            gameTileImgs = gameTileImgs.doubleShuffle();
            for (i=0; i<playGame.numberOfTiles.value; i++) {
                let content = '';
                content += '<section class="tile" data-tile="'+i+'">';
                content += '<div class="front"></div>';
                content += '<div class="back"><img src="'+gameTileImgs[i]+'.gif"></div>';
                content += '</section>';
                board.innerHTML += content;
            }
            return false;
        }
        function endOfGame () {
            if (board.getElementsByClassName('tile').length === (board.getElementsByClassName('flipped').length)){
                //alert("Congrats! You got 'em all!");
                message.classList.add('showmessage');
            }
        }
        
Array.prototype.doubleShuffle = function()
{
    let d;
    for(d = 0; d < this.length; d = d+2){
        this.splice(d+1,0, this[d]);
    }

    let i = (this.length), j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}
        function newGame () {
            board.innerHTML = '';
            board.style.display = 'none'; 
            welcome.style.display = 'flex';
            message.classList.remove('showmessage');
        }
        function flipBack() {
            let allTiles = board.getElementsByClassName('tile');
            allTiles[parseInt(tilesFlipped[0])].classList.remove('flipped');
            allTiles[parseInt(tilesFlipped[1])].classList.remove('flipped');
            tilesFlipped = [];
            tilesMatch = [];
            document.getElementById('board').style.pointerEvents = 'auto';
        }
        function twoTiles() {
            if (tilesFlipped.length >= 2) {
                document.getElementById('board').style.pointerEvents = 'none';
                if (tilesMatch[0] === tilesMatch[1]) {
                    let allTiles = board.getElementsByClassName('tile');
                    allTiles[parseInt(tilesFlipped[0])].classList.add('reward');
                    allTiles[parseInt(tilesFlipped[1])].classList.add('reward'); 
                    tilesFlipped = [];
                    tilesMatch = [];
                    setTimeout(endOfGame, 400);
                    document.getElementById('board').style.pointerEvents = 'auto';  
                } else {
                    setTimeout(flipBack, 1200);
                }
            }
        }
        function flipTile(event) {  
            if (event.target !== event.currentTarget) {
                if (!event.target.parentNode.classList.contains('flipped')) {
                    event.target.parentNode.classList.add('flipped');
                    tilesFlipped.push(event.target.parentNode.getAttribute('data-tile'))
                    tilesMatch.push(event.target.nextSibling.innerHTML);
                    twoTiles();
                }
            }
            event.stopPropagation();
        }
        function dontMove(event) {
            event.preventDefault();
        }
        playGame.addEventListener("submit", drawBoard, false);
        board.addEventListener("touchend", flipTile, false);
        document.body.addEventListener('touchmove', dontMove, false);
        message.getElementsByTagName('button')[0].addEventListener("click", newGame, false);