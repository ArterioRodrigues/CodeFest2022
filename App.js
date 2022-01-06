import {test} from './Components/test.js';

console.log(test());


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const Application = PIXI.Application;
const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
});

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);


const mapTexture = PIXI.Texture.from('./images/map.png');
const mapSprite = new PIXI.Sprite(mapTexture);
mapSprite.scale.set(5,5);
app.stage.addChild(mapSprite);

let character;
let characterSheet = [];
let enemy;
let speed = 5;
let keys = {};


document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
});

document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
});


const loader = PIXI.Loader.shared;

loader.add('still', './images/still_animation/still.json')
    .add('walk_east', './images/walk_east/walk_east.json')
    .add('walk_west', './images/walk_west/walk_west.json')
    .load(setup);

function setup(loader, resources) {
    createCharacterSheet();
    createCharacter();
    createEnemy();
    app.ticker.add(gameloop);
}

function createCharacterSheet(){
    const textures_1 = [];
    const textures_2 = [];
    const textures_3 = [];
    for(let i = 1; i < 9; i++){
        const texture_1 = PIXI.Texture.from(`still_${i}.png`);
        const texture_2 = PIXI.Texture.from(`walk_frames_${i}.png`);
        const texture_3 = PIXI.Texture.from(`walk_west_frames_${i}.png`)
        
        textures_1.push(texture_1);
        textures_2.push(texture_2);
        textures_3.push(texture_3);
    }
    
    characterSheet['still'] = textures_1;
    characterSheet['walk_east'] = textures_2;
    characterSheet['walk_west'] = textures_3;
}

function createCharacter(){
    character = new PIXI.AnimatedSprite(characterSheet['still']);
    character.anchor.set(0.5);
    character.animationSpeed = 0.03;

    character.x = app.view.width / 2 - 300;
    character.y = app.view.height/ 2;
    character.scale.set(5,5);

    app.stage.addChild(character);
}

function createEnemy(){
    enemy = new PIXI.AnimatedSprite(characterSheet['still']);
    enemy.anchor.set(0.5);
    enemy.animationSpeed = 0.03;

    enemy.x = app.view.width / 2 + 300;
    enemy.y = app.view.height/ 2;
    enemy.scale.set(5,5);
    enemy.play();
    app.stage.addChild(enemy);
}

function gameloop() {
    if(keys['87']) 
        character.y -= speed;
    if(keys['65']) 
    {
        if(!(character.textures === characterSheet['walk_west'])){

            character.textures = characterSheet['walk_west'];
            character.animationSpeed = 0.3;
            character.play();
        }
        character.x -= speed;
    }
    if(keys['83']) 
        character.y += speed;
    if(keys['68']) 
    {
        if(!(character.textures === characterSheet['walk_east'])){

            character.textures = characterSheet['walk_east'];
            character.animationSpeed = 0.3;
            character.play();
        }
        character.x += speed;
    }
    
    if(!(keys['87'] || keys['65'] || keys['83'] || keys['68']) ){
        if(!(character.textures === characterSheet['still']) || !character.playing){
            character.textures = characterSheet['still'];
            character.animationSpeed = 0.03;
            character.play();
        }
    }
    if(collision(character,enemy)){
        speed = 0;
    }
}

function collision(a, b){
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    
    return aBox.x + bBox.width > bBox.x &&
           aBox.x < bBox.x + bBox.width &&
           aBox.y + aBox.height > bBox.y &&
           aBox.y < bBox.y + bBox.height;
}
