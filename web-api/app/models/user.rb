# frozen_string_literal: true

class User < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  extend Devise::Models #added this line to extend devise model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_one_attached :image
  has_many :messages
  validates_presence_of :name, :image

  def chat_rooms
    ChatRoom.where("user_1=? OR user_2=?",id,id)
  end

  def friends
    User.where(id: chat_rooms.map{|cr| [cr.user_1, cr.user_2]}.flatten.uniq)
  end

  def as_json(options={})
    url = image.attached? ? rails_blob_url(image) : ''
    super(options.merge({except: [:image, :tokens, :created_at, :updated_at]})).merge(image: url)
  end
end
