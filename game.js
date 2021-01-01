var userClickedPattern = [];
var gamePattern = [];
var buttonColor = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).on("keydown",function(){
   if(!started){
      $("h1").html("Level " + level);
      nextSequence();
      started = true;
   }
})

$(".btn").on("click",function(){

   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   animatePress(userChosenColour);
   playSound(userChosenColour);
   
   checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("Success");
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
            nextSequence();
         },1000);
      }
   }else{

      playSound("wrong");
      $("body").addClass("game-over");
      
      setTimeout(function(){
         $("body").removeClass("game-over");
      },200);
      $("h1").html("Game Over! Try Again...");
      startOver();
   
   }
}

function nextSequence(){

   userClickedPattern = [];
   level++;
   $("h1").html("Level " + level);

   var random = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColor[random];
   gamePattern.push(randomChosenColor);

   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);    
   
}

function playSound(name){
   var start = new Audio("sounds/"+ name +".mp3");
   start.play();
}

function animatePress(currentColor){
   $("."+currentColor).addClass("pressed");
   setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
   },100);
}

function startOver(){
   started = false;
   gamePattern = [];
   level = 0;
}