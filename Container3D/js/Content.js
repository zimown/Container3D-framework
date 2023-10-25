/**
 * Representing content
 * @param {string} c the class-name (required)
 * @param {string} handler event handler (optional)
 */
var Content = function(parent,c,width,height,depth,handler) {
    //this.cont = new Container(parent.elem.parentNode,width,height,depth);
    this.cont = new Container(parent,width,height,depth);
    this.cont.elem.classList.add("content",c);
    this.cont.elem.style.width = width;
    //this.cont.elem.style.transform = parent.elem.style.transform;
    //this.cont.elem.style.translateZ = 70 + "px";

    if(handler) this.cont.elem.addEventListener("click",handler);
}