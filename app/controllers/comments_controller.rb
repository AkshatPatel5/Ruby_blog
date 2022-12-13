# frozen_string_literal: true

# Controller logic for Comment
class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params.merge({user_id: current_user.id}))
    if @comment
      Notification.create({user_id: @article.user.id, comment_id: @comment.id, read: false})
      respond_to do |format|
        format.html { redirect_to article_path(@article) }
        format.json { render json: comment_params }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
