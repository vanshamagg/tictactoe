

/** 
 * @author Vansham Aggarwal
*/
var mainBoard = {
    size: 9,
    handlerMouseOver:  function (obj) {
        var choiceList =  obj.childNodes;
        choiceList[0].style.display = "grid";
    },
    handlerMouseLeave: function (obj) {
        var choiceList =  obj.childNodes;
        choiceList[0].style.display = "none";
    }, 
    afterChoiceSelection: function (obj, value) {
        var box =  obj.parentNode.parentNode;
        box.removeAttribute("onmouseover");
        box.removeAttribute("onmouseleave");
        box.innerText =  value;
       
    },

    //populate board using this function 
    populateBoard: function () {
        var div1 =  document.getElementById("wrapper");
        var cells = [];
        for (i = 0; i < this.size; i++ ) {

            // creating a cell
            cells[i] =  document.createElement("div");
            cells[i].className =  'box';
            cells[i].setAttribute('onmouseover', "mainBoard.handlerMouseOver(this);");
            cells[i].setAttribute('onmouseleave', "mainBoard.handlerMouseLeave(this);"); 
            div1.appendChild(cells[i]);

            
            // creating a choice box inside a cell
            var choiceWrapper =  document.createElement("div");
            choiceWrapper.className =  'choice-wrapper';
            choiceWrapper.style.display = "none";
            cells[i].appendChild(choiceWrapper);
            

            // Choice X
            var choiceX =  document.createElement("div");
            choiceX.className = "choice";
            choiceX.style.borderRight = "1px solid black";
            choiceX.setAttribute("id", `${i}-X`)
            choiceX.setAttribute("onclick", "mainBoard.afterChoiceSelection(this, 'X')");
            var text =  document.createTextNode("X");
            choiceX.appendChild(text);
            choiceWrapper.append(choiceX);
            

            // Choice O
            var choiceO =  document.createElement("div");
            choiceO.className = "choice";
            choiceO.setAttribute("id", `${i}-O`)
            choiceO.setAttribute("onclick", "mainBoard.afterChoiceSelection(this, 'O')");
            var text =  document.createTextNode("O");
            choiceO.appendChild(text);
            choiceWrapper.append(choiceO);
        }

    }

}



    




