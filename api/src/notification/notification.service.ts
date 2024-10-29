import { Injectable } from '@nestjs/common';
import { TwilioConstants } from 'src/constants/server.contants';
import { Twilio } from 'twilio';

@Injectable()
export class NotificationService {
  private client: Twilio;
  private readonly accountSid = TwilioConstants.accountSid;
  private readonly authToken = TwilioConstants.authToken;
  constructor() {
    console.log({ accountSid: this.accountSid, authToken: this.authToken });
    this.client = new Twilio(this.accountSid, this.authToken, {
      accountSid: this.accountSid,
    });
  }

  async sendNotification(toNumber: string, message: string) {
    toNumber = `+52${toNumber}`;
    try {
      const messageResponse = await this.client.messages.create({
        from: TwilioConstants.from,
        body: message,
        to: toNumber,
      });
      console.log(messageResponse.sid);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }
}
