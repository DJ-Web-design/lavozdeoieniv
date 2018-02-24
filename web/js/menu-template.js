Vue.component('modal-template', {
    template: '<div class="modal"><div class="modal-content"><img v-bind:src="images.images.url" alt=""></div></div>'
});
var images = new Vue({
    el: '.row',
    data: {
        showModal: false,
        indexImg: 0,
        images: [],
        imagesItem:false,
    },
    methods: {
        dos: function(images){
            return images.filter((image, index) => {
                return index % 4 === 1;
            })
        },
        tres: function(images){
            return images.filter((image, index) => {
                return index % 4 === 2;
            })
        },
        cuatro: function(images){
            return images.filter((image, index) => {
                return index % 4 === 3;
            })
        },
        uno: function(images){
            return images.filter((image, index) => {
                return index % 4 === 0;
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
const vueImgConfig = {
    // Use `alt` attribute as gallery slide title
    altAsTitle: false,
    // Display 'download' button near 'close' that opens source image in new tab
    sourceButton: false,
    // Event listener to open gallery will be applied to <img> element
    openOn: 'click',
    // Show thumbnails for all groups with more than 1 image
    thumbnails: false,
}
//Vue.use(VueImg, vueImgConfig);