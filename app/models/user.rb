class User < ApplicationRecord

  validates :name, presence: true,uniqueness: true, length: {maximum: 8}
       validates :password, presence: true,  length: {maximum: 10}
end
