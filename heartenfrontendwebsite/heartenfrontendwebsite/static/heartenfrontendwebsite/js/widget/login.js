$(document).ready(function() {
	$('.login-btn').click(function(event) {
		$('.mask').css('display', 'block');
		$('.mc--header a').eq(0).removeClass('active');
		$('.mc--header a').eq(1).addClass('active');
		$('.mc--content form').eq(0).removeClass('show').addClass('hide');
		$('.mc--content form').eq(1).removeClass('hide').addClass('show');
	});
});