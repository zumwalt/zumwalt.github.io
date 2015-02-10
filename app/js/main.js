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
		if($(window).width() < bpSmall) {
			$('main').addClass('projects-open');
			$('.about').css('overflow','hidden');
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
		}
	});

	$('a[href="#about"], .brand a').on('click', function (e) {
		e.preventDefault();
		if($(window).width() < bpSmall) {
			$('.about').css('overflow','visible');
			$('main').removeClass('projects-open single-project');
			$('a[href="#about"]').siblings().removeClass('current');
			$(this).addClass('current');
		}
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

		// Load images
		// --------------------------------------------------
		$(project).find('img').each(function () {
			$(this).attr('src', $(this).data('src'));
		});
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
			var src = $('img', this).attr('src'),
				full = $('img', this).attr('data-full');

			if($(window).width() >= bpSmall) {

				var image = new Image();

			    $('body').addClass('fixed');
				$('<div class="overlay"><div class="loading"></div></div><div class="lightbox"></div>').insertAfter($('.wrapper'));

			   	if(full) {
			   		image.src = full;
			   	} else {
			   		image.src = src;
			   	}
			    
			    image.onload = function () {
			        $('.lightbox').empty().append(image);
			        setTimeout(function () {
			        	$('.overlay .loading').css('opacity', 0);
						$('.lightbox').addClass('open');
					}, 300);
			    };
			    image.onerror = function () {
			        $('.lightbox').empty().html('That image is not available.');
			    }				

			    return false;
			} else {
				var url;
				if(full) {
					url = full;
				} else {
					url = src;
				}
				window.open(url, '_blank');
			}
			
		});
	});
	$(document).on('click', '.lightbox', function () {
		$('body').removeClass('fixed');
		$('.lightbox').removeClass('open');
		$('.overlay').css('opacity', 0);
		setTimeout(function () {
			$('.overlay').remove();
			$('.lightbox').remove();
		}, 600);
	});

	// Preboardin'
	// --------------------------------------------------
	$('#preboarding .example').fitVids();
});