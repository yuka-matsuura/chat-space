json.array! @messages do |message|
  json.image message.image
  json.content message.content
  json.date message.created_at
  json.user_name message.user.name
  json.id message.id
end
