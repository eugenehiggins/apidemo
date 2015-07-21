$(document).ready(function(){

	var originalTag;
	var originalContent;
	var city;
	var id;

	$('#zipslist').on('click', '.zip', function(e){
		e.preventDefault();

		//capture original state
		originalTag = $(this)[0];
		originalContent = originalTag.innerHTML;
		city = originalContent.split(',')[1];
		id = $(originalTag).data('id');
		
		//replace tag and contents
		$(originalTag).replaceWith('<input type="text" id="city" placeholder="' + city +'">');
		$('input#city')[0].focus();
	})

	$('#zipslist').on('focusout', '#city', function(){

		restoreTag();
		
	})

	$('#zipslist').on('keyup', '#city', function(e) {
		// check if enter key was hit while the field had focus
	    if(e.which == 13) {
	    	// check if any text was entered with enter key was hit
	    	if ($(e.target).val()) {
		    	var city = $(e.target).val();
		    	
		    	var cityUpdate = {
		    		'city' : city
		    	}
		        
		        $.ajax({
		        	type: 'POST',
		        	data: cityUpdate,
		        	url: '/data/edit/' + id,
		        	dataType: 'JSON'
		        }).done( function( response ){

		        	if (response.msg === ''){
		        		// make sure that the original <a> tag's innerHTML is set to the new value
		        		restoreTag(city);
		        		
		        	} else {
		        		alert('Error: ' + response.msg);
		        		//make sure that the original <a> tag is set to the value before the edit
		        	}
		        });

		    // the field didn't have any text entered with the enter key was hit
		    } else {
		    	restoreTag();
		    }
	    }
	});
	
	function restoreTag (newVal) {

		if (newVal){
			console.log('should be updating the HTML here ' + $(originalTag).html());
			$(originalTag).html(' '+newVal);
			//$('input#city').replaceWith(originalTag);
		} 

		try {
			$('input#city').replaceWith(originalTag);
		}
		catch(e) {
			if (e instanceof DOMException) {
				console.log('ignoring error');
			} else {
				throw e;
			}
		}
	}
	
})