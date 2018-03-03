class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :group, foreign_key: true, index: true, null: false
      t.references :user, foreign_key: true, index: true, null: false
      t.timestamps
    end
  end
end
