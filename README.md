# A-FRAME Room Creator component and Map Editor Tool (BETA 1.1) 
By Chris Godber (DrNoir GH)

![alt text](https://github.com/drnoir/A-Frame_RoomCreator/blob/master/roomcomponent.jpg?raw=true)
Room maker and room editor component prototype based on 
https://hacks.mozilla.org/2017/09/i-built-something-with-a-frame-in-2-days-and-you-can-too/ by 
Dan Brown @slightlyoffbeat / https://www.danvswild.com/


### Try it Out

### Component Demos

Standard: 
- https://drnoir.github.io/A-Frame_RoomCreator/examples/standard.html

For VR:
- https://drnoir.github.io/A-Frame_RoomCreator/examples/VRRooms.html

### Map Editor (under Tools)
https://drnoir.github.io/A-Frame_RoomCreator/Tools/MapEditor/

### Purpose:
A basic map editor and exporter and A-Frame component for building rooms and block based enviroments

### Features
- Map Editor with export under tools to create square rooms of fixed height and width  (25x25,50x50, 100 x 100)
- Create multiple custom rooms with the 'room' component
- Assign custum textures to rooms

![alt text](https://raw.githubusercontent.com/drnoir/A-Frame_RoomCreator/master/editor.jpg?raw=true)

### How to create a room with the map editor
Tools/MapEditor and open index.html

This is a simple app for creating maps to export as json for use by the component.

you can add walls, 1/2 walls and 1/3 walls and toggle delete mode to delete walls you've added. 

Click the Export the map button to export the map you build. 

The map editor also includes several templates to start you off with generic sizes - 25 x 25, 50 x 50 
A future version will hopefully include the ability to create custom templates. 

####PLEASE NOTE: 
Currently, all width and heights of maps need to be square so 25 x 25 and not 25 x 27 for example

### Import maps into component 
Create a json file in following format or simply copy and paste map.json in dist

Copy exported array from map editor and replace "data" with your exported array
    
    {
    "data": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    "height": 25,
    "width": 25
    }

There is also a YouTube tutorial on map exporting and importing here - Tutorial on importing maps (Ver 1.0.0) on YouTube here - https://youtu.be/_lUWkL84bjA

### Component Schema
The modifiable schema - you can pass values and modify the following values - 
To add a custom map - add mapToLoad with the name of the JSON file containing the map data you exported before.
You can add as many rooms as you want. This will load the map data and other metadata from the JSON, expecting the format as above

    wallColor: {type: 'string', default: 'white'},
    floorColor: {type: 'string', default: 'white'},
    wallTexture: {type: 'string', default: 'none'},
    wallTexture2: {type: 'string', default: 'none'},
    wallTexture3: {type: 'string', default: 'none'},
    scale:{type: 'string', default: '1 1 1'},
    wallSize: {type:'string', default:'1'},
    wallHeight: {type:'string', default:'3'},
    mapToLoad: {type:'string', default: 'map'},
    mapSource: {type:'array', default:[]}
    indoor: {type:'boolean', default:false}

### Typical Example of using the Room Component
An example of two entities using the room component to generate two separate maps, as show in the examples in 
index.html of this repo. To pass custom textures, you must also load the textures into A-frame assets and pass the component
the ID of the asset. 

Include the room.js or room.min.js component code 

    <script src="room.js"></script>

Add the room component to an entity

     <!-- rooms component examples-->
     <a-entity id ="room" room="mapToLoad:mapTest; wallColor:red; wallTexture:brick;"></a-entity>
     <a-entity id ="room2"  position ='0 0 -30' room="mapToLoad:mapTest2; wallColor:green; wallTexture:brick;"></a-entity>

#### PLEASE NOTE: 
Maps must be in the same directory as the html file for your scene


### Version Changes

- 1.1.0 - Updated UI and bugfixes
- 1.0 initial Release