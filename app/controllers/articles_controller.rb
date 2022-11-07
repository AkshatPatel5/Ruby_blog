# frozen_string_literal: true

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
    authorize @article
    if @article.save
      UserMailer.with(user: current_user, article: @article).article_email.deliver_now
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
    rescue StandardError => e
      flash.now[:alert] = e.message
      render :new , status: :unprocessable_entity and return
  end

  def edit; end

  def update
    if @article.update(article_params)
      redirect_to @article
    else
      render :edit, status: :unprocessable_entity
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
