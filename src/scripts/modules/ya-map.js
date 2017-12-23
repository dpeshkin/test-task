ymaps.ready(init);
var myMap;

function init() {
  myMap = new ymaps.Map("map", {
    center: [56.85311911536756, 60.61622412366462],
    zoom: 15,
    controls: []
  });

  myMap.behaviors.disable("scrollZoom");
  if (window.innerWidth < 768) myMap.behaviors.disable("drag");
}
