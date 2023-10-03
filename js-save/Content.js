/**
 * Representing content
 * @param {string} c the class-name (required)
 * @param {string} handler event handler (optional)
 */
var Content = function(c,handler) {
    this.elem = document.createElement("div");
    this.elem.classList.add("content",c);
    if(handler) this.elem.addEventListener("click",handler);
}
