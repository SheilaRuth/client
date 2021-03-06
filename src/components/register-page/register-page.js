define(["knockout", "text!./register.html", "jquery", 'knockout-validation'], function(ko, templateMarkup, $) {

	function Register(route) {
		this.baseURL = "http://bernbank.com/api/";
		this.threshold = "30";
		this.slider = ko.observable(1);

		ko.validation.init({
			insertMessages : false
		});

		this.userEmail = ko.observable('').extend({
			required : true,
			email : true
		});
		this.errors = ko.observableArray([]);
	}


	Register.prototype.postPledge = function() {
		var errors = ko.validation.group(this);
		var data = {
			"email" : this.userEmail(),
			"amount" : this.slider()
		};

		if (errors().length === 0) {
			$.ajax({
				method : "POST",
				crossDomain : true,
				contentType : 'application/json',
				dataType : "json",
				url : this.baseURL + 'pledges/' + this.userEmail(),
				data : JSON.stringify(data)
			}).done(function(data) {
				$(".card").html('<div class="thankyou">Thank you for your support!</div>');
			});
			//$("#newPledge").modal('hide');
		} else {
			this.errors(errors());
			return false;
		}
	};

	return {
		viewModel : Register,
		template : templateMarkup
	};

});
