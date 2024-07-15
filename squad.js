const p = println // alias
Array.prototype.rev = function(func) {
    for(let i = this.length; i--;) func(this[i], i, this)
}
function $ (num) {
    return round(num / SIZE)
}
function disto (a, b){
    return dist(a.x, a.y, b.x, b.y)
}

size(document.body.clientWidth, document.body.clientHeight)
canvas.onwheel = () => {}
smooth()
rectMode(CENTER)

const SIZE = 40, 
    BULLET_SIZE = SIZE / 3, 
    BLOCK_CHARS = "b",
    MAP = {
        minX: -25,
        minY: -25,
        maxX: 0,
        maxY: 0
    }

const keys = []
keyPressed = () => keys[keyCode] = keys[key.toString()] = true
keyReleased = () => keys[keyCode] = keys[key.toString()] = false
const mouse = []
mousePressed = () => mouse[mouseButton] = true
mouseReleased = () => mouse[mouseButton] = false

const data = {
    gun: {
        smg: {
            reload: 100,
            rof: 4,
            damage: 1,
            speed: 25,
            clip: 30
        }
    }
}

let lvl = []

const complexes = {
    levels: [
        [
            /*
            "bbbebbbbbbbbbbbbbbbbbbb",
            "b                     b",
            "b                     b",
            "b   bbbbbbbbbbbbbbb   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b b b b b b b b   b",
            "b   b             b   b",
            "b   b  p          b   b",
            "b   b             b   b",
            "b   bbbbbbbbbbb   b   b",
            "b                     b",
            "b                     b",
            "bbbbbbbbbbbbbbbbbbbbbbb",
        ],
        "bbbbbbbbbbbbbbbbbbbbbbb",
            "b      e              b",
            "b                     b",
            "b   bbbbbbbbbbbbbbb   b",
            "b   b             b   b",
            "b   b      p      b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   b             b   b",
            "b   bbbbbbbbbbb   b   b",
            "b                     b",
            "b                     b",
            "bbbbbbbbbbbbbbbbbbbbbbb",
        ]
            */
           
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "b           b               b                b",
            "b  p                        b                b",
            "b    b                 b    b  b             b",
            "b    b      b      a   b    b  bb     a      b",
            "b  bbb      b   bbb    b    b  bbb           b",
            "b           b               b        bbb     b",
            "b           b               b        bb      b",
            "b           b   bbb                  b       b",
            "bbbbbbbbb   b                                b",
            "b           b               b                b",
            "b  a        b               bbbbbb  bbbbbbb  b",
            "b           bbbbbbbbbbbbbbbbb                b",
            "b   b       b                      a         b",
            "b   b       b                                b",
            "bbbbb       b                                b",
            "b           b        bbbb   bbbbbbbbbbbbbbbbbb",
            "b           b        b                       b",
            "b       b   b        b                       b",
            "b       b   b   b    b                       b",
            "b       bbbbb e b    b   bbbbbbbbbbbbbbbbb   b", 
            "b           b   b    b   b               b   b",
            "b           b   b    b   b   bbbbbbbbb   b   b",
            "b   b       bbbbb    b   b   bbb         b   b",
            "b   b                b   b     bbb       b   b",
            "bbbbb                b   b       bbb     b   b",
            "b                    b   b         bbb   b   b",
            "b           b    e   b   b   bbbbbbbbb   b   b",
            "b       b   b        b   b               b   b",
            "b       b   b            bbbbbbbbbbbbbbbbb   b",
            "b  e    bbbbb                                b",
            "b           b        b                       b",
            "b           b        b                       b",
            "b   b       b        bbbbbbbbbbbbbbbbb   bbbbb",
            "b   b       b                    b   b       b",
            "bbbbb       b                    b   b       b",
            "b           b                            b   b",
            "b           b                        e   b   b",
            "b       bbbbb   bbbbbbbbbbb      bbbbbbbbb   b",
            "b   e   b                                    b",
            "b       b                                    b",
            "b                                            b",
            "b   b                                        b",
            "b   b                                        b",
            "b   b                                        b",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            
           /*
           "bbbbbbb",
           "b e   b",
           "b     b",
           "b     b",
           "b  r  b",
           "b     b",
           "b     b",
           "b   a b",
           "bbbbbbb",
           */
        ],
    ],
    load (complex) {
        complex = this.levels[complex]
        lvl = structuredClone(this.levels[complex])
        if(blocks.length > 0) this.reset() // ???
        
        grid = new pathfinding.Grid(complex.map(el => el.split("").map(char => BLOCK_CHARS.includes(char) ? 1 : 0)))

        MAP.maxY = complex.length * SIZE - SIZE / 2
        MAP.maxX = complex.sort((a, b) => b.length - a.length)[0].length * SIZE - SIZE / 2

        complex.forEach((level, y) => {
            for(let x = level.length; x--;){
                const char = level[x]
                const transposed = { x: x * SIZE, y: y * SIZE}
                switch(char){
                    case "b":
                        Block.new(
                            transposed.x,
                            transposed.y,
                            {
                                type: char
                            }
                        )
                    break
                    case "p":
                        player.set(
                            transposed.x, 
                            transposed.y
                        )
                    break
                    case "e":
                        Enemy.new(
                            transposed.x,
                            transposed.y
                        )
                    break
                    case "a":
                        Ally.new(
                            transposed.x,
                            transposed.y
                        )
                    break
                    case "r":
                        BreakableBlock.new(
                            transposed.x,
                            transposed.y
                        )
                }
            }
        })
    },
    reset () {
        blocks.length = 0
        collectibles.length = 0
        projectiles.length = 0
        effects.length = 0
        entities.length = 0
        enemies.length = 0
        allies.length = 0
    },
},
blocks = [], 
projectiles = [], 
collectibles = [], 
effects = [],
entities = [],
enemies = [],
allies = []
let scene = "game load", 
level = 0

pathfinding.Heuristic.euclidean = function(dx, dy) {
    return dx * dx + dy * dy;
}
let grid, finder = new pathfinding.AStarFinder({heuristic: pathfinding.Heuristic.euclidean })

// classes
/** @movement **/
class Entity {
    static id = 0
    constructor (x, y) {
        this.id = Entity.id++
        this.hitID = []

        this.x = x
        this.y = y
        this.grid = {
            x: $(x),
            y: $(y)
        }
        this.vel = {
            x: 0,
            y: 0,
            max: 5
        }

        this.size = SIZE
        this.health = 100
        this.gun = new Gun(this, "smg")
        this.index = entities.indexOf(this)
    }
    collide () {
        this.grid = { x: $(this.x), y: $(this.y) }
        this.index = entities.indexOf(this)
        this.hitID.forEach((id, i) => {
            if(!entities.find(ent => ent.id === id)) this.hitID.splice(i, 1)
        })

        entities.forEach((ent, i) => {
            const res = collision.circleCircle.physics(this, ent)
            if(res && i !== this.index){
                this.x = res.x
                this.y = res.y
            }
        })
        blocks.rev(block => {
            const res = collision.circleRect.physics(this, block)
            if(res){
                this.x = res.x
                this.y = res.y
                if(
                    collision.pointRect.collide({ x: this.x - SIZE / 2 - 1, y: this.y }, block) ||
                    collision.pointRect.collide({ x: this.x + SIZE / 2 + 1, y: this.y }, block)
                ) this.vel.x = 0
                if(
                    collision.pointRect.collide({ x: this.x, y: this.y - SIZE / 2 - 1 }, block) ||
                    collision.pointRect.collide({ x: this.x, y: this.y + SIZE / 2 + 1 }, block)
                ) this.vel.y = 0
            }
            
        })
        projectiles.forEach(p => {
            if(p.team !== this.team && collision.circleLine.collide(this, p, {x: p.x + p.vel.x, y: p.y + p.vel.y})){
                let res = Entity.onPoint(p, this)
                p.kill({
                    x: res.x,
                    y: res.y,
                    color: color(225, 125, 125)
                })
                this.health -= p.damage
            }
        })
    }
    static new (...args) {
        if(args[0] instanceof NPC || args[0] instanceof Player){
            entities.push(args[0])
        }
        else {
            entities.push(new Entity(...args))
        }
    }
    static onPoint (point, circle, size = circle.size) {
        size = circle.size ?? circle.s ?? circle.radius ?? circle.r ?? circle.diameter / 2 ?? circle.d / 2
        const vec = {
            x: point.x - circle.x,
            y: point.y - circle.y
        }
        const distance = sqrt(vec.x * vec.x + vec.y * vec.y)
        
        vec.x = vec.x / distance * size / 2
        vec.y = vec.y / distance * size / 2
        
        return {
            x: circle.x + vec.x,
            y: circle.y + vec.y
        }
    }
}


class Player extends Entity {
    constructor () {
        super(0, 0)
        this.acceleration = 0.25
        this.team = "ally"
        this.ang = 0
    }
    set (x, y) {
        this.x = x
        this.y = y
        this.grid.x = $(x)
        this.grid.y = $(y)
        Ally.new(player)
        camera.target = player
    }
    draw () {
        pushMatrix()
        translate(this.x, this.y)
        rotate(this.ang - 90)
        noStroke()
        fill(100, 175, 225)
        ellipse(0, 0, this.size - 1, this.size - 1)
        fill(this.health >= 0 ? color(0) : color(255, 0, 0), 100)
        rect(0, -SIZE * (3 / 5), this.health / (100 / SIZE), 3, 3)
        popMatrix()
    }
    move () {
        if(keys[UP] || keys['w']) this.vel.y -= this.acceleration
        else if(keys[DOWN] || keys['s']) this.vel.y += this.acceleration
        else this.vel.y = lerp(this.vel.y, 0, 0.1)
        
        if(keys[LEFT] || keys['a']) this.vel.x -= this.acceleration
        else if(keys[RIGHT] || keys['d']) this.vel.x += this.acceleration
        else this.vel.x = lerp(this.vel.x, 0, 0.1)
        
        this.vel.x = constrain(this.vel.x, -this.vel.max, this.vel.max)
        this.vel.y = constrain(this.vel.y, -this.vel.max, this.vel.max)
        
        this.x += this.vel.x
        this.y += this.vel.y
    }
    shoot () { // pew pew o.o x.x
        if(mouse[LEFT_BUTTON] || keys[32]) this.gun.fire(this.ang)
    }
    all () {
        this.ang = atan2(camera.my - this.y, camera.mx - this.x)
        this.move()
        this.collide()
        this.draw()
        this.shoot()
        this.gun.update()
        return this.health <= 0
    }
}
let player

class NPC extends Entity {
    constructor (x, y, color, team = "enemy") {
        super(x, y)
        this.color = color
        this.team = team

        this.ang = 0
        this.shootAng = 0
        this.speed = 5.25
        this.isStopping = false
        

        this.ray = false
        this.path = null
        
        this.target = null
        this.targetPos = { x: 0, y: 0}
        this.targetID = 0
        this.locked = false
    }
    draw () {
        pushMatrix()
        translate(this.x, this.y)
        rotate(this.ang - 90)
        noStroke()
        fill(this.color)
        ellipse(0, 0, this.size - 1, this.size - 1)
        if(this.gun.isReloading){
            fill(250)
            ellipse(0, 0, 10, 10)
        }
        fill(0, 100)
        rect(0, -SIZE / 2 - 3, this.health / (100 / SIZE), 3, 3)
        popMatrix()
    }
    focus () {
        let clone = grid.clone()
        grid.nodes[this.grid.y][this.grid.x].walkable = true
        grid.nodes[this.target.grid.y][this.target.grid.x].walkable = true
        this.path = finder.findPath(this.grid.x, this.grid.y, this.target.grid.x, this.target.grid.y, grid).map(el => {
            return {x: el[0] * SIZE, y: el[1] * SIZE}
        })
        grid = clone
        if(this.path.length > 1){
            if(dist(this.x, this.y, this.path[0].x, this.path[0].y) <= this.size / 1.5) this.path.shift()
        } 
    }
    updateMove () {
        this.ray = NPC.raymarch(this, this.target, complexes.levels[level])
        if(this.ray){
            this.focus()
            this.targetPos = this.path[0]
            this.isStopping = false
            return
        }
        this.targetPos = this.target
        if(disto(this, this.target) < SIZE * 10) this.isStopping = true
        if(this.isStopping && disto(this, this.target) > SIZE * 10.5) this.isStopping = false
    }
    move () {
        this.updateMove()
        this.ang = atan2(this.targetPos.y - this.y, this.targetPos.x - this.x)
        if(this.isStopping) this.speed = lerp(this.speed, 0, 0.2)
        else this.speed = lerp(this.speed, 5.25, 0.2)
        
        this.vel.x = cos(this.ang) * this.speed
        this.vel.y = sin(this.ang) * this.speed
        this.x += this.vel.x
        this.y += this.vel.y
    }
    aim () {
        let frameDiff = (dist(this.target.x, this.target.y, this.x, this.y) / this.gun.speed)
        let predictedPos = { x: this.target.x + this.target.vel.x * frameDiff, y: this.target.y + this.target.vel.y * frameDiff }
        this.shootAng = atan2(predictedPos.y - this.y, predictedPos.x - this.x)
    }
    find(arr) {
        if(arr.length < 1) return null
        let filtered = arr.filter(ent => ent.hitID.length < 1)
        let isDoubled = false
        if(filtered.length < 1) isDoubled = true
        else arr = filtered
        

        let maxDist = arr.reduce((a, b) => max(disto(this, a), disto(this, b)), -Infinity)
        arr.sort((a, b) => (
            (disto(this, a) / maxDist * 0.7 + a.health / 100 * 0.3) - 
            (disto(this, b) / maxDist * 0.7 + a.health / 100 * 0.3)
        ))
        this.locked = true
        if(isDoubled) return arr[0]
        if(this.team === "enemy"){
            allies[allies.indexOf(arr[0])].hitID.push(this.id)
        }
        else {
            enemies[enemies.indexOf(arr[0])].hitID.push(this.id)
        }
        return arr[0]
    }
    all () {
        this.draw()
        this.gun.update()
        if(entities.indexOf(this.target) < 0) this.locked = false
        if(!this.locked){
            if(this.team === "enemy"){
                this.target = this.find(allies)
            }
            else {
                this.target = this.find(enemies)
            }
        }
        if(this.locked){
            this.move()               
            if(!this.ray){
                this.aim()
                this.gun.fire(this.shootAng)
            }
        }
        this.collide()
        return this.health <= 0
    }
    static raymarch(o, t, arr, ang = atan2(t.x - o.x, t.y - o.y), limit = 2 * round(dist(o.x, o.y, t.x, t.y) / 2), count = 0, step = 5) {
        const grid = { x: $(o.x), y: $(o.y) };
        const vel = { x: sin(ang) * step, y: cos(ang) * step };
        if (arr[grid.y][grid.x] !== "b" && arr[grid.y][grid.x] !== "r" && count < limit) {
            return NPC.raymarch({ x: o.x + vel.x, y: o.y + vel.y }, t, arr, ang, limit, count + step);
        }
        return count < limit; // { x: o.x, y: o.y, hit: count < limit };
    }
}

class Enemy extends NPC {
    constructor(x, y){
        super(x, y, color(225, 125, 125))
    }
    static new (...args) {
        let e = new Enemy(...args)
        Entity.new(e)
        enemies.push(e)
    }
}
class Ally extends NPC {
    constructor(x, y){
        super(x, y, color(125, 200, 150), "ally")
    }
    static new (...args) {
        let a 
        if(args[0] instanceof Player) a = args[0]
        else a = new Ally(...args)
        Entity.new(a)
        allies.push(a)
    }
}

class Particles {
    constructor (x, y, specs) {
        this.particles = []
        for(let i = specs.num; i--;){
            this.particles.push({
                x: x,
                y: y,
                color: specs.color,
                alpha: specs.alpha ?? 255,
                ang: specs.range ? random(specs.range.min, specs.range.max) : random(360),
                speed: specs.speed,
                size: specs.size
            })
        }
    }
    run () {
        noStroke()
        this.particles.forEach((p, i) => {
            fill(p.color, p.alpha)
            ellipse(p.x, p.y, p.size, p.size)
            p.x += cos(p.ang) * p.speed
            p.y += sin(p.ang) * p.speed
            p.alpha = lerp(p.alpha, -1, 0.2)
            if(p.alpha <= 0) this.particles.splice(i, 1)
        })
        if(this.particles.length <= 0) effects.splice(effects.indexOf(this), 1)
    }
    static new (...args) {
        effects.push(new Particles(...args))
    }
}
class Round {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.ang = 0
        this.alpha = 255
    }
    run () {
        noStroke()
        fill(225, 150, 50, this.alpha)
        rect(this.x, this.y, 4, 6, 5)
        this.x += cos(this.ang)
        this.y += sin(this.ang)
        this.ang--
        this.alpha -= 5
        if(this.alpha <= 0) effects.splice(effects.indexOf(this), 1)
    }
    static new(...args) {
        effects.push(new Round(...args))
    }
}

class Gun {
    constructor (unit, type) {
        let specs = data.gun[type]
        this.unit = unit
        this.type = type
        this.recharge = specs.reload
        this.reload = 0
        this.isReloading = false
        this.rof = specs.rof
        this.rofTimer = 0
        this.speed = specs.speed
        this.damage = specs.damage
        this.clipSize = specs.clip
        this.rounds = specs.clip
        this.roundsDisplay = specs.clip
    }
    update () {
        this.roundsDisplay = floor(this.rounds)
        if(this.isReloading){
            this.rounds += this.clipSize / this.recharge
            this.reload--
            if(this.reload <= 0){
                this.rounds = this.clipSize
                this.isReloading = false
            }
            return
        }
        if(this.rounds > 0){
            if(this.rofTimer > 0) this.rofTimer--
            return
        }
        if(this.rounds <= 0){
            this.rofTimer = this.rof
            this.reload = this.recharge
            this.isReloading = true
            return
        }
    }
    fire (ang) {
        let gun = { x: this.unit.x + cos(ang) * (this.unit.size / 2 + 5), y: this.unit.y + sin(ang) * (this.unit.size / 2 + 5) }
        if(this.rofTimer <= 0){
            Bullet.new(gun.x, gun.y, {
                ang: ang + random(-3, 3),
                speed: this.speed,
                type: this.type,
                team: this.unit.team,
                damage: this.damage
            })
            Round.new(gun.x, gun.y)
            this.rofTimer = this.rof
            this.rounds--
        }
    }
}

class Bullet {
    #heh = 1
    constructor (x, y, specs) {
        this.x = x
        this.y = y
        this.size = BULLET_SIZE + this.#heh
        Object.assign(this, specs)
        this.vel = {
            x: cos(this.ang) * this.speed,
            y: sin(this.ang) * this.speed
        }
    }
    draw () {
        noStroke()
        fill(50)
        pushMatrix()
        translate(this.x, this.y)
        rotate(this.ang + 90)
        rect(0, 0, this.size / 4 - this.#heh, this.size - this.#heh, 3)
        popMatrix()
        this.x += this.vel.x
        this.y += this.vel.y
    }
    kill (specs) {
        let x, y
        if(specs && specs.x){
            x = specs.x
            y = specs.y
        }
        else {
            x = this.x
            y = this.y
        }
        Particles.new(x, y, {
            num: 20,
            color: specs && specs.color ? specs.color : color(50),
            speed: 1,
            size: 3
        })
        projectiles.splice(projectiles.indexOf(this), 1)
    }
    static new (...args) {
        projectiles.push(new Bullet(...args))
    }
}

class Block {
    constructor (x, y, specs) {
        this.x = x
        this.y = y
        this.grid = { x: $(x), y: $(y) }
        this.width = SIZE + 1
        this.height = SIZE + 1
    }
    draw () {
        noStroke()
        fill(100)
        rect(this.x, this.y, this.width, this.height)
    }
    collide () {
        projectiles.forEach((p) => {
            // first check - collide with block
            if(collision.circleRect.collide(p, this, 0)) p.kill()
        })
    }
    all () {
        this.draw()
        this.collide()
    }
    static new (...args) {
        blocks.push(new Block(...args))
    }
}
class BreakableBlock extends Block {
    constructor(x, y){
        super(x, y)
        this.health = 100
    }
    draw () {
        noStroke()
        fill(100)
        rect(this.x, this.y, this.width, this.height)
        rectMode(CORNER)
        if(this.health < 100){
            fill(225, 125, 125, 200)
            rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.health / 100 * this.height)
        }
        rectMode(CENTER)
    }
    collide () {
        projectiles.forEach((p) => {
            if(collision.circleRect.collide(p, this, 0)){
                this.health -= p.damage
                p.kill()
            }
        })
    }
    all () {
        this.draw()
        this.collide()
        return this.health <= 0
    }
    kill () {
        blocks.splice(blocks.indexOf(this), 1)
        Particles.new(this.x, this.y, {
            num: 50,
            color: color(100),
            speed: 2,
            size: 3
        })
    }
    static new (...args) {
        blocks.push(new BreakableBlock(...args))
    }
}

class Camera {
    constructor () {
        this.cam = {
            x: 0,
            y: 0
        }
        this.mouse = {
            x: 0,
            y: 0
        }
        this.target = null
    }
    run () {
        if(entities.indexOf(this.target) < 0){
            this.target = entities[random(entities.length) | 0]
        }

        this.cam.x = lerp(this.cam.x, this.target.x - width / 2, 0.2)
        this.cam.y = lerp(this.cam.y, this.target.y - height / 2, 0.2)
        this.mouse.x = this.cam.x + mouseX
        this.mouse.y = this.cam.y + mouseY
    }
    // getters, o.o
    get mx () {
        return this.mouse.x
    }
    get my () {
        return this.mouse.y
    }
    get x () {
        return this.cam.x
    }
    get y () {
        return this.cam.y
    }
}
const camera = new Camera()

void async function init () {
    player = new Player
    //canvas.focus()
    await getFont("Readex Pro")
    textFont("Readex Pro", 20)
}()
let minimap = []
function game () {
    grid = new pathfinding.Grid(complexes.levels[level].map((el, y) => el.split("").map((char, x) => {
        if(["b", "r"].includes(char)) return 1
        else if(entities.some(ent => ent.grid.x === x && ent.grid.y === y)) return 1
        else return 0
    })))
    minimap = complexes.levels[level].map((el, y) => el.split("").map((char, x) => {
        if(BLOCK_CHARS.includes(char) || blocks.some(block => block.grid.x === x && block.grid.y === y)) return 1
        else if(player.health > 0 && player.grid.x === x && player.grid.y === y) return 4
        else if(enemies.some(ent => ent.grid.x === x && ent.grid.y === y)) return 2
        else if(allies.some(ent => ent.grid.x === x && ent.grid.y === y)) return 3
        else return 0
    }))
    effects.rev(e => e.run())
    projectiles.rev(p => p.draw())
    blocks.rev((b, i) => b.all() && b.kill())
    entities.rev((ent, i) => {
        if(ent.all()){
            let team = ent.team
            if(ent.hitID.length > 0){
                ent.hitID.forEach(id => {
                    let i = entities.findIndex(e => e.id === id)
                    entities[i].locked = false
                })
            }
            entities.splice(i, 1)
            if(team === "ally") allies.splice(allies.indexOf(ent), 1)
            else enemies.splice(enemies.indexOf(ent), 1)
        }
    })
}
function drawMinimap (offset, size) {
    minimap.forEach((str, y) => {
        str.forEach((char, x) => {
            switch(char){
                case 0: fill(250, 200) 
                break
                case 1: fill(100, 200) 
                break
                case 2: fill(225, 125, 125, 200)
                break
                case 3: fill(125, 200, 150, 200)
                break
                case 4: fill(100, 175, 225, 200)
            }
            rect(x * size + offset.x, y * size + offset.y, size, size)
        })
    })
}
let done = false

draw = () => {
    try {
    switch(scene){
        case "graphix load":
            
        break
        case "game load":
            complexes.reset()
            complexes.load(level)
            scene = "game"
        break
        case "menu":
            
        break
        case "how":
            
        break
        case "game":
            if(!done){
                if(allies.length < 1){
                    println("enemies win")
                    done = true
                }
                if(enemies.length < 1){
                    println("allies win")
                    done = true
                }
            }
            camera.run()
            background(250)
            pushMatrix()
            translate(width / 2, height / 2)
            //scale(1 / 3)
            translate(-width / 2, -height / 2)
            pushMatrix()
                translate(-camera.x, -camera.y)
                game()
            popMatrix()
            popMatrix()
            drawMinimap({ x: width - 46 * 3 - 5, y: height - 46 * 3 - 10}, 3)
            fill(50)
            text(player.gun.roundsDisplay + "\n" + fps.toFixed(2), 5, height - 20)
        break
        case "dev":
            
        break
    }
    }
    catch(e){
        noLoop()
        println(e.stack)
    }
}