// NOTE: We can only use the infer keyword with the extends

type QueueJob<Q extends string, P> = {
  queue: Q;
  payload: P;
};

type WelcomeEmail = {
  to: string;
  body: string;
};

type ProcessPayment = {
  username: string;
  accountId: number;
};

type WelcomeEmailJob = QueueJob<"welcome_email", WelcomeEmail>;
type ProcessPaymentJob = QueueJob<"process_payment", ProcessPayment>;

type QueueName<J extends QueueJob<string, unknown>> = J extends QueueJob<
  infer N,
  unknown
>
  ? N
  : never;

type WelcomeEmailJobName = QueueName<WelcomeEmailJob>;
type ProcessPaymentJobName = QueueName<ProcessPaymentJob>;
