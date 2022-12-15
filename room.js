// Aframe room component by Chris Godber
// Based on https://hacks.mozilla.org/2017/09/i-built-something-with-a-frame-in-2-days-and-you-can-too/
// and https://24ways.org/2016/first-steps-in-vr/
let mapSourceRaw = [];
AFRAME.registerComponent('room', {
    schema: {
        wallColor: {type: 'string', default: 'white'},
        floorColor: {type: 'string', default: 'white'},
        wallTexture: {type: 'string', default: 'none'},
        scale:{type: 'string', default: '1 1 1'},
        wallSize: {type:'string', default:'1'},
        wallHeight: {type:'string', default:'3'},
        mapToLoad: {type:'string', default: 'map'},
        mapSource: {type:'array', default:[]}
    },
    init: async function () {
        await this.loadData()
    },

    loadData : async function() {
        //scene loading / aFrame loading
        const data = this.data;
        const mapToLoad = data.mapToLoad;
        await this.loadMap(mapToLoad);
        // run create scene routine
        await this.createRooms();
    },

    loadMap : async function loadMap(mapToLoad) {
        const data = this.data;
        let fetchURL = mapToLoad+'.json';
        const res = await fetch(fetchURL)
        mapSourceRaw = await res.json();
        this.data.mapSource =  mapSourceRaw
    },

    createRooms: function (){
        const data = this.data;
        const mapSource =  this.data.mapSource
        const wallTexture = data.wallTexture;
        const floorTexture = data.floorTexture;
        let scale = data.scale;
        const elScale = data.scale;
        const wallColor = data.wallColor;
        const floorColor = data.floorColor;
        let mapWall;
        const WALL_SIZE = data.wallSize;
        const WALL_HEIGHT = data.wallHeight;
        console.log(mapSource ,WALL_SIZE, WALL_HEIGHT , mapSource.height )
        for (let x = 0; x < mapSource.height; x++) {
            for (let y = 0; y < mapSource.width; y++) {
                console.log('room running');
                const i = (y * mapSource.width) + x;
                const floorPos = `${((x - (mapSource.width / 2)) * WALL_SIZE)} 0 ${(y - (mapSource.height / 2)) * WALL_SIZE}`;
                const position = `${((x - (mapSource.width / 2)) * WALL_SIZE)} ${(WALL_HEIGHT / 2)} ${(y - (mapSource.height / 2)) * WALL_SIZE}`;
                const halfYposition = `${((x - (mapSource.width / 2)) * WALL_SIZE)} 0 ${(y - (mapSource.height / 2)) * WALL_SIZE}`;
                const quarterYposition = `${((x - (mapSource.width / 2)) * WALL_SIZE)} 0 ${(y - (mapSource.height / 4)) * WALL_SIZE}`;
                // if the number is 1 - 4, create a wall
                if (mapSource.data[i] === 0 || mapSource.data[i] === 1 || mapSource.data[i] == 2 || mapSource.data[i] === 3) {
                    wall = document.createElement('a-box');
                    wall.setAttribute('width', WALL_SIZE);
                    wall.setAttribute('height', WALL_HEIGHT);
                    wall.setAttribute('depth', WALL_SIZE);
                    wall.setAttribute('position', position);
                    wall.setAttribute('material', 'src:#' + wallTexture);
                    this.el.appendChild(wall);
                    // floor
                    if (mapSource.data[i] === 0) {
                        wall.setAttribute('color', floorColor );
                        wall.setAttribute('height', WALL_HEIGHT / 20);
                        wall.setAttribute('static-body', '');
                        wall.setAttribute('position', floorPos);
                        wall.setAttribute('material', 'src:#' + floorTexture);
                    }
                    // full height wall
                    if (mapSource.data[i] === 1) {
                        wall.setAttribute('color', wallColor);
                        wall.setAttribute('height', WALL_HEIGHT);
                        wall.setAttribute('static-body', '');
                        wall.setAttribute('position', position);
                        wall.setAttribute('material', 'src:#' + wallTexture);
                    }
                    // 1/2 height wall
                    if (mapSource.data[i] === 2) {
                        wall.setAttribute('color', wallColor);
                        wall.setAttribute('height', WALL_HEIGHT / 2);
                        wall.setAttribute('static-body', '');
                        wall.setAttribute('position', halfYposition);
                        wall.setAttribute('material', 'src:#' + wallTexture);
                    }
                    //  1/4 height wall
                    if (mapSource.data[i] === 3) {
                        wall.setAttribute('color', wallColor);
                        wall.setAttribute('height', WALL_HEIGHT / 4);
                        wall.setAttribute('static-body', '');
                        wall.setAttribute('position', quarterYposition);
                        wall.setAttribute('material', 'src:#' + wallTexture);
                    }
                }
            }
        }
    },
    });

