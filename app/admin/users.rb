# frozen_string_literal: true

ActiveAdmin.register User do
  # permit_params :first_name, :last_name, :email, :encrypted_password, :reset_password_token,
  #  :reset_password_sent_at, :remember_created_at
  # or
  # permit_params do
  #   permitted = [:first_name, :last_name, :email, :encrypted_password, :reset_password_token,
  # :reset_password_sent_at, :remember_created_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
