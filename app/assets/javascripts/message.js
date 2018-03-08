$(function(){
  function buildHTML(message){
    var image = (message.image.url == null) ? '' : `<img src="${message.image.url}",class="lower-message__image">`
    var html = `<div class= "message">
                  <div class= "upper-message">
                    <div class= "upper-message__user-name">${message.user_name}</div>
                    <div class= "upper-message__create-date">${message.user_name}</div>
                  </div>
                  <div class= "lower-message">
                    <div class="lower-message__content">${message.content}</div>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  // メッセージ投稿機能の非同期化
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // 成功した時の処理
      // jsonをhtmlに変換
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      // 失敗した時の処理
      alert('error');
    })
    .always(function(){
      // 共通処理
      $('.message-text').val('');
      $('.hidden').val('');
      $('.form-submit').prop('disabled', false);
    })
  })
})
