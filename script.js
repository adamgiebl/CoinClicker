const container = document.querySelector('#game_elements')
const heartsContainer = document.querySelector('#hearts')
const coinsContainer = document.querySelector('#coins')
const screen = document.querySelector('#screen')
let allHearts = []

window.addEventListener('load', start)

let hearts = 3
let coins = 0

function start() {
    console.log('start')
    createHearts(3)
    generateCoins(3)
    generateBombs(2)
    coinsContainer.innerText = coins
}
function createHearts(numberOfHearts) {
    for (let i = 0; i < numberOfHearts; i++) {
        heartsContainer.innerHTML += '<div class="heart"></div>'
    }
    allHearts = document.querySelectorAll('.heart')
}

function updateHearts() {
    allHearts.forEach(heart => {
        heart.classList.add('broken')
    })
    for (let i = 0; i < hearts; i++) {
        allHearts[i].classList.remove('broken')
    }
}

function generateCoins(numberOfcoins) {
    for (let i = 0; i < numberOfcoins; i++) {
        const coin = document.createElement('div')
        coin.classList.add('coin_container', 'falling')
        coin.innerHTML = '<div class="sprite"></div>'
        coin.randomize = function () {
            this.style.left = Math.floor(Math.random() * 100) + 'vw'
            this.classList.remove('speed1', 'speed2', 'speed3')
            this.classList.add('speed' + (Math.floor(Math.random() * 3) + 1))
        }
        coin.restart = function () {
            this.classList.remove('falling')
            this.offsetHeight
            this.classList.add('falling')
            this.randomize()
        }
        coin.clicked = function () {
            coins++
            coinsContainer.innerText = coins
            this.classList.add('pause')
            this.children[0].classList.add('zoom')
            this.children[0].addEventListener('animationend', () => {
                this.classList.remove('pause')
                this.children[0].classList.remove('zoom')
            })
        }
        coin.randomize()
        coin.addEventListener('click', coin.clicked)
        coin.addEventListener('animationend', coin.restart)
        container.appendChild(coin)
    }
}

function generateBombs(numberOfbombs) {
    for (let i = 0; i < numberOfbombs; i++) {
        const bomb = document.createElement('div')
        bomb.classList.add('bomb_container', 'falling')
        bomb.innerHTML = '<div class="sprite"></div>'
        bomb.dataset.id = i
        console.log('here')
        bomb.randomize = function () {
            this.addEventListener('click', this.clicked)
            this.style.left = Math.floor(Math.random() * 100) + 'vw'
            this.classList.remove('speed1', 'speed2', 'speed3')
            this.classList.add('speed' + (Math.floor(Math.random() * 3) + 1))
        }
        bomb.restart = function () {
            console.log('res')
            this.children[0].classList.remove('explode')
            this.classList.remove('pause')
            this.classList.remove('falling')
            this.offsetHeight
            this.classList.add('falling')
            this.addEventListener('click', this.clicked)
            this.randomize()
        }
        bomb.clicked = function () {
            hearts === 0 ? window.location.reload() : hearts--
            updateHearts()
            this.removeEventListener('click', this.clicked)
            this.classList.add('pause')
            this.children[0].classList.add('explode')
            screen.classList.add('shake')
            requestAnimationFrame(() => {
                screen.addEventListener('animationend', () => {
                    screen.classList.remove('shake')
                })
            })
        }
        bomb.randomize()
        bomb.addEventListener('click', bomb.clicked)
        bomb.addEventListener('animationend', bomb.restart)
        container.appendChild(bomb)
    }
}
