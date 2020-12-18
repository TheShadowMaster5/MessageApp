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
        email = params[:user][:email]
        password = params[:user][:password]
        user = User.create(email: email, password: password)

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
          remove_user_id_from_session()
          render json: {"is_user_logged_out": true}, status:200
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

  private

  # ================================================================================================
      def add_user_id_in_session(user)
        session[:user_id] = user.id
      end
  # ================================================================================================


  # ================================================================================================
      def remove_user_id_from_session()
        session.delete(:user_id)
      end
  # ================================================================================================


  # ================================================================================================
      def is_user_present_in_session?
        session[:user_id].present?
      end
  # ================================================================================================


      def message_params
        params.require(:user).permit(:message, :sender_id, :receiver_id, :room_id);
      end
end
