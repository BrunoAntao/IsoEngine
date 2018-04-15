let app = new PIXI.Application({ width: 1920 / 2, height: 1080 / 2 });
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x000000;

let mouse = { x: 0, y: 0, left: false, right: false };

let map = new Map(mouse);

for (let x = 0; x < 10; x++) {

    for (let y = 0; y < 10; y++) {

        map.addChild(new Tile(x, y, 0));

    }

}

map.x = 32;
map.y = 16 * 10 + 32;

function update() {

    app.renderer.render(map);

    map.update();

    requestAnimationFrame(update);

}

update();

document.oncontextmenu = function () {

    return false;

}

window.addEventListener('mousedown', function (e) {

    switch (e.button) {

        case 0: mouse.left = true; break;
        case 2: mouse.right = true; break;

    }

})

window.addEventListener('mouseup', function (e) {

    mouse.x = e.pageX;
    mouse.y = e.pageY;

    switch (e.button) {

        case 0: mouse.left = false; break;
        case 2: mouse.right = false; break;

    }

})