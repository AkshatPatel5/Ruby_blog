# frozen_string_literal: true

# Database logic for Article model
class Article < ApplicationRecord
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [200, 200]
  end

  has_many :comments
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
