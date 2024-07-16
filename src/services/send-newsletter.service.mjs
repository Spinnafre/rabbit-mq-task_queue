export class SendNewsletterMail {
  #mailService;
  #templateEngine;

  constructor(mailService, templateEngine) {
    this.#mailService = mailService;
    this.#templateEngine = templateEngine;
  }

  async execute(dto) {
    try {
      const { to, from } = dto;
      let html = "newsletter_template";

      await this.#mailService.send({
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
