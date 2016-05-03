$(function() {
	$('.dialog-btn').on('click', function(event) {
		event.preventDefault();
		$('.mask').css('display', 'block');
		
		var h = document.body.scrollHeight;
		$('.mask').css('height', h);
	});	

	$('.mask--close-btn, .mask').click(function() {
        $('.mask').css('display', 'none');
    });

    $('.mask--dialog-box').on('click', function(event) {
        event.stopPropagation()
    });
});