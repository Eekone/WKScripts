// ==UserScript==
// @name         Kaniwani Autocommit
// @namespace    me.eekone
// @version      1.0
// @description  Autocommits it
// @match        https://kaniwani.com/kw/review/
// @author       Eekone
// @run-at       document-end
// @grant        none
// @require     http://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

var activated=true;

$(function() {
  addButtons();
  checkInput();
});

var addButtons=function(){ 
  $("<div />", {
    id:"autoCommitToggle",
  })
  .text("Auto Commit is on")
  .css({"position":"fixed"})
  .css({"right":"0"})
  .css({"bottom":"0"})
  .css({"background-color":"#C55"})
  .css({"font-size":"0.8125em"})
  .css({"color":"FFF"})
  .css({"cursor":"pointer"})
  .css({"padding":"10px"})
  .on("click", toggle)
  .appendTo("body");
};

var toggle=function(){
  if (activated){
    $("#autoCommitToggle").text("Auto Commit is off");
  } else {
    $("#autoCommitToggle").text("Auto Commit is on");
  }
  activated=!activated;  
  console.log(activated);
};

var checkInput=function(){
  $(function(){ 
  $('#userAnswer').keyup(function() {
   if (activated){
      var answer =$("<span>").html($("detailKana p").html().split("<br>")[0].trim()).text();
       var currentResponse=$("#userAnswer").val();
      console.log(currentResponse);
      if (currentResponse===answer){
        $('#userAnswer').val(answer);
        $("#submitAnswer").click();
      }
    }
  });
}); 
};