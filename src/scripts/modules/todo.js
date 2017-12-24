const todo = () => {
  const list = $(".todo");
  const addButton = "button.button_add";
  const changeButton = "button.button_change";
  const deleteButton = "button.button_delete";

  list.on("click", addButton, e => {
    e.stopPropagation();
    const parent = $(e.target).parent();
    let inputTask = $(e.target).siblings(".task__input");
    if (parent.is(".new-task")) {
      let newTask = ' <li class="task__item">';
      newTask += '<label class="task__label">' + inputTask.val() + "</label>";
      newTask +=
        '<input class="task__input" type="text" value=' + inputTask.val() + ">";
      newTask += '<button class="button-icon button_change">';
      newTask += "</button>";
      newTask += '<button class="button-icon button_delete">';
      newTask += "</button>";
      newTask += "</li>";
      $("ol.task__list").append(newTask);
      inputTask.val("");
    } else if (parent.is("li")) {
      parent.children(".task__label").text(inputTask.val());
      parent.children(".task__input").val(inputTask.val());
      parent
        .children(".button_add")
        .removeClass("button_add")
        .addClass("button_change");
      parent.removeClass("task__item_editable");
    }
  });
  list.on("click", deleteButton, e => {
    e.stopPropagation();
    const parent = $(e.target).parent();
    if (parent.is(".new-task")) {
      parent.children(".task__input").val("");
    } else if (parent.is("li")) {
      parent.remove();
    }
  });
  list.on("click", changeButton, e => {
    e.stopPropagation();
    const parent = $(e.target).parent();
    parent.addClass("task__item_editable");
    parent
      .children(".button_change")
      .removeClass("button_change")
      .addClass("button_add");
  });
};

module.exports = todo;
