$(document).ready(main, sombra);

var contador = 1;
var contador2 = 1;

function main(){
	$('.menu-cel').click(function(){
		// $('nav').toggle(); 

		if(contador == 1){
			$('nav').animate({
				left: '0',
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
	});
	
	$('.menu-cel').click(function(){
		// $('nav').toggle(); 

		if(contador2 == 1){
			$('div.sombra').css({
				display: 'block',
				right: '0',
				transition: '0.2s'
			});
			contador2 = 0;
		} else {
			contador2 = 1;
			$('div.sombra').css({
				display: 'none'
			});
		}

	});

		$('.submenu').click(function () {
			$(this).children('.children').slideToggle();
		});


};
function sombra(){
    $(".menu-cel").click(function (event) {
        if (contador == 1) {
            $(".sombra").fadeIn(100)
        } else {
            $(".sombra").fadeOut(100)
        }
    });
    $(".sombra").click(function (event) {
        if (contador == 0) {
            contador = 1;
            $(".sombra").fadeOut(100);
            $("nav").animate({ left: "-100%" });
        }
    })
    };
