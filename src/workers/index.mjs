import { RABBIT_MQ_URI } from "../config/index.mjs";
import { RabbitMqServer } from "../infra/queue-server.mjs";
import { makeSendAccountNotificationService } from "../services/factories/send-account-notification.mjs";
import { makeSendNewsletterService } from "../services/factories/send-newsletter.mjs";
import { UserAccountNotificationWorker } from "./create-user-notification.mjs";
import { SendNewsletterWorker } from "./send-newsletter.mjs";

(async () => {
  try {
    const rabbitMQServer = RabbitMqServer.create(RABBIT_MQ_URI);

    const workers = [
      new UserAccountNotificationWorker(
        rabbitMQServer,
        makeSendAccountNotificationService()
      ),
      new SendNewsletterWorker(rabbitMQServer, makeSendNewsletterService()),
    ];

    process.once("SIGINT", async () => {
      await rabbitMQServer.close();
    });

    console.log("To exit press CTRL+C");

    for (const worker of workers) {
      await worker.start();
    }
  } catch (error) {
    console.warn(error);
  }
})();
