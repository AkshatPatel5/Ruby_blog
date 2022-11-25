//= require jquery3
//= require jquery_ujs
$(function () {
  let title = {};
  let body = {};
  $('#article_show').on('submit', function (e) {
    e.preventDefault();
    const commenter = $('#comment_commenter').val();
    const body = $('#comment_body').val();
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    comment = {
      commenter: commenter,
      body: body,
    };
    $.ajax({
      type: 'POST',
      url: `/articles/${id}/comments`,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ comment }),
      success: function (data, textStatus, jqXHR) {
        if (textStatus == 'success') {
          $('h2:last').before(
            '<p><strong>Commenter: </strong>' + data.commenter + '</p>',
            '<p><strong>Comment: </strong>' + data.body + '</p>',
          );
        } else {
          $('body').prepend(`<p>${jqXHR.responseText}</p>`);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('body').prepend(`<p>${(jqXHR.responseText, errorThrown)}</p>`);
      },
    });
    return false;
  });

  $('.more').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    $(`#article__body--initial${id}`).slideToggle();
    $(`#article__body--complete${id}`).slideToggle();
    if ($(this).text() == 'more...') {
      $(this).appendTo($(this).parents('.list-group-item')).text('less');
    } else if ($(this).text() == 'less') {
      $(this)
        .appendTo($(`#article__body--initial${id}`))
        .text('more...');
    }
  });

  $('.btn__title--edit').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    $(`#title${id}`).attr('contenteditable', 'true').focus();
    $(this).siblings().show();
    $(this).hide();
    title[id] = $(`#title${id}`).text();
  });
  $('.btn__body--edit').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    $(`#body${id}`).attr('contenteditable', 'true').focus();
    $(this).siblings().show();
    $(this).hide();
    body[id] = $(`#body${id}`).text();
  });
  const hideButton = (element, id) => {
    console.log(element);
    $(`#${element}--success${id}`).hide();
    $(`#${element}--cancel${id}`).hide();
    $(`#${element}--edit${id}`).show();
    $(`#${element}${id}`).attr('contenteditable', 'false');
  };
  const successAjax = (element, article, id) => {
    const url = `/articles/${id}`;
    $.ajax({
      type: 'PATCH',
      url: url,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ article }),
      success: function (data, textStatus, jqXHR) {
        if (textStatus == 'success') {
          if (element == 'title') {
            $(`#title${id}`).text(data.title);
          }
          if (element == 'body') {
            $(`#body--initial${id}`).text(data.body.slice(0, 100));
            $(`#body${id}`).text(data.body);
          }
        } else {
          $('body').prepend(`<p>${jqXHR.responseText}</p>`);
        }
      },
      error: function (jqXHR) {
        if (element == 'title') {
          alert(`error ${jqXHR.status}: Title ${jqXHR.responseJSON.title[0]}`);
        }
        if (element == 'body') {
          alert(`error ${jqXHR.status}: Body ${jqXHR.responseJSON.body[0]}`);
        }
      },
    });
    hideButton(element, id);
  };

  $('.btn__title--success').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    const article = {
      title: $(`#title${id}`).text(),
    };
    successAjax('title', article, id);
  });
  $('.btn__body--success').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    const article = {
      body: $(`#body${id}`).text(),
    };
    successAjax('body', article, id);
  });
  $('.btn__title--cancel').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    $(`#title${id}`).text(title[id]);
    hideButton('title', id);
  });
  $('.btn__body--cancel').on('click', function () {
    const id = this.id.charAt(this.id.length - 1);
    $(`#body${id}`).text(title[id]);
    hideButton('body', id);
  });
});