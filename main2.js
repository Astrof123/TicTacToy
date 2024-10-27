const gameAreaElem = document.getElementById('gameArea');
const gameItems = gameAreaElem.getElementsByClassName('gameItem');
const gameWhoElem = document.getElementById('gameWho');
const spanWinElem = document.getElementById('spanWin');
const WinnerElem = document.getElementById('Winner');
const btnNewGame = document.getElementById('btnNewGame');

let playerSign = '✖';
gameWhoElem.textContent = playerSign == '✖' ? 'Игрок 1 Крестики' : 'Игрок 2 Нолики';
let AreaSize = 3;


let endGame = false;
let step = 1;

function checkWin() {
    return this.checkWinnerHorizontal(gameItems) || checkWinnerVertical(gameItems) || this.checkWinnerDiagonals(gameItems);
}

    
function checkWinnerHorizontal() {
    for (let i = 0; i < AreaSize; i++) {
        let res = true;

        for (let j = 1; j < AreaSize && res; j++) {
            let firstElem = gameItems[i * AreaSize + j].textContent;
            let secondElem = gameItems[i * AreaSize + 0].textContent;
            if (firstElem && secondElem) {
                res = firstElem === secondElem;
            }
            else {
                res = false;
                break;
            }
            
        }

        if (res) {
            return true;
        }
    }
    return false;
}


function checkWinnerVertical() {
    for (let i = 0; i < AreaSize; i++) {
        let res = true;
        for (let j = 1; j < AreaSize && res; j++) {
            let firstElem = gameItems[j * AreaSize + i].textContent;
            let secondElem = gameItems[0 * AreaSize + i].textContent;
            if (firstElem && secondElem) {
                res = firstElem === secondElem;
            }
            else {
                res = false;
                break;
            }
        }
        if (res) {
            return true;
        }
    }
    return false;
}


function checkWinnerDiagonals() {
    let res = true;

    for (let i = 1; i < AreaSize && res; i++) {
        let firstElem = gameItems[i * AreaSize + i].textContent;
        let secondElem = gameItems[0].textContent;

        if (firstElem && secondElem) {
            res = firstElem === secondElem;
        }
        else {
            res = false;
            break;
        }
        
    }

    if (res) {
        return true;
    }

    res = true;

    for (let i = 1; i < AreaSize && res; i++) {
        let firstElem = gameItems[(AreaSize - i - 1) * AreaSize + i].textContent;
        let secondElem = gameItems[(AreaSize - 1) * AreaSize + 0].textContent;
        
        if (firstElem && secondElem) {
            res = firstElem === secondElem;
        }
        else {
            res = false;
            break;
        }
    }
    return res;
}

function clearItems() {
    for (let i = 0; i < gameItems.length; i++) {
        gameItems[i].textContent = '';
    }
}

gameAreaElem.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('gameItem') && !endGame) {
        if (target.textContent == '') {
            let span = document.createElement('span');

            let stylePlayer = playerSign == '✖' ? 'player1cross' : 'player2circle';
            span.classList.add(stylePlayer);
            span.textContent = playerSign;

            target.append(span);

            if (checkWin(target)) {
                spanWinElem.textContent =  playerSign == '✖' ? 'Игрок 1' : 'Игрок 2';
                WinnerElem.style.display = 'block';
                endGame = true;
            }
            else if (step === 9) {
                spanWinElem.textContent =  'Ничья';
                WinnerElem.style.display = 'block';
                endGame = true;
            }


            playerSign = playerSign == '✖' ? 'Ｏ' : '✖';
            gameWhoElem.textContent = playerSign == '✖' ? 'Игрок 1 Крестики' : 'Игрок 2 Нолики';
            
            step++;
        }
        else {
            return;
        }
    } 
});


btnNewGame.addEventListener('click', (event) => {
    clearItems();
    endGame = false;
    playerSign = '✖';
    gameWhoElem.textContent = playerSign == '✖' ? 'Игрок 1 Крестики' : 'Игрок 2 Нолики';
    spanWinElem.textContent =  '';
    WinnerElem.style.display = 'none';
    step = 1;
});