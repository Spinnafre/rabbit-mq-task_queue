import { UserAccountNotificationDTO } from "../services/command/user-account-notification.command.mjs";
import { Worker } from "./protocol/worker.facade.mjs";

export class UserAccountNotificationWorker extends Worker {
  #task;
  constructor(queueServiceProvider, task) {
    super(queueServiceProvider, {
      queue: {
        name: "account_notifications",
        bind_key: "account",
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
    const dto = new UserAccountNotificationDTO(JSON.parse(message));

    return await this.#task.execute(dto);
  }
}
