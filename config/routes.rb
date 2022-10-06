Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do                                                                 
    get '/users/sign_out' => 'devise/sessions#destroy'        
  end
   
  resources :users ,except: [:new]
  get "auth/index"
  root "articles#index"

  resources :articles do
    resources :comments
  end
end
