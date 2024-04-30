const keysP1 = new Set(['w','a', 's', 'd'])
const keysP2 = new Set(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'])
let eventsP1 = []
let eventsP2 = []
let localGameEvents = [eventsP1, eventsP2]

function getDir(key) {
    let dir = null
    switch(key) {
        case 'ArrowUp':
        case 'w':
            dir = '↑';
            break;
        case 'ArrowLeft':
        case 'a':
            dir = '←'
            break;
        case 'ArrowDown':
        case 's': 
            dir = '↓'
            break;
        case 'ArrowRight':
        case 'd':
            dir = '→'
            break;
    }
    return dir
}

let buttons = document.querySelectorAll("button[class]")
for(btn of buttons) {
  if(btn.className.startsWith('move')) {
      let moveType = btn.className.replace('move','')
      btn.addEventListener("mousedown", (event) => {
        let pid = event.target.parentNode.id;
        let substituteKey = (pid == 'player1moveReq') ? 'w' : 'ArrowUp'
        let arr = (pid == 'player1moveReq') ? eventsP1 : eventsP2;
        handleKeySet(substituteKey, '+', moveType, arr)
      })
      btn.addEventListener("mouseup", (event) => {
        let pid = event.target.parentNode.id;
        let substituteKey = (pid == 'player1moveReq') ? 'w' : 'ArrowUp'
        let arr = (pid == 'player1moveReq') ? eventsP1 : eventsP2;
        handleKeySet(substituteKey, '-', moveType, arr)
      })
  }
}

document.addEventListener("keydown", (event) => {
    let eventArr = keysP1.has(event.key) ? eventsP1 : eventsP2;
    let dir = getDir(event.key)
    handleKeySet(event.key, '+', dir, eventArr)

})

document.addEventListener("keyup", (event) => {
    let eventArr = keysP1.has(event.key) ? eventsP1 : eventsP2;
    let dir = getDir(event.key)
    handleKeySet(event.key, '-', dir, eventArr)
 })

function handleKeySet(key, action, dir, arr) {
    let idx = -2
    if (dir != null){
        switch(action) {
            case '+':
                idx = existsIn(dir, arr)
                if(idx == -1){
                    arr.push(dir);
                }
                break;
            case '-':
                idx = existsIn(dir, arr)
                if(idx > -1){
                    arr.splice(idx, 1);
                }
                break;
        }
    }
    displayMove(key, arr)
}

function existsIn(dir, arr) {
    let idx = -1
    for(let i=0; i < arr.length;i++)
    {
        if(arr[i] == dir)
        {
            idx = i
            break
        }
    }
    return idx
}

function displayMove(key, arr) {
    let pid = keysP1.has(key) ? 1 : 2;
    let displayId = 'player' + pid + 'moveReq'
    if (document.getElementById(displayId) != null) {
        let moveFeedback = document.getElementById(displayId).getElementsByTagName("button")
        for(elem of moveFeedback) {
            elem.classList.remove('active')
            for(move of arr) {
                if (elem.classList.contains('move' + move)) {
                elem.classList.add('active')
                }
            }
        }
    }
}