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
            post 'update_profile'       =>  'user#update_profile'
        # --------------------------------------------------------------------

        # --------------------------Fetch Messanger --------------------------
            post 'fetch_messanger_list' =>  'fetch_data#get_messanger_list'
            post 'fetch_messages'       =>  'fetch_data#get_messages'
            post 'fetch_userlist'       =>  'fetch_data#get_userlist'
        # --------------------------------------------------------------------

        # --------------------------Fetch Messanger --------------------------
            post 'set_other_user_id'      =>  'fetch_data#set_other_user_id'
            post 'destroy_other_user_id'  =>  'fetch_data#destroy_other_user_id'
            post 'create_chat_room'       =>  'fetch_data#create_chat_room'
            post 'destroy_chat_room'      =>  'fetch_data#destroy_chat_room'
            post 'get_other_user_id'      =>  'fetch_data#get_other_user_id'
            post 'get_other_user_info'    =>  'fetch_data#get_other_user_info'
            get 'get_profile_data'        =>  'fetch_data#get_profile_data'
            get 'get_loggedin_user_id'    =>  'fetch_data#get_loggedin_user_id'
            get 'get_chat_room_id'        =>  'fetch_data#get_chat_room_id'
        # --------------------------------------------------------------------
    end
  end

  root to: 'home#index'
  get '/*path' => 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }


end
