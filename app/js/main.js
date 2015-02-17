jQuery(function ($) {

	// Them Breakpoints
	// --------------------------------------------------
	bpSmaller = 480;
	bpSmall = 768;
	bpMedium = 1024;
	bpLarge = 1300;
	bpHuge = 2000;

	// Putting the fun in functions
	// --------------------------------------------------
	$.fn.scrollTo = function(elem) { 
	    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top); 
	    return this; 
	};

	$.fn.slideshow = function () {
		this.flexslider({
			slideshow: false,
			animation: "slide",
			prevText: "",
			nextText: "",   
		});
	};

	function loadProject() {
		$('.project-frame').append('<div class="loading"/>');
		// Load images
		// --------------------------------------------------
		$('.project').find('img').each(function () {
			$(this).attr('src', $(this).data('src'));
		});

		$('.project').imagesLoaded(function () {
			$('.project').fadeIn(500);
			$('.project-frame .loading').fadeOut(1000);

			// Run the jewels and/or slideshow
			// --------------------------------------------------
			$('.slideshow').each(function () {
				$(this).slideshow();
			});

			// Fit them vids!
			// --------------------------------------------------
			$('.example.video').fitVids();
		});
	};

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
	$('a[href="#case-studies"]').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		if($(window).width() < bpMedium) {
			//window.location.hash = '#case-studies';
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
	$('.projects a').on('click', function (e) {
		e.preventDefault();
		var frame = $('.project-frame');
		var project = $(this).data('load');
		var title = $(project).find('header h2').text();

		// Track those events
		ga('send', 'event', 'project', 'click', title);

		if(!$(this).hasClass('current')) {
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
		}


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
					.delay(1600)
					.queue(function () {
						$(this).removeClass('blink');
						$(this).dequeue();
					});
			}
		}
		
		if(!$('.project', frame).length) {
			setTimeout(function () {
				frame.load('/case-studies/'+project+'/index.html', function () {
					loadProject();
				});
			}, 1500);
		} else {
			if(!$('#'+project).length) {
				frame.find('.project').fadeOut(500);
				setTimeout(function () {
					frame.empty();
					frame.load('/case-studies/'+project+'/index.html', function () {
						loadProject();
					});
				}, 500);
			}
		}

	});

	$(document).on('click', '.up-next a', function (e) {
		e.preventDefault();
		var frame = $('.project-frame');
		var project = $(this).data('load');
		var title = $(project).find('header h2').text();

		// Track those events
		ga('send', 'event', 'project', 'click', title);

		// Current nav
		$('.recent-work a').removeClass('current');
		$('.recent-work a[data-load="'+project+'"]').addClass('current');

		// Load the case study
		frame.find('.project').fadeOut(500);
		setTimeout(function () {
			frame.empty();
			frame.load('/case-studies/'+project+'/index.html', function () {
				loadProject();
			});
		}, 500);

		// Scroll the project links to the appropriate place
		// if($(window).width() >= bpMedium) {
  //         $('.recent-work').scrollTo('a[data-load="'+project+'"]',{duration:3000});
  //       }
	});

	// Footnotes
	// --------------------------------------------------
	$('.footnote, .reference').on('click', function (e) {
		e.preventDefault();
		var project = $(this).parents('.project');
		var destination = $(this).attr('href');
		project.scrollTo($(destination));
	});

	// Close a project
	// --------------------------------------------------
	$(document).on('click', '.return a', function (e) {
		e.preventDefault();

		if($(window).width() >= bpMedium) {
			//window.location.hash = '';
			$('main').removeClass('projects-open');
		} else {
			//window.location.hash = '#case-studies';
			$('main').removeClass('single-project');
		}

		setTimeout(function () {
			$('.project-frame').empty();
		}, 1300);
		
	});


	$('.about').on('click', function (e) {
		e.preventDefault();

		$('.project').fadeOut(500);
		setTimeout(function () {
			$('.project-frame').empty();
		}, 500);

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

				if($('a[href="#case-studies"]').hasClass('current')) {
					$('a[href="#case-studies"]').removeClass('current');
					$('a[href="#about"]').addClass('current');
				}

				setTimeout(function () {
					$('.project').removeClass('open');
				}, 800);
				
			}
		}
	});

	$('.about a').on('click', function (e) {
		e.stopPropagation();
	});


	// Lightbox
	// --------------------------------------------------
	$(document).on('click', '.example, .slide', function (e) {
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

	$(document).on('click', '.lightbox', function () {
		$('body').removeClass('fixed');
		$('.lightbox').removeClass('open');
		$('.overlay').css('opacity', 0);
		setTimeout(function () {
			$('.overlay').remove();
			$('.lightbox').remove();
		}, 600);
	});

});