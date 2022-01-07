export function characterComponent(){
    let character;
    let characterSheet = [];
    const loader = PIXI.Loader.shared;

    loader.add('still', '../images/still_animation/still.json')
        .add('walk_east', '../images/walk_east/walk_east.json')
        .add('walk_west', '../images/walk_west/walk_west.json')
        .load(setup);

    function setup(loader, resources) {
        createCharacterSheet();
        createCharacter();
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

        character.scale.set(5,5);
    }

    return [character, characterSheet];
}