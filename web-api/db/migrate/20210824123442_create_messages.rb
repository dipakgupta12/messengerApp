class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :chat_room_id
      t.integer :user_id
      t.string :status
      t.timestamps
    end
  end
end
