jQuery(document).ready(function($){
	"use strict";
	$('#enfb_feedback_form').submit(function(e){
		e.preventDefault();
		if(validateForm() == false){
			$(".enfb_results").html($("<div>").addClass('alert alert-error').text('Please fill into the mandatory fields.'));
		}else{
			var data = {
				'action': 'enfb_feedback_submit',
			};
			$("#enfb_feedback_form .enfb_field").each(function(){
				data[$(this).attr('name')] = $(this).val();
			})
			data['enfb_nonce'] = $("#enfb_nonce").val();
			$.post(enfb.ajaxurl, data, function(response) {
			
				if(response.status == true){

					$('.enfb_results').html($("<div>").addClass("alert alert-success").text(response.message));
					$("#enfb_feedback_form").remove();

				}else{
					
					$('.enfb_results').html($("<div>").addClass("alert alert-error").text(response.message));
				}
			});
		}
	});

	$(".enfb_entries .entry_link").click(function(){
		var entry_id = $(this).data('id');
		var data = {
			'action': 'enfb_get_feedback',
			'id': entry_id
		};
		$.get(enfb.ajaxurl, data, function(response) {
			$("body").addClass("enfb_open");
			$(".enfb_popup .enfb_content").html(response);
		})
	})

	$(".enfb_popup .close").click(function(){
		$("body").removeClass("enfb_open");
	})

	function validateForm(){
		var validate = true;
		$("#enfb_feedback_form .enfb_field").each(function(){
			if($(this).val() == ''){
				$(this).addClass('validation-error');
				validate = false;
			}else{
				$(this).removeClass('validation-error');
			}
		})
		return validate;
	}

});