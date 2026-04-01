# CozyNest Home Decor - Routes
# config/routes.rb

Rails.application.routes.draw do
  # Root path for the API (optional)
  # root "home#index"

  # Routes for Contact Form submissions
  resources :contacts, only: [:create]

  # Routes for Authentication
  post '/login', to: 'auth#login'
  post '/signup', to: 'auth#signup'
end
