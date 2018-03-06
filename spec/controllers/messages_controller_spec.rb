require 'rails_helper'

describe MessagesController do
  # letメソッドで複数のexampleで同一のインスタンスを使う
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      # [ログインしている場合]アクション内で定義しているインスタンス変数@messageがあるか
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      # [ログインしている場合]アクション内で定義しているインスタンス変数@groupがあるか
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      # [ログインしている場合]該当するビューが描画されているか
      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id}
      end

      # [ログインしていない場合]意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end

end
