import { jobs, races } from '~/assets/stats'
import { ChampWithEquipmentAndLevel } from '~/component/editor/types'

export const synergyTally = (champs: (ChampWithEquipmentAndLevel | null)[]) => {
  const tally: {
    race: Record<number, number>
    job: Record<number, number>
  } = { race: {}, job: {} }
  const nonDuplicatedChamp = new Set<string>()
  const jobIdsArr = jobs.reduce((acc, cur) => {
    acc.push(cur.Id)
    return acc
  }, [] as number[])
  const raceIdsArr = races.reduce((acc, cur) => {
    acc.push(cur.Id)
    return acc
  }, [] as number[])
  champs.forEach((champ) => {
    if (champ) {
      // tally jobId and raceId
      // skip duplicate
      if (!nonDuplicatedChamp.has(champ.TFTID)) {
        nonDuplicatedChamp.add(champ.TFTID)
        champ.jobIds.forEach((jobId) => {
          if (jobId !== 0 && jobIdsArr.includes(jobId)) {
            tally.job[jobId] = tally.job[jobId] || 0
            tally.job[jobId] += 1
          }
        })
        champ.raceIds.forEach((raceId) => {
          if (raceId !== 0 && raceIdsArr.includes(raceId)) {
            tally.race[raceId] = tally.race[raceId] || 0
            tally.race[raceId] += 1
          }
        })
      }
      // tally equip
      champ.equiped.forEach((equip) => {
        if (equip.jobId !== 0 && equip.jobId !== null) {
          tally.job[equip.jobId] = tally.job[equip.jobId] || 0
          tally.job[equip.jobId] += 1
        }
        if (equip.raceId !== 0 && equip.raceId !== null) {
          tally.race[equip.raceId] = tally.race[equip.raceId] || 0
          tally.race[equip.raceId] += 1
        }
      })
    }
  })
  return tally
}

interface SynergyInput {
  race: Record<string, number>
  job: Record<string, number>
}

export interface SynergyProp {
  Id: number
  levelReached: number
  name: string
  totalLevel: number
  imagePath: string
  champsCount: number
  level: {
    champCount: number
    level: number
  }[]
  levelStats: Record<number, string>
  introduce: string
}

export const FindSynergy = (
  champGroup: (ChampWithEquipmentAndLevel | null)[]
): SynergyProp[] => {
  const classTally: SynergyInput = synergyTally(champGroup)

  const jobSynergyResult = jobs.reduce((jobSynergy, job) => {
    Object.keys(classTally.job).forEach((k) => {
      if (job.Id === parseInt(k, 10)) {
        const levelReached: { champCount: number; level: number } | undefined =
          job.levelColor
            .filter((item) => item.champCount <= classTally.job[k])
            .slice(-1)
            .pop()
        if (levelReached)
          jobSynergy.push({
            Id: job.Id,
            introduce: job.introduce,
            levelStats: job.level,
            levelReached: levelReached.level,
            name: job.name,
            totalLevel: job.levelColor.length || 1,
            imagePath: job.imagePath,
            champsCount: classTally.job[k],
            level: job.levelColor,
          })
      }
    })
    return jobSynergy
  }, [] as SynergyProp[])
  const raceSynergyResult = races.reduce((raceSynergy, race) => {
    Object.keys(classTally.race).forEach((k) => {
      if (race.Id === parseInt(k, 10)) {
        const levelReached: { champCount: number; level: number } | undefined =
          race.levelColor
            .filter((item) => item.champCount <= classTally.race[k])
            .slice(-1)
            .pop()
        if (levelReached)
          raceSynergy.push({
            Id: race.Id,
            introduce: race.introduce,
            levelStats: race.level,
            levelReached: levelReached.level,
            name: race.name,
            totalLevel: race.levelColor.length,
            imagePath: race.imagePath,
            champsCount: classTally.race[k],
            level: race.levelColor,
          })
      }
    })
    return raceSynergy
  }, [] as SynergyProp[])

  return [...jobSynergyResult, ...raceSynergyResult].sort((a, b) => {
    return b.champsCount - a.champsCount
  })
}
