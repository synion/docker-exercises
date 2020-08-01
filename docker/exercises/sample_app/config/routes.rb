Rails.application.routes.draw do
  resources :scrapes, only: %i(new)

  root 'scrapes#new'
end
