# CozyNest Home Decor - Models
# app/models/contact.rb
class Contact < ApplicationRecord
  # Validations for the contact form
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :message, presence: true, length: { minimum: 10 }
end

# app/models/user.rb
class User < ApplicationRecord
  # Secure password handling
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
end
