class ChatRoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    chat_rooms = current_user.chat_rooms
    render json: chat_rooms, each_serializer: ChatRoomSerializer
  end

  def create
    chat_room = ChatRoom.new(chat_room_params)
    chat_room.user_1 = current_user.id
    chat_room.save
    render json: chat_room
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:user_2)
  end
end
    