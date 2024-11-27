type Section =
  | 'socialMediaCampaigns'
  | 'bloggingAndGuestPosts'
  | 'emailMarketing'
  | 'surveysAndPolls'
  | 'videoContent'
  | 'infographicsAndVisualContent'
  | 'communityEngagement'
  | 'paidAdvertising'
  | 'webinarsAndLiveStreams'
  | 'partnershipsAndCollaborations'

const Sections: Section[] = [
  'socialMediaCampaigns',
  'bloggingAndGuestPosts',
  'emailMarketing',
  'surveysAndPolls',
  'videoContent',
  'infographicsAndVisualContent',
  'communityEngagement',
  'paidAdvertising',
  'webinarsAndLiveStreams',
  'partnershipsAndCollaborations',
]

function isValidSection(name: string): name is Section {
  return Sections.includes(name as Section)
}

export class Strategy {
  private constructor(private readonly name: Section) {}

  static New(name: string): Strategy {
    if (!isValidSection(name)) {
      throw new Error(`Invalid section name: ${name}`)
    }
    return new Strategy(name as Section)
  }

  public getName(): Section {
    return this.name
  }
}
