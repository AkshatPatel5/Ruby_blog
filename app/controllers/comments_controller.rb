# frozen_string_literal: true

# Controller logic for Comment
class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    respond_to do |format|
      format.html { redirect_to article_path(@article) }
      format.json { render json: comment_params }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:commenter, :body)
  end
end
