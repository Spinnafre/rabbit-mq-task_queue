export class SendNewsletterDTO {
  #to;
  #from;

  constructor(params) {
    const { to, from } = params;

    this.#to = to;
    this.#from = from;
  }

  get to() {
    return this.#to;
  }

  get from() {
    return this.#from;
  }
}
