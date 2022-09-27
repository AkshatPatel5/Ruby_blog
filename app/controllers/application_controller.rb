class ApplicationController < ActionController::Base   
    # Prevent CSRF attacks by raising an exception.   
    # For APIs, you may want to use :null_session instead.   
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
    helper_method :current_user
    
    # if(!current_user.nil?)
    #   puts "Current user: #{:current_user}"
    # end
  end  