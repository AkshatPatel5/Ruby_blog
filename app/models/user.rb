# frozen_string_literal: true

# Database logic for User model
class User < ApplicationRecord
  has_many :articles
  has_many :comments
  has_many :notifications
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :first_name,
            presence: true
  validates :last_name,
            presence: true

  def to_s
    "#{first_name} #{last_name}"
  end
end
