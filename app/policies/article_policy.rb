# frozen_string_literal: true

# Pundit policy to allow only specific user to create an article
class ArticlePolicy < ApplicationPolicy
  def create?
    user.email == '19akshatpatel@gmail.com'
  end
end
