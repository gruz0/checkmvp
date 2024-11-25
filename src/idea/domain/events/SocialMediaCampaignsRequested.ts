import { Event } from '@/idea/events/Event'

export class SocialMediaCampaignsRequested implements Event {
  static eventName = 'SocialMediaCampaignsRequested'

  public readonly type = SocialMediaCampaignsRequested.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
