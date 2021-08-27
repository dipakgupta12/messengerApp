class ChatRoomSerializer < ActiveModel::Serializer
  attributes :id, :user_2, :user_1
  has_many :messages
end