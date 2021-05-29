Rails.application.routes.draw do
  get '/' => "home#top"
  get "login" => "users#login_form"
  post "login" => "users#login"
  get "logout" => "users#logout"
  get "signup" => "users#new"
  
  post 'ranking' => "ranking#ranking"
  get 'ranking' => "ranking#ranking_all"
  
  post 'ranking_all' => "ranking#ranking_all"
  get 'ranking_all' => "ranking#ranking_all"
   
  
  post "users/create" => "users#create"
  get "users/:id" => "users#mypage"
  get "users/:id/edit" => "users#edit"
  post "users/:id/update" => "users#update"
   get "users/:id/history" => "users#history"
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
