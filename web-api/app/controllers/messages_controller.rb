class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    messages = Message.where(chat_room_id: params[:chat_room_id])
    messages.update_all(status: 'read')
    render json: messages.order(:created_at), each_serializer: MessageSerializer
  end

  def create
    message = current_user.messages.create(message_params)
    render json: message
  end

  def destroy
    Message.find(params[:id]).destroy
    render json: { status: 'success' }
  end

  private

  def message_params
    params.require(:message).permit(:body, :chat_room_id, :status)
  end
end
    