const accoFunc = () => {
  $(".props__item")
    .children(".props__header")
    .on("click", e => {
      e.preventDefault();
      const item = $(e.currentTarget).parent(".props__item");
      const wrapper = $(e.currentTarget).siblings(".props__wrapper");
      const content = wrapper.children(".props__content");
      item.hasClass("active")
        ? (item.removeClass("active"), wrapper.height(0))
        : (item.addClass("active"),
          wrapper.height(content.height()),
          item.siblings().removeClass("active"),
          item
            .siblings()
            .children(".props__wrapper")
            .height(0));
    });
};

const calcFunc = () => {
  const price = $(".price");
  const calcTotal = () => {
    let summ = 0;
    $(".sub-props__checkbox:checked").each(function() {
      summ += parseInt(
        $(this)
          .parent()
          .attr("data-price")
      );
    });
    price.text(`${summ} Р.`);
  };
  $(".sub-props__checkbox").on("change", () => {
    calcTotal();
  });
};

const accoInit = () => {
  accoFunc();
  calcFunc();
};

module.exports = accoInit;
