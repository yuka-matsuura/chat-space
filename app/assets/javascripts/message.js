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

  // メッセージ自動更新機能(非同期)
  var interval = setInterval(function() {
    // 現在のアクション（messageのindexアクション）からデータを取得
    var url = location.href;
    var lastMessageId = $('.message').last().data('messageId');
    // 閲覧ページがメッセージ一覧画面がどうか確認
    if(url.match(/\/groups\/[\d]{1,}\/messages/)){
      $.ajax({
      url: url,
      type: "GET",
      data: {id: lastMessageId},
      dataType: 'json',
      processData: false,
      contentType: false
      })
      .done(function(data){
        // 成功した時の処理
        // 2回目以降の自動更新のために変数insertHtmlを空にする
        var insertHtml = '';
        data.forEach(function(message){
          var html = buildHTML(message);
          $('.messages').append(html);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(data){
        // 失敗した時の処理
        alert('error');
      })
    } else {
      // 閲覧ページがメッセージ一覧画面ではない場合
      clearInterval(interval);
    }
  }, 5000);


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
});
