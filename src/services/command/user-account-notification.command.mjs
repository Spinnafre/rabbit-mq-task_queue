export class UserAccountNotificationDTO {
  #user_name;
  #user_code;
  #user_email;
  #type;
  #action;

  constructor(params) {
    const { code, email, name, type, action } = params;

    this.#user_code = code;
    this.#user_email = email;
    this.#user_name = name;
    this.#type = type;
    this.#action = action;
  }

  get email() {
    return this.#user_email;
  }

  get code() {
    return this.#user_code;
  }

  get name() {
    return this.#user_name;
  }

  get user_type() {
    return this.#type;
  }
  // create, forgot, delete
  get action() {
    return this.#action;
  }
}
