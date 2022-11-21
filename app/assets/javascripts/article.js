//= require jquery3
//= require jquery_ujs
$(function () {
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
});
