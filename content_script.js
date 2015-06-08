if ($(".border").length > 0) {
  $(".border").remove();
  console.log("removed");
}
else {
	$.get(chrome.extension.getURL('border-template.html'), function(data) {
    $(data).appendTo('body');

    console.log("added");

		var borderLeft = $('.border-left'),
		    borderRight = $('.border-right'),
		    borderTop = $('.border-top'),
		    borderBottom = $('.border-bottom');

		var textPadding = 10; //define text-padding here

		function adaptTo(selected) {
	    borderLeft.css({width: selected.left - textPadding});
	    borderRight.css({left: selected.left + selected.width + textPadding});
	    borderTop.css({
	        width: selected.width + 2*textPadding,
	        left: selected.left - textPadding,
	        height: selected.top - textPadding
	    });
	    borderBottom.css({
	        top: selected.top + selected.height + textPadding,
	        left: selected.left - textPadding,
	        width: selected.width + 2*textPadding
	    });
		};

		document.onmouseup = function() {
			var selected = window.getSelection().getRangeAt(0).getBoundingClientRect();
			if (selected.width > 0 && selected.height > 0) {
				adaptTo(selected);
			}
			console.log("changed dimensions on highlight");
		};

		$(document).scroll(function() {
			var selected = window.getSelection().getRangeAt(0).getBoundingClientRect();
			if (selected.width > 0 && selected.height > 0) {
				adaptTo(selected);
			}
			console.log("changed dimensions on scroll");
		});

  });
};