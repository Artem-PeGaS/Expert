/* global $ ymaps */

import animate from './animate.js';
import mm from './mm.js';
import Swiper from 'swiper';

import 'svgxuse';
import 'web-animations-js';
import lozad from 'lozad';
import objectFitImages from 'object-fit-images';

// Setup lozad observer
const lazyload = lozad('.lozad', {
	rootMargin: `${window.innerHeight}px 0px ${window.innerHeight}px 0px`
});

$(() => {
	// Polyfills
	objectFitImages();

	// Observe new elements
	lazyload.observe();

	// IE11 detection
	if (/MSIE/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent)) {
		$('body').addClass('msie');
	}

	const $container = $('body');

	if ($container.find('.header').length > 0) {
		$('.header__hamburger').on('click', function() {
			$(this).toggleClass('header__hamburger_active');

			if ($(this).hasClass('header__hamburger_active')) {
				$('.header__menu').addClass('header__menu_active');
				$('.header__menu')[0].animate(
					[
						{
							offset: 0,
							opacity: 0
						},
						{
							offset: 1,
							opacity: 1
						}
					],
					{
						duration: animate.duration.enter,
						easing: animate.easing.acceleration
					}
				);
			} else {
				$('.header__menu')[0].animate(
					[
						{
							offset: 0,
							opacity: 1
						},
						{
							offset: 1,
							opacity: 0
						}
					],
					{
						duration: animate.duration.enter,
						easing: animate.easing.acceleration
					}
				).onfinish = () => {
					$('.header__menu').removeClass('header__menu_active');
				};
			}
		});
	}

	if ($container.find('.slider-main').length > 0) {
		$('.slider-main').each((i, elem) => {
			new Swiper(elem, {
				loop: true,
				observer: true,
				observeParents: true,
				pagination: {
					el: $(elem).find('.swiper-pagination'),
					clickable: true
				}
			});
		});
	}

	if ($container.find('.map').length > 0) {
		$('.map').each((i, elem) => {
			ymaps.ready(init);

			function init() {
				var myMap = new ymaps.Map('map', {
					center: [53.250335, 50.220626],
					zoom: 16,
					controls: []
				});

				const myPlacemark = new ymaps.Placemark(
					myMap.getCenter(),
					{
						hintContent: 'Собственный значок метки',
						balloonContent: 'Это красивая метка'
					},
					{
						iconLayout: 'default#image',
						iconImageHref: '../images/point.png',
						iconImageSize: [60, 80],
						iconImageOffset: [-25, -48]
					}
				);

				myMap.geoObjects.add(myPlacemark);
			}
		});
	}

	if ($container.find('.gallery-product').length > 0) {
		const mySwiper = new Swiper('.gallery-product__main', {
			spaceBetween: 10,
			simulateTouch: false
		});

		$('.gallery-product__preview').on('click', (e) => {
			const $this = $(e.currentTarget);
			const index = $this.index() + 1;
			mySwiper.slideTo(index);

			$('.gallery-product__preview').removeClass('gallery-product__preview_active');
			$this.addClass('gallery-product__preview_active');
		});
	}

	if ($container.find('.interesting__sort-btn').length > 0) {
		$('.interesting__sort-btn').on('click', (e) => {
			const $this = $(e.currentTarget);

			$('.interesting__sort-btn').removeClass('interesting__sort-btn_active');
			$this.addClass('interesting__sort-btn_active');

			if ($this.hasClass('interesting__sort-btn_grid')) {
				$('.interesting').addClass('interesting_grid');
				$('.interesting').removeClass('interesting_line');
			} else {
				$('.interesting').addClass('interesting_line');
				$('.interesting').removeClass('interesting_grid');
			}
		});
	}
});
