class ChatRoom < ApplicationRecord
  validates_presence_of :user_1, :user_2
  has_many :messages
end
