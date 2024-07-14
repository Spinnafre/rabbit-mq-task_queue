import { RabbitMqServer } from "../infra/queue-server.mjs";

(async () => {
  const EXCHANGE = "test.ex";

  let server;

  try {
    server = new RabbitMqServer("amqp://rabbitmq:rabbitmq@localhost:5672");

    await server.start();

    await server.createOrConnectToExchange(EXCHANGE, "direct");

    const message = {
      id: 1,
      name: "tester",
      created_at: Date.now(),
    };

    // NB: `sentToQueue` and `publish` both return a boolean
    // indicating whether it's OK to send again straight away, or
    // (when `false`) that you should wait for the event `'drain'`
    // to fire before writing again. We're just doing the one write,
    // so we'll ignore it.
    const result = server.sendToExchange(EXCHANGE, "test-key", message);

    console.log(result ? "success to send" : "fail to send");

    console.log(" [x] Sent '%s'", message);

    await server.close();
    console.log("Finished...");
    process.exit(0);
  } catch (err) {
    if (server) await server.close();
    console.warn(err);
    process.exit(1);
  }
})();
