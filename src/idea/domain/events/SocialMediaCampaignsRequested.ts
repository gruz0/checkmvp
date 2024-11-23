import { Event } from '@/idea/events/Event'

export class SocialMediaCampaignsRequested implements Event {
  public readonly type = 'SocialMediaCampaignsRequested'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
