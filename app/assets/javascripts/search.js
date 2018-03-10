$(function(){

  var searchList = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    searchList.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    searchList.append(html);
  }

  function addUser(id,name){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input name="group[user_ids][]" type="hidden" value="${id}"></input>
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  // インクリメンタルサーチ
  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      // 成功した時の処理
      searchList.empty();
      if( users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser("一致するユーザは存在しません");
      }
    })
    .fail(function(){
      // 失敗した時の処理
      alert('error');
    })
  });

  // インクリメンタルサーチ後の処理
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    addUser(id,name);
    $(this).parent().remove();
  });

  $(document).on('click', '.js-remove-btn', function(){
    $(this).parent().remove();
  });

});
