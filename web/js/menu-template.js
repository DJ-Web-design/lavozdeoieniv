var images = new Vue({
  el: ".row",
  data:{
    showModal: false,
    indexImg: 0,
    images:[
      { id:"1", title: "Titulo 1", url:"1.jpg" },
      { id:"2", title: "Titulo 2", url:"2.jpg"},
      { id: "3", title: "Titulo 3", url: "3.jpg" },
      { id: "4", title: "Titulo 4", url: "4.jpg" },
      { id: "5", title: "Titulo 5", url:"5.jpg"}
    ],
    imagesName: [
      { url: "JUw3Qck.jpg" },
      { url: "eYr0PZ2.jpg" },
      { url: "qguPQif.jpg" }
    ]
  },
  methods: {
    uno: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 1; 
      })
    },
    dos: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 2;
      })
    },
    tres: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 3;
      })
    },
    cuatro: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 0;
      })
    },
    openGal: function(n) {

      var op = document.getElementById("box")
      for(i in this.images)

      if (n == 0) {

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <img src=' + this.images[n].url + ' alt=""><span onclick="next(' + n + ')">></span>\
        </div>'

      } else if( n == i) {

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <span onclick="prev('+ n + ')"><</span><img src=' + this.images[n].url + ' alt="">\
        </div>'

      } else{

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <span onclick="prev('+ n + ')"><</span><img src=' + this.images[n].url + ' alt=""><span onclick="next(' + n + ')">></span>\
        </div>'
      }
    }
  }
})