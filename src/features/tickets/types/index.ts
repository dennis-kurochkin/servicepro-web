import { SerWorkTaskVerbose, WorkTaskGeo } from '~/api/servicepro.generated'

export interface TaskVerbose {
  task: SerWorkTaskVerbose
  geo: WorkTaskGeo | undefined
}
