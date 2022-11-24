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
    if ($(this).text() == 'more...') {
      $(this).siblings('.article__body--complete').slideDown();
      $(this).siblings('.article__body--initial').slideUp();
      $(this).parent().parent().siblings('.article__comments').slideDown();
      $(this).parent().siblings().children('.btn-info').show();
      const parent = $(this).parents('.list-group-item');
      $(this).appendTo(parent);
      $(this).text('less');
    } else if ($(this).text() == 'less') {
      $(this).appendTo(
        $(this).parent().children('div:nth-child(2)').children('div:first'),
      );
      $(this).siblings('.article__body--complete').slideUp();
      $(this).siblings('.article__body--initial').slideDown();
      $(this).parent().parent().siblings('.article__comments').slideUp();
      $(this).parent().siblings().children('.btn-info').hide();
      $(this).text('more...');
    }
  });

  $('.btn-info').on('click', function () {
    $(this).parent().siblings().attr('contenteditable', 'true');
    $(this).parent().siblings().focus();
    $(this).siblings().show();
    $(this).hide();
    title[$(this).parent().siblings().attr('href')] = $(this)
      .parent()
      .siblings()
      .text();
    body[
      $(this).parent().parent().siblings('.d-flex').children('a').attr('href')
    ] = $(this).parent().siblings().children('.article__body--complete').text();
  });
  $('.btn-success__title').on('click', function () {
    const ths = $(this);
    const url = ths.parent().siblings().attr('href');
    article = {
      title: ths.parent().siblings().text(),
    };
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
          ths.parent().siblings().text(data.title);
        } else {
          $('body').prepend(`<p>${jqXHR.responseText}</p>`);
        }
      },
      error: function (jqXHR) {
        alert(`error ${jqXHR.status}: Title ${jqXHR.responseJSON.title[0]}`);
      },
    });
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings('.btn-info').show();
    $(this).parent().siblings().attr('contenteditable', 'false');
  });
  $('.btn-success__body').on('click', function () {
    const ths = $(this);
    const articleBody = ths
      .parent()
      .siblings()
      .children('.article__body--complete');
    const url = ths.parent().parent().siblings().children('a').attr('href');
    article = {
      body: articleBody.text(),
    };
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
          articleBody
            .siblings('.article__body--initial')
            .text(data.body.slice(0, 100));
          articleBody.text(data.body);
        } else {
          $('body').prepend(`<p>${jqXHR.responseText}</p>`);
        }
      },
      error: function (jqXHR) {
        alert(`error ${jqXHR.status}: Body ${jqXHR.responseJSON.body[0]}`);
      },
    });
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings('.btn-info').show();
    $(this).parent().siblings().attr('contenteditable', 'false');
  });
  $('.btn-danger').on('click', function () {
    if ($(this).parent().siblings().children().length >= 2) {
      $(this)
        .parent()
        .siblings()
        .children('.article__body--complete')
        .text(
          body[
            $(this)
              .parent()
              .parent()
              .siblings('.d-flex')
              .children('a')
              .attr('href')
          ],
        );
    } else {
      $(this)
        .parent()
        .siblings()
        .text(title[$(this).parent().siblings().attr('href')]);
    }
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings('.btn-info').show();
    $(this).parent().siblings().attr('contenteditable', 'false');
  });
});
