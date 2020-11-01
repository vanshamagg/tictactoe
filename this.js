
/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * @description The main object starts here. Contains all the methods and properties
 * for the successful construction and manipulation of the TIC TAC TOE 
 * board.
 * @param boxes     2D array storing the actual refs to the individual cells
 * @param size      numbers of total cells in the board
 * @param stepCount stores the current value of the nth turn in the game
 * @param symbolX   UTF8 ref for the character being used as X
 * @param symbolO   UTF8 ref for the character being used as Y
 */
var mainBoard = {
    /**
     * 2D array storing the actual refs to the individual cells
     */
    boxes: [], 
    /**
     * numbers of total cells in the board
     */
    size: 9,
    /**
     * stores the current value of the nth turn in the game
     */
    stepCount: 1,
    /**
     * UTF8 ref for the character being used as X
     */
    symbolX: String.fromCharCode(0X2716),
    /**
     * UTF8 ref for the character being used as O
     */
    symbolO: String.fromCharCode(0X2742),

    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Object} obj 
     * @description event handler for any cell when mouse is hovered on it
     */
    handlerMouseOver:  function (obj) {
        var choiceList =  obj.childNodes;
        choiceList[0].style.display = "grid";
        if(mainBoard.stepCount % 2  === 0) {
           choiceList[0].childNodes[0].innerText =   this.symbolO;
        }
        else {
            choiceList[0].childNodes[0].innerText =   this.symbolX;
        }
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Object} obj
     * event handler for any cell when the mouse leaves it  
     */
    handlerMouseLeave: function (obj) {
        var choiceList =  obj.childNodes;
        choiceList[0].style.display = "none";
    }, 
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Object} obj 
     * fires when a choice is made on the the board. inserts X or O
     */
    afterChoiceSelection: function (obj) {
        var box =  obj.parentNode.parentNode;
        box.removeAttribute("onmouseover");
        box.removeAttribute("onmouseleave");
        
        if (mainBoard.stepCount % 2 === 0) {
            box.setAttribute("value", `${mainBoard.symbolO}`);
            box.innerText =  mainBoard.symbolO;
        }
        else {
            box.setAttribute("value", `${mainBoard.symbolX}`);
            box.innerText =  mainBoard.symbolX;
        }
        mainBoard.stepCount++;
        
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * Fire it to play it :)
     */
    letsPlayBoi: function () {  
        
        if(mainBoard.isValid()) {
      
            for(var i = 0; i < 3; i++ ) {
                for(var j = 0; j < 3; j++ ) {
                    var node = mainBoard.boxes[i][j];
                    node.removeAttribute("onmouseover");
                    node.removeAttribute("onmouseleave");
                }
            }
        }
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @description checks the validity of the board. fires after every O or X insertion to the board.
     * @returns 'true' if a winning pattern is found.
     */
    isValid: function () {
       
        
        // Logic for first row
        if(!helper.valueChecker(helper.row(0), null))
            if( helper.valueChecker(helper.row(0), mainBoard.symbolO) || helper.valueChecker(helper.row(0), mainBoard.symbolX)){ 
                helper.classSetter(helper.row(0),"box-success"); 
                return true;
            }
        
        // Logic for second row
        if(!helper.valueChecker(helper.row(1), null))
            if( helper.valueChecker(helper.row(1), mainBoard.symbolO) || helper.valueChecker(helper.row(1), mainBoard.symbolX)) {
                helper.classSetter(helper.row(1),"box-success");
                return true;
            }

        // Logic for second row
        if(!helper.valueChecker(helper.row(2), null))
            if( helper.valueChecker(helper.row(2), mainBoard.symbolO) || helper.valueChecker(helper.row(2), mainBoard.symbolX)) { 
                helper.classSetter(helper.row(2),"box-success");
                return true;
            }

        //logic for first coloumn 
        if( !helper.valueChecker(helper.col(0),null))
            if( helper.valueChecker(helper.col(0), mainBoard.symbolO) || helper.valueChecker(helper.col(0), mainBoard.symbolX)) { 
                helper.classSetter(helper.col(0),"box-success");
                return true;
            }

        //logic for second coloumn 
        if( !helper.valueChecker(helper.col(1),null))
            if( helper.valueChecker(helper.col(1), mainBoard.symbolO) || helper.valueChecker(helper.col(1), mainBoard.symbolX)) { 
                helper.classSetter(helper.col(1),"box-success");
                return true;
            }

        //logic for third coloumn 
        if( !helper.valueChecker(helper.col(2),null))
            if( helper.valueChecker(helper.col(2), mainBoard.symbolO) || helper.valueChecker(helper.col(2), mainBoard.symbolX)) { 
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
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * Populates the board with the cells, and attaches the necessary event handlers
     */
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
            

            // Choice 
            var choice =  document.createElement("div");
            choice.className = "choice";
            choice.setAttribute("onclick", `mainBoard.afterChoiceSelection(this)`);
            choice.addEventListener('click', this.letsPlayBoi);
            var text =  document.createTextNode(" ");
            choice.appendChild(text);
            choiceWrapper.append(choice);
            
            
        }
        
        // cells is a 1D array
        // here we convert it in 2D array
        this.boxes.push(cells.slice(0,3));
        this.boxes.push(cells.slice(3,6));
        this.boxes.push(cells.slice(6,10));
        
        return true;
    }

}
/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * @description Ah yes, the helper. It basically provides shorthands for various lengthy operations
 * hence reducing the code length :)
 */
var helper = {
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Number} row  index of the row 
     * @param {Number} col  index of the coloumn
     * returns the value of 'value' attribute of the box's div element
     */
    value: function(row, col) {
        return mainBoard.boxes[row][col].getAttribute("value");
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Number} row row index
     * @param {Number} col col index
     * @returns ref to the div element of box at index (row, col)
     */
    box: function(row, col) {
        return mainBoard.boxes[row][col];
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Number} rowIndex index of the row in mainBoard.boxes
     * returns the ref to the Array contains refs to divs in a particular ROW
     */
    row: function(rowIndex) {
        return mainBoard.boxes[rowIndex];
    },
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Number} colIndex index of the coloumn
     * returns the ref to the array contains ref to divs in the specified coloumn
     */
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
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Array} list ref to the array (row/col)
     * @param {any} value value to be checked
     * returns true if the all elements in 'list' have the specified value
     */
    valueChecker: function (list, value) {
        return list.every( element => element.getAttribute("value") === value);
    }, 
    /**
     * @author Vansham Aggarwal <vanshamagg@gmail.com>
     * @param {Array} array     ref to the row or col
     * @param {String} value    name of the class
     * sets the class name of every element in the array to the specified value
     */
    classSetter: function (array, value) {
        array.forEach(element => {
            element.className =  value;
        });
        return true;
    }

}

    




