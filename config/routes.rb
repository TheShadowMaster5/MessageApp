Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

        # --------------------------- USER ----------------------------------
            post 'user/login'           =>  'user#login'
            post 'user/signup'          =>  'user#signup'
            post 'user/is_signed_in'    =>  'user#user_signed_in_status'
            delete 'user/logout'        =>  'user#logout'
            post 'send_message'         =>  'user#send_message'
        # --------------------------------------------------------------------

        # --------------------------Fetch Messanger --------------------------
            post 'fetch_messanger_list' =>  'fetch_data#get_messanger_list'
        # --------------------------------------------------------------------
    end
  end

  root to: 'home#index'
  get '/*path' => 'home#index'
end
