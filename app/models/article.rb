class Article < ApplicationRecord
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [1000, 1000]
  end
    has_many :comments
  
    validates :title, presence: true
    validates :body, presence: true, length: { minimum: 10 }
  end
  