if ($(".layering").length > 0) {
  $(".layering").remove();
  console.log("removed");
}
else {
	$.get(chrome.extension.getURL('layer-template.html'), function(data) {
    $(data).appendTo('body');

    console.log("added");

		var layeringLeft = $('.layering-left'),
		    layeringRight = $('.layering-right'),
		    layeringTop = $('.layering-top'),
		    layeringBottom = $('.layering-bottom');

		var textPadding = 10; //define text-padding here

		function adaptTo(selected) {
	    layeringLeft.css({width: selected.left - textPadding});
	    layeringRight.css({left: selected.left + selected.width + textPadding});
	    layeringTop.css({
	        width: selected.width + 2*textPadding,
	        left: selected.left - textPadding,
	        height: selected.top - textPadding
	    });
	    layeringBottom.css({
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