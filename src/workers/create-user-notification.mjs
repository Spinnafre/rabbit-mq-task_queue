import { UserAccountNotificationDTO } from "../services/input/user-account-notification.dto.mjs";
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
      exchange: "mailer.exchange",
    });

    this.#task = task;
  }

  async handle(message) {
    const dto = new UserAccountNotificationDTO(JSON.parse(message));

    return await this.#task.execute(dto);
  }
}
