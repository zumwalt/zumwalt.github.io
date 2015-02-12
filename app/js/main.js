jQuery(function ($) {

	// Them Breakpoints
	// --------------------------------------------------
	bpSmaller = 480;
	bpSmall = 768;
	bpMedium = 1024;
	bpLarge = 1300;

	// Routin'
	// --------------------------------------------------
		// var currentUrl = window.location.href,
		// 	segments = currentUrl.replace(/\/\s*$/,'').split('/'),
		// 	pages = new Array();

		// segments.shift();

		// // Get possible pages, add to array
		// $('.project').each(function () {
		// 	var id = $(this).attr('id');
		// 	pages.push('#'+id);
		// });

		// if(segments[3] === '#about') {
		// 	if($('main').hasClass('projects-open single-project')) {
		// 		$('main').removeClass('projects-open single-project');
		// 	}
		// }
		// if(segments[3] === '#recent-work') {
		// 	if($(window).width() < bpMedium) {
		// 		if(!$('main').hasClass('projects-open')) {
		// 			$('main').addClass('projects-open');
		// 		}
		// 		if($('main').hasClass('single-project')) {
		// 			$('main').removeClass('single-project');
		// 		}
		// 	} else {
		// 		if($('main').hasClass('projects-open single-project')) {
		// 			$('main').removeClass('projects-open single-project');
		// 		}
		// 	}
			
			
		// }
		// if(segments[4]) {
		// 	var project = segments[4];
		// 	if(!$('main').hasClass('projects-open single-project')) {
		// 		$('main').addClass('projects-open single-project');
		// 	}
		// 	if(!$(project).hasClass('open')) {
		// 		$(project).addClass('open');
		// 	}

		// 	// Load images
		// 	// --------------------------------------------------
		// 	$(project).find('img').each(function () {
		// 		$(this).attr('src', $(this).data('src'));
		// 	});
		// }

		// // On hashchange
		// // --------------------------------------------------

		// $(window).on('hashchange', function () {
		// 	currentUrl = window.location.href;
		// 	segments = currentUrl.replace(/\/\s*$/,'').split('/');

		// 	segments.shift();

		// 	if(!segments[3]) {
		// 		if($('main').hasClass('projects-open single-project')) {
		// 			$('main').removeClass('projects-open single-project');
		// 		}
		// 	}

		// 	if(segments[3] === '#about') {
		// 		if($('main').hasClass('projects-open single-project')) {
		// 			$('main').removeClass('projects-open single-project');
		// 		}
		// 	}
		// 	if(segments[3] === '#recent-work') {
		// 		if($(window).width() < bpMedium) {
		// 			if(!$('main').hasClass('projects-open')) {
		// 				$('main').addClass('projects-open');
		// 			}
		// 			if($('main').hasClass('single-project')) {
		// 				$('main').removeClass('single-project');
		// 			}
		// 		}
		// 	}
		// 	if(segments[4]) {
		// 		var project = segments[4];
		// 		if(!$('main').hasClass('projects-open single-project')) {
		// 			$('main').addClass('projects-open single-project');
		// 		}
		// 		if(!$(project).hasClass('open')) {
		// 			$(project).addClass('open');
		// 		}

		// 		// Load images
		// 		// --------------------------------------------------
		// 		$(project).find('img').each(function () {
		// 			$(this).attr('src', $(this).data('src'));
		// 		});
		// 	}
		// });

	// Images Loaded yet?
	// --------------------------------------------------
	$(document).imagesLoaded(function () {
		console.log('We out here.');
		$('.overlay').fadeOut(500);
		setTimeout(function () {
			$('.overlay').remove();
		}, 500);

	});

	// Show me mobile navigation, Bob!
	// --------------------------------------------------
	$('a[href="#recent-work"]').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		if($(window).width() < bpMedium) {
			//window.location.hash = '#recent-work';
			$('main').addClass('projects-open');
			$(this).siblings().removeClass('current');
			$(this).addClass('current');

			setTimeout(function () {
				$('.about').css('overflow-y','hidden');
			}, 1300);
		}
		if($(window).width() >= bpSmall) {
			//window.location.hash = '';

			$('.brand')
				.addClass('blink')
				.delay(1300)
				.queue(function () {
					$(this).removeClass('blink');
					$(this).dequeue();
				});
		}
	});

	$('a[href="#about"], .brand a').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		//window.location.hash = '#about';
		if($(window).width() < bpMedium) {
			$('main').removeClass('projects-open single-project');
			$('a[href="#about"]').siblings().removeClass('current');
			$('a[href="#about"]').addClass('current');

			setTimeout(function () {
				$('.about').css('overflow-y','scroll');
			}, 1300);
		}
		if($(window).width() >= bpSmall) {
			$('.brand')
				.addClass('blink')
				.delay(1300)
				.queue(function () {
					$(this).removeClass('blink');
					$(this).dequeue();
				});
		}
	});

	// Divin' into a project
	// --------------------------------------------------
	$('.projects a, .up-next a').on('click', function (e) {
		e.preventDefault();
		var project = $(this).attr('href');

		//window.location.hash = '#recent-work/'+project;

		if(!$('main').hasClass('projects-open')) {
			setTimeout(function () {
				$('main').addClass('projects-open');
			}, 300);
			
		}
		if(!$('main').hasClass('single-project')) {
			setTimeout(function () {
				$('main').addClass('single-project');
			}, 300);
			
		}

		if($(window).width() >= bpMedium) {
			if(!$('main').hasClass('projects-open')) {
				$('.brand')
					.addClass('blink')
					.delay(1300)
					.queue(function () {
						$(this).removeClass('blink');
						$(this).dequeue();
					});
			}
		}
		
		
		if(!$(project).hasClass('open')) {
			$('.projects a[href="'+project+'"]').siblings().removeClass('current');
			$('.projects a[href="'+project+'"]').addClass('current');
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

		if($(window).width() >= bpMedium) {
			//window.location.hash = '';
			$('main').removeClass('projects-open');
		} else {
			//window.location.hash = '#recent-work';
			$('main').removeClass('single-project');
		}
		
	});


	$('.about').on('click', function () {
		
		if($('main').hasClass('projects-open')) {
			// if($(window).width() >= bpMedium) {
			// 	window.location.hash = '';
			// } else {
			// 	window.location.hash = '#recent-work';
			// }
		}

		if($(window).width() >= bpSmall) {

			if($('main').hasClass('projects-open')) {
				$('.brand')
					.addClass('blink')
					.delay(1300)
					.queue(function () {
						$(this).removeClass('blink');
						$(this).dequeue();
					});

				$('main').removeClass('projects-open single-project');

				if($('a[href="#recent-work"]').hasClass('current')) {
					$('a[href="#recent-work"]').removeClass('current');
					$('a[href="#about"]').addClass('current');
				}

				setTimeout(function () {
					$('.project').removeClass('open');
				}, 800);
				
			}
		}
	});

	// Slide that junt
	// --------------------------------------------------
	$('.slideshow').each(function () {
		$(this).flexslider({
			slideshow: false,
			animation: "slide",
			prevText: "",
			nextText: "",   
		});

		$(this).imagesLoaded(function () {
			$(this).width($(this).find('li:first-child img').width());
		});
		

		$(window).resize(function () {
			$(this).width($(this).find('li:first-child img').width());
		});
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