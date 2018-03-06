FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/animal_penguin.png")
    user
    group
  end
end
