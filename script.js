//IMPLEMENT DRAW CONDITION 
let mainGame = document.querySelector(".maingame");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newBtn = document.querySelector('#newbtn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let cnt = 0;
//Using cnt to implement draw condition

let turnO = true; //playerO 's turn 

const winningpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//To reset the game

const resetGame =()=>{
    turnO = true;
    cnt = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainGame.classList.remove("hide");
};


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        cnt++;
        if (turnO){
            box.innerText = "O";
            turnO = false;
            box.style.color = "darkred"
        }
        else{
            box.innerText = "X";
            turnO = true;
            box.style.color = "navy"
        }
        box.disabled = true;
        //console.log(cnt);
        checkWinner();
    })
});

const showWinner =(winner)=>{
    
    msg.innerText = "Congratulations !! "+ winner +" is the Winner! ";
    msgContainer.classList.remove("hide");
    disableBoxes();
    mainGame.classList.add("hide");
    
};

const disableBoxes = ()=>{
    for(box of boxes){
        box.disabled =true;
    }
};

const enableBoxes = ()=>{
    for(box of boxes){
        box.disabled =false;
        box.innerText = "";
        box.classList.remove("strikeboxes")
    }
};

const strikeBoxes =(box1,box2,box3)=>{
    boxes[box1].classList.add("strikeboxes");
    boxes[box2].classList.add("strikeboxes");
    boxes[box3].classList.add("strikeboxes");
};

const checkWinner =()=>{
 
    for(pattern of winningpatterns){
        //These 3 positions will be compared to all the patterns
        let pos1val = boxes[pattern[0]].innerText;  //This will have the value of the first element of the pattern
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "" ) // checks if neither of the boxes are empty
        {
            if(pos1val == pos2val && pos2val == pos3val){
                strikeBoxes(pattern[0],pattern[1],pattern[2]);
                showWinner(pos1val);
                return;
            }
        }
    }
    if(cnt === 9){
            msg.innerText = "Draw ! No moves left !! ";
            msgContainer.classList.remove("hide");
            disableBoxes();
            mainGame.classList.add("hide");   
    } 
};

resetBtn.addEventListener( 'click', resetGame);
newBtn.addEventListener('click', resetGame);