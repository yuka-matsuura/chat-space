class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string  :image
      t.text    :content
      t.integer :user, null:false, foreign_key:true
      t.integer :group, null:false,foreign_key:true
      t.timestamps null: false
    end
  end
end
