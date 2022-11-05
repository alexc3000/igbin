let table;
let numRows, numCols;
let date = [], gsml=[];
let diagramX, diagramY;

function preload(){
  table = loadTable("assets/odutest1.csv","csv", "header");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  //get the basic info of the data
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  //print("rows: " + numRows + "cols: " + numCols)

 //load data
 for(let r =0; r<table.getRowCount(); r++){
   date[r] = table.getString(r,0);
   gsml[r] = table.getNum(r,1); 
   //print(date[r] + " "+gsml[r])
  }
  minMax();
  
}

let size = [];
function draw() {
  background(280);
  chartInfo();
  diagramX = (width/4)*3-90;
  diagramY = height/2;
  let radius = width/6-100;
  let ang = 360/ numRows;
  
  for(let i=0; i<numRows; i++){
    size[i] = map(gsml[i],-3.5,70,0,85);
    let pointx = (size[i]+radius)*cos(radians(ang*i))+diagramX;
    let pointy = (size[i]+radius)*sin(radians(ang*i))+diagramY;
    let cirx = radius* cos(radians(ang*i))+diagramX;
    let ciry = radius* sin(radians(ang*i))+diagramY;
    
    //draw the line
    if(i % 12 ===0){
      strokeWeight(0.5);
      stroke('blue')
    }else{ 
      strokeWeight(0.1);
      stroke('black')
    }
    line(cirx,ciry,pointx,pointy)
    
    //hover - 
    //draw the data points
    let datasize = 3;
    let dis = dist(mouseX,mouseY, pointx,pointy);
    if(dis<2){
       fill('red')
      datasize = 10;
      noStroke();
      circle(pointx,pointy,datasize);
      //draw information
      textAlign(CENTER)
      textSize(12);
      fill('black')
      text(date[i],diagramX,diagramY)
      fill('blue')
      rect(diagramX,diagramY+15,30,5)
      textSize(25);
      text(gsml[i],diagramX,diagramY+45)
    }else{
      fill('blue')
      datasize = 3;
      noStroke();
      circle(pointx,pointy,datasize);
    }
    
  }
 } 
  
function chartInfo(){
 textSize(14);
 textAlign(LEFT);
 fill('black');
 text("african fractals & indigenous computation",width/7.5,height/3.5-120,width/4)
}

let dataMin, dataMax=0;
function minMax(){
  for(let i=0;i<numRows;i++){
    if(table.getNum(i,1)>dataMax){
      dataMax = table.getNum(i,1);   
    }
  }
  dataMin = dataMax;
  for(let i=0; i<numRows;i++){
    if(table.getNum(i,1)<dataMin){
      dataMin = table.getNum(i,1);  
    }
  }
  print("max value " + dataMax +" min value" +dataMin)
}
