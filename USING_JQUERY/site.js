$(function(){
 	var number_job = $('li').length;
 	var number_complete;
 	var number_active = number_job;

 	function click_add(){
		var Title = $('#myInput').val();
 		if(Title != ''){
 			$('ul').append('<li>'+Title+'</li>');
	 		$('.xoa').append('<button class="nutxoa"><i class="fa fa-remove"></i></button>');
	 		$('#myInput').val('');

	 		number_job += 1; // after add, number_job + 1
			$('.number_job').text(number_job);
			number_active +=1;
			$('.number_active').text(number_active);
 		}	
	}	
	// catch enter keyboard event
	$('#myInput').keypress(function(e) {
	    if(e.keyCode == 13) {
	        click_add();
	        return false; // after add job, return false to stop reload page
	    }
	});
	
 	// Handle add job event
 	$('html').on('click', '.add', function(event) {
 		click_add();
 	});

 	// Handle check job event!
 	$('html').on('click', 'ul li', function(event) {
 		// show color
 		$(this).toggleClass('checked');

 		// show button "clear completed" when checking li element
 		if($('ul li').hasClass('checked')){
 			$('.clear').removeClass('hide_clear_button');
 		}else{
 			$('.clear').addClass('hide_clear_button');
 		}	

 		number_complete = $('.checked').length;	
 		$('.number_complete').text(number_complete);

 		number_active = number_job - number_complete;
 		$('.number_active').text(number_active);
 	});
 	// Handle delete job event
 	$('html').on('click', '.nutxoa', function(event) {
 		// get "li" index
		var index = $(this).index()+1;
		// number of job:
		number_job -= 1;
		$('.number_job').text('');
		$('.number_job').text(number_job);
		//active and compele (if "li" element has checked and deleted => number_complete -1)
		if($('ul li:nth-child('+index+')').hasClass('checked')){
			number_complete -= 1; 
	
			$('.number_complete').text(number_complete);
			$(this).remove();
			$('ul li:nth-child('+index+')').remove();
		}else{
			number_active -=1
	
			$('.number_active').text(number_active);
			$(this).remove();
			$('ul li:nth-child('+index+')').remove();		
		}
 	});
 	
 	//complete
 	$('html').on('click', '.complete', function(event) {

 		$('.button').removeClass('button_color');
 		$(this).addClass('button_color');
 		
 		$('ul li, .nutxoa').hide();
 		for (var i = 0; i <=$('li').length; i++) {
 			if($('ul li:nth-child('+i+')').hasClass('checked')){
 				$('ul li:nth-child('+i+'), .nutxoa:nth-child('+i+')').show();
 			}
 		}
 	});
 	//active
 	$('html').on('click', '.active', function(event) {

 		$('.button').removeClass('button_color');
 		$(this).addClass('button_color');

 		$('ul li, .nutxoa').hide();
 		for (var i = 1; i <= $('li').length; i++) {
 			if( !$('ul li:nth-child('+i+')').hasClass('checked')){
 				$('ul li:nth-child('+i+'), .nutxoa:nth-child('+i+')').show();
 			}
 		}	
 	});
 	// all
 	$('html').on('click', '.all', function(event) {
 		//show color
 		$('.button').removeClass('button_color');
 		$(this).addClass('button_color');
 		$('ul li, .nutxoa').show();
 	});
 	// clear completed 
 	$('html').on('click', '.clear', function(event) {
 		$('.button').removeClass('button_color');
 		$('.all').addClass('button_color');

 		number_job -= number_complete;
 		number_complete = 0;

 		$('.number_job').text(number_job);
 		$('.number_complete').text(number_complete);
 		var i = $('li').length;
 		// for (var i = 1; i <= $('li').length; i++) {
 		while( i <= $('li').length && i >= 0){
 			if( $('ul li:nth-child('+i+')').hasClass('checked')){
 				$('ul li:nth-child('+i+'), .nutxoa:nth-child('+i+')').remove(); //after remove, length change !!!
 			}
 			i--;
 		}	
 		$('ul li, .nutxoa').show();
 	});
 	//CHECK ALL
	var clicks = 0;
	$('html').on('click', '.check_all', function(event){
		$('.clear').removeClass('hide_clear_button');

		$('.button').removeClass('button_color');
 		$('.all').addClass('button_color');
 		//CHECK ALL
 		clicks += 1;
 		if( clicks %2 == 1){
	 		for (var i = 1; i <= $('li').length ; i++) {
	 			$('ul li:nth-child('+i+')').addClass('checked');
	 		}
	 		if($('ul li').hasClass('checked')){
	 			$('.clear').removeClass('hide_clear_button');
	 		}else{
	 			$('.clear').addClass('hide_clear_button');
 			}	
 		}else{
 			for (var i = 1; i <= $('li').length ; i++) {
	 			$('ul li:nth-child('+i+')').removeClass('checked');
	 		}
	 		if($('ul li').hasClass('checked')){
	 			$('.clear').removeClass('hide_clear_button');
	 		}else{
	 			$('.clear').addClass('hide_clear_button');
 			}	
 		}
	});
	//TOOL TIPS
	$(document).ready(function(){
    	$('[data-toggle="tooltip"]').tooltip();   
	});
})  

