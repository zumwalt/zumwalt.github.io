jQuery(function ($) {

	// Them Breakpoints
	// --------------------------------------------------
	bpSmaller = 480;
	bpSmall = 768;
	bpMedium = 1024;
	bpLarge = 1300;

	// Show me mobile navigation, Bob!
	// --------------------------------------------------
	$('a[href="#recent-work"]').on('click', function (e) {
		e.preventDefault();
		$('main').addClass('projects-open');
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});

	$('a[href="#about"]').on('click', function (e) {
		e.preventDefault();
		$('main').removeClass('projects-open single-project');
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});

	// Divin' into a project
	// --------------------------------------------------
	$('.projects a').on('click', function (e) {
		e.preventDefault();
		var project = $(this).attr('href');

		if($(window).width() >= bpSmall) {
			if(!$('main').hasClass('projects-open')) {
				$('main').addClass('projects-open');
			}
		} else {
			if(!$('main').hasClass('single-project')) {
				$('main').addClass('single-project');
			}
		}
		
		
		if(!$(project).hasClass('open')) {
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
			$(project).siblings().removeClass('open');
			$(project).addClass('open');
		}
	});

	// Close a project
	// --------------------------------------------------
	$('.return a').on('click', function (e) {
		e.preventDefault();

		if($(window).width() >= bpSmall) {
			$('main').removeClass('projects-open');
		} else {
			$('main').removeClass('single-project');
		}
		
		$('.project').removeClass('open');
	});


	$('.about').on('click', function () {
		if($(window).width() >= bpSmall) {
			if($('main').hasClass('projects-open')) {
				$('main').removeClass('projects-open');

				setTimeout(function () {
					$('.project').removeClass('open');
				}, 800);
				
			}
		}
	});


	// Lightbox
	// --------------------------------------------------
	$('.example').each(function () {
		$(this).on('click', function (e) {
			e.preventDefault();

			if($(window).width() >= bpSmall) {
				var src = $('img', this).attr('src'),
					full = $('img', this).attr('data-full');
				$('body').addClass('fixed');
				$('<div class="overlay">').insertAfter($('main'));

				if(full) {
					$('<div class="lightbox"><img src="'+full+'"/><div class="close">Click anywhere to close</div></div>').insertAfter($('main'));
				} else {
					$('<div class="lightbox"><img src="'+src+'"/><div class="close">Click anywhere to close</div></div>').insertAfter($('main'));
				}

				setTimeout(function () {
					$('.overlay').addClass('visible');
					$('.lightbox').addClass('open');
				}, 100);
			}
			
		});
	});
	$(document).on('click', '.lightbox', function () {
		$('body').removeClass('fixed');
		$('.lightbox').css('opacity', 0);
		$('.overlay').css('opacity', 0);
		setTimeout(function () {
			$('.overlay').remove();
			$('.lightbox').remove();
		}, 500);
	});

	// Preboardin'
	// --------------------------------------------------
	$('#preboarding .example').fitVids();
});