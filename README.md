# A-FRAME Room Creator component (BETA 1.0) 
BY Chris Godber

Room maker and room editor component prototype based on 
https://hacks.mozilla.org/2017/09/i-built-something-with-a-frame-in-2-days-and-you-can-too/ by 
Dan Brown @slightlyoffbeat / https://www.danvswild.com/

### Purpose:
A basic prototypal map editor and A-Frame component for building rooms 

### Features
- Map Editor with export under tools to create square rooms of fixed height and width 
- Create multiple custom rooms with the 'room' component
- Add custom textures colors etc to walls

### How to create a room with the map editor
Tools/MapEditor and open index.html
This is a simple interface for creating maps to export you can add walls, 1/2 walls and 1/3 walls 
and init delete mode to delete walls you've added. Export to export as an array.
The map editor also includes several templates to start you off with generic sizes - 25 x 25, 50 x 50 etc
But you can add your own if you wish. 

####PLEASE NOTE: 
currently, all width and heights of maps need to be square so 25 x 25 and not 25 x 27 for example

### Import maps into component 
Open mapTest.json 
Copy exported array from map editor and replace "data" with your exported array
    
    {
    "data": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    "height": 25,
    "width": 25
    }

### Component Schema

The modifiable schema - you can pass values and modify the following values - 
To add a custom map - add mapToLoad with the name of the JSON file containing the map data you exported before.
You can add as many rooms as you want. This will load the map data and other metadata from the JSON, expecting the format as above


    wallColor: {type: 'string', default: 'white'},
    floorColor: {type: 'string', default: 'white'},
    wallTexture: {type: 'string', default: 'none'},
    scale:{type: 'string', default: '1 1 1'},
    wallSize: {type:'string', default:'1'},
    wallHeight: {type:'string', default:'3'},
    mapToLoad: {type:'string', default: 'map'},
    mapSource: {type:'array', default:[]}
    

### Typical Example of using the Room Component
An example of two entities using the room component to generate two separate maps, as show in the examples in 
index.html of this repo. To pass custum textures, you must also load the textures into A-frame assets and pass the component
the ID of the asset. 

     <!-- rooms component examples-->
    <a-entity id ="room" room="mapToLoad:mapTest; wallColor:red; wallTexture:brick;"></a-entity>
    <a-entity id ="room2"  position ='0 0 -30' room="mapToLoad:mapTest2; wallColor:green; wallTexture:brick;"></a-entity>