$(function() {
	$(".search").sticky({topSpacing:70});

	$('a').smoothScroll({afterScroll:function(){
    var personName = $(this).attr("href");
    window.history.pushState(null, null, personName);
	}});

	// Create the dropdown base
	$("<select /><span class='dropdown-arrow'/>").appendTo(".search");

	// Populate dropdown with menu items
	$("<option />", {
		"value"   : "0",
		"text"    : "Choose a thank you..."
	}).appendTo(".search select");

	$(".search a").each(function() {
		var el = $(this);
		$("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo(".search select");
	});

	$(".search select").change(function() {
		if ( $(this).find("option:selected").val() != "0" )
	  	window.location = $(this).find("option:selected").val();
	});
});