/**
 * 
 */
var Main = {
    test : {},
    nDice : {},

    dice : function() {
        var testA = document.getElementById("test");
        Main.test = new Container(testA,100,200);
        Main.test.elem.addEventListener("click",function() {setInterval(Main.newFace,1500)});

        var dice = document.getElementById("dice");
        Main.nDice = new Container(dice);
        Main.rollDice();
        Main.nDice.elem.addEventListener("click",function() {Main.nDice.elem.style.marginTop = '-200px'; setTimeout(Main.rollDice,300)});

        var diceFaces = ['one','six','two','five','three','four'];
        for(let i = 0;i < 6;i++) {
            Main.nDice.faces[i].elem.style.background = "url('img/dice-" + diceFaces[i] + ".png')";
        }
    },

    newFace : function() {
        var value = Math.ceil(Math.random()*6);
        var n = Main.numberConverter(value);
        Main.test.showFace(n);
    },

    rollDice : function() {
        var value = Math.ceil(Math.random()*6);
        var n = Main.numberConverter(value);
        Main.nDice.showFace(n);
        setTimeout(() => {Main.nDice.elem.style.marginTop = '500px'},800);
    },

    numberConverter : function(n) {
        var n = parseInt(n);
        if(!isNaN(n)) {      
            switch(n) {
            case 6:
                n = "top";
                break;
            case 1:
                n = "bottom";
                break;
            case 2:
                n = "left";
                break;
            case 3:
                n = "right";
                break;
            case 4:
                n = "front";
                break;
            case 5:
                n = "back";
                break;
            }
            return n;
        }
    },
}
window.addEventListener("load",Main.dice);        
