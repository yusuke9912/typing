class UsersController < ApplicationController
  before_action :authenticate_user,{only:[:mypage, :edit, :update, :history]}
    before_action :forbid_login_user,{only:[:new, :create, :login_form, :login]}
  def new
      @user = User.new
  end
  
  def create
    @user = User.new(name: params[:name], password: params[:password])
    
    if @user.save
        flash[:notice] = "登録できました"
        session[:user_id] = @user.id
        redirect_to("/users/#{@user.name}")
    else
       render("users/new")
    end
   
  end
  
  def mypage
  end
  
  def edit
       @user = User.find_by(id: params[:id])
  end
  
  def update
       @user = User.find_by(id: params[:id])
       @user.name = params[:name]
       @user.password = params[:password]
       
    if @user.save
      flash[:notice] = "ユーザー情報を編集しました"
      redirect_to("/users/#{@user.name}")
    else 
      render("users/edit")
    end
  end
  
  def login_form
  end
  
  def login
    @user=User.find_by(name: params[:name], password: params[:password])
    
    if @user
      session[:user_id] = @user.id
      redirect_to("/")
    else
      @error_message = "メールアドレスまたはパスワードが間違っています"
      @name = params[:name]
      @password = params[:password]
      render("users/login_form")
    end
  end
  
  def logout
    session[:user_id] = nil
    redirect_to("/")
  end
  
  def history
       @user = User.find_by(id: session[:user_id])
      @tables = Score.where(users_id: @user.id)
  end
end
