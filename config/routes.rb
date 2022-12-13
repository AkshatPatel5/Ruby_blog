# frozen_string_literal: true

Rails.application.routes.draw do
  require 'sidekiq/web'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  patch '/notifications/:id' => 'notifications#update'

  resources :users, except: [:new]
  root 'articles#index'

  resources :articles do
    resources :comments
  end
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
end
