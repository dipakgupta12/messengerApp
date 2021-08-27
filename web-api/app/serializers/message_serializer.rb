class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :chat_room_id, :created_at, :status
  belongs_to :user
end