import { SendNewsletterDTO } from "../services/command/send-newsletter.command.mjs";
import { Worker } from "./protocol/worker.facade.mjs";

export class SendNewsletterWorker extends Worker {
  #task;
  constructor(queueServiceProvider, task) {
    super(queueServiceProvider, {
      queue: {
        name: "newsletter",
        bind_key: "news",
      },
      consume_rate: 1,
      exchange: {
        name: "mailer.exchange",
        type: "direct",
      },
    });

    this.#task = task;
  }

  async handle(message) {
    const dto = new SendNewsletterDTO(JSON.parse(message));

    return await this.#task.execute(dto);
  }
}
