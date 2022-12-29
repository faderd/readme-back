import { SubscriberInterface } from '@readme/shared-types';

export class EmailSubscriberEntity implements SubscriberInterface {
  public id: string;
  public email: string;

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(emailSubscriber: SubscriberInterface) {
    this.id = emailSubscriber.id;
    this.email = emailSubscriber.email;
  }
}
