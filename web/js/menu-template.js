var images = new Vue({
    el: '.row',
    data: {
        showModal: false,
        indexImg: 0,
        images: [],
        imagesItem:false,

    },
    methods: {
        uno: function(images){
            return images.filter(images => {
                return images.id % 4 === 1;
            })
        },
        dos: function(images){
            return images.filter(images => {
                return images.id % 4 === 2;
            })
        },
        tres: function(images){
            return images.filter(images => {
                return images.id % 4 === 3;
            })
        },
        cuatro: function(images){
            return images.filter(images => {
                return images.id % 4 === 0;
            })
        },
        openGal: function (n) {
            var op = document.getElementById('box');
            for (i in this.images) {
            };
            if (n == 0) {
                op.innerHTML = '<div class="lightbox" id="image"><a class="close" onclick="cerrar()">X</a><img src=' + this.images[n].value.url + ' alt=""><span onclick="next(' + n + ')">></span></div>'
            } else if (n == i) {
                op.innerHTML = '<div class="lightbox" id="image"><a class="close" onclick="cerrar()">X</a><span onclick="prev(' + n + ')"><</span><img src=' + this.images[n].value.url + ' alt=""></div>'
            } else {
                op.innerHTML = '<div class="lightbox" id="image"><a class="close" onclick="cerrar()">X</a><span onclick="prev(' + n + ')"><</span><img src=' + this.images[n].value.url + ' alt=""><span onclick="next(' + n + ')">></span></div>'
            }
        }
    },
    watch:{
        images: function(){
            if (this.images.length > 0){
                return this.imagesItem = true;
            }
        },
    }
})
