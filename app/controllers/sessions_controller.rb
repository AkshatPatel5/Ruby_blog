class SessionsController < ApplicationController
  skip_before_action :login, only: [:new,:create]   
  def new   
  end   
  def create   
    user = User.find_by_email(params[:email])
    if (user)
      if user && user.authenticate(params[:password])  
        session[:user_id] = user.id   
        redirect_to root_url
      else   
        flash[:alert] = "Incorrect password"
        render :new   
      end
    else
      flash[:alert] = "Email not found"
      redirect_to "/login"
    end   
  end   
  def destroy   
    session[:user_id] = nil   
    redirect_to root_url  
  end   
end  