# frozen_string_literal: true

# Controller logic for Application
class ApplicationController < ActionController::Base
  include Pundit::Authorization
  # after_action :verify_authorized, except: :index, unless: :active_admin_controller?
  # after_action :verify_policy_scoped, only: :index, unless: :active_admin_controller?

  before_action :authenticate_user!
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # def active_admin_controller?
  #   is_a?(ActiveAdmin::BaseController)
  # end
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name])
  end
end
