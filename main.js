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
  background(000);
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
      stroke('orange')
    }else{ 
      strokeWeight(0.8);
      stroke('orange')
    }
    line(cirx,ciry,pointx,pointy)
    
    //hover - 
    //draw the data points
    let datasize = 3;
    let dis = dist(mouseX,mouseY, pointx,pointy);
    if(dis<2){
       fill('turquoise')
      datasize = 10;
      noStroke();
      circle(pointx,pointy,datasize);
      //draw information
      textAlign(CENTER)
      textSize(12);
      fill('gold')
      text(date[i],diagramX,diagramY)
      fill('gold')
      rect(diagramX,diagramY+15,30,5)
      textSize(25);
      text(gsml[i],diagramX,diagramY+45)
    }else{
      fill('gold')
      datasize = 3;
      noStroke();
      circle(pointx,pointy,datasize);
    }
    
  }
 } 
  
function chartInfo(){
  textSize(25);
 textAlign(LEFT);
 fill('gold');
 text(" Ìgbín",width/7.5,height/4.5-120,width/10)
 textSize(20);
 textAlign(LEFT);
 fill('gold');
 text("A visual graph designed in the shape of a snail in reference to the Yorùbá creation story where, thanks to Ọbàtálá, the snail’s shell is made an integral part of the earth’s creation.The shell doubles as an ancient compass and calculator. A visual graph designed in the shape of a snail in reference to the Yorùbá creation story where, thanks to Ọbàtálá, the snail’s shell is made an integral part of the earth’s creation.The shell doubles as an ancient compass and calculator. The shell doubles as an ancient compass and calculator. If you scroll along the edges of the shell, numbers are converted into binaries using either 0 or 1. This binary system was rooted in the Ifa Corpus which consists of 256 odu’s. The “open and closed shells” used in divination readings are akin to the ‘0’s and ‘1’s” used in the binary system that created our current computational realities.  ",width/7.5,height/3.5-120,width/4)
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
