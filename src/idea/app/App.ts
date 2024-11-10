import { ArchivationHandler } from '@/idea/app/commands/Archive'
import { MakeReservationHandler } from '@/idea/app/commands/MakeReservation'
import { GetIdeaHandler } from '@/idea/app/queries/GetIdea'

export type Application = {
  Commands: Commands
  Queries: Queries
}

type Commands = {
  MakeReservation: MakeReservationHandler
  Archive: ArchivationHandler
}

type Queries = {
  GetIdea: GetIdeaHandler
}
