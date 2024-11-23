import { ArchivationHandler } from '@/idea/app/commands/Archive'
import { MakeReservationHandler } from '@/idea/app/commands/MakeReservation'
import { RequestSocialMediaCampaignsHandler } from '@/idea/app/commands/RequestSocialMediaCampaigns'
import { GetIdeaHandler } from '@/idea/app/queries/GetIdea'
import { GetSocialMediaCampaignsHandler } from '@/idea/app/queries/GetSocialMediaCampaigns'

export type Application = {
  Commands: Commands
  Queries: Queries
}

type Commands = {
  MakeReservation: MakeReservationHandler
  Archive: ArchivationHandler
  RequestSocialMediaCampaigns: RequestSocialMediaCampaignsHandler
}

type Queries = {
  GetIdea: GetIdeaHandler
  GetSocialMediaCampaigns: GetSocialMediaCampaignsHandler
}
