// Rover Object Goes Here
// ======================

var rover= {
  direction : "N",
  x: 0,
  y: 0,
  travelLog: ["0,0"],
  
}

var rover2={
  direction : "S",
  x: 1,
  y: 1,
  travelLog: ["0,0"],

}

var commands="rffrfflfrfflllfffffbbbbbbbbbbbbb";

var iMax = 9, jMax = 9;

var randomNumbers=[]
for (i=0; i<=iMax; i++){randomNumbers[i]=Math.floor((Math.random() * 10));}

var grid = new Array();
for (i=0;i<=iMax;i++) {
 grid[i]=new Array();
 for (j=0;j<=jMax;j++) {
   if (j==randomNumbers[i]) {grid[i][j]="obs"}
   else {grid[i][j]=0}
 }
}

 console.log(typeof(grid));
 


// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction){
    case "N" : rover.direction="W"  ;break;
    case "W" : rover.direction="S" ;break;
    case "S" : rover.direction="E" ;break;
    case "E" : rover.direction="N" ;break;
  }
  console.log("the direction is "  +rover.direction)
  rover.travelLog.push(String(rover.x)+","+  String(rover.y))
  return(rover)
}

function turnRight(rover){
  console.log("turnRight was called!");

  switch (rover.direction){
  case "N" : rover.direction="E"  ;break;
  case "E": rover.direction="S" ;break;
  case "S" : rover.direction="W" ; break;
  case "W" : rover.direction="N" ; break;
  }
  console.log("the direction is "  +rover.direction)
  rover.travelLog.push(String(rover.x)+","+  String(rover.y))
  return(rover)
  
}

function limitMove(rover)
{
  if (rover.x > iMax) { console.log("Move is limited inside the grid !"); rover.x =iMax}
  else if (rover.x <0) {console.log("Move is limited inside the grid !"); rover.x =0}
  else if (rover.y > jMax) {console.log("Move is limited inside the grid !");rover.y=jMax}
  else if (rover.y <0) {console.log("Move is limited inside the grid !");rover.y=0}

  console.log( "x:" + rover.x + " y:" + rover.y)
  return(rover)

}


function addToGrid(rover, grid){
  console.log(typeof(grid))
  X=rover.x
  Y=rover.y
  grid[X][Y]="rover"
  return(grid)
}


function avoidObstablesForward(commands, rover, grid){

  console.log(typeof(grid))
  roverNext=moveForward(rover)
  xNext=roverNext.x
  yNext=roverNext.y
  if(grid[xNext,yNext]=="obs"){console.log("you are running into an obstacle!")}
  else{rover=moveForward(rover)}

  return(rover)

}


function moveForward(rover){
  console.log("moveForward was called")
  switch (rover.direction){
  case "N" : rover.y +=1 ;break;
  case "E": rover.x +=1 ;break;
  case "S" : rover.y -=1 ; break;
  case "W" : rover.x -=1 ; break;
  }
  limitMove(rover)
  console.log( "x:" + rover.x + " y:" + rover.y)
  rover.travelLog.push(String(rover.x)+","+  String(rover.y))
  return(rover)
}


function moveBackward(rover){
  console.log("moveBackward was called")
  switch (rover.direction){
  case "N" : rover.y -=1 ;break;
  case "E": rover.x -=1 ;break;
  case "S" : rover.y +=1 ; break;
  case "W" : rover.x +=1 ; break;
  }
  limitMove(rover)
  console.log( "x:" + rover.x + " y:" + rover.y)
  rover.travelLog.push(String(rover.x)+","+  String(rover.y))
  return(rover)
}


function selectMove(commands, rover, grid){
  
  for (i=0; i< commands.length; i++)
  {
    letter=commands[i]
    
    if (letter=="r"){turnRight(rover)}
    
    else if (letter=="l"){turnLeft(rover)}
    
    else if (letter=="f"){avoidObstablesForward(commands, rover, grid)}

    else if (letter=="b"){moveBackward(rover)}

    else {throw new Error("The only letters possible are l, r and f, b ");}

  }

  //addToGrid(rover, grid)
  
  console.log("The direction is " + rover.direction +" and the position x is "+  rover.x + " and y is "+ rover.y)
  console.log( "The past coordinates of the rover are" + rover.travelLog)

  return(rover)
}
