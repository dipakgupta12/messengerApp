Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :users
  resources :messages do
    collection do
      post :broadcast
    end
  end
  resources :chat_rooms
end
