var helper = {
    value: function(row, col) {
        return mainBoard.boxes[row][col].getAttribute("value");
    },
    box: function(row, col) {
        return mainBoard.boxes[row][col];
    },

    row: function(rowIndex) {
        return mainBoard.boxes[rowIndex];
    },

    col: function(colIndex) {
        var temp = [];
        for(var i = 0; i<3; i++ ) {
            for(var j = 0; j<3; j++) {
                if(j === colIndex) {
                    temp.push(mainBoard.boxes[i][j]);
                    // console.log(`ROW-${i} : COL-${j}`);
                }
            }
        }
        return temp;
    },

    valueChecker: function (list, value) {
        return list.every( element => element.getAttribute("value") === value);
    }, 

    classSetter: function (array, value) {
        array.forEach(element => {
            element.className =  value;
        });
        return true;
    }

}
/** 
 * @author Vansham Aggarwal
*/
var mainBoard = {
    boxes: [],
    size: 9,
    symbolX: String.fromCharCode(0X2716),
    symbolO: String.fromCharCode(0X2742),

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
        
        if(mainBoard.isValid()) {
      
            for(var i =0; i<3; i++) {
                for(var j=0; j<3; j++) {
                    var node = mainBoard.boxes[i][j];
                    node.removeAttribute("onmouseover");
                    node.removeAttribute("onmouseleave");
                }
            }
        }
    },
    isValid: function () {
        // console.log(helper.valueChecker(helper.row(0), mainBoard.symbolO) || helper.valueChecker(helper.row(0), mainBoard.symbolX));
        
        // Logic for first row
        if(!helper.valueChecker(helper.row(0), null))
            // if((helper.value(0, 0) == helper.value(0, 1)) && (helper.value(0, 1) == helper.value(0,2)))
            if( helper.valueChecker(helper.row(0), mainBoard.symbolO) || helper.valueChecker(helper.row(0), mainBoard.symbolX)){ 
                helper.classSetter(helper.row(0),"box-success"); 
                return true;
            }
        
        // Logic for second row
        if(!helper.valueChecker(helper.row(1), null))
            if( helper.valueChecker(helper.row(1), mainBoard.symbolO) || helper.valueChecker(helper.row(1), mainBoard.symbolX) ) {
                // helper.box(1, 0).className = helper.box(1, 1).className = helper.box(1, 2).className = "box-success"; 
                helper.classSetter(helper.row(1),"box-success");
                return true;
            }

        // Logic for second row
        if(!helper.valueChecker(helper.row(2), null))
            if( helper.valueChecker(helper.row(2), mainBoard.symbolO) || helper.valueChecker(helper.row(2), mainBoard.symbolX) ) { 
                // helper.box(2, 0).className = helper.box(2, 1).className = helper.box(2, 2).className = "box-success"; 
                helper.classSetter(helper.row(2),"box-success");
                return true;
            }

        //logic for first coloumn 
        if( !helper.valueChecker(helper.col(0),null))
            if( helper.valueChecker(helper.col(0), mainBoard.symbolO) || helper.valueChecker(helper.col(0), mainBoard.symbolX)) { 
                // helper.box(0, 0).className = helper.box(1, 0).className = helper.box(2, 0).className = "box-success";
                helper.classSetter(helper.col(0),"box-success");
                return true;
            }

        //logic for second coloumn 
        if( !helper.valueChecker(helper.col(1),null))
            if( helper.valueChecker(helper.col(1), mainBoard.symbolO) || helper.valueChecker(helper.col(1), mainBoard.symbolX)) { 
                // helper.box(0, 1).className = helper.box(1, 1).className = helper.box(2, 1).className = "box-success";
                helper.classSetter(helper.col(1),"box-success");
                return true;
            }

        //logic for third coloumn 
        if( !helper.valueChecker(helper.col(2),null))
            if( helper.valueChecker(helper.col(2), mainBoard.symbolO) || helper.valueChecker(helper.col(2), mainBoard.symbolX)) { 
                // helper.box(0, 2).className = helper.box(1, 2).className = helper.box(2, 2).className = "box-success";
                helper.classSetter(helper.col(2),"box-success");
                return true;
            }

        //logic for first diagonal
        if( !(helper.value(0,0)===null && helper.value(1,1)===null && helper.value(2,2)===null) )
            if( helper.value(0,0) ===  helper.value(1,1) && helper.value(1,1) === helper.value(2,2)) {
                helper.box(0, 0).className = helper.box(1, 1).className = helper.box(2, 2).className = "box-success";
                return true;
            }
        
        //logic for second diagonal
        if( !(helper.value(0,2)===null && helper.value(1,1)===null && helper.value(2,0)===null) )
            if( helper.value(0,2) ===  helper.value(1,1) && helper.value(1,1) === helper.value(2,0)) {
                helper.box(0, 2).className = helper.box(1, 1).className = helper.box(2, 0).className = "box-success";
                return true;
            }

            return false;


    },
    //populate board using this function 
    populateBoard: function () {
        console.log(this.symbolO);
        var div1 =  document.getElementById("wrapper");
        var cells = [];
        for (i = 0; i < this.size; i++ ) {

            // creating a cell
            cells[i] =  document.createElement("div");
            cells[i].className =  'box';
            cells[i].setAttribute('onmouseover', "mainBoard.handlerMouseOver(this);");
            cells[i].setAttribute('onmouseleave', "mainBoard.handlerMouseLeave(this);"); 
            cells[i].setAttribute("id", `BOX-${i}`);
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
            choiceX.setAttribute("onclick", `mainBoard.afterChoiceSelection(this, '${this.symbolX}')`);
            choiceX.addEventListener('click', this.letsPlayBoi);
            var text =  document.createTextNode(this.symbolX);
            choiceX.appendChild(text);
            choiceWrapper.append(choiceX);
            

            // Choice O
            var choiceO =  document.createElement("div");
            choiceO.className = "choice";
            choiceO.setAttribute("id", `${i}-O`)
            choiceO.setAttribute("onclick", `mainBoard.afterChoiceSelection(this, '${this.symbolO}')`);
            choiceO.addEventListener('click', this.letsPlayBoi);
            var text =  document.createTextNode(this.symbolO);
            choiceO.appendChild(text);
            choiceWrapper.append(choiceO);
        }
        
        this.boxes.push(cells.slice(0,3));
        
        this.boxes.push(cells.slice(3,6));
        
        this.boxes.push(cells.slice(6,10));
        
        return true;
    }

}



    




