$(document).ready(function() {
	$('.register-btn').click(function(event) {
		$('.mask').css('display', 'block');
		$('.mc--header a').eq(1).removeClass('active');
		$('.mc--header a').eq(0).addClass('active');
		$('.mc--content form').eq(1).removeClass('show').addClass('hide');
		$('.mc--content form').eq(0).removeClass('hide').addClass('show');
	});
});