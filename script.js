window.addEventListener('load', start)
const container = document.querySelector('#game_elements'),
    heartsContainer = document.querySelector('#hearts'),
    coinsContainer = document.querySelector('#coins'),
    screen = document.querySelector('#screen')

let allHearts = []
let hearts = 3,
    coins = 0,
    numberOfHearts = 3,
    speeds = ['speed1', 'speed2', 'speed3']
const types = {
    HEART: 'heart',
    COIN: 'coin',
    BOMB: 'bomb'
}

function start() {
    for (let i = 0; i < numberOfHearts; i++) {
        heartsContainer.innerHTML += '<div class="heart"></div>'
    }
    allHearts = document.querySelectorAll('.heart')
    generateElements(types.BOMB, 4)
    generateElements(types.COIN, 7)
    generateElements(types.HEART, 1)
}

function updateHearts() {
    allHearts.forEach(heart => {
        heart.classList.add('broken')
    })
    for (let i = 0; i < hearts; i++) {
        allHearts[i].classList.remove('broken')
    }
}

function generateElements(type, numberOfElements) {
    for (let i = 0; i < numberOfElements; i++) {
        const el = document.createElement('div')
        const clickClass = type === types.BOMB ? 'explode' : 'zoom'
        el.classList.add(`${type}_container`, 'falling')
        el.innerHTML = '<div class="sprite"></div>'
        el.dataset.id = i
        el.dataset.type = type
        el.randomize = function () {
            this.addEventListener('click', this.clicked)
            this.style.left = Math.floor(Math.random() * 100) + 'vw'
            this.classList.remove(...[speeds])
            this.classList.add('speed' + (Math.floor(Math.random() * 3) + 1))
        }
        el.restart = function () {
            this.children[0].classList.remove(clickClass)
            this.classList.remove('pause')
            this.classList.remove('falling')
            this.offsetHeight
            this.classList.add('falling')
            this.addEventListener('click', this.clicked)
            this.randomize()
        }
        el.clicked = function () {
            switch (type) {
                case types.BOMB:
                    hearts === 1 ? window.location.reload() : hearts--
                    updateHearts()
                    break
                case types.COIN:
                    coins++
                    coinsContainer.innerText = coins
                    break
                case types.HEART:
                    hearts !== 3 && hearts++
                    updateHearts()
            }
            this.removeEventListener('click', this.clicked)
            this.classList.add('pause')
            this.children[0].classList.add(clickClass)
            clickClass === 'explode' && screen.classList.add('shake')
            requestAnimationFrame(() => {
                clickClass === 'explode'
                    ? screen
                    : this.children[0].addEventListener('animationend', () => {
                          if (clickClass === 'explode') screen.classList.remove('shake')
                          else {
                              this.children[0].classList.remove('zoom')
                              this.classList.remove('pause')
                          }
                      })
            })
        }
        el.randomize()
        el.addEventListener('mousedown', el.clicked)
        el.addEventListener('animationend', el.restart)
        container.appendChild(el)
    }
}
