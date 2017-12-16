// ==UserScript==
// @name         Kaniwani CLK
// @namespace    me.eekone
// @version      1.0
// @description  Clicks it
// @match        https://kaniwani.com/kw/vocabulary/
// @author       Eekone
// @run-at document-end
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

let tokenParser = new RegExp("csrftoken=([A-z0-9]+)");
let token = tokenParser.exec(document.cookie)[1]; 

function createControls() {
  let levelCards = document.querySelectorAll('.wrap');
  let index = 1;
  levelCards.forEach((card) => {
    let i = index;
    let lockUnlockButton = document.createElement('div');
     changeButtonState(lockUnlockButton, localStorage.getItem(i));
     lockUnlockButton.setAttribute('style', `
           position: absolute; cursor:pointer;
           bottom: 7%; left:43%;
     `);
     lockUnlockButton.setAttribute('vocabId', index); 
     lockUnlockButton.addEventListener('click', (event) => {lock(i,lockUnlockButton);});
    
     card.appendChild(lockUnlockButton);
     index++;
  });
}

function lock(i, lockUnlockButton) {
   let taskIds = [];   
   let responceNumber=0;
   $.get(`/kw/vocabulary/${i}`, (data) => {
     let idParser = new RegExp(`data-vocab-id="([0-9]+)"`, 'g');      
     let vocabIds = [];

     for (let match;(match = idParser.exec(data)) !== null;) 
       vocabIds.push(match[1]);         
    
     for (let ic = 0; ic < vocabIds.length; ic++)  
       $.post('/kw/togglevocab/', {review_id: vocabIds[ic], csrfmiddlewaretoken: token}).done((response) => {
           if (responceNumber<vocabIds.length-1) {
             lockUnlockButton.innerHTML = ic;
             responceNumber++;
           } 
           else {  
             localStorage.setItem(i, (localStorage.getItem(i) === 'true') ? 'false' : 'true');
             changeButtonState(lockUnlockButton, localStorage.getItem(i));
          } 
         });      
   });    
}

function changeButtonState(lockUnlockButton, state='NS') {  
      if (state===null)
        lockUnlockButton.innerHTML = 'NS';
      else 
        lockUnlockButton.innerHTML = (state==='true') ? 'SL' : 'SU';
}

createControls();