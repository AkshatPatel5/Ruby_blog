Rails.application.routes.draw do
  resources :users
  get 'auth/new'
  root "articles#index"

  resources :articles do
    resources :comments
  end
end
