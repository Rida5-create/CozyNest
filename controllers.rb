# CozyNest Home Decor - Controllers
# app/controllers/contacts_controller.rb
class ContactsController < ApplicationController
  # POST /contacts
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: { message: "Message sent successfully!" }, status: :created
    else
      render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end

# app/controllers/auth_controller.rb
class AuthController < ApplicationController
  # POST /login
  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      render json: { message: "Login successful!", user: @user.full_name }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # POST /signup
  def signup
    @user = User.new(user_params)
    if @user.save
      render json: { message: "User created successfully!" }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:full_name, :email, :password, :password_confirmation)
  end
end
