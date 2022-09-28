class UserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url  = 'https://284e-115-166-141-182.in.ngrok.io/'
        mail(to: @user.email, subject: 'Welcome to My Awesome Site', template_path: 'user_mailer', template_name: 'welcome_email')
      end
end
