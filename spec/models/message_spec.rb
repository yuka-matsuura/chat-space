require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    # 今回の場合、テストのケースがメッセージを保存できる場合、メッセージを保存できない場合で分かれています。このように、特定の条件でテストをグループ分けしたい場合、contextを使うことができます。
    context 'can save' do
      # [メッセージを保存できる場合]メッセージがあれば保存できる
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end
      # [メッセージを保存できる場合]画像があれば保存できる
      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end
      # [メッセージを保存できる場合]メッセージと画像があれば保存できる
      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      #[メッセージを保存できない場合]メッセージも画像も無いと保存できない
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end
      #[メッセージを保存できない場合]group_idが無いと保存できない
      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
      #[メッセージを保存できない場合]user_idが無いと保存できない
      it 'is invalid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end

  end
end
