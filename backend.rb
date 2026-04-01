# CozyNest Home Decor - Consolidated Backend Logic
# This file contains the Routes, Models, and Controllers for the project.

# ==========================================
# 1. ROUTES (config/routes.rb)
# ==========================================
# Rails.application.routes.draw do
#   resources :contacts, only: [:create]
#   post '/login', to: 'auth#login'
#   post '/signup', to: 'auth#signup'
#   resources :products, only: [:index, :show]
# end


# ==========================================
# 2. MODELS (app/models/*.rb)
# ==========================================

# User Model
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
end

# Contact Model (for the contact form)
class Contact < ApplicationRecord
  validates :name, :email, :message, presence: true
end

# Product Model
class Product < ApplicationRecord
  validates :name, :price, :category, presence: true
end


# ==========================================
# 3. CONTROLLERS (app/controllers/*.rb)
# ==========================================

# Authentication Controller
class AuthController < ApplicationController
  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      render json: { message: "Login successful!", user: @user.full_name }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def signup
    @user = User.new(user_params)
    if @user.save
      render json: { message: "Account created!", user: @user.full_name }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:full_name, :email, :password)
  end
end

# Contacts Controller
class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
        # In a real app, this might trigger an email notification
      render json: { status: "success", message: "Message received!" }, status: :created
    else
      render json: { status: "error", errors: @contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
