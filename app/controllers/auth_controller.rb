class AuthController < ApplicationController
  skip_before_action :login, only: [:index]
  def index
  end
end
