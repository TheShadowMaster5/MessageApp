class Api::V1::FetchDataController < ApplicationController


  def get_messanger_list
    current_user       =  User.find(session[:user_id])
    receiver_ids       =  current_user.receive_messages.pluck(:sender_id)
    sender_ids         =  current_user.send_messages.pluck(:receiver_id)
    all_messangers_ids =  (receiver_ids + sender_ids ).uniq
    messanger_list     =   all_messangers_ids.present? ? messanger_list(all_messangers_ids): nil;
    render json: { response_data: messanger_list }, status:200;

  end

  def get_messages
    other_person_id  = params[:receiver_user_id];
    current_user_id  = session[:user_id];
    all_messages     = Message.where(sender_id: current_user_id, receiver_id: other_person_id).or(Message.where(sender_id: other_person_id, receiver_id: current_user_id));
    all_messages     = all_messages.order(created_at: :asc)
    render json: { response_data: all_messages, current_user_id: session[:user_id] }, status:200;
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
      message_time         = latest_message.created_at.strftime('%H:%M')
      unread_message_count = total_unread_message
      json_data            = { "name": name, "message":message.message, "time": message_time, "unseen_message_count": unread_message_count, "user_id": user_id}
      return json_data

  end

end
