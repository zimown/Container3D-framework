
var Main = {
    existingRooms : [],
    currentRoom : 0,

    createRooms : function() {
        for(let i = 0;i < 3;i++) {
            var nRoom = Main.newRoom();
            Main.existingRooms.push(nRoom);    
            nRoom.elem.id = "room-" + i;
            if(i != 0) nRoom.elem.style.display = 'none'; else {
                Main.addTable(nRoom);
            }
        }
        var body = document.getElementsByTagName("body")[0];
        body.style.perspective = body.offsetWidth/2.7 + "px";
    },

    newRoom : function() {        
        var body = document.getElementsByTagName("body")[0];
        var nRoom = new Container(body);
        nRoom.elem.classList.add("in");
        console.log(nRoom);

        //nRoom.faces[1].addContent(["art",200,230,5],["art",200,250,5],["art",200,250,5]);
        nRoom.faces[0].addContent(["door",400,800,10,Main.changeRoom],["art",300,360,5]);
        nRoom.faces[1].addContent(["door",400,800,10,Main.changeRoom],["art",300,360,5]);

        nRoom.faces[2].addContent(["art",300,360,5],["art",300,360,5],["art",300,360,5]);
        nRoom.faces[3].addContent(["art",200,260,5],["art",200,260,5]);
     
        Main.addLists(nRoom);

        nRoom.faces[0].elem.classList.add("wall");
        nRoom.faces[1].elem.classList.add("wall");
        nRoom.faces[2].elem.classList.add("wall");
        nRoom.faces[3].elem.classList.add("wall");

        nRoom.faces[5].elem.classList.add("floor");
        nRoom.faces[4].elem.classList.add("ceiling");

        return nRoom;
    },

    addLists : function(room) {
        for (let i = 0; i < 4;i++) {
            room.faces[i].addContent(["floorlist",room.faces[0].elem.offsetWidth,20,5]);
            room.faces[i].addContent(["rooflist",room.faces[0].elem.offsetWidth,30,10]);
        }
    },

    addTable : function(room) {
        var table = new Container(room.elem,300,200,200);
        table.elem.classList.add("table");
        table.elem.style.top = room.faces[0].elem.offsetHeight - 200 + "px";
        table.faces[5].elem.style.display = "none";
    },

    changeRoom : function() {
        Main.existingRooms[Main.currentRoom].elem.style.display = 'none';
        Main.currentRoom++;
        if(!Main.existingRooms[Main.currentRoom]) Main.currentRoom = 0;
        Main.existingRooms[Main.currentRoom].elem.style.display = 'block';
        Main.existingRooms[Main.currentRoom].showFace("front");
    }
}
window.addEventListener("load",Main.createRooms);        


