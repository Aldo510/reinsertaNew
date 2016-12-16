jQuery(document).ready(function($) {
	"use strict";
	/* window */
	var window_width, window_height, scroll_top;
	
	/* admin bar */
	var adminbar = $('#wpadminbar');
	var adminbar_height = 0;
	
	/* header menu */
	var header = $('#cshero-header-navigation');
	var header_top = 0;
	
	/* scroll status */
	var scroll_status = '';
	/* prety photo */
	$(document).bind('ready ajaxComplete',function(){
		$("a[rel^='prettyPhoto']").prettyPhoto();
	})
	/**
	 * window load event.
	 * 
	 * Bind an event handler to the "load" JavaScript event.
	 * @author Fox
	 */
	$(window).load(function() {
		
		/** current scroll */
		scroll_top = $(window).scrollTop();
		
		/** current window width */
		window_width = $(window).width();
		
		/** current window height */
		window_height = $(window).height();
		//alert(window_width+' '+window_height);
		/* get admin bar height */
		adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;
		
		/* get top header menu */
		header_top = header.length > 0 ? header.offset().top - adminbar_height : 0 ;
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu(scroll_top);
		}
		
		/* check mobile menu */
		cms_mobile_menu();
		
		/* check back to top */
		if(CMSOptions.back_to_top == '1'){
			/* add html. */
			$('body').append('<div id="back_to_top" class="back_to_top"><span class="go_up"><i style="" class="fa fa-arrow-up"></i></span></div><!-- #back-to-top -->');
			cms_back_to_top();
		}
		//animation to elements on scroll
		if (jQuery().appear) {
			jQuery('.to_animate').appear();
			jQuery('.to_animate').filter(':appeared').each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
				var animationDelay = !self.data('delay') ? 210 : self.data('delay');
				setTimeout(function(){
					self.addClass("animated " + animationClass);
				}, index * animationDelay);
			});

			jQuery('body').on('appear', '.to_animate', function(e, $affected ) {
				jQuery($affected).each(function(index){
					var self = jQuery(this);
					var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
					var animationDelay = !self.data('delay') ? 210 : self.data('delay');
					setTimeout(function(){
						self.addClass("animated " + animationClass);
					}, index * animationDelay);
				});
			});
		}   
	});

	/**
	 * resize event.
	 * 
	 * Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	$(window).resize(function(event, ui) {
		/** current window width */
		window_width = $(event.target).width();
		
		/** current window height */
		window_height = $(window).height();
		
		/** current scroll */
		scroll_top = $(window).scrollTop();
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu(scroll_top);
		}
		
		/* check mobile menu */
		cms_mobile_menu();
	});
	
	/**
	 * scroll event.
	 * 
	 * Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	var lastScrollTop = 0;
	
	$(window).scroll(function() {
		/** current scroll */
		scroll_top = $(window).scrollTop();
		/** check scroll up or down. */
		if(scroll_top < lastScrollTop) {
			/* scroll up. */
			scroll_status = 'up';
		} else {
			/* scroll down. */
			scroll_status = 'down';
		}
		
		lastScrollTop = scroll_top;
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu();
		}
		
		/* check back to top */
		cms_back_to_top();
	});

	/**
	 * Stiky menu
	 * 
	 * Show or hide sticky menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	function cms_stiky_menu(fixed) {
		if (header_top < scroll_top) {
			switch (true) {
				case (window_width > 992):
					header.addClass('header-fixed');
					$('body').css('margin-top', header.outerHeight(true)+'px');
					break;
				case ((window_width <= 992 && window_width >= 768) && (CMSOptions.menu_sticky_tablets == '1')):
					header.addClass('header-fixed');
					$('body').css('margin-top', header.outerHeight(true)+'px');
					break;
				case ((window_width <= 768) && (CMSOptions.menu_sticky_mobile == '1')):
					header.addClass('header-fixed');
					$('body').css('margin-top', header.outerHeight(true)+'px');
					break;
			}
		} else {
			header.removeClass('header-fixed');
			$('body').css('margin-top', '0');
		}
	}
	
	/**
	 * Mobile menu
	 * 
	 * Show or hide mobile menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	
	$('#cshero-menu-mobile').click(function(){
		$('#cshero-header-navigation').toggleClass('open-menu');
		$('#cshero-menu-mobile').addClass('close-open');
		$('.cshero-menu-close').addClass('open');
	});
	$('.cshero-menu-close').click(function(){
		$('#cshero-header-navigation').removeClass('open-menu');
		$('#cshero-menu-mobile').removeClass('close-open');
		$('.cshero-menu-close').removeClass('open');
	});
	/* check mobile screen. */
	function cms_mobile_menu() {
		var menu = $('#cshero-header-navigation');
		
		/* active mobile menu. */
		switch (true) {
		case (window_width <= 992 && window_width >= 768):
			menu.removeClass('phones-nav').addClass('tablets-nav');
			/* */
			cms_mobile_menu_group(menu);
			break;
		case (window_width <= 768):
			menu.removeClass('tablets-nav').addClass('phones-nav');
			break;
		default:
			menu.removeClass('mobile-nav tablets-nav collapse');
			menu.find('li').removeClass('mobile-group');
			break;
		}	
	}
	/* group sub menu. */
	function cms_mobile_menu_group(nav) {
		nav.each(function(){
			$(this).find('li').each(function(){
				if($(this).find('ul:first').length > 0){
					$(this).addClass('mobile-group');
				}
			});
		});
	}
	
	/**
	 * Parallax.
	 * 
	 * @author Fox
	 * @since 1.0.0
	 */
	var cms_parallax = $('.cms_parallax');
	if(cms_parallax.length > 0 && CMSOptions.paralax == '1'){
		cms_parallax.each(function() {
			"use strict";
			var speed = $(this).attr('data-speed');
			
			speed = (speed != undefined && speed != '') ? speed : 0.1 ;
			
			$(this).parallax("50%", speed);
		});
	}

	
	/**
	 * Post Like.
	 * 
	 * @author Fox
	 * @since 1.0.0
	 */
	
	$('body').on('click', '.cms-post-like', function () {
		"use strict";
		/* get post id. */
		var bt_like = $(this);
		
		var post_id = bt_like.attr('data-id');
		
		if(post_id != undefined && post_id != ''){
			/* add like. */
			$.post(ajaxurl, {
				'action' : 'cms_post_like',
				'id' : post_id
			}, function(response) {
				if(response != ''){
					bt_like.find('i').attr('class', 'fa fa-heart')
					bt_like.find('span').html(response);
				}
			});
		}
		
	});
	
	/**
	 * Back To Top
	 * 
	 * @author Fox
	 * @since 1.0.0
	 */
	$('body').on('click', '#back_to_top', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
    });
	
	/* show or hide buttom  */
	function cms_back_to_top(){
		/* back to top */
        if (scroll_top < window_height) {
        	$('#back_to_top').addClass('off').removeClass('on');
        } else {
        	$('#back_to_top').removeClass('off').addClass('on');
        }
	}
	
	/**
	 * One page
	 * 
	 * @author Fox
	 */
	if(CMSOptions.one_page == true){
		
		$('body').on('click', '.onepage', function () {
			$('#cshero-menu-mobile').removeClass('close-open');
			$('#cshero-header-navigation').removeClass('open-menu');
			$('.cshero-menu-close').removeClass('open');
		});
		
		var one_page_options = {'filter' : '.onepage'};
		
		if(CMSOptions.one_page_speed != undefined) one_page_options.speed = parseInt(CMSOptions.one_page_speed);
		if(CMSOptions.one_page_easing != undefined) one_page_options.easing =  CMSOptions.one_page_easing;
		$('#site-navigation').singlePageNav(one_page_options);
	}
	
	
	/**
	 * Rows Animation.
	 * 
	 * @author Fox
	 */
	if($.fn.waypoint != undefined){
		$('.wpb_row, .wpb_column').waypoint(function() {
			
			var animation = $(this).attr("data-animation");
			
			if(animation != undefined && animation != ''){
				$(this).addClass(animation);
			}
		}, {offset: '95%', triggerOnce: true});
	}
	$('.widget_search').find("input[type=text]").each(function(ev) {
	    if(!$(this).val()) { 
	        $(this).attr("placeholder", "Search keyword");
	    }
	});
	$('.error404').find("input[type=text]").each(function(ev) {
	    if(!$(this).val()) { 
	        $(this).attr("placeholder", "Type and hit enter...");
	    }
	});
	 
	
	
	
	var win=parseInt(jQuery(window).width());
	if(win >= 991 ){
		jQuery('.sameheight').each(function(){
			var sameheight=0;
			jQuery(this).children().children().children().each(function(){
				var this_h=parseInt(jQuery(this).innerHeight());
				if(this_h > sameheight){
					sameheight=this_h;    
				}
			})
			
			jQuery(this).children().children().children().children('.wpb_wrapper').children().css('min-height',sameheight+'px');
		})
	}else{
		jQuery(this).children().children().children().children('.wpb_wrapper').children().attr('style','')   
	}
	

});

jQuery(window).resize(function(){
	var win=parseInt(jQuery(window).width());
	if(win >= 991 ){
		jQuery('.sameheight').each(function(){
			var sameheight=0;
			jQuery(this).children().children().children().each(function(){
				var this_h=parseInt(jQuery(this).innerHeight());
				if(this_h > sameheight){
					sameheight=this_h;    
				}
			})
			
			jQuery(this).children().children().children().children('.wpb_wrapper').children().css('min-height',sameheight+'px');
		})
	}else{
		jQuery(this).children().children().children().children('.wpb_wrapper').children().attr('style','')   
	}
})

