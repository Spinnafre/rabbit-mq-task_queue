import { getTemplate } from "../helpers/fetch_template.mjs";

export class SendUserAccountNotificationMail {
  #mailService;
  #templateEngine;

  constructor(mailService, templateEngine) {
    this.#mailService = mailService;
    this.#templateEngine = templateEngine;
  }

  async execute(request) {
    try {
      const { fileName, subject, props } = makeTemplateProps(
        request.action,
        request
      );

      const mailTemplateFile = await getTemplate(fileName);

      const html = await this.#templateEngine.compile({
        file: mailTemplateFile,
        args: props,
      });

      await this.#mailService.send({
        from: "test@gmail.com",
        to: request.to,
        html,
        subject,
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

function makeCreateAccountProps(data) {
  return {
    confirmation_link: `http://localhost:8080/activate/${data.code}`,
    name: data.name,
    contact_url: "http://localhost:8080/supoort",
  };
}

function makeForgotPasswordProps(data) {
  return {
    confirmation_link: `http://localhost:8080/activate/${data.code}`,
    contact_url: "http://localhost:8080/supoort",
  };
}

function makeTemplateProps(templateName, data) {
  const fileName = `${templateName}.html`;

  const result = {
    fileName,
    subject: null,
    props: null,
  };

  switch (templateName) {
    case "create_account": {
      Object.assign(result, {
        subject: "Create account",
        props: makeCreateAccountProps(data),
      });
      break;
    }
    case "forgot_password": {
      Object.assign(result, {
        subject: "Forgot password",
        props: makeForgotPasswordProps(data),
      });
      break;
    }
    default:
      throw new Error("Fail to get template properties");
  }

  return result;
}
