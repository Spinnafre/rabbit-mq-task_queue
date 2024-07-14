export class SendUserAccountNotificationMail {
  #sendMailService;

  constructor(sendMailService) {
    this.#sendMailService = sendMailService;
  }

  async execute(dto) {
    try {
      const { email, code, name, user_type, action } = dto;
      let html;

      switch (action) {
        case "create": {
          html = "create_account_template";
          break;
        }
        case "forgot": {
          html = "forgot_account_template";
          break;
        }
        default:
          throw new Error("HTML template not found");
      }

      await this.#sendMailService.send({
        from: "test@gmail.com",
        to: email,
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
