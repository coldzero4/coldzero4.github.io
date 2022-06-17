const descMessages = [
    "Welcome to my website",
    "I'm a programmer",
    "I'm a game developer",
    "I'm a bot developer",
    "I'm a full-stack developer",
    "Professional gamer"
]

const descElem = document.getElementById("js-desc")
const secretListingElem = document.getElementById("secret-listing")
const background = document.getElementById("secret-background")
const closeButton = document.getElementById("secret-close-button")

function resizeBackground() {
    background.style.height = `calc(${document.body.clientHeight}px + 1.25rem)`
}

function animate(txt) {
    let currentTxt = descElem.textContent
    let curIndex = -1;
    let initialCount = -1, removeCount = 0;

    for (let i = 0; i < currentTxt.length; i++) {
        if (currentTxt.substring(0, i + 1) != txt.substring(0, i + 1)) {
            initialCount = currentTxt.length - (i + 1)
            removeCount = initialCount
            break;
        }
    }

    return function() {
        if (removeCount > 0) {
            removeCount--;
            descElem.textContent = currentTxt.substring(0, (currentTxt.length - 1) - (initialCount - removeCount))
            return true
        } else {
            let initialTxt = currentTxt.substring(0, (currentTxt.length - 1) - (initialCount - removeCount))
            curIndex++

            if (curIndex <= txt.length - (initialTxt.length - 1)) {
                descElem.textContent = initialTxt + txt.substring(initialTxt.length, initialTxt.length + curIndex)
                return true
            }
        }
    }
}

function changeText(f, cb) {
    let result = f()
    if (result) {
        setTimeout(changeText, 50, f, cb)
    } else {
        cb()
    }
}

function type(index = 0) {
    let f = animate(descMessages[index])
    index = (index + 1) % descMessages.length
    descElem.classList.remove("blink")

    changeText(f, () => {
        descElem.classList.add("blink")
        setTimeout(() => type(index), 5e3)
    })
}

type()

secretListingElem.addEventListener("click", (ev) => {
    document.body.classList.add("selected")
})

closeButton.addEventListener("click", (ev) => {
    document.body.classList.remove("selected")
})

window.addEventListener("resize", () => resizeBackground())

// Theme toggle
document.getElementById("theme-controller").addEventListener("click", (ev) => {
    document.getElementsByTagName("body")[0].classList.toggle("light-theme")
})

resizeBackground()