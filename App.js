import {characterComponent} from './Components/test.js';

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


let character = characterComponent()[0];
console.log(character);
let characterSheet = characterComponent()[1];
app.stage.addChild(character);
let enemy;
let speed = 5;
let keys = {};


document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
});

document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
});


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
}

function collision(a, b){
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    
    return aBox.x + bBox.width > bBox.x &&
           aBox.x < bBox.x + bBox.width &&
           aBox.y + aBox.height > bBox.y &&
           aBox.y < bBox.y + bBox.height;
}
