Rails.application.routes.draw do
  resources :sessions, only: [:new, :create, :destroy]  
  get 'signup', to: 'users#new', as: 'signup'  
  get 'login', to: 'sessions#new', as: 'login'  
  get 'logout', to: 'sessions#destroy', as: 'logout'  
  resources :users ,except: [:new]
  get "auth/index"
  root "articles#index"

  resources :articles do
    resources :comments
  end
end
