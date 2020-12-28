class Api::V1::FetchDataController < ApplicationController


  def get_messanger_list
    current_user       =  User.find(session[:user_id].to_i)
    receiver_ids       =  current_user.receive_messages.pluck(:sender_id)
    sender_ids         =  current_user.send_messages.pluck(:receiver_id)
    all_messangers_ids =  (receiver_ids + sender_ids ).uniq
    messanger_list     =   all_messangers_ids.present? ? messanger_list(all_messangers_ids): nil;
    render json: { response_data: messanger_list }, status:200;

  end

  def get_messages
    other_person_user_id     =  session[:other_person_user_id];
    loggedin_person_user_id  =  session[:user_id];
    all_messages             =  Message.where(sender_id: loggedin_person_user_id, receiver_id: other_person_user_id).or(Message.where(sender_id: other_person_user_id, receiver_id: loggedin_person_user_id));
    all_messages             =  all_messages.order(created_at: :asc)
    render json: { response_data: all_messages, loggedin_person_user_id: session[:user_id], other_person_user_id: session[:other_person_user_id] }, status:200;
  end

  def get_userlist
    current_user_id   = session[:user_id];
    all_users         = User.where.not(id: current_user_id);
    render json: { response_data: all_users, current_user_id: session[:user_id] }, status:200;
  end

  def set_other_user_id
     other_user_id                  =  params[:other_person_user_id]
     session[:other_person_user_id] =  other_user_id
     render json: { is_other_user_id_set: session[:other_person_user_id].present?, status:200};
  end

  def get_loggedin_user_id
    render json: { loggedin_person_user_id: session[:user_id] }, status:200;
  end

  def get_other_user_id
    render json: { other_person_user_id: session[:other_person_user_id] }, status:200;
  end

  def get_other_user_info
    other_user_info = User.find(session[:other_person_user_id])
    image_url = url_for(other_user_info.avatar)
    render json: {other_user_info: other_user_info, other_user_image_url: image_url}, status:200;
  end

  def destroy_other_user_id
     session.delete(:other_user_id)
  end

  def create_chat_room
     chat_room_id        = SecureRandom.urlsafe_base64
     session[:chat_room] = chat_room_id
  end

  def destroy_chat_room
    session.delete(:chat_room)
  end


  private

  def messanger_list(all_messangers_ids)

    messangers_list      = []
    current_user_id      = session[:user_id]

    all_messangers_ids.each do |user_id|
        other_user_id        = user_id
        last_message_send    = get_last_message(current_user_id, other_user_id)
        last_message_receive = get_last_message(other_user_id, current_user_id)
        latest_message       = latest_message(last_message_send, last_message_receive)
        total_unread_message = count_unread_message(current_user_id)
        json_data            = create_json_data(other_user_id, latest_message, total_unread_message);
        messangers_list.push(json_data)
    end

    return messangers_list
  end


  def get_last_message(sender_id, receiver_id)
    last_message = Message.where(sender_id: sender_id, receiver_id: receiver_id).last;
    return last_message
  end


  def latest_message(send_message, receive_message)

    if send_message.present? && receive_message.present?
      if send_message.created_at > receive_message.created_at
        return send_message
      else
        return receive_message
      end
    elsif send_message.present? && !receive_message.present?
      return send_message
    elsif !send_message.present? && receive_message.present?
      return receive_message
    end

  end

  def count_unread_message(current_user_id)
    unread_message_count  = Message.where(receiver_id: current_user_id, message_seen: false).count
    return unread_message_count
  end

  def create_json_data(other_user_id, latest_message, total_unread_message)
      user                 = User.find(other_user_id)
      name                 = user.name
      user_id              = user.id
      # image_url            = user.image || ''
      message              = latest_message
      message_date         = latest_message.created_at.strftime('%d %b')
      unread_message_count = total_unread_message
      json_data            = { "name": name, "message":message.message, "date": message_date, "unseen_message_count": unread_message_count, "user_id": user_id}
      return json_data

  end

end
