﻿document.addEventListener("DOMContentLoaded",function(){
	var number_job = document.querySelectorAll('li').length;
 	var number_complete = document.querySelectorAll('li').length;
 	var number_active = number_job;
 	// TRIGGER ENTER INPUT TEXT
 	var input = document.getElementById("myInput");
	input.addEventListener("keypress", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
	       	click_add();
	       	// return false;
	   	}

	});
 	function click_add(){
 		var Title = document.getElementById("myInput").value;
 		var a = 0;
 		for (var i = 0; i < Title.length; i++) {
			if(Title[i] == ' '){
				a += 1;
			}
		}
		// CHECK INPUT NOT IS THE STRING ONLY CONTAIN SPACE
 		if(Title.length != a){
 			var div = document.createElement('div');
 			document.querySelector('ul').appendChild(div);
 			div.classList.add('row','job');
 			div.innerHTML = "<li class='col-sm-11'>"+ Title +"</li><button class='col-sm-1 nutxoa'>x</button>"
	 		
	 		document.getElementById('myInput').value = '';

	 		number_job += 1; // after add, number_job, number_active + 1
	 	 	document.querySelector('.number_job').textContent = number_job; 	
			number_active +=1;
	 	 	document.querySelector('.number_active').textContent = number_active;
 		}
 	}
 	function set_text_complete_active_all(){
		document.querySelector('.number_complete').textContent = number_complete; 
	 	document.querySelector('.number_active').textContent = number_active; 
	 	document.querySelector('.number_job').textContent = number_job;
	}
	function remove_all_button_color(){
 		var button = document.querySelectorAll('.button');
 		for (var i = 0; i < button.length; i++) {
 			button[i].classList.remove('button_color');
 		}
 	}
 	function complete(element, className) {
 		var a = 0;
 		for (var i = 0; i < element.length; i++) {
 			if((' ' + element[i].className + ' ').indexOf(' ' + className+ ' ') > -1){ // classes split by space: ' '
 				element[i].parentElement.classList.remove('hide'); // show div checked
 			} 
 		}	
	}
 	function active(element, className) {
 		var a = 0;
 		for (var i = 0; i < element.length; i++) {
 			if((' ' + element[i].className + ' ').indexOf(' ' + className+ ' ') > -1){ // classes split by space: ' '
 				element[i].parentElement.classList.add('hide'); // hide 
 			} 
 		}	
	}
 	function clear(element, className) {
 		var i = element.length -1;
 		while(i <= element.length -1 && i >=0){
 			if((' ' + element[i].className + ' ').indexOf(' ' + className + ' ') > -1){ // classes split by space: ' '
 				document.querySelector('ul').removeChild(element[i].parentElement); 
 			} 
 			i--;
 		}	
	}
 	function hide(element) {
 		var a = 0;
 		for (var i = 0; i < element.length; i++) {
 			element[i].classList.add('hide');
 		}
	}
 	function show(element) {
 		var a = 0;
 		for (var i = 0; i < element.length; i++) {
 			element[i].classList.remove('hide');
 		}
	}
	// FUNCTION CHECK CLASS IN LIST ELEMENT
	function hasClass(element, className) {
 		var a = 0;
 		for (var i = 0; i < element.length; i++) {
 			if((' ' + element[i].className + ' ').indexOf(' ' + className+ ' ') > -1){ // classes split by space: ' '
 				a += 1;
 			} 
 		}
 		if(a == 0){ 
 			return false;
 		}else{
 			return true;
 		}
	}
	function show_clear_button(){
		if(hasClass(document.querySelectorAll('li'), 'checked') == true){
   			document.querySelector('.clear').classList.remove('hide_clear_button');
  		}else if(hasClass(document.querySelectorAll('li'), 'checked') == false){
  			document.querySelector('.clear').classList.add('hide_clear_button');
  		}
	}
 	//handle add event
 	document.querySelector('.add').addEventListener('click', function(){
 		click_add();
 	})
 	
 	//HANDLE CLICK 'li' ELEMENT EVENT
 	var list = document.querySelector('ul');
	list.addEventListener('click', function(ev) {
  	if (ev.target.tagName === 'LI') {
  		// show "li" color
  		ev.target.classList.toggle('checked');
  		show_clear_button()
 		number_complete = document.querySelectorAll('.checked').length;	
 		number_active = number_job - number_complete;
 		set_text_complete_active_all();
 	 }
	});
	// DELETE JOB
 	var deletebutton = document.querySelector('ul'); //select parent, addEventListener: children
 	deletebutton.addEventListener('click', function(ev){
 		if(ev.target.tagName === 'BUTTON'){
 			//delete job, number_job -1
 			ev.target.parentElement.remove();
 			number_job -= 1;
 			if((' ' + ev.target.parentElement.children[0].className + ' ').indexOf(' ' + 'checked'+ ' ') > -1){ number_complete -= 1 }
			else{ number_active -= 1 }
 			
 		set_text_complete_active_all();
 	 
 		}
 	})

 	document.querySelector('.active').addEventListener('click', function(){
 		remove_all_button_color();
 		this.classList.add('button_color');
 		// show all and hide checked job
 		show(document.querySelectorAll('.row.job'));
 		active(document.querySelectorAll('li'), 'checked');
 	}) 
	document.querySelector('.all').addEventListener('click', function(){
 		remove_all_button_color();
 		this.classList.add('button_color');
 		// show all
 		show(document.querySelectorAll('.row.job'));
 	}) 
	document.querySelector('.complete').addEventListener('click', function(){
 		remove_all_button_color();
 		this.classList.add('button_color');
 		// hide all and show checked job
 		hide(document.querySelectorAll('.row.job'));
 		complete(document.querySelectorAll('li'), 'checked');
 	}) 
	document.querySelector('.clear').addEventListener('click', function(){
		remove_all_button_color();
 		document.querySelector('.all').classList.add('button_color');

 		number_job = document.querySelectorAll('li').length;
		number_job -= number_complete;
 		number_complete = 0;

 		document.querySelector('.number_job').textContent = number_job; 
 		document.querySelector('.number_complete').textContent = number_complete; 
 		clear(document.querySelectorAll('li'), 'checked');

	})
	
	//CHECK ALL
	var clicks = 0;
	document.querySelector('.check_all').addEventListener('click', function(){
		remove_all_button_color();
 		document.querySelector('.all').classList.add('button_color');
 		//CHECK ALL
 		clicks += 1;
 		var li = document.querySelectorAll('li');
 		if( clicks %2 == 1){
	 		for (var i = 0; i < li.length ; i++) {
	 			li[i].classList.add('checked');
	 		}
	 		//SHOW ALL
	 		show(document.querySelectorAll('.row.job'));
	 		
	 		number_active = 0;
	 		number_complete = document.querySelectorAll('li').length;
	 		set_text_complete_active_all();
	 		show_clear_button();
 		}else{
 			for (var i = 0; i < li.length ; i++) {
	 			li[i].classList.remove('checked');
	 		}
	 		show(document.querySelectorAll('.row.job'));
	 		number_active = document.querySelectorAll('li').length;
	 		number_complete = 0;
	 		set_text_complete_active_all();
	 		show_clear_button();
 		}
	})
},false)