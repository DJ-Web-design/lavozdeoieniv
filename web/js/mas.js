$(document).ready(verMas, verMenos);
var vista = false;
//Maximizar panel de descripcion
function verMas(Id, botonMas, botonMenos, des, img) {
    if (window.screen.width <= 479) {
        if (vista == true) {
            $(".des").hide(1, function () {
                $(".img").css({ "margin-top": "8%" })
                $(".bloque-programa").css({ height: "16.6%" })
                $(".botonMenos").hide(1)
                $(".botonMas").show(1)
            })
        };
        $(Id).animate({ height: "340px" }, function () {
            $(".programas").animate({ height: "1210px" })
            $(img).css({ "margin-top": "35%" })
            $(des).show(500)
            $(botonMas).hide(1)
            $(botonMenos).show(1)
        });
    }
    else if (window.screen.width >= 480 && window.screen.width <= 766) {
        if (vista == true) {
            $(".des").hide(1, function () {
                $(".img").css({ "margin-top": "5%" })
                $(".bloque-programa").css({ height: "16.6%" })
                $(".botonMenos").hide(1)
                $(".botonMas").show(1)
            })
        };
        $(Id).animate({ height: "270px" }, function () {
            $(".programas").animate({ height: "1940px" })
            $(img).css({ "margin-top": "75px" })
            $(des).show(500)
            $(botonMas).hide(1)
            $(botonMenos).show(1)
        });
    }
    else if (window.screen.width >= 767 && window.screen.width <= 949) {
        if (vista == true) {
            $(".des").hide(1, function () {
                $(".img").css({ "margin-top": "5px" })
                $(".bloque-programa").css({ height: "150px" })
                $(".botonMenos").hide(1)
                $(".botonMas").show(1)
            })
        };
        $(Id).animate({ height: "200px" }, function () {
            $(".programas").animate({ height: "1070px" })
            $(img).css({ "margin-top": "30px" })
            $(des).show(500)
            $(botonMas).hide(1)
            $(botonMenos).show(1)
        });
    } else {

        if (vista == true) {
            $(".des").hide(1, function () {
                $(".img").css({ "margin-top": "5px" })
                $(".bloque-programa").css({ height: "150px" })
                $(".botonMenos").hide(1)
                $(".botonMas").show(1)
            })
        };
        $(Id).animate({ height: "230px" }, function () {
            $(".programas").animate({ height: "1100px" })
			$(".bloque-der").animate({height: "1100px"})
            $(img).css({ "margin-top": "30px" })
            $(des).show(500)
            $(botonMas).hide(1)
            $(botonMenos).show(1)
        });
    }
    return vista = true;
}

//Minimizar Paneles de descripcion  
function verMenos(Id, botonMas, botonMenos, des) {
    if (window.screen.width <= 479) {
        $(des).hide(500, function () {
            $(Id).animate({ height: "16.6%" })
            $(".img").css({ "margin-top": "5%" })
            $(".programas").animate({ height: "1020px" })
            $(".bloque-der").animate({ height: "1020px" })
            $(botonMenos).hide(1)
            $(botonMas).show(1)
        });

    } else if (window.screen.width >= 480 && window.screen.width <= 766) {
        $(des).hide(500, function () {
            $(Id).animate({ height: "16.6%" })
            $(".img").css({ "margin-top": "5%" })
            $(".programas").animate({ height: "1020px" })
            $(".bloque-der").animate({ height: "1020px" })
            $(botonMenos).hide(1)
            $(botonMas).show(1)
        });

    } else if (window.screen.width >= 767 && window.screen.width <= 949) {
        $(des).hide(500, function () {
            $(Id).animate({ height: "150px" })
            $(".img").css({ "margin-top": "5px" })
            $(".programas").animate({ height: "1020px" })
            $(".bloque-der").animate({ height: "1020px" })
            $(botonMenos).hide(1)
            $(botonMas).show(1)
        });

    } else {
        $(des).hide(500, function () {
            $(Id).animate({ height: "150px" })
            $(".img").css({ "margin-top": "5px" })
            $(".programas").animate({ height: "1020px" })
            $(".bloque-der").animate({ height: "1020px" })
            $(botonMenos).hide(1)
            $(botonMas).show(1)
        });

    }
    return vista = false;
}
