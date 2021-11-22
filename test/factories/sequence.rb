FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :avatar, :name, :state] do |n|
    "string#{n}"
  end

  sequence(:text, aliases: [:description]) { |n| "text#{n}" }
  sequence(:email) { |n| "person#{n}@example.com" }
  sequence(:expired_at) { n.days.ago }
end
