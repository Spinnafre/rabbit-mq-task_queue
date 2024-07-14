export class SendNewsletterMail {
  #sendMailService;

  constructor(sendMailService) {
    this.#sendMailService = sendMailService;
  }

  async execute(dto) {
    try {
      const { to, from } = dto;
      let html = "newsletter_template";

      await this.#sendMailService.send({
        from: "test@gmail.com",
        to,
        cc: "*0",
        html,
        attachments: null,
      });

      return {
        isSuccess: () => {
          return true;
        },
      };
    } catch (error) {
      console.warn(error);

      return {
        isSuccess: () => {
          return false;
        },
        error: error,
      };
    }
  }
}
