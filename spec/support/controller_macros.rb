module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Devise.mapings[:user]
    sign_in user
  end
end
