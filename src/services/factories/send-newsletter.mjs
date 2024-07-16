import { HtmlTemplateEngineAdapter } from "../../infra/html-template-engine.mjs";
import { SendEmail } from "../../infra/send-email.service.mjs";
import { SendNewsletterMail } from "../send-newsletter.service.mjs";

export const makeSendNewsletterService = () => {
  return new SendNewsletterMail(
    new SendEmail(),
    new HtmlTemplateEngineAdapter()
  );
};
