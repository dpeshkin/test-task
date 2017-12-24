let flag = true;
const moveSlide = (slider, slideNum) => {
  const list = slider.find(".slider__list");
  let next = list.children(".slider__item").eq(slideNum);
  flag = false;
  list.css({ transform: `translateX(${-slideNum * 100}%)` });
  next
    .addClass("active")
    .siblings()
    .removeClass("active");
  $(".slider__nav")
    .children()
    .eq(slideNum)
    .addClass("active")
    .siblings()
    .removeClass("active");
  list.bind("transitionend", function() {
    flag = true;
  });
};

const sliderMainControl = () => {
  $(".control").on("click", e => {
    e.preventDefault();
    const button = $(e.currentTarget);
    const slider = button.closest(".slider");
    const items = slider.find(".slider__item");
    const active = items.filter(".active");
    let nextItem;
    let edgeItem;
    let slideNum;
    if (button.hasClass("control__right")) {
      nextItem = active.next();
      edgeItem = items.first();
    }
    if (button.hasClass("control__left")) {
      nextItem = active.prev();
      edgeItem = items.last();
    }
    slideNum = nextItem.length ? nextItem.index() : edgeItem.index();
    if (flag == true) moveSlide(slider, slideNum);
  });
};
const sliderSideControl = () => {
  $(".slider__item").each(() => {
    const dot = $("<li>", {
      attr: {
        class: "slider__nav-item"
      },
      html: "<a href='#'></a>"
    });
    $(".slider__nav").append(dot);
  });
  $(".slider__nav")
    .children()
    .first()
    .addClass("active");
  $(".slider__nav").on("click", ".slider__nav-item", e => {
    e.preventDefault();
    const slider = $(".slider");
    const slideNum = $(e.currentTarget).index();
    if (flag == true) {
      moveSlide(slider, slideNum);
    }
  });
};

const timer = () => {
  const slider = $(".slider");
  const items = slider.find(".slider__item");
  const active = items.filter(".active");
  let nextItem = active.next();
  let slideNum = nextItem.length ? nextItem.index() : items.first().index();
  if (flag == true) moveSlide(slider, slideNum);
};

const slider = () => {
  sliderMainControl();
  sliderSideControl();
  setInterval(timer, 7000);
};

module.exports = slider;
