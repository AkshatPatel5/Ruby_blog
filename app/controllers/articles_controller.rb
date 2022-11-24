# frozen_string_literal: true

# Controller logic for Article
class ArticlesController < ApplicationController
  before_action :find_article, only: %i[show edit update destroy]
  def index
    @articles = Article.all
  end

  def show; end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    @article.user_id = current_user.id
    authorize @article
    if @article.save
      MailJob.perform_in(5.minutes.from_now, current_user.id, @article.id)
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  rescue StandardError => e
    flash.now[:alert] = e.message
    render :new, status: :unprocessable_entity and return
  end

  def edit; end

  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article }
        format.json { render json: @article }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article.destroy
    redirect_to root_path, status: :see_other
  end

  private

  def find_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :image)
  end
end
