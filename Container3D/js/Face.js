/**
 * Class representing a face (surface/area)
 * @param {string} type what kind of face it is (required)
 */
var Face = function(type) {
    /**
     * the type of the face
     */
    this.type = type;    
    /**
     * array with all the content in the face
     */    
    this.content = [];
    /**
     * representation of the face in the DOM
     */
    this.elem;
    var self = this;

    /**
     * Self initiating constructor-method
     * Creates a element in the DOM
     * @returns {null}
     */
    (function createFace() {
        self.elem = document.createElement("div");
        self.elem.classList.add("face","face--" +self.type+"");
    })();
}

/**
 * Adds content to the face-object
 * If the content is an array of content
 * @param {Element} cont element that will be added to the face
 */
Face.prototype.addContent = function(cont) {
    if(cont.length) {
        var x = cont.length;
        var i = 0;                 
       
        while(i < x) {
            if(cont[i].length) {
                this.addContent(cont[i]);
            } else {
                this.elem.appendChild(cont[i].elem);
                this.content.push(cont[i]);
            }
            i++;
        }
    } else {
        this.elem.appendChild(cont.elem);
        this.content.push(cont);
    }
}
