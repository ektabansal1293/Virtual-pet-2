var dog, happyDog, database, foodS, foodStock;

var feed, addFood;

var foodObj;

var fedTime, lastFed;

function preload()
{
  dog1 = loadImage('images/dogImg.png');
	hdog = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(500,500);

  feed = createButton("Khana Khilao");
  feed.position(500,120);
  feed.mousePressed(feedDog);

  addFood = createButton("Khana Bharo");
  addFood.position(600,120);
  addFood.mousePressed(addFoods);

  dog = createSprite(250,250);
  dog.addImage(dog1);
  dog.scale = 0.08;

  foodObj = new Food();

  database = firebase.database();

  foodStock= database.ref('FOOD');
  foodStock.on ("value",readStock);
  
}


function draw() {  

  background(rgb(46, 139, 87));
  
  foodObj.display();
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text(" LAST FED : " + lastFed%12 + "PM" , 350 ,30)
  }
  else if (lastFed == 0){
    text("Last Fed : 12 AM ", 350 , 30);
  }
  else{
    text (" Last Fed :"+lastFed+"AM", 350, 30);
  }

  

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  })

  drawSprites();
}

function feedDog(){
    dog.addImage(hdog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
       FOOD: foodObj.getFoodStock(),
      FeedTime: hour()
    })
}

function addFoods(){
  foodS = foodS+1
  database.ref('/').update({
    FOOD : foodS
  })
}

function readStock(data){
     foodS =  data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({FOOD:x})
  
}


