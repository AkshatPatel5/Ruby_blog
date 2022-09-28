class ApplicationController < ActionController::Base   
    # Prevent CSRF attacks by raising an exception.   
    # For APIs, you may want to use :null_session instead.
    before_action :login   
    protect_from_forgery with: :exception   
    private   
    def current_user
      a=User.find_by(id: session[:user_id])
      if(a.nil?)
        return nil
      else
        a
      end
    end
    
    def login
      if(User.find_by(id: session[:user_id]).nil?)
        flash[:login_error] = "You must be logged in to access this section"
        redirect_to '/auth/index'
      end
    end
    helper_method :current_user
    
  end  