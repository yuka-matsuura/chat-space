Rails.application.routes.draw do
  root "messages#index"
  resource :users, only: [:edit, :update]
  devise_for :users
end
