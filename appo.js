const app = new PIXI.Application();

const ufoList = [];
document.body.appendChild(app.view);

const goku = PIXI.Sprite.from('assets/gokubase.png');

goku.scale.x = 0.17;
goku.scale.y = 0.17;
goku.x = 350;
goku.y = 540;
app.stage.addChild(goku);



gameInterval(function(){
    const ufo = PIXI.Sprite.from('assets/ufo' + random(1,2) + '.png');
    ufo.x = random(0, 600);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 5.0);    

    waitForCollision(ufo, goku).then(function() {
        app.stage.removeChild(goku);
        stopGame();

    });
    
}, 100);

function leftKeyPressed(){
    goku.x = goku.x - 8; 
}
function rightKeyPressed(){
    goku.x = goku.x + 8; 
}
function upKeyPressed(){
goku.y = goku.y - 8;
}
function downKeyPressed(){
    goku.y = goku.y + 8;
    }

function spaceKeyPressed(){
    const bullet = PIXI.Sprite.from('assets/kamehameha.png');
    bullet.x = goku.x + 13;
    bullet.y = goku.y;
    bullet.scale.x = 0.08;
    bullet.scale.y = 0.08;
    flyUp(bullet);
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
        
    });
}