class Map extends PIXI.Container {

    constructor(mouse) {

        super();

        this.mouse = mouse;
        this.drag = null;

    }

    update() {

        if (this.mouse.right) {

            if (this.drag) {

                //this.worldAngle(-(game.input.activePointer.x - game.origDragPointr.x) / 100);
                console.log('rotate');

            } else {

                this.drag = { x: this.mouse.x, y: this.mouse.y };


            }

        } else {

            this.drag = null;

        }

        this.children.sort(function (a, b) {

            return b.iso.y - a.iso.y + a.iso.x - b.iso.x + a.iso.z - b.iso.z;

        })

        this.children.forEach(function (child) {

            child.update();

        })

    }

}

class Tile extends PIXI.Graphics {

    constructor(x, y, z) {

        super();

        this.iso = { x: x, y: y, z: z };

        this.geometry = [

            [
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: 0 },
                { x: 1, y: 1, z: 0 },
                { x: 0, y: 1, z: 0 }

            ],
            [
                { x: 0, y: 0, z: 1 },
                { x: 1, y: 0, z: 1 },
                { x: 1, y: 1, z: 1 },
                { x: 0, y: 1, z: 1 }

            ],
            [
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: 0 },
                { x: 1, y: 0, z: 1 },
                { x: 0, y: 0, z: 1 }

            ],
            [
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 1, z: 0 },
                { x: 0, y: 1, z: 1 },
                { x: 0, y: 0, z: 1 }

            ],
            [
                { x: 0, y: 1, z: 0 },
                { x: 1, y: 1, z: 0 },
                { x: 1, y: 1, z: 1 },
                { x: 0, y: 1, z: 1 }

            ],
            [
                { x: 1, y: 0, z: 0 },
                { x: 1, y: 1, z: 0 },
                { x: 1, y: 1, z: 1 },
                { x: 1, y: 0, z: 1 }

            ]

        ]

        this.interactive = true;

        this.on('mouseover', function () {

            this.tint = 0x555555;

        })

        this.on('mouseout', function () {

            this.tint = 0xffffff;

        })

    }

    sort() {

        this.geometry.forEach(function (face) {

            let sum = { x: 0, y: 0, z: 0 };

            face.forEach(function (point) {

                sum.x += point.x / face.length;
                sum.y += point.y / face.length;
                sum.z += point.z / face.length;

            })

            face.sum = sum;

        })

        this.geometry.sort(function (a, b) {

            return b.sum.y - a.sum.y + a.sum.x - b.sum.x + a.sum.z - b.sum.z;

        })

    }

    draw() {

        this.beginFill(0x212121, 1);
        this.lineStyle(2, 0xffffff);

        this.geometry.forEach(function (face) {

            let p = isoto2d(this.iso.x + face[0].x,
                this.iso.y + face[0].y,
                this.iso.z + face[0].z);

            this.moveTo(p.x, p.y);

            for (let i = 1; i < face.length; i++) {

                let mp = isoto2d(this.iso.x + face[i].x,
                    this.iso.y + face[i].y,
                    this.iso.z + face[i].z);

                this.lineTo(mp.x, mp.y);

            }

            this.lineTo(p.x, p.y);

        }, this)

        this.endFill();

    }

    update() {

        this.clear();

        this.sort();

        this.draw();

    }

}

class Test extends Tile {

    constructor(x, y, z) {

        super(x, y, z);

        this.geometry = [

            [
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: 0 },
                { x: 1, y: 1, z: 0 },
                { x: 0, y: 1, z: 0 }

            ]

        ]

    }

}

function isoto2d(x, y, z) {

    return { x: 32 * x + 32 * y, y: 16 * x - 16 * y - z * 32 };

}