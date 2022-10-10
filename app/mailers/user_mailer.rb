# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def welcome_email
    @user = params[:user]
    @url  = 'https://284e-115-166-141-182.in.ngrok.io/'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site', template_path: 'user_mailer',
         template_name: 'welcome_email')
  end

  def article_email
    @user = params[:user]
    @article = params[:article]
    mail(to: @user.email, subject: 'New article created', template_path: 'user_mailer',
         template_name: 'new_article')
  end
end
