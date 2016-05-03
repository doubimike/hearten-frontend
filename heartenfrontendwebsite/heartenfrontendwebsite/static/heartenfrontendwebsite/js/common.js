$(document).ready(function() {
	$('.mc--header a').eq(0).click(function(event) {
		event.preventDefault();
		$('.mc--header a').eq(1).removeClass('active');
		$('.mc--header a').eq(0).addClass('active');
		$('.mc--content form').eq(1).removeClass('show').addClass('hide');
		$('.mc--content form').eq(0).removeClass('hide').addClass('show');
	});
	$('.mc--header a').eq(1).click(function(event) {
		event.preventDefault();
		
		$('.mc--header a').eq(0).removeClass('active');
		$('.mc--header a').eq(1).addClass('active');
		$('.mc--content form').eq(0).removeClass('show').addClass('hide');
		$('.mc--content form').eq(1).removeClass('hide').addClass('show');
	});
});