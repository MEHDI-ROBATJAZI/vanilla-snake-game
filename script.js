/*LINKED LIST DATA STARUCTURE FOR IMPLEMENTATION OF SNAKE-GAME
  do you want learn , Visit this website:
  https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript*/
  class ListNode {
    constructor(data){
      this.data = data
      this.next = null
    }
  }
  
  
  class LinkedList {
    constructor(head= null){
      this.head = head
    }
  }
  
  
  // let node1 = new ListNode(2)
  // let node2 = new ListNode(5)
  // let node3 = new ListNode(12)
  // let node4 = new ListNode(24)
  // let node5 = new ListNode(35)
  
  
  
  // node1.next = node2
  // node2.next = node3
  // node3.next = node4
  // node4.next = node5
  
  
  
  // let list = new LinkedList(node1)
  // console.log(list)
  
  // console.log(list);
  
  function getLast() {
    let lastNode = list.head;
    if (lastNode) {
        while (lastNode.next) {
          lastNode = lastNode.next
        }
    }
    return lastNode
  }
  
  function getFirst() {
    return list.head;
  }
  
  
  function clear() {
    list.head = null;
  }
  
  function size(list) {
    let count = 0; 
    let node = list.head;
    while (node) {
      count++;
      node = node.next
    }
    return count;
  }
  

/////////////////////////////////////////////////////////////////////
const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const status = document.getElementById("status");
let foodNumber;
let frame;
var list ;
////////////////////////////////////////////////////////////////////

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

////////////////////////////////////////////////////////////////////
// BOARD CREATION
let number = 0;
for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.setAttribute("row", i);
    cell.setAttribute("column", j);

    cell.textContent = number;
    number++;
    cell.classList.add("cell");
    cell.style.borderRight = 0;
    cell.style.borderBottom = 0;
    if (j === 9) cell.style.borderRight = "1px solid gray";
    if (i === 9) cell.style.borderBottom = "1px solid gray";
    row.append(cell);
  }

  board.append(row);
}

/////////////////////////////////////////////////////////////////////
const generateFood = () => {
  const result = getRandomNumber(0, 100);
  for (let [index, item] of Object.entries(cells)) {
    if (index == foodNumber) {
      item.style.backgroundColor = null;
    }

    if (index == result) {
      item.style.backgroundColor = "red";
    }
  }
  foodNumber = result
};

/////////////////////////////////////////////////////////////////////

// export object

const objectSelectioncell = (element) => {
  let selectionObject = {
    column: "",
    row: "",
  };
  if (typeof element == "object") {
    selectionObject.column = element.getAttribute("column");
    selectionObject.row = element.getAttribute("row");
  } else if (typeof element == "number" || typeof element == "string") {
    for (const cell of cells) {
      if (cell.textContent == element) {
        selectionObject.column = cell.getAttribute("column");
        selectionObject.row = cell.getAttribute("row");
      }
    }
  }

  return selectionObject;
};

//////////////////////////////////////////////////////////////////////

// export dom element

const getElement = (input) => {
  if (typeof input === "object") {
    // dom element
    for (const cell of cells) {
      const column = cell.getAttribute("column");
      const row = cell.getAttribute("row");

      if (input.column == column && input.row == row) {
        return cell;
      }
    }
  } else {
    for (const cell of cells) {
      // textContent dom element
      if (cell.textContent == input) {
        return cell;
      }
    }
  }
};

//////////////////////////////////////////////////////////////////////
const snakeGenration = (item) => {
  removeSnakes()
  
  const cellElement = getElement(item);
  
  if(cellElement.textContent == foodNumber){
    cellElement.classList.add("snake-head");
    checkCellFood(cellElement)
  }else{
    cellElement.classList.add("snake-head");
    const firstNode = new ListNode(cellElement)
    list = new LinkedList(firstNode)
  
  
    return list

  }

  return null


};

const nodelist = snakeGenration(22);
console.log(nodelist)

///////////////////////////////////////////////////////////////////////

const setCommand = (e) => {
  const event = e  //|| window.event;
  // console.log(event);
  
  frame = setInterval(function(){

    switch (event.keyCode) {
      case 37:
       snake_move("left")
        break;
      case 38:
       snake_move("top")
        break;
      case 39:
       snake_move("right")
        break;
      case 40:
       snake_move("bottom")
        break;
      default:
        return null;
    }
  },500)
};

document.onkeydown = function(e){
  if(frame)clearInterval(frame)
  setCommand(e);
} 

const headInfo = (element) => {
  const obj = objectSelectioncell(element);
  const info = {
    top: null,
    bottom: null,
    right: null,
    left: null,
  };

  info.top = { row: +obj.row - 1, column: +obj.column };
  info.bottom = { row: +obj.row + 1, column: +obj.column };
  info.right = { row: +obj.row, column: +obj.column + 1 };
  info.left = { row: +obj.row, column: +obj.column - 1 };

  const mainObject = {};

  for (key in info) {
    Object.defineProperty(mainObject, [key], {
      value: getElement(info[key]),
      writable: true,
    });
  }
  return mainObject;
};

///////////////////////////////////////////////////////////////

function snake_move(arrowKey) {
  let head = document.getElementsByClassName("snake-head")[0];
  const headSnakeAroundInfo = headInfo(head);

  if (checkSnakeLoose(arrowKey)) {
    switch (arrowKey) {
      case "left":
        snakeGenration(Number(headSnakeAroundInfo.left.textContent));
        break;
      case "right":
        snakeGenration(Number(headSnakeAroundInfo.right.textContent));

        break;
      case "top":
        snakeGenration(Number(headSnakeAroundInfo.top.textContent));

        break;
      case "bottom":
        snakeGenration(Number(headSnakeAroundInfo.bottom.textContent));

        break;
      default:
        return;
    }
  } else {
    removeSnakes()
    status.textContent = "you loose";
    snakeGenration(22);
    setTimeout(() => {
      status.textContent = "play";
    }, 1000);
  }
}

function removeSnakes() {
  for (const cell of cells) {
    cell.classList.remove("snake-head");
  }
}

function checkSnakeLoose(arrow) {
  const head = Number(document.getElementsByClassName("snake-head")[0].textContent);
  // console.log(head);
  if (
    head === 0 && arrow === "top" ||
    head === 1 && arrow === "top" ||
    head === 2 && arrow === "top" ||
    head === 3 && arrow === "top" ||
    head === 4 && arrow === "top" ||
    head === 5 && arrow === "top" ||
    head === 6 && arrow === "top" ||
    head === 7 && arrow === "top" ||
    head === 8 && arrow === "top" ||
    head === 9 && arrow === "top"
  )
   {
    return false;
  } else if (
    head === 9  && arrow === "right" ||
    head === 19 && arrow === "right" ||
    head === 29 && arrow === "right" ||
    head === 39 && arrow === "right" ||
    head === 49 && arrow === "right" ||
    head === 59 && arrow === "right" ||
    head === 69 && arrow === "right" ||
    head === 79 && arrow === "right" ||
    head === 89 && arrow === "right" ||
    head === 99 && arrow === "right" 
  ) {
    return false;
  } else if (
    head === 90 && arrow === "bottom"  ||
    head === 91 && arrow === "bottom"  ||
    head === 92 && arrow === "bottom"  ||
    head === 93 && arrow === "bottom"  ||
    head === 94 && arrow === "bottom"  ||
    head === 95 && arrow === "bottom"  ||
    head === 96 && arrow === "bottom"  ||
    head === 97 && arrow === "bottom"  ||
    head === 98 && arrow === "bottom"  ||
    head === 99 && arrow === "bottom"
  ) {
    return false;
  } else if (
    head === 0  && arrow === "left" ||
    head === 10 && arrow === "left" ||
    head === 20 && arrow === "left" ||
    head === 30 && arrow === "left" ||
    head === 40 && arrow === "left" ||
    head === 50 && arrow === "left" ||
    head === 60 && arrow === "left" ||
    head === 70 && arrow === "left" ||
    head === 80 && arrow === "left" ||
    head === 90 && arrow === "left"
  ) {
    return false;
  }

  return true;
}



function checkCellFood(cellFood){
  const newNode = new ListNode(cellFood)
  const lastItem = getLast()
  lastItem.next = newNode

  console.dir(lastItem);
  console.dir(newNode)
  console.log(size(list))
}