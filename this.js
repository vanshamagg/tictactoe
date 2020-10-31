var helper = {
    value: function(row, col) {
        return mainBoard.boxes[row][col].getAttribute("value");
    },
    box: function(row, col) {
        return mainBoard.boxes[row][col];
    }
}

/** 
 * @author Vansham Aggarwal
*/
var mainBoard = {
    boxes: [],
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
        box.setAttribute("value", `${value}`);
        box.innerText =  value;
        console.log("Nice Move !!");
       
    },
    letsPlayBoi: function () {  
        this.populateBoard();
        
    },
    isValid: function () {
        
        console.log(helper.value(0,0));
        console.log(helper.box(0,0));

        // Logic for first row
        if( (helper.value(0, 0) == helper.value(0, 1)) && (helper.value(0, 1) == helper.value(0,2))) 
            helper.box(0, 0).style.color = helper.box(0, 1).style.color = helper.box(0, 2).style.color = "red"; 
        
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
            choiceX.setAttribute("id", `${i}-X`)
            choiceX.setAttribute("onclick", "mainBoard.afterChoiceSelection(this, '✖')");
            choiceX.addEventListener('click', this.isValid);
            var text =  document.createTextNode("✖");
            choiceX.appendChild(text);
            choiceWrapper.append(choiceX);
            

            // Choice O
            var choiceO =  document.createElement("div");
            choiceO.className = "choice";
            choiceO.setAttribute("id", `${i}-O`)
            choiceO.setAttribute("onclick", "mainBoard.afterChoiceSelection(this, '❂')");
            choiceO.addEventListener('click', this.isValid);
            var text =  document.createTextNode("❂");
            choiceO.appendChild(text);
            choiceWrapper.append(choiceO);
        }
        // this.boxes[0] =  new Array();
        this.boxes.push(cells.slice(0,3));
        // this.boxes[1] =  new Array();
        this.boxes.push(cells.slice(3,6));
        // this.boxes[2] =  new Array();
        this.boxes.push(cells.slice(6,10));
        
        return true;
    }

}



    




