
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

        nRoom.faces[0].addContent([new Content("art"),new Content("art"),new Content("art")]);
        nRoom.faces[3].addContent([new Content("art"),new Content("art")]);
        nRoom.faces[1].addContent([new Content("door",Main.changeRoom)]);
        nRoom.faces[5].elem.classList.add("floor");
        nRoom.faces[4].elem.classList.add("ceiling");

        return nRoom;
    },

    addTable : function(room) {
        var table = new Container(room.elem,300,200,200);
        table.elem.classList.add("table");
        table.elem.style.top = room.faces[0].elem.offsetHeight - 200 + "px";
        table.faces[5].elem.style.display = "none";
        console.log(table.faces[0].elem.offsetWidth)
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


