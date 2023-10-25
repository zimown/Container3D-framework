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
Face.prototype.addContent = function() {
    var i = 0;                 
    var x = arguments.length;
    
    while(i < x) {
        var content = new Content(this.elem.parentNode,arguments[i][0],arguments[i][1],arguments[i][2],arguments[i][3],arguments[i][4]);
        this.content.push(content);
        content.type = arguments[i][0];
        this.adjustContent(content,x,i,this);
        i++;
    }
}

Face.prototype.adjustContent = function(content,n,i) {
    var y = 0;
    var x = -content.cont.elem.offsetWidth/4;
    if (n > 1 && (i != 0 || n % 2 == 0)) {
        if (n % 2 == 0) {
            x += content.cont.elem.offsetWidth;
        } else {
            x += content.cont.elem.offsetWidth*2;
        }
        if (i % 2 == 0) {
            x = -x-content.cont.elem.offsetWidth/2;
        } else {
        }
    }
   
    switch(content.type) {
        case "door":
            y = this.elem.offsetHeight-content.cont.elem.offsetHeight;
            x = this.elem.offsetWidth/2 - content.cont.elem.offsetWidth/2;
            break;
        case "art":
            y = this.elem.offsetHeight/3;
            
            break;
        case "rooflist":
            x = 0;
            break;
        case "floorlist":
            y = this.elem.offsetHeight-content.cont.elem.offsetHeight;
            break;
    }

    if (content.type == "floorlist" || content.type == "rooflist") {
        x = -this.elem.offsetWidth/2 + content.cont.elem.offsetWidth/2;
            switch(this.type) {
                case "front":
                    x = 0;
                    break;
                case "back":
                    x = this.elem.offsetWidth-content.cont.elem.offsetWidth;
                    break;
            }
    }

    switch(this.type) {
        case "front":
            content.cont.elem.style.transform = "rotateY(0deg) translateZ(" + (this.elem.offsetWidth/2-5) + "px) translateY(" + y + "px) translateX(" + x + "px)";
            break;
        case "back":
            content.cont.elem.style.transform = "rotateY(180deg) translateZ(" + (this.elem.offsetWidth/2-5) + "px) translateY(" + y + "px) translateX(" + -x + "px)";
            break;
        case "left":
            content.cont.elem.style.transform = "rotateY(-90deg) translateZ(" + (97) + "px) translateY(" + y + "px) translateX(" + x + "px)";
            break;
        case "right":
            console.log(this.elem.offsetWidth-103)
            content.cont.elem.style.transform = "rotateY(90deg) translateZ(" + (this.elem.offsetWidth-103) + "px) translateY(" + y + "px) translateX(" + x + "px)";
            break;
        case "top":
            content.cont.elem.style.transform = "rotateX(-90deg) translateZ(" + (this.elem.offsetHeight/2-5) + "px) translateY(" + y + "px) translateX(" + x + "px)";
            break;
        case "bottom":
            content.cont.elem.style.transform = "rotateX(90deg) translateZ(" + (this.elem.offsetHeight/2-5) + "px) translateY(" + y + "px) translateX(" + x + "px)";
            content.cont.elem.style.top = this.elem.offsetHeight - 200 + "px";
            break;
    }
}
