class ArticlePolicy < ApplicationPolicy
    def create?
        user.email=="19akshatpatel@gmail.com"  
    end
end
