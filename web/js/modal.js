Vue.component('modal-template', {
    template: '<div class="modal">\
               <div class="modal-content">\
                  <img v-bind:src="images.images.url" alt="">\
               </div>\
            </div>'
})
var modal = new Vue({
    el: "#modal",
    data: data
})