export class UserAccountNotificationDTO {
  #_name;
  #_code;
  #_to;
  #_type;
  #_action;

  constructor(params) {
    const { code, to, name, type, action } = params;

    this.#_code = code;
    this.#_to = to;
    this.#_name = name;
    this.#_type = type;
    this.#_action = action;
  }

  get to() {
    return this.#_to;
  }

  get code() {
    return this.#_code;
  }

  get name() {
    return this.#_name;
  }

  get user_type() {
    return this.#_type;
  }
  // create, forgot, delete
  get action() {
    return this.#_action;
  }
}
