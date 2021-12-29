const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');
const winLabel = document.querySelector('.win-label');
const loseLabel = document.querySelector('.lose-label');
const shootBtn = document.querySelector('.shoot-btn');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentShooterIndex = 409;
const width = 21;
let direction = 1;
let invadersId = null;
let goingRight = true;
let aliensRemoved = [];
let result = 0;

for (let i = 0; i < 441; i++) {
	const square = document.createElement('div');
	grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
	42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
	63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78
]

function draw() {
	for (let i = 0; i < alienInvaders.length; i++) {
		if (!aliensRemoved.includes(i))
			squares[alienInvaders[i]].classList.add('invader')
	}
}
draw();


function remove() {
	for (let i = 0; i < alienInvaders.length; i++) {
		squares[alienInvaders[i]].classList.remove('invader')
	}
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
	squares[currentShooterIndex].classList.remove('shooter');

	switch (e.key) {
		case 'ArrowLeft': if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
			break;
		case 'ArrowRight': if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
			break;
	}

	squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter)

//this is for control btns--------------------------------
leftBtn.addEventListener('click', () => {
	squares[currentShooterIndex].classList.remove('shooter');
	if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
	squares[currentShooterIndex].classList.add('shooter');
});

rightBtn.addEventListener('click', () => {
	squares[currentShooterIndex].classList.remove('shooter');
	if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
	squares[currentShooterIndex].classList.add('shooter');
})



function moveInvaders() {
	const leftEdge = alienInvaders[0] % width === 0;
	const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
	remove();

	if (rightEdge && goingRight) {
		for (let i = 0; i < alienInvaders.length; i++) {
			alienInvaders[i] += width + 1;
			direction = -1;
			goingRight = false
		}
	}

	if (leftEdge && !goingRight) {
		for (let i = 0; i < alienInvaders.length; i++) {
			alienInvaders[i] += width - 1;
			direction = 1;
			goingRight = true;
		}
	}

	for (let i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += direction;
	}

	draw()



	for (let i = 0; i < alienInvaders.length; i++) {
		if (aliensRemoved.length === alienInvaders.length) {
			winLabel.innerHTML = 'YOU WIN !';
		}
		else if (
			alienInvaders[i] > squares.length - width ||
			squares[currentShooterIndex].classList.contains('invader', 'shooter')
		) {
			loseLabel.innerHTML = 'GAME OVER';
			clearInterval(invadersId)
		}
	}

}

invadersId = setInterval(moveInvaders, 250);

function shoot(e) {
	let laserId
	let currentLaserIndex = currentShooterIndex
	function moveLaser() {
		squares[currentLaserIndex].classList.remove('laser');
		currentLaserIndex -= width;
		squares[currentLaserIndex].classList.add('laser');

		if (squares[currentLaserIndex].classList.contains('invader')) {
			squares[currentLaserIndex].classList.remove('laser');
			squares[currentLaserIndex].classList.remove('invader');
			squares[currentLaserIndex].classList.add('boom');

			setTimeout(() => {
				squares[currentLaserIndex].classList.remove('boom')
			}, 200);
			clearInterval(laserId)

			const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
			aliensRemoved.push(alienRemoved);
			result++;
			resultDisplay.innerHTML = result;

		}
	}
	if (e.keyCode == 32 || shootBtn.onClick) {
		laserId = setInterval(moveLaser, 100)
	}
}

document.addEventListener('keydown', shoot)


// this is similar function for control btns
function shooterBtn() {
	let laserId
	let currentLaserIndex = currentShooterIndex
	function moveLaser() {
		squares[currentLaserIndex].classList.remove('laser');
		currentLaserIndex -= width;
		squares[currentLaserIndex].classList.add('laser');

		if (squares[currentLaserIndex].classList.contains('invader')) {
			squares[currentLaserIndex].classList.remove('laser');
			squares[currentLaserIndex].classList.remove('invader');
			squares[currentLaserIndex].classList.add('boom');

			setTimeout(() => {
				squares[currentLaserIndex].classList.remove('boom')
			}, 200);
			clearInterval(laserId)

			const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
			aliensRemoved.push(alienRemoved);
			result++;
			resultDisplay.innerHTML = result;

		}
	}
	laserId = setInterval(moveLaser, 100)
}

shootBtn.addEventListener('click', shooterBtn)