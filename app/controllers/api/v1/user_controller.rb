class Api::V1::UserController < ApplicationController

  # ================================================================================================
      def login
        email = params[:user][:email]
        password = params[:user][:password]

        if User.is_authenticated(email,password)
          user = User.find_by_email(email)
          add_user_id_in_session(user)
          render json: {message:"The user has successfully signed in"}, status: 200
        else
          render json: {message:"The signin process is not completed due to some reason"}, status: 400
        end
      end
  # ================================================================================================


  # ================================================================================================
      def signup
        require "bcrypt"
        user = User.create(user_params)

        if user.present?
          add_user_id_in_session(user)
          render json: {message:"The user has successfully signed up"}, status: 200
        else
          render json: {message:"The signup process is not completed due to some reason"}, status: 400
        end
      end
  # ================================================================================================


  # ================================================================================================
      def logout
          reset_session
          render json: {"is_user_logged_out": !session[:user_id].present?}, status:200
      end
  # ================================================================================================


  # ================================================================================================
      def user_signed_in_status
        if session[:user_id].present?
          render json: {"is_user_logged_in": true}, status:200
        else
          render json: {"is_user_logged_in": false}, status:200
        end
      end
  # ================================================================================================


  # ================================================================================================
     def send_message
       message = Message.new(message_params)
       message.save!
       MessageBroadcastJob.perform_later(message);
     end
  # ================================================================================================


  def update_profile
    current_user = User.find(session[:user_id].to_i)
    if current_user.update(update_profile_params)
      render json: { is_data_updated: true}, status:200
    else
      render json: { is_data_updated: false}, status:404
    end
  end

  private

  # ================================================================================================
      def add_user_id_in_session(user)
        session[:user_id] = user.id.to_s
      end
  # ================================================================================================


  # ================================================================================================
      def is_user_present_in_session?
        session[:user_id].present?
      end
  # ================================================================================================

  # ================================================================================================
      def user_params
        params[:user]['password'] = BCrypt::Password.create(params[:user]['password']);
        params.require(:user).permit(:name, :email, :password, :room_id);
      end
  # ================================================================================================

  # ================================================================================================
      def message_params
        params[:user][:sender_id]   = session[:user_id]
        params[:user][:receiver_id] = session[:other_person_user_id]
        params[:user][:room_id]     = session[:chat_room]
        params.require(:user).permit(:message, :sender_id, :receiver_id, :room_id);
      end
  # ================================================================================================

  # ================================================================================================
      def update_profile_params
        params.require(:user).permit(:name, :email, :mobile_number, :avatar);
      end
  # ================================================================================================
end
