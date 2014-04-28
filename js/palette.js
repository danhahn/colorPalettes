$(document).ready(function() {
	var isOpen = false;

	var isHex = new RegExp("[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]");

	var getColor = function(el) {
		//console.log(isOpen);
		if(!isOpen){
			isOpen = true;
			$.get('/js/template.html', function(data) {
				var $element = $(data);
				$element.appendTo(el);
				$element.find('input').focus();
				setTimeout(function() {
					$element.addClass("open");
				}, 10);
			});
		}		
	}  

	var buildSquare = function(val, colorList) {
		var $newColor = $('<div class="square">');
		$newColor.css("background-color", val).html(val);
		$newColor.addClass('bounceIn animated');
		$newColor.appendTo(colorList);

		setTimeout(function() {
			$(".inputBox").removeClass("open");

			setTimeout(function() {
				$("#displayBox").remove();
				isOpen = false;
				$(".pulse.animated").removeClass("pulse animated");
			}, 1000);			
		}, 10);	
	}

	var checkHex = function(hex) {
		hex = hex.replace("#", "");
		return (hex.match(isHex)) ? "#" + hex : hex;
	}

	var updateTile = function($el) {
		var val = checkHex($(".form-control").val());
		$el.closest(".color").css("background-color", val);
		$el.closest(".color").addClass("pulse animated");
		var colorList = $el.closest(".color").next(".colorList");
		buildSquare(val, colorList);
	};

	// press button
	$(".color").on("click", "button", function() {
		updateTile($(this));
	});

	// press enter
	$(".color").on("keypress", ".form-control", function(event) {
		if(event.keyCode == 13) {
			updateTile($(this));
		}	    
	});

	//click the added color square
	$(".colorList").on("click", ".square", function() {
		var val = $(this).html();
		//console.log(val)
		var el = $(this).parent().prev();
		el.css("background-color", val);
	});


	// click square to open search
	$(".color").on("click", function(){
		//var val = prompt("enter color");
		var $el = $(this);
		getColor($el);
		//$(this).css("background-color", val);
	});

	// press a or s to open search
	$(document).on("keypress", function(event) {
		if(event.keyCode == 97) {
			var $el = $("#color1");
			getColor($el);
		}
		if(event.keyCode == 115) {
			var $el = $("#color2");
			getColor($el);
		}
	});

	// press esc to close search
	$(document).keyup(function(event) {
		if(event.keyCode==27) {
			$(".inputBox").removeClass("open");
			setTimeout(function() {
				$("#displayBox").remove();
				isOpen = false;
			}, 1000);	
		}
	});

}); 