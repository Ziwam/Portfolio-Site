import "./styles/app.scss";
import $ from "jquery";
import constants from './constants'

const $body = $('body');
const $elems = $('.pause-anim');
const $cards = $('.card');
const $window = $(window);
const $desktopCheckbox = $('#tog_desktop');
const $module = $('.project-module');
const $moduleText = $module.find('.text');
const $moduleTitle = $module.find('h3');
const $moduleImg = $module.find('img');
const $moduleLink = $module.find('#project_demo');
const $moduleCode = $module.find('#project_code');
const $moduleTools = $module.find('.tools');
const $moduleToggle = $module.find('.toggle');
const $exit_btn = $('.exit-wrapper');
const $menu = $('.menu');
const $nav_bar = $('nav');
const viewOffset = 90;

let projectImages = [];
let window_height = $window.height();

$menu.click(()=>{
	$body.toggleClass('behind');
	$nav_bar.toggleClass('hidden');
	$menu.toggleClass('active');
});

$('.study').click(function(){
	show_projct_module(this);
});

$exit_btn.click(()=>{
	show_projct_cards();
});

$window.on('scroll', check_if_in_view);
$window.on('resize', () => {window_height = $window.height();});

//EventListeners
$('.options a').on("click", function(e) {
	e.preventDefault();
	$('html, body').animate({
        scrollTop: $(this.getAttribute("href")).offset().top
    }, 1000);
    reset_nav_bar();
});

$('.study').on("click", function() {
	$('html, body').animate({
        scrollTop: $('#projects').offset().top
    }, 270);
})

$desktopCheckbox.on("change", function(e) {
	$moduleImg.attr('src',projectImages[0].getAttribute('src'));
	$moduleImg.removeClass();
})
$('#tog_mobile').on("change", function(e) {
	$moduleImg.attr('src',projectImages[1].getAttribute('src'));
	$moduleImg.removeClass();
	$moduleImg.addClass("mobile_view");
})
$('#tog_mockup').on("change", function(e) {
	$moduleImg.attr('src',projectImages[2].getAttribute('src'));
	$moduleImg.removeClass();
	$moduleImg.addClass("mockup_view");
})

function check_if_in_view() {

  for (let i = 0; i < $elems.length; i++) {
  	let elem = $elems[i];
  	let elemHeight = elem.getBoundingClientRect().height;
  	let elemTop = elem.getBoundingClientRect().top;
  	let elemBottom = (elemTop + elemHeight);

  	if((elemBottom >= viewOffset) && (elemTop <= (window_height - viewOffset))){
  		$elems[i].className = $elems[i].className.replace('pause-anim', 'in-view');
  	}
  }
}

function show_projct_module(domNode) {
	const $node = $(domNode);
	$module.toggleClass('hidden');
	$exit_btn.toggleClass('hidden');

	let text = $node.parent().next('.text').html();
	let link = $node.parent().siblings('.demo').attr('href');
	let code = $node.parent().siblings('.code').attr('href');
	let tools = $node.parent().siblings('.tools').html();
	let title = $node.siblings('h3').html();
	let img_src = $node.parent().siblings('.project-img').children('img').attr('src');
	projectImages = $node.parent().siblings('.project-img').children('img');
	if(projectImages.length === 1){
		$moduleToggle.addClass("hidden");
	} else {
		$moduleToggle.removeClass("hidden");
	}
	$moduleText.html(text);
	$moduleTitle.html(title);
	$moduleImg.attr('src',img_src);
	$moduleImg.removeClass("mobile_view");
	$moduleLink.attr('href',link);
	$moduleCode.attr('href',code);
	$moduleTools.html(tools);
	$desktopCheckbox.prop('checked', true)


	for(let card of $cards){
		card.classList.toggle('hidden');
	}
}

function show_projct_cards(evn) {
	$module.toggleClass('hidden');
	$moduleText.empty();
	$exit_btn.toggleClass('hidden');

	for(let card of $cards){
		card.classList.toggle('hidden');
	}
}

function reset_nav_bar() {
	$nav_bar.addClass('hidden');
	$menu.removeClass('active');
	$body.removeClass('behind');
}