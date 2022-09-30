require 'encrypt/akshatcrypt'
require 'encrypt/engine'
class User < ApplicationRecord
  include Akshatcrypt
  validates :first_name,  
            presence: true  
  validates :last_name,  
            presence: true  
  validates :email,  
            presence: true,  
            uniqueness: true,  
            format: {  
              with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i  
            }
  def password
    @password ||= Password.new(password)
  end

  def password=(password)
    @password = Password.create(password)
    self.password_digest = @password
  end  
  def to_s  
    "#{first_name} #{last_name}"  
  end  
end
