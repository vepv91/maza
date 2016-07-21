// var lengthThumb	= $('.nav4sliderIMG li').length,
// 	thumbArray	= new Array();
// for(var i = 0; i < lengthThumb; i++){
// 	var fullIMGUrl = $('.nav4sliderIMG li:eq('+i+')').find('img').attr('src');
// 	thumbArray.push(fullIMGUrl);
// }

$('.storeBlockMain').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 500,
		arrows: true, 
		dots: false,
    responsive:[{
	  	breakpoint: 768,
		  	settings: {
		  		slidesToShow: 2,
    			slidesToScroll: 1
		  	}
		}
	]
});
$('.sliderIMG ul').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 500,
	arrows: true, 
	dots: false,
	asNavFor: '.nav4sliderIMG ul',
    responsive:[{
	  	breakpoint: 480,
		  	settings: {
		  		slidesToShow: 1,
    			slidesToScroll: 1
		  	}
		}
	]
});
$('.nav4sliderIMG ul').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
	arrows: false, 
	dots: false,
	asNavFor: '.sliderIMG ul',
	vertical:true,
	verticalSwiping: true,
	focusOnSelect: true,
	responsive:[{
	  	breakpoint: 768,
		  	settings: {
		  		slidesToShow: 4
		  	}
		},{
	  	breakpoint: 480,
		  	settings: {
		  		vertical:false,
				verticalSwiping: false
		  	}
		}
	]
});
$('.recommendList').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
	arrows: false, 
	dots: false
});
$('.relatedList').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
	arrows: true, 
	dots: false,
	autoplay: true,
	responsive:[{
	  	breakpoint: 480,
		  	settings: {
		  		slidesToShow: 1,
		  		centerMode: true,
		  		arrows: false,
		  		centerPadding: '15%'
		  	}
		},{
	    breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
	    }
	]
});

$(function(){
	if($(window).width() < 992){
		var cloneMainDetail = $('.detailProductText').clone();
		$('.detailProductText').remove();
		$('.detailInfo').append(cloneMainDetail);
	}
	if($(window).width() < 768){
		//clone #mainSearchForm for mobile devices
		var idSearchForm = $('.searchForm #mainSearchForm'),
		 	cloneSearchForm = $(idSearchForm).clone();
		$('.searchForm').attr('onclick', 'showHide("#mainSearchForm")');
		$('.iconList').append(cloneSearchForm);
		idSearchForm.remove();

		//addClass menuMobileClick to bind click event on mobile devices
		$('.mainMenu').addClass('menuMobileClick');
		menuOnMobile();
	}
	if($(window).width() < 480){
		$('#footer').addClass('footerMobile');
		collapseFooter();
		getPriceMobile();
	}else{
		getFullSlider();
	}
});

function showHide(idElement){ //showHide element block
	var idElement	= $(idElement),
		flagSearch 	= idElement.is(':hidden');
	if(flagSearch)
		$(idElement).fadeIn('fast');
	else
		$(idElement).fadeOut('fast');
};
function collapseElement(idElement){ //collapse for footer
	var idElement	= $(idElement),
		flagSearch 	= idElement.is(':hidden');
	if(flagSearch)
		$(idElement).slideDown('fast');
	else
		$(idElement).slideUp('fast');
};
function menuOnMobile(){
	var idMenuMobile = $('.menuMobileClick');
	idMenuMobile.find('.subMenu')
				.closest('li')
				.addClass('hasSubMenu');

	$('.hasSubMenu > a').click(function(){
		var thisSubMenu = $(this).closest('.hasSubMenu').find('.subMenu');
		idMenuMobile.find('.subMenu').hide('fast');
		if(thisSubMenu.is(':hidden'))
			thisSubMenu.show('fast');
		else
			thisSubMenu.hide('fast');
		return false;
	});
	$('.subMenuCol > h4 > a').click(function(){
		var thisSubMenu = $(this).closest('.subMenuCol').find('.subMenuList');
		idMenuMobile.find('.subMenuList').hide('fast');
		if(thisSubMenu.is(':hidden'))
			thisSubMenu.show('fast');
		else
			thisSubMenu.hide('fast');
		return false;
	});
};
function collapseFooter(){ 
	$('.titleFooter').click(function(){
		$('#footer ul').slideUp('fast');
		if(!$(this).hasClass('activeFooter')){
			$(this).next('ul').slideDown('fast');
			$(this).next('ul').next('ul').slideDown('fast');
			$(this).addClass('activeFooter');
		}else{
			$(this).next('ul').slideUp('fast');
			$(this).next('ul').next('ul').slideUp('fast');
			$(this).removeClass('activeFooter');
		}
	});
};
function showSortBy(){
	$('.sortBy').click(function(){
		if($(this).next('ul').is(':hidden')){
			$(this).next('ul').slideDown('fast');
			$(this).find('.activeArrow').text('▲');
		}else{
			$(this).next('ul').slideUp('fast');
			$(this).find('.activeArrow').text('▼');
		}
	});
};
function onChangeSortBy(){ //sortBy's onChange click event here
	$('.sortCategory ul li').click(function(){
		$(this).closest('ul').find('li').removeClass('active');
		$('.sortCategory ul li span').remove();
		$(this).addClass('active');
		$(this).prepend('<span>✔</span>');
		$('.selectedSortBy').text($(this).text().replace('✔', ''));
		$(this).closest('ul').slideUp('fast');
		$('.sortBy .activeArrow').text('▼');
	});
};
function rightFilterList(){
	$('.filterList > li').click(function(){
		var filterListID = $(this).find('.filterDetail');
		$('.filterDetail').slideUp('fast');
		if(filterListID.is(':hidden')){
			filterListID.slideDown('fast');
			$(this).find('a').find('span').text('▲');
		}else{
			filterListID.slideUp('fast');
			$(this).find('a').find('span').text('▼');
		}
		return false;
	});
};
function onChangeCheckbox(idClick){
	$(idClick).click(function(){
		var checkboxID = $(this).find('input');
		if(!checkboxID.is(':checked')){
			checkboxID.prop('checked', true);
		}else{
			checkboxID.prop('checked', false);
		}
		return false;
	});
};
function onChangeRightFilterList(){ //RightFilterList's onChange click event here
	onChangeCheckbox('.filterDetail ul li');
};
function showAllFilter(){
	$('.allFilter').click(function(){
		collapseElement('.allFilterBlock');
		return false;
	});
};
function HTMLAllFilter(titleID, cloneListFilter){
	var HTML = '';
		HTML += '<div class="col-md-3 col-sm-6 col-xs-12">';
		HTML += '<h4>'+titleID+'</h4>';
		HTML += cloneListFilter;
		HTML += '</div>';
	return HTML;
};
function getAllFilter(){ //auto get all filter
	$('.filterList > li').each(function(){
		var titleFilter = $(this).find('a').text().replace('▼', ''),
			cloneListLI	= $(this).find('.filterDetail').clone().html();
	    $('.allFilterBlock .row').append(HTMLAllFilter(titleFilter,cloneListLI));
	});
};
function onChangeAllFilter(){ //AllFilter's onChange click event here
	onChangeCheckbox('.allFilterBlock ul li');
};
function chooseColor(){
	$('.listColor li').click(function(){
		$('.listColor li').removeClass('active');
		$(this).addClass('active');
	});
};
function tabs(){
	$('.detailProductText .tabs li').click(function(){
		var curIndex = $(this).index();
		$('.detailProductText .tabs li').removeClass('active');
		$('.detailProductText .tabContent').hide();
		$(this).addClass('active');
		$('.detailProductText .tabContent:eq('+curIndex+')').show();
	});
};
function getPriceMobile(){
	var HTML 		= '',
		oldPrice 	= $('.price .oldPrice').text(),
		discount 	= $('.price .discount').text(),
		newPrice 	= $('.price .newPrice').text();
	HTML += '<div class="mobileCTA">';
	HTML += '<div class="mobilePrice">';
	HTML += '<span class="mobileOldPrice">'+oldPrice+'</span>';
	HTML += '<span class="mobileNewPrice">'+newPrice+'<strong> '+discount+'</strong></span>';
	HTML += '</div>';
	HTML += '<input type="button" id="mobileAddtoCart"value="MUA NGAY" onclick="addToCart();">';
	HTML += '</div>';
	$('#detailPage').append(HTML);
};
function showHideCart(){
	showHide('.popUpCart');
};
function HTMLAddToCart(){
	var HTML = '';
	HTML += '<li>';
	HTML += '<img src="images/img-detail.jpg" alt="">';
	HTML += '<div class="detailProCart">';
	HTML += '<h4>Áo Sơ Mi Nam Họa Tiết Caro Mới</h4>';
	HTML += '<div class="priceCart">';
	HTML += '<span>159.000đ</span>';
	HTML += '</div>';
	HTML += '<div class="colorCart">Màu sắc: ';
	HTML += '<span>Màu đỏ</span>';
	HTML += '</div>';
	HTML += '<div class="sizeCart">Kích cỡ: ';
	HTML += '<span>XL</span>';
	HTML += '</div>';
	HTML += '<div class="clearfix"></div>';
	HTML += '<a class="removeFromCart" onclick="removeFromCart(this);">Bỏ sản phẩm</a>';
	HTML += '</div>';
	HTML += '</li>';
	return HTML;
};
function addToCart(){
	$('.popUpCart').fadeIn('fast');
	var timeOut1 = setInterval(function() {
	    $('.popUpCart ul').prepend(HTMLAddToCart());
	    clearInterval(timeOut1);
	}, 500);
	var timeOut2 = setInterval(function() {
	    $('.popUpCart').fadeOut('fast');
	    clearInterval(timeOut2);
	}, 4000);
};
function removeFromCart(thisID){
	$(thisID).closest('li').remove();
};
function HTMLNavFullSlider(urlIMG){
	var HTML = '';
	HTML += '<div class="modal fade" id="fullSlider" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body">';
	HTML += '<button type="button" class="btn btn-default closeFull" data-dismiss="modal">Đóng</button>'
	HTML += '<button type="button" class="slick-prev slick-arrow" style="display: block;">Previous</button>'
	HTML += '<img src="'+urlIMG+'" alt="">';
	HTML += '<button type="button" class="slick-next slick-arrow" style="display: block;">Next</button>';
	HTML += '</div></div></div></div>';
	return HTML;
};
var curIMGIndex, urlIMGFull, lengthSlider;
function nextSlide(){
	if(curIMGIndex == lengthSlider-1)
		curIMGIndex = 0;
	else
		curIMGIndex ++;
	urlIMGFull = $('.sliderIMG ul li:eq('+curIMGIndex+')').find('img').attr('data-full');
	$('#fullSlider .modal-body img').attr('src', urlIMGFull);
};
function prevSlide(){
	if(curIMGIndex == 0)
		curIMGIndex = lengthSlider-1;
	else
		curIMGIndex --;
	urlIMGFull = $('.sliderIMG ul li:eq('+curIMGIndex+')').find('img').attr('data-full');
	$('#fullSlider .modal-body img').attr('src', urlIMGFull);
};
function getFullSlider(){
	$('#detailPage').append(HTMLNavFullSlider());
	lengthSlider = $('.sliderIMG ul li').length;
	$('.sliderIMG ul li').click(function(){
		urlIMGFull 		= $(this).find('img').attr('data-full'),
		curIMGIndex 	= $(this).index();
		$('#fullSlider .modal-body img').attr('src', urlIMGFull);
	});
	$('#fullSlider .slick-next').click(function(){
		nextSlide();
	});
	$('#fullSlider .slick-prev').click(function(){
		prevSlide();
	});
};

showSortBy();
onChangeSortBy();
rightFilterList();
onChangeRightFilterList();
showAllFilter();
getAllFilter();
onChangeAllFilter();
chooseColor();
tabs();