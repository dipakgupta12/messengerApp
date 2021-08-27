class CreateChatRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :chat_rooms do |t|
      t.integer :user_1
      t.integer :user_2
      t.timestamps
    end
  end
end
