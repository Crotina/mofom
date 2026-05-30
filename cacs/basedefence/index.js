const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEl = document.querySelector('#scoreEl')
const modalEl = document.querySelector('#modalEl')
const modalScoreEl = document.querySelector('#modalScoreEl')
const buttonEl = document.querySelector('#buttonEl')
const restart_btn = document.querySelectorAll('.restartbtn')

const startButtonEl = document.querySelector('#startButtonEl')
const startModalEl = document.querySelector('#startModalEl')

const pauseButtonEl = document.querySelector('#pauseButtonEl')
const pauseModalEl = document.querySelector('#pauseModalEl')

const volumeUpEl = document.querySelector('#volumeUpEl')
const volumeOffEl = document.querySelector('#volumeOffEl')

canvas.width = innerWidth
canvas.height = innerHeight

let player
let projectiles = []
let enemies = []
let particles = []
let animationId
let intervalId
let score = 0
let powerUps = []
let frames = 0
let backgroundParticles = []
let game = {
  active: false
}
let paused = false

const timerManager = {
  intervals: new Map(),
  timeouts: new Map(),
  setInterval(name, fn, delay) {
    this.clearInterval(name)
    const id = setInterval(fn, delay)
    this.intervals.set(name, id)
    return id
  },
  clearInterval(name) {
    if (this.intervals.has(name)) {
      clearInterval(this.intervals.get(name))
      this.intervals.delete(name)
    }
  },
  clearAllIntervals() {
    for (const id of this.intervals.values()) clearInterval(id)
    this.intervals.clear()
  },
  setTimeout(name, fn, delay) {
    this.clearTimeout(name)
    const id = setTimeout(fn, delay)
    this.timeouts.set(name, id)
    return id
  },
  clearTimeout(name) {
    if (this.timeouts.has(name)) {
      clearTimeout(this.timeouts.get(name))
      this.timeouts.delete(name)
    }
  },
  clearAllTimeouts() {
    for (const id of this.timeouts.values()) clearTimeout(id)
    this.timeouts.clear()
  },
  clearAll() {
    this.clearAllIntervals()
    this.clearAllTimeouts()
  }
}


function init() {
  console.log('game.active: ', game.active)
  console.error('test')
  const x = canvas.width / 2
  const y = canvas.height / 2
  player = new Player(x, y, 10, 'white')
  projectiles = []
  enemies = []
  particles = []
  powerUps = []
  animationId
  score = 0
  scoreEl.innerHTML = 0
  frames = 0
  backgroundParticles = []
  game = {
    active: true
  }

  const spacing = 30

  for (let x = 0; x < canvas.width + spacing; x += spacing) {
    for (let y = 0; y < canvas.height + spacing; y += spacing) {
      backgroundParticles.push(
        new BackgroundParticle({
          position: {
            x,
            y
          },
          radius: 3
        })
      )
    }
  }
}
function isMobile() {
  console.log(navigator.userAgent)
  return /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(navigator.userAgent)
}
if (isMobile()) {
  document.getElementById('start_menu_keyguide').insertAdjacentHTML('beforeend', `
    <li>
      <h3>ARE YOU USING A PHONE OR iPad? THIS GAME IS NOT OPTIMIZED FOR MOBILES. YOU STILL CAN SHOOT BUT YOU CAN\'T MOVE OR PAUSE GAME BECAUSE MOST OF THE MOBILE DEVICES DON\'T HAVE KEYBOARD</h3>
    </li>
  `)
}

function debug_powerUps() {
  console.log(player.powerUp)
}
window.debug_powerUps = debug_powerUps

class Scoreboard {
  constructor(score_el, duration = 500) {
    this.el = score_el
    this.duration = duration
    this.target = 0
    this.animating = false
    this._raf = null
  }

  set_score(newScore) {
    this.target = newScore
    if (!this.animating) {
      this._animate()
    }
  }

  _animate() {
    this.animating = true
    const start = parseInt(this.el.textContent)
    const end = this.target
    const diff = end - start
    const startTime = performance.now()

    const step = (now) => {
      // 若目标分数被更新，则重新计算动画
      if (this.target !== end) {
        this.animating = false
        this._animate()
        return
      }

      const progress = Math.min((now - startTime) / this.duration, 1)
      const current = Math.floor(start + diff * progress)
      this.el.textContent = current

      if (progress < 1) {
        this._raf = requestAnimationFrame(step)
      } else {
        this.animating = false
      }
    }

    this._raf = requestAnimationFrame(step)
  }
}

let sc = new Scoreboard(scoreEl)

function spawnEnemies() {
  // ensure only one spawn interval exists
  timerManager.clearInterval('spawnEnemies')
  intervalId = timerManager.setInterval('spawnEnemies', () => {
    const radius = Math.random() * (30 - 4) + 4

    let x
    let y

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    enemies.push(new Enemy(x, y, radius, color, velocity))
  }, 1000)
}

function spawnPowerUps() {
  timerManager.clearInterval('spawnPowerUps')
  spawnPowerUpsId = timerManager.setInterval(
    'spawnPowerUps',
    () => {
      powerUps.push(
        new PowerUp({
          position: {
            x: -30,
            y: Math.random() * canvas.height
          },
          velocity: {
            x: Math.random() + 2,
            y: 0
          }
        })
      )
    },
    10000
  )
}

function createScoreLabel({ position, score }) {
  const scoreLabel = document.createElement('label')
  scoreLabel.innerHTML = score
  scoreLabel.style.color = 'white'
  scoreLabel.style.position = 'absolute'
  scoreLabel.style.left = position.x + 'px'
  scoreLabel.style.top = position.y + 'px'
  scoreLabel.style.userSelect = 'none'
  scoreLabel.style.pointerEvents = 'none'
  document.body.appendChild(scoreLabel)

  gsap.to(scoreLabel, {
    opacity: 0,
    y: -30,
    duration: 0.75,
    onComplete: () => {
      scoreLabel.parentNode.removeChild(scoreLabel)
    }
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  frames++

  backgroundParticles.forEach((backgroundParticle) => {
    backgroundParticle.draw()

    const dist = Math.hypot(
      player.x - backgroundParticle.position.x,
      player.y - backgroundParticle.position.y
    )

    if (dist < 100) {
      backgroundParticle.alpha = 0

      if (dist > 70) {
        backgroundParticle.alpha = 0.5
      }
    } else if (dist > 100 && backgroundParticle.alpha < 0.1) {
      backgroundParticle.alpha += 0.01
    } else if (dist > 100 && backgroundParticle.alpha > 0.1) {
      backgroundParticle.alpha -= 0.01
    }
  })

  player.update()

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i]

    if (powerUp.position.x > canvas.width) {
      powerUps.splice(i, 1)
    } else powerUp.update()

    const dist = Math.hypot(
      player.x - powerUp.position.x,
      player.y - powerUp.position.y
    )

    // gain power up
    if (dist < powerUp.image.height / 2 + player.radius) {
      powerUps.splice(i, 1)
      player.powerUp = 'MachineGun'
      player.color = 'yellow'
      audio.powerUpNoise.play()

      // power up runs out
      setTimeout(() => {
        player.powerUp = null
        player.color = 'white'
      }, 5000)
    }
  }

  // machine gun animation / implementation
  if (player.powerUp === 'MachineGun') {
    const angle = Math.atan2(
      mouse.position.y - player.y,
      mouse.position.x - player.x
    )
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5
    }

    if (frames % 2 === 0) {
      projectiles.push(
        new Projectile(player.x, player.y, 5, 'yellow', velocity)
      )
    }

    if (frames % 5 === 0) {
      if (player.powerUp) {
        audio.advanced_shoot.play()
      } else {
        audio.shoot.play()
      }
      
    }
  }

  for (let index = particles.length - 1; index >= 0; index--) {
    const particle = particles[index]

    if (particle.alpha <= 0) {
      particles.splice(index, 1)
    } else {
      particle.update()
    }
  }

  for (let index = projectiles.length - 1; index >= 0; index--) {
    const projectile = projectiles[index]

    projectile.update()

    // remove from edges of screen
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      projectiles.splice(index, 1)
    }
  }

  for (let index = enemies.length - 1; index >= 0; index--) {
    const enemy = enemies[index]

    enemy.update()

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    // end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId)
      timerManager.clearAll()
      audio.death.play()
      game.active = false

      modalEl.style.display = 'block'
      gsap.fromTo(
        '#modalEl',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'expo'
        }
      )
      modalScoreEl.innerHTML = score
    }

    for (
      let projectilesIndex = projectiles.length - 1;
      projectilesIndex >= 0;
      projectilesIndex--
    ) {
      const projectile = projectiles[projectilesIndex]

      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      // when projectiles touch enemy
      if (dist - enemy.radius - projectile.radius < 1) {
        // create explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6)
              }
            )
          )
        }
        // this is where we shrink our enemy
        if (enemy.radius - 10 > 5) {
          audio.damageTaken.play()
          let adds = 100
          if (player.powerUp) adds *= 2
          score += adds
          // scoreEl.innerHTML = score
          sc.set_score(score)
          gsap.to(enemy, {
            radius: enemy.radius - 10
          })
          createScoreLabel({
            position: {
              x: projectile.x,
              y: projectile.y
            },
            score: adds
          })
          projectiles.splice(projectilesIndex, 1)
        } else {
          // remove enemy if they are too small
          audio.explode.play()
          let adds2 = 150
          if (player.powerUp) adds2 *= 2
          score += adds2
          // scoreEl.innerHTML = score
          sc.set_score(score)
          createScoreLabel({
            position: {
              x: projectile.x,
              y: projectile.y
            },
            score: adds2
          })

          // change background particle colors
          backgroundParticles.forEach((backgroundParticle) => {
            gsap.set(backgroundParticle, {
              color: 'white',
              alpha: 1
            })
            gsap.to(backgroundParticle, {
              color: enemy.color,
              alpha: 0.1
            })
            // backgroundParticle.color = enemy.color
          })

          enemies.splice(index, 1)
          projectiles.splice(projectilesIndex, 1)
        }
      }
    }
  }
}

let audioInitialized = false

let wasPlayingBeforeHidden = false

function pauseGame() {
  if (paused && !game.active) return
  paused = true
  cancelAnimationFrame(animationId)
  timerManager.clearAll()
  try {
    if (audio && audio.background && audio.background.pause) audio.background.pause()
  } catch (e) {}
  game.active = false
}

function resumeGame() {
  if (!paused) return
  console.log('resumed game')
  paused = false
  game.active = true
  if (audioInitialized && audio && audio.background && audio.background.play) audio.background.play()
  // restart main loop and spawners
  animate()
  spawnEnemies()
  spawnPowerUps()
  pauseModalEl.style.display = 'none'
}

function shoot({ x, y }) {
  // console.log(`x: ${x}, y: ${y}`)
  if (game.active) {
    const angle = Math.atan2(y - player.y, x - player.x)
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity))

    if (player.powerUp) {
      audio.advanced_shoot.play();
      return
    }
    audio.shoot.play()
  }
}
const solve_shoot = (event) => {
  // console.warn('shoot')
  if (!audio.background.playing() && !audioInitialized) {
    audio.background.play()
    audioInitialized = true
  }
  // console.log(event.clientX)
  shoot({ x: event.clientX, y: event.clientY })
}
window.addEventListener('click', (event) => solve_shoot(event))

// window.addEventListener('keydown', function(e) {
//   // if (e.ctrlKey && e.key === 'Space') {
//   //   e.preventDefault(); // 阻止默认行为
//   //   solve_shoot(e)
//   // }
//   if(e.code == 'Space') {
//     e.preventDefault();
//     solve_shoot(e)
//   }
// });


window.addEventListener('touchstart', (event) => {
  const x = event.touches[0].clientX
  const y = event.touches[0].clientY

  mouse.position.x = event.touches[0].clientX
  mouse.position.y = event.touches[0].clientY

  shoot({ x, y })
})

const mouse = {
  position: {
    x: 0,
    y: 0
  }
}
addEventListener('mousemove', (event) => {
  mouse.position.x = event.clientX
  mouse.position.y = event.clientY
})

addEventListener('touchmove', (event) => {
  mouse.position.x = event.touches[0].clientX
  mouse.position.y = event.touches[0].clientY
})

// restart game
// buttonEl.addEventListener('click', () => {
//   audio.select.play()
//   init()
//   animate()
//   spawnEnemies()
//   spawnPowerUps()
//   gsap.to('#modalEl', {
//     opacity: 0,
//     scale: 0.8,
//     duration: 0.2,
//     ease: 'expo.in',
//     onComplete: () => {
//       modalEl.style.display = 'none'
//     }
//   })
// })
Array.from(restart_btn).forEach(element => {
  element.addEventListener('click', () => {
    location.reload()
  })
});

startButtonEl.addEventListener('click', () => {
  audio.select.play()
  init()
  animate()
  spawnEnemies()
  spawnPowerUps()
  // startModalEl.style.display = 'none'
  gsap.to('#startModalEl', {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: 'expo.in',
    onComplete: () => {
      startModalEl.style.display = 'none'
    }
  })
})

pauseButtonEl.addEventListener('click', () => {
  resumeGame()
})

// mute everything
volumeUpEl.addEventListener('click', () => {
  audio.background.pause()
  volumeOffEl.style.display = 'block'
  volumeUpEl.style.display = 'none'

  for (let key in audio) {
    audio[key].mute(true)
  }
})

// unmute everything
volumeOffEl.addEventListener('click', () => {
  if (audioInitialized) audio.background.play()
  volumeOffEl.style.display = 'none'
  volumeUpEl.style.display = 'block'
  for (let key in audio) {
    audio[key].mute(false)
  }
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
    
  if (game.active) init()
})

// document.addEventListener('visibilitychange', () => {
//   if (document.hidden) {
//     // inactive — 如果在隐藏前正在运行则暂停，并记录状态
//     wasPlayingBeforeHidden = game.active && !paused
//     if (wasPlayingBeforeHidden) pauseGame()
//   } else {
//     // 可见时如果是因为切换而暂停，则恢复
//     if (wasPlayingBeforeHidden) resumeGame()
//   }
// })

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 如果切走标签页时，游戏正在高能运行，我们手动帮玩家调用暂停键的逻辑
    if (game.active) {
      pauseGame()
      pauseModalEl.style.display = 'block' // 顺便把暂停菜单显示出来
    }
  }
})

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      player.velocity.x += 1
      break
    case 'ArrowUp':
      player.velocity.y -= 1
      break
    case 'ArrowLeft':
      player.velocity.x -= 1
      break
    case 'ArrowDown':
      player.velocity.y += 1
      break
    case 'd':
    case 'D':
      player.velocity.x += 1
      break
    case 'w':
    case 'W':
      player.velocity.y -= 1
      break
    case 'a':
    case 'A':
      player.velocity.x -= 1
      break
    case 's':
    case 'S':
      player.velocity.y += 1
      break
    case 'p':
    case 'P':
    case 'Escape':
      if (paused) {
        resumeGame()
      } else {
        pauseGame()
        pauseModalEl.style.display = 'block'
      }
      break
    case ' ':
      event.preventDefault();
      shoot({x: mouse.position.x, y: mouse.position.y})
      break
  }
})
