
var Main = {
    existingRooms : [],
    currentRoom : 0,

    createRooms : function() {
        for(let i = 0;i < 3;i++) {
            var nRoom = Main.newRoom();
            Main.existingRooms.push(nRoom);    
            nRoom.elem.id = "room-" + i;
            if(i != 0) nRoom.elem.style.display = 'none';
        }
    },

    newRoom : function() {
        var body = document.getElementsByTagName("body")[0];
        var nRoom = new Container(body);

        nRoom.faces[0].addContent([new Content("art"),new Content("art"),new Content("art")]);
        nRoom.faces[3].addContent([new Content("art"),new Content("art")]);
        nRoom.faces[1].addContent([new Content("door",Main.changeRoom)]);
        nRoom.elem.classList.add("in");

        nRoom.faces[5].elem.classList.add("floor");
        nRoom.faces[4].elem.classList.add("ceiling");

        return nRoom;
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


