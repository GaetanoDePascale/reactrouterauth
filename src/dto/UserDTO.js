class UserDTO {
  sub;
  name;
  iat;
  username;
  password;
  role;

  constructor(data) {
    this.sub = data.sub;
    this.name = data.name;
    this.iat = data.iat;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
  }
}
