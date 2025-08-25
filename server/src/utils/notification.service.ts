import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

type SmsBookingParams = {
  phoneNumber: string;
  bookingId: string;
  movies: string[];
  showTime: string;
  audi: number;
  location?: string;
};

const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
const SENDER_ID = process.env.AWS_SNS_SENDER_ID; // Optional. Up to 11 alphanumeric chars in many countries

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const snsClient = new SNSClient({
  ...(REGION ? { region: REGION } : {}),
  ...(
    awsAccessKeyId && awsSecretAccessKey
      ? { credentials: { accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKey } }
      : {}
  ),
});

function composeBookingMessage(p: SmsBookingParams): string {
  const movies = p.movies.join(", ");
  return (
    `Miniplex Booking Confirmed!\n` +
    `Movie: ${movies}\n` +
    `Show: ${p.showTime}\n` +
    (p.location ? `Location: ${p.location}\n` : "") +
    `Audi: ${p.audi}\n` +
    `Booking ID: ${p.bookingId}\n` +
    `Enjoy your show!`
  );
}

export async function smsSend(params: SmsBookingParams): Promise<{ messageId: string }> {
  if (!params?.phoneNumber) {
    throw new Error("smsSend: 'phoneNumber' is required in E.164 format (e.g., +919876543210)");
  }

  const message = composeBookingMessage(params);

  const MessageAttributes: Record<string, { DataType: string; StringValue?: string }> = {
    "AWS.SNS.SMS.SMSType": { DataType: "String", StringValue: "Transactional" },
  };

  if (SENDER_ID) {
    MessageAttributes["AWS.SNS.SMS.SenderID"] = { DataType: "String", StringValue: SENDER_ID };
  }

  const cmd = new PublishCommand({
    PhoneNumber: params.phoneNumber,
    Message: message,
    MessageAttributes,
  });

  const res = await snsClient.send(cmd);

  if (!res.MessageId) {
    throw new Error("smsSend: SNS did not return a MessageId");
  }
  return { messageId: res.MessageId };
}