/**
 * Class representing a 3D-object which is constructed by six Face-object which makes it a rectangular 3-dimensional object
 * @param {element} parent parent element which will contain the 3D-object (required)
 * @param {number} width   object width (optional)
 * @param {number} height  object height (optional)
 * @param {number} depth   object depth (optional)
 */
var Container = function(parent,width,height,depth) {
    var self = this;
    /**
     * The name of the elements class-name
     * Explains which face is shown
     * @type {string}
     */
    this.currentFace = "";
    /**
     * Array containing the faces (instances of Face) of the object
     * @type {Array}
     */
    this.faces = [];
    /**
     * Element representing the container in the DOM
     */
    this.elem;
    this.parent = parent;

    /**
     * Self initiating constructor-method
     * Creates the container-element with DOM, calls the method to create the faces of the object and appends the element to the parent element
     * @returns {null}
     */
    (function container() {
        if(!parent || !parent.nodeType) {
            console.log("The parent is " + parent + " and is not considered an element");
            return;
        }
        self.elem = document.createElement("div");
        self.elem.classList.add("cont");
        self.elem.classList.add("show");
        createFaces();
        parent.appendChild(self.elem);
    })();

    /**
     * Method that creates six instances of the Face-class and appends them to the 3D-element
     * Adds eventlistener to show the face when clicked
     * Calls method to set the size and position of the face
     * @returns {null}
     */
    function createFaces() {
        self.faces.push(new Face("front"),new Face("back"),new Face("left"),new Face("right"),new Face("top"),new Face("bottom"));
        var length = self.faces.length;
        for(let i = 0;i < length;i++) {
            self.elem.appendChild(self.faces[i].elem);
            self.faces[i].elem.addEventListener("click",function() {self.showFace(self.faces[i].type);});
        }
        setSize();
    }

    /**
     * Sets the size of the faces according to the given measures or to fit the parent element
     * The faces also gets positioned to together form a 3-dimensional rectangle
     * The object is then set to resize whenever the screen is resizing, in case the conditions has changed
     * @returns {null}
     */
    function setSize() {
        var face = self.faces;
        var x = width || parent.offsetWidth;
        var y = height || parent.offsetHeight;
        var z = depth || width || parent.offsetWidth;

        if(typeof x != "number" || typeof y != "number" || typeof z != "number") {
            console.log("The dimensions are not right and the element can't be displayed");
            return;
        }

        // front & back
        var t = z/2;
        var d = 0;
        for(let i = 0;i < 2;i++) {
            face[i].elem.style.width = x + "px";
            face[i].elem.style.height = y + "px";
            face[i].elem.style.transform = "rotateY(" + d + "deg) translateZ(" + t + "px)";
            d = 180;
        }

        // left & right
        d = "-";
        for(let i = 2;i < 4;i++) {
            face[i].elem.style.width = z + "px";
            face[i].elem.style.height = y + "px";
            face[i].elem.style.transform = "rotateY(" + d + "90deg) translateZ(" + t + "px)";
            d = "";
            t = z/2+x-z;
        }

        // top & bottom
        t = z/2;
        for(let i = 4;i < 6;i++) {
            face[i].elem.style.width = x + "px";
            face[i].elem.style.height = z + "px";
            face[i].elem.style.transform = "rotateX(" + d + "90deg) translateZ(" + t + "px)";
            t =y-(z/2);
            d = "-";
        }
        window.addEventListener("resize",setSize);        
    }
}

/**
 * Method to show the face of the type that is passed to the function
 * @param {string} type the type of the Face that should show
 */
Container.prototype.showFace = function(type) {
    if(typeof type != "string") {
        console.log(type + " is not a string");
        return;
    }
    if (Container.currentFace) {
        this.elem.classList.remove(Container.currentFace);
    }
    Container.currentFace = 'show-' + type;
    this.elem.classList.add(Container.currentFace);
}
