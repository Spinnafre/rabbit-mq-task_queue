import { HtmlTemplateEngineAdapter } from "../../infra/html-template-engine.mjs";
import { SendEmail } from "../../infra/send-email.service.mjs";
import { SendUserAccountNotificationMail } from "../send-account-notification.service.mjs";

export const makeSendAccountNotificationService = () => {
  return new SendUserAccountNotificationMail(
    new SendEmail(),
    new HtmlTemplateEngineAdapter()
  );
};
