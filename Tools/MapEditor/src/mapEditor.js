// map editor js - main js scrupt for the map editor for creating maps

// global map editor vars
let sceneMetadata;
let textures;
let mapTemplate = [];
let templateSize = 25;
let templateWalled = false;
let chars;
let mapRes;
let saveNum = 1;
let wallHeight = 5;
let heightY = 2.5
let currentEntity= 1;

// textures
let wallTexture;
let floorTexture;
let doorTexture;
let wallTexture2;
let wallTexture3;

// possible options - wall, door, enemies
let paintMode = ['wall','enemies', 'door', 'delete' ];
let currentPaintMode =  paintMode[0];
let deleteMode =false;

// scene elements
const scene = document.querySelector('a-scene');
const assets = document.querySelector('a-assets');

//buttons / ui
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('mousedown', (event) => {
    exportJSON();
});

function clearScene(){
    const el = document.getElementById('room');
    el.parentNode.removeChild(el);

}

AFRAME.registerComponent('editor-listener', {
    schema: {
        parse: AFRAME.utils.styleParser.parse,
        visible: {type: 'boolean', default: true},
        index: {type: 'number', default: 0},
        colors: {type: 'array', default: ['red', 'white']}
    },
    init: function () {
        const data = this.data;
        let index = data.index;
        const el = this.el;
        // this.el.addEventListener('mouseover', function (evt) {
        //     let lastHoverIndex = (lastHoverIndex + 1) % data.colors.length;
        //     this.el.setAttribute('material', 'color', data.colors[lastHoverIndex]);
        // });
        //
        // this.el.addEventListener('mouseout', function (evt) {
        //     let lastHoverIndex = (lastHoverIndex - 1) % data.colors.length;
        //     this.el.setAttribute('material', 'color', "#fff");
        // });
        this.el.addEventListener('mousedown', function (evt) {
            const WALL_HEIGHT = wallHeight;
            if (currentPaintMode === "wall" ) {
                // this.setAttribute('material', 'color', "#000");
                el.setAttribute('material', 'src:#' + wallTexture);
                el.setAttribute('height', wallHeight);
                if (currentEntity === 1 && !deleteMode) {
                    el.object3D.position.y = 2.5;
                } else if (currentEntity === 2 && !deleteMode) {
                    el.object3D.position.y = 1;
                    el.setAttribute('material', 'src:#' + wallTexture2);
                }
                else if (currentEntity === 3 && !deleteMode) {
                    l.object3D.position.y = 0.5;
                    el.setAttribute('material', 'src:#' + wallTexture3);
                }
                else if (currentEntity === 0 && deleteMode) {
                    el.object3D.position.y = 0;
                    el.setAttribute('height', WALL_HEIGHT / 20);
                    el.setAttribute('material', 'src:#' + floorTexture);
                }
                else {
                    el.object3D.position.y = 0;
                    el.setAttribute('height', WALL_HEIGHT / 20);
                    el.setAttribute('material', 'src:#' + floorTexture);
                }
                console.log('I was clicked at: ', evt.detail.intersection.point);
                console.log('I was clicked at: ', evt.detail.intersection);
                console.log('index Map: ', index);
                // update the map and show new element
                updateMap(index, currentEntity);
            }
            if (currentPaintMode === "door" ) {
                el.setAttribute('material', 'src:#' + doorTexture);
                el.setAttribute('height', wallHeight);
                el.object3D.position.y = 0.5;
                el.setAttribute('material',  'src:#' + doorTexture+'repeat:1 1');
                // update the map and show new element
                updateMap(index, currentEntity);
            }
        });
    },

});



function updateMap(indexToReplace, mapNumType) {
    console.log('update map index'+indexToReplace, mapNumType)
    mapTemplate.splice(indexToReplace, 1, mapNumType);
    console.log('map arr is now' + mapTemplate)
}

AFRAME.registerComponent('map', {
    schema: {
        mapData: {type: 'array', default: mapTemplate},
        parse: AFRAME.utils.styleParser.parse,
        visible: {type: 'boolean', default: true},
    },
    init: function () {
        let data = this.data;
        object3D.position.set(data.x, data.y, data.z);
    },
    update: function () {

    }

});

//create the blank map scene
init();

async function init() {
    let room = document.createElement('a-entity');
    room.setAttribute('id', 'room');
    scene.appendChild(room);
    await loadTextures();
    await loadMapTemplateData( templateSize);
    await createRooms();
}

async function loadMapTemplateData(templateSize) {
    let fetchURL
    if (!templateWalled) {
         fetchURL = './mapTemplates/map' + templateSize + templateSize + '.json';
    }
    else{
        fetchURL = './mapTemplates/map' + templateSize + templateSize +'Walled.json';
    }
    const res = await fetch(fetchURL)
    mapRes = await res.json();
    mapTemplate = mapRes.data;
    console.log(mapRes.length);
}


async function loadTextures(e) {
    let fetchURL = './textures/textures.json';
    const res = await fetch(fetchURL)
    textures = await res.json();
    // allocate textures from JSON config
   wallTexture = textures.textures[0].id;
   floorTexture = textures.textures[1].id;
   doorTexture = textures.textures[2].id;
   wallTexture2 = textures.textures[3].id;
   wallTexture3 = textures.textures[4].id;
}

function createRooms() {
    const mapData = mapTemplate;
    console.log(mapData, mapRes.height);
    let roomType = "Map Editor";
    // char info
    const chars = mapRes.chars;
    const charNum = mapRes.charnumber;
    let charLoopIndex = 0;

    const WALL_SIZE = 0.8;
    const WALL_HEIGHT = wallHeight;
    const el = document.getElementById('room');
    // let playerPos;
    let wall;
    let floorIndex = 0;

    if (roomType === "Indoor") {
        let ceil = document.createElement('a-box');
        let ceilArea = (mapRes.width * mapRes.height);
        ceil.setAttribute('width', ceilArea * 2);
        ceil.setAttribute('height', ceilArea * 2);
        ceil.setAttribute('rotation', '-90 0 0');
        ceil.setAttribute('position', '0 6 0');
        ceil.setAttribute('scale', '0.2 0.2 0.2');
        ceil.setAttribute('material', 'src: #grunge; repeat: 1 2');
        el.appendChild(ceil);
    }

    for (let x = 0; x < mapRes.height; x++) {
        for (let y = 0; y < mapRes.width; y++) {
            floorIndex++;
            const i = (y * mapRes.width) + x;
            const floorPos = `${((x - (mapRes.width / 2)) * WALL_SIZE)} 0 ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const position = `${((x - (mapRes.width / 2)) * WALL_SIZE)} ${(WALL_HEIGHT/2)} ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const halfYposition = `${((x - (mapRes.width / 2)) * WALL_SIZE)} 1 ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const quarterYposition = `${((x - (mapRes.width / 2)) * WALL_SIZE)} 0 ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const charPos = `${((x - (mapRes.width / 2)) * WALL_SIZE)} 0 ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const torchPosition = `${((x - (mapRes.width / 2)) * WALL_SIZE)} 4 ${(y - (mapRes.height / 2)) * WALL_SIZE}`;
            const stairsPos = `${((x - (mapRes.width / 2)) * WALL_SIZE)} ${(y - (mapRes.height)) * WALL_SIZE} ${(y - (mapRes.height / 2)) * WALL_SIZE}`;

            // if the number is 1 - 4, create a wall
            if (mapData[i] === 0 || mapData[i] === 1 || mapData[i] == 2 || mapData[i] === 3 || mapData[i] === 4) {
                wall = document.createElement('a-box');
                wall.setAttribute('width', WALL_SIZE);
                wall.setAttribute('height', WALL_HEIGHT);
                wall.setAttribute('depth', WALL_SIZE);
                wall.setAttribute('position', position);
                wall.setAttribute('material', 'src: #grunge; repeat: 1 2');
                wall.setAttribute('editor-listener', 'index:'+floorIndex);
                el.appendChild(wall);

                // floor
                if (mapData[i] === 0) {
                    // wall.setAttribute('color', '#000');
                    wall.setAttribute('height', WALL_HEIGHT / 20);
                    wall.setAttribute('static-body', '');
                    wall.setAttribute('position', floorPos);
                    // wall.setAttribute('index', y);
                    // wall.setAttribute('load-texture', '');
                    wall.setAttribute('material', 'src:#' + floorTexture);
                }
                // full height wall
                if (mapData[i] === 1) {
                    // wall.setAttribute('color', '#000');
                    wall.setAttribute('height', WALL_HEIGHT);
                    wall.setAttribute('static-body', '');
                    // wall.setAttribute('load-texture', '');
                    wall.setAttribute('position', position);
                    wall.setAttribute('material', 'src:#' + wallTexture);
                }
                // 1/2 height wall
                if (mapData[i] === 2) {
                    // wall.setAttribute('color', '#000');
                    wall.setAttribute('height', WALL_HEIGHT / 2);
                    wall.setAttribute('static-body', '');
                    // wall.setAttribute('load-texture', '');
                    wall.setAttribute('position', halfYposition);
                    wall.setAttribute('material', 'src:#' + wallTexture2);
                }
                //  1/4 height wall
                if (mapData[i] === 3) {
                    wall.setAttribute('height', WALL_HEIGHT / 4);
                    wall.setAttribute('static-body', '');
                    wall.setAttribute('position', quarterYposition);
                    wall.setAttribute('material', 'src:#' + wallTexture2);
                }
            }
        }
    }
}


function exportJSON() {
    let data = {
        key: 'data'
    };
    let fileName = 'newPapyrusMap'+saveNum+'.json';
    // structure the map for consumption by engine
    // for every width length - add a space - FOR EXAMPLE 25 - ADD NEW LINEBREAK EVERY 25 ARR ELEMENTS
    // let structArr = addNewlines(mapTemplate, templateSize);
    // console.log('stuctured array'+structArr);
    let JSONBlog = JSON.stringify(mapTemplate);
    // let JSONParsed = addNewlines(JSONBlog, templateSize);
    // Create a blob of the data
         const fileToSave = new Blob([JSONBlog], {
        type: 'application/json'
    });
// Save the file
    saveAs(fileToSave, fileName);
    // increment save num for file names
    saveNum++;
}

function addNewlines(arr, breakLength) {
    arr.toString();
    while (arr.length > 0){
        for (let i = 0; i < arr.length; i++) {
        //if increment is divided by 2 and there is not a remainder of 0
         if (i% breakLength===0 && i!== 0){
            //console log the length
            console.log(arr[i])
            //append a line break after every 10th element
            //     arr.splice(i,0, '\n');
             arr[i] = parseInt(arr[i]+"\n");
        }
    }
        return arr;
}}

// UI set option
function setOption(id) {
    const e = document.getElementById(id);
    let value = e.value;
    allHeightSwitch(value);
    return parseInt(value);
}

const wallType = document.getElementById('wallType')
// reassign types for select dropdown UI
wallType.addEventListener("change", function() {
    currentEntity = setOption('wallType');
});

const mapTemplateSize = document.getElementById('templateSize')
// reassign types template size for select dropdown UI
mapTemplateSize.addEventListener("change", function() {
    templateSize = setOption('templateSize');
    clearScene();
    init();
});

const paintModeSelect = document.getElementById('paintmode')
// reassign types for select dropdown UI
paintModeSelect.addEventListener("change", function() {
    let SelectedPaintMode = setOption('paintmode');
    currentPaintMode = paintMode[SelectedPaintMode];
    switchPaintMode( currentPaintMode);
    console.log(currentPaintMode, paintMode[SelectedPaintMode]);
});

const enemyTypeSelect = document.getElementById('enemies"')


function allHeightSwitch(currentEntity){
    console.log('passed Curr'+currentEntity);
    if (currentEntity == 0){
        wallHeight = 0;
        heightY= wallHeight/2;
    }
    if (currentEntity == 1){
        wallHeight = 5;
        heightY= wallHeight/2;
    }
    else if (currentEntity == 2){
        console.log("current entity matched"+currentEntity);
        wallHeight = 5/2;
        heightY = 1;
        console.log(wallHeight);
    }
    else if (currentEntity == 3){
        console.log("current entity matched"+currentEntity);
        wallHeight = 5/4;
        heightY = 0;
        console.log(wallHeight);
    }

    else{
        wallHeight = 5;
    }
}


function switchPaintMode(currentPaintMode){
    const enemyTitle = document.getElementById('enemiesTitle');

    if (currentPaintMode === "wall"){
        enemyTypeSelect.setAttribute('hidden', '');
        enemyTitle.setAttribute('hidden', '');
    }
    if (currentPaintMode === "enemies"){
        enemyTypeSelect.removeAttribute('hidden', '');
        enemyTitle.removeAttribute('hidden', '');
    }
    if (currentPaintMode === "door"){
        enemyTypeSelect.setAttribute('hidden', '');
        enemyTitle.setAttribute('hidden', '');
        wallHeight = 2.5;
        heightY = 1;
    }
}


const deleteCheckbox = document.querySelector("input[name=deletemode]");
deleteCheckbox.addEventListener('change', function() {
    if (this.checked) {
        deleteMode = true;
        currentEntity = 0;
        console.log(deleteMode)
    }
    if (!this.checked) {
        deleteMode = false;
        currentEntity = setOption('wallType');
        console.log(deleteMode)
    }
});