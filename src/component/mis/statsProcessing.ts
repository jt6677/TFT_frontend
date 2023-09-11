import axios from 'axios'

import { HexProps } from '~/component/editor/types'

//= =======================================================
// Process Job and Race List
interface UnprocessedJobProps {
  jobId: string
  name: string
  traitId: string
  introduce: string
  alias: string
  level: any
  TFTID: string
  imagePath: string
  job_color_list: string
}
interface UnprocessedRaceProps {
  raceId: string
  name: string
  traitId: string
  introduce: string
  alias: string
  level: any
  imagePath: string
  race_color_list: string
}

function ProcessRawJobRaceData(
  rawdata: UnprocessedJobProps[] | UnprocessedRaceProps[]
) {
  const isJobProps = (
    item: UnprocessedJobProps | UnprocessedRaceProps
  ): item is UnprocessedJobProps => {
    // @ts-ignore
    return item.hasOwnProperty('jobId')
  }
  const ColorListToArray = (str: string) => {
    const colorArray = str.split(',')
    const colorMap = colorArray.map((item, index) => {
      const [jobId, x] = item.split(':')
      return { champCount: Number(jobId), level: index + 1 }
    })
    return colorMap
  }
  const list = (arr: UnprocessedJobProps[] | UnprocessedRaceProps[]) => {
    if (isJobProps(arr[0])) {
      const arrNew = arr as UnprocessedJobProps[]
      const v = arrNew.map((item) => {
        const i = {
          ...item,
          Id: Number(item.jobId),
          levelColor: ColorListToArray(item.job_color_list),
        }
        // @ts-ignore
        delete i.job_color_list
        // @ts-ignore
        delete i.TFTID
        // @ts-ignore
        delete i.traitId
        // @ts-ignore
        delete i.jobId
        return i
      })
      return v
    }
    if (!isJobProps(arr[0])) {
      const arrNew = arr as UnprocessedRaceProps[]
      const v = arrNew.map((item) => {
        const i = {
          ...item,
          Id: Number(item.raceId),
          levelColor: ColorListToArray(item.race_color_list),
        }
        // @ts-ignore
        delete i.race_color_list
        // @ts-ignore
        delete i.TFTID
        // @ts-ignore
        delete i.traitId
        // @ts-ignore
        delete i.raceId
        return i
      })
      return v
    }
  }
  return list(rawdata)
}

//= =======================================================
// Process Chess

interface UnprocessedChess {
  chessId: string
  title: string
  name: string
  displayName: string
  raceIds: string
  jobIds: string
  price: string
  skillName: string
  skillType: string
  skillImage: string
  skillIntroduce: string
  skillDetail: string
  life: string
  magic: string
  startMagic: string
  armor: string
  spellBlock: string
  attackMag: string
  attack: string
  attackSpeed: string
  attackRange: string
  crit: string
  originalImage: string
  lifeMag: string
  TFTID: string
  synergies: string
  illustrate: string
  recEquip: string
  proStatus: string
  races: string
  jobs: string
  attackData: string
  lifeData: string
}

function ProcessChessData(rawdata: UnprocessedChess[]) {
  const csti = (keyValuePair: Record<string, string>) => {
    const newObj: Record<string, number[]> = {}
    for (const [key, value] of Object.entries(keyValuePair)) {
      newObj[key] = value.split(',').map((item) => {
        return parseInt(item, 10)
      })
    }
    return newObj
  }
  const list = rawdata.map((x) => {
    //   const nssw ={ csti({ jobIds: x.jobIds }),csti({ raceIds: x.raceIds })}
    return {
      chessId: x.chessId,
      title: x.title,
      name: x.displayName,
      ...csti({ jobIds: x.jobIds }),
      ...csti({ raceIds: x.raceIds }),
      ...{ price: parseInt(x.price, 10) },
      TFTID: x.TFTID,
      url: `http://game.gtimg.cn/images/lol/act/img/tft/champions/${x.name}`,
    }
  })
  // '邪恶小法师'jobIds[null]
  // 强行改成 jobIds:[999]
  // @ts-ignore
  const modifySpecialChess = []
  list.forEach((champ) => {
    if (champ.chessId === '45') {
      // @ts-ignore
      modifySpecialChess.push({
        ...champ,
        jobIds: [999],
      })
    } else {
      modifySpecialChess.push(champ)
    }
  })
  const sorted = (
    arr: {
      TFTID: string
      url: string
      price: number
      chessId: string
      title: string
      name: string
    }[]
  ) => {
    return arr.sort((a, b) => {
      return a.price - b.price
    })
  }
  // @ts-ignore
  return sorted(modifySpecialChess)
}
// export const champs = ProcessChessData(chessNew.data)
//= =======================================================
// Process Equipment

interface RawEquipProps {
  equipId: string
  type: string
  name: string
  effect: string
  keywords: string
  formula: string
  imagePath: string
  TFTID: string
  jobId: string | null
  raceId: string | null
  proStatus: string
}

interface SeasonEquip {
  equipment_id: number
  cn_name: string
  en_name: string
  items_id: number
  season_equip_id: number
}
interface EquipmentProps {
  equipId: string
  type: string
  name: string
  effect: string
  keywords: string
  formula: string
  imagePath: string
  TFTID: string
  jobId: number
  raceId: number
  proStatus: string
}

function ProcessEquipData(
  arr: RawEquipProps[],
  list: SeasonEquip[],
  basicEquipmentList: string[]
) {
  const result = arr.reduce((pre, cur) => {
    if (list.find((item) => item.equipment_id === parseInt(cur.equipId, 10))) {
      pre.push({
        ...cur,
        raceId: cur.raceId === null ? 0 : parseInt(cur.raceId, 10),
        jobId: cur.jobId === null ? 0 : parseInt(cur.jobId!, 10),
      })
    }
    return pre
  }, [] as EquipmentProps[])
  // 排序,基础装备放最后

  const a = result.filter((item) => !basicEquipmentList.includes(item.equipId))
  const b = result.filter((item) => basicEquipmentList.includes(item.equipId))
  return [...a, ...b]
}

// export const equips = ProcessEquipData(
//   equipNew.data,
//   season6equipIDList,
//   basicEquipment
// )
//= =======================================================
// Process hex
function ProcessHexData(hex: Record<string, HexProps>) {
  return Object.values(hex).reduce(
    (acc, cur) => {
      if (cur.type === '1') {
        acc[0].push(cur)
      } else if (cur.type === '2') {
        acc[1].push(cur)
      } else if (cur.type === '3') {
        acc[2].push(cur)
      }
      return acc
    },
    [[], [], []] as [HexProps[], HexProps[], HexProps[]]
  )
}

//= =======================================================
// Process hex
export async function GetRawData() {
  const ulrArr = ['chess.js', 'race.js', 'job.js', 'equip.js', 'hex.js']
  const baseUrl = 'https://game.gtimg.cn/images/lol/act/img/tft/js/'
  // const seasonEquipInfo =
  //   'https://lol.qq.com/act/a20200224tft/staticJS-vue3/TFTEquipMap.json'
  const s6equip = {
    s6: [
      {
        equipment_id: 301,
        cn_name: '暴风大剑',
        en_name: 'B.F. Sword',
        items_id: 1,
        season_equip_id: 501,
      },
      {
        equipment_id: 302,
        cn_name: '反曲之弓',
        en_name: 'Recurve Bow',
        items_id: 2,
        season_equip_id: 502,
      },
      {
        equipment_id: 303,
        cn_name: '无用大棒',
        en_name: 'Needlessly Large Rod',
        items_id: 3,
        season_equip_id: 503,
      },
      {
        equipment_id: 304,
        cn_name: '女神之泪',
        en_name: 'Tear of the Goddess',
        items_id: 4,
        season_equip_id: 504,
      },
      {
        equipment_id: 305,
        cn_name: '锁子甲',
        en_name: 'Chain Vest',
        items_id: 5,
        season_equip_id: 505,
      },
      {
        equipment_id: 306,
        cn_name: '负极斗篷',
        en_name: 'Negatron Cloak',
        items_id: 6,
        season_equip_id: 506,
      },
      {
        equipment_id: 307,
        cn_name: '巨人腰带',
        en_name: "Giant's Belt",
        items_id: 7,
        season_equip_id: 507,
      },
      {
        equipment_id: 308,
        cn_name: '金铲铲',
        en_name: 'Spatula',
        items_id: 8,
        season_equip_id: 508,
      },
      {
        equipment_id: 309,
        cn_name: '拳套',
        en_name: 'Sparring Gloves',
        items_id: 9,
        season_equip_id: 509,
      },
      {
        equipment_id: 310,
        cn_name: '死亡之刃',
        en_name: 'Deathblade',
        items_id: 11,
        season_equip_id: 519,
      },
      {
        equipment_id: 311,
        cn_name: '巨人杀手',
        en_name: 'Giant Slayer',
        items_id: 12,
        season_equip_id: 521,
      },
      {
        equipment_id: 312,
        cn_name: '海克斯科技枪刃',
        en_name: 'Hextech Gunblade',
        items_id: 13,
        season_equip_id: 523,
      },
      {
        equipment_id: 313,
        cn_name: '朔极之矛',
        en_name: 'Spear of Shojin',
        items_id: 14,
        season_equip_id: 525,
      },
      {
        equipment_id: 314,
        cn_name: '守护天使',
        en_name: 'Guardian Angel',
        items_id: 15,
        season_equip_id: 527,
      },
      {
        equipment_id: 315,
        cn_name: '饮血剑',
        en_name: 'Bloodthirster',
        items_id: 16,
        season_equip_id: 529,
      },
      {
        equipment_id: 316,
        cn_name: '基克的先驱',
        en_name: "Zeke's Herald",
        items_id: 17,
        season_equip_id: 531,
      },
      {
        equipment_id: 318,
        cn_name: '无尽之刃',
        en_name: 'Infinity Edge',
        items_id: 19,
        season_equip_id: 535,
      },
      {
        equipment_id: 319,
        cn_name: '疾射火炮',
        en_name: 'Rapid Firecannon',
        items_id: 22,
        season_equip_id: 537,
      },
      {
        equipment_id: 320,
        cn_name: '鬼索的狂暴之刃',
        en_name: "Guinsoo's Rageblade",
        items_id: 23,
        season_equip_id: 539,
      },
      {
        equipment_id: 321,
        cn_name: '斯塔缇克电刃',
        en_name: 'Statikk Shiv',
        items_id: 24,
        season_equip_id: 541,
      },
      {
        equipment_id: 354,
        cn_name: '泰坦的坚决',
        en_name: "Titan's Resolve",
        items_id: 25,
        season_equip_id: 543,
      },
      {
        equipment_id: 322,
        cn_name: '卢安娜的飓风',
        en_name: "Runaan's Hurricane",
        items_id: 26,
        season_equip_id: 545,
      },
      {
        equipment_id: 323,
        cn_name: '兹若特传送门',
        en_name: "Zz'Rot Portal",
        items_id: 27,
        season_equip_id: 547,
      },
      {
        equipment_id: 325,
        cn_name: '最后的轻语',
        en_name: 'Last Whisper',
        items_id: 29,
        season_equip_id: 551,
      },
      {
        equipment_id: 326,
        cn_name: '灭世者的死亡之帽',
        en_name: "Rabadon's Deathcap",
        items_id: 33,
        season_equip_id: 553,
      },
      {
        equipment_id: 555,
        cn_name: '大天使之杖',
        en_name: '',
        items_id: 34,
        season_equip_id: 555,
      },
      {
        equipment_id: 555,
        cn_name: '卢登的回声',
        en_name: "Rabadon's Deathcap",
        items_id: 34,
        season_equip_id: 555,
      },
      {
        equipment_id: 328,
        cn_name: '钢铁烈阳之匣',
        en_name: 'Locket of the Iron Solari',
        items_id: 35,
        season_equip_id: 557,
      },
      {
        equipment_id: 329,
        cn_name: '离子火花',
        en_name: 'Ionic Spark',
        items_id: 36,
        season_equip_id: 559,
      },
      {
        equipment_id: 330,
        cn_name: '莫雷洛秘典',
        en_name: 'Morellonomicon',
        items_id: 37,
        season_equip_id: 561,
      },
      {
        equipment_id: 332,
        cn_name: '珠光护手',
        en_name: 'Jeweled Gauntlet',
        items_id: 39,
        season_equip_id: 565,
      },
      {
        equipment_id: 356,
        cn_name: '蓝霸符',
        en_name: 'Blue Buff',
        items_id: 44,
        season_equip_id: 567,
      },
      {
        equipment_id: 334,
        cn_name: '冰霜之心',
        en_name: 'Frozen Heart',
        items_id: 45,
        season_equip_id: 569,
      },
      {
        equipment_id: 335,
        cn_name: '善行圣杯',
        en_name: 'Frozen Heart',
        items_id: 46,
        season_equip_id: 571,
      },
      {
        equipment_id: 336,
        cn_name: '救赎',
        en_name: 'Redemption',
        items_id: 47,
        season_equip_id: 573,
      },
      {
        equipment_id: 338,
        cn_name: '正义之手',
        en_name: 'Hand Of Justice',
        items_id: 49,
        season_equip_id: 577,
      },
      {
        equipment_id: 339,
        cn_name: '棘刺背心',
        en_name: 'Bramble Vest',
        items_id: 55,
        season_equip_id: 579,
      },
      {
        equipment_id: 410,
        cn_name: '石像鬼板甲',
        en_name: 'Gargoyle Stoneplate',
        items_id: 56,
        season_equip_id: 581,
      },
      {
        equipment_id: 409,
        cn_name: '日炎斗篷',
        en_name: 'Sunfire Cape',
        items_id: 57,
        season_equip_id: 583,
      },
      {
        equipment_id: 343,
        cn_name: '静止法衣',
        en_name: 'Shroud of Stillness',
        items_id: 59,
        season_equip_id: 587,
      },
      {
        equipment_id: 344,
        cn_name: '巨龙之爪',
        en_name: "Dragon's Claw",
        items_id: 66,
        season_equip_id: 589,
      },
      {
        equipment_id: 345,
        cn_name: '灵风',
        en_name: 'Zephyr',
        items_id: 67,
        season_equip_id: 591,
      },
      {
        equipment_id: 347,
        cn_name: '水银',
        en_name: 'Quicksilver',
        items_id: 69,
        season_equip_id: 595,
      },
      {
        equipment_id: 348,
        cn_name: '狂徒铠甲',
        en_name: "Warmog's Armor",
        items_id: 77,
        season_equip_id: 597,
      },
      {
        equipment_id: 601,
        cn_name: '女妖之爪',
        en_name: '',
        items_id: 79,
        season_equip_id: 601,
      },
      {
        equipment_id: 603,
        cn_name: '金铲铲冠冕',
        en_name: '',
        items_id: 88,
        season_equip_id: 603,
      },
      {
        equipment_id: 353,
        cn_name: '窃贼手套',
        en_name: "Thief's Gloves",
        items_id: 99,
        season_equip_id: 607,
      },
      {
        equipment_id: 6001,
        cn_name: '帝国纹章',
        en_name: "Thief's Gloves",
        items_id: 18,
        season_equip_id: 6001,
      },
      {
        equipment_id: 6002,
        cn_name: '挑战者纹章',
        en_name: "Thief's Gloves",
        items_id: 28,
        season_equip_id: 6002,
      },
      {
        equipment_id: 6003,
        cn_name: '黑魔法师纹章',
        en_name: "Thief's Gloves",
        items_id: 38,
        season_equip_id: 6003,
      },
      {
        equipment_id: 6004,
        cn_name: '战斗学院纹章',
        en_name: "Thief's Gloves",
        items_id: 48,
        season_equip_id: 6004,
      },
      {
        equipment_id: 6005,
        cn_name: '辛迪加纹章',
        en_name: "Thief's Gloves",
        items_id: 68,
        season_equip_id: 6005,
      },
      {
        equipment_id: 6006,
        cn_name: '变异战士纹章',
        en_name: "Thief's Gloves",
        items_id: 2190,
        season_equip_id: 6006,
      },
      {
        equipment_id: 6007,
        cn_name: '炼金科技纹章',
        en_name: "Thief's Gloves",
        items_id: 78,
        season_equip_id: 6007,
      },
      {
        equipment_id: 6008,
        cn_name: '刺客纹章',
        en_name: "Thief's Gloves",
        items_id: 89,
        season_equip_id: 6008,
      },
      {
        equipment_id: 412,
        cn_name: '生命盔甲',
        en_name: '',
        items_id: 9001,
        season_equip_id: 412,
      },
      {
        equipment_id: 413,
        cn_name: '死亡之蔑',
        en_name: '',
        items_id: 9002,
        season_equip_id: 413,
      },
      {
        equipment_id: 414,
        cn_name: '魔蕴',
        en_name: '',
        items_id: 9003,
        season_equip_id: 414,
      },
      {
        equipment_id: 415,
        cn_name: '无尽之力',
        en_name: '',
        items_id: 9004,
        season_equip_id: 415,
      },
      {
        equipment_id: 416,
        cn_name: '永恒凛冬',
        en_name: '',
        items_id: 9005,
        season_equip_id: 416,
      },
      {
        equipment_id: 417,
        cn_name: '黑曜石切割者',
        en_name: '',
        items_id: 9006,
        season_equip_id: 417,
      },
      {
        equipment_id: 418,
        cn_name: '兰顿之圣所',
        en_name: '',
        items_id: 9007,
        season_equip_id: 418,
      },
      {
        equipment_id: 419,
        cn_name: '火箭助推铁拳',
        en_name: '',
        items_id: 9008,
        season_equip_id: 419,
      },
      {
        equipment_id: 420,
        cn_name: '金币收集者',
        en_name: '',
        items_id: 9009,
        season_equip_id: 420,
      },
      {
        equipment_id: 421,
        cn_name: '中娅悖论',
        en_name: '',
        items_id: 9010,
        season_equip_id: 421,
      },
      {
        equipment_id: 6011,
        cn_name: '保镖纹章',
        en_name: '',
        items_id: 58,
        season_equip_id: 6011,
      },
      {
        equipment_id: 6012,
        cn_name: '格斗家纹章',
        en_name: '',
        items_id: 2197,
        season_equip_id: 6012,
      },
      {
        equipment_id: 6013,
        cn_name: '精密发条纹章',
        en_name: '',
        items_id: 2191,
        season_equip_id: 6013,
      },
      {
        equipment_id: 6014,
        cn_name: '执法官纹章',
        en_name: '',
        items_id: 2194,
        season_equip_id: 6014,
      },
      {
        equipment_id: 6015,
        cn_name: '发明家纹章',
        en_name: '',
        items_id: 2198,
        season_equip_id: 6015,
      },
      {
        equipment_id: 6016,
        cn_name: '赏金猎人纹章',
        en_name: '',
        items_id: 2192,
        season_equip_id: 6016,
      },
      {
        equipment_id: 6017,
        cn_name: '圣盾使纹章',
        en_name: '',
        items_id: 2196,
        season_equip_id: 6017,
      },
      {
        equipment_id: 6018,
        cn_name: '学者纹章',
        en_name: '',
        items_id: 2200,
        season_equip_id: 6018,
      },
      {
        equipment_id: 6019,
        cn_name: '极客纹章',
        en_name: '',
        items_id: 2195,
        season_equip_id: 6019,
      },
      {
        equipment_id: 6020,
        cn_name: '社交名流纹章',
        en_name: '',
        items_id: 2193,
        season_equip_id: 6020,
      },
      {
        equipment_id: 6021,
        cn_name: '狙神纹章',
        en_name: '',
        items_id: 2199,
        season_equip_id: 6021,
      },
      {
        equipment_id: 6022,
        cn_name: '夜之锋刃',
        en_name: '',
        items_id: 15,
        season_equip_id: 6022,
      },
      {
        equipment_id: 6023,
        cn_name: '强袭战士纹章',
        en_name: '',
        items_id: 18,
        season_equip_id: 6023,
      },
      {
        equipment_id: 6024,
        cn_name: '海克斯科技纹章',
        en_name: '',
        items_id: 48,
        season_equip_id: 6024,
      },
      {
        equipment_id: 6025,
        cn_name: '执事纹章',
        en_name: '',
        items_id: 58,
        season_equip_id: 6025,
      },
    ],
    s5: [
      {
        equipment_id: 301,
        cn_name: '暴风大剑',
        en_name: 'B.F. Sword',
        items_id: 1,
        season_equip_id: 501,
      },
      {
        equipment_id: 302,
        cn_name: '反曲之弓',
        en_name: 'Recurve Bow',
        items_id: 2,
        season_equip_id: 502,
      },
      {
        equipment_id: 303,
        cn_name: '无用大棒',
        en_name: 'Needlessly Large Rod',
        items_id: 3,
        season_equip_id: 503,
      },
      {
        equipment_id: 304,
        cn_name: '女神之泪',
        en_name: 'Tear of the Goddess',
        items_id: 4,
        season_equip_id: 504,
      },
      {
        equipment_id: 305,
        cn_name: '锁子甲',
        en_name: 'Chain Vest',
        items_id: 5,
        season_equip_id: 505,
      },
      {
        equipment_id: 306,
        cn_name: '负极斗篷',
        en_name: 'Negatron Cloak',
        items_id: 6,
        season_equip_id: 506,
      },
      {
        equipment_id: 307,
        cn_name: '巨人腰带',
        en_name: "Giant's Belt",
        items_id: 7,
        season_equip_id: 507,
      },
      {
        equipment_id: 308,
        cn_name: '金铲铲',
        en_name: 'Spatula',
        items_id: 8,
        season_equip_id: 508,
      },
      {
        equipment_id: 309,
        cn_name: '拳套',
        en_name: 'Sparring Gloves',
        items_id: 9,
        season_equip_id: 509,
      },
      {
        equipment_id: 310,
        cn_name: '死亡之刃',
        en_name: 'Deathblade',
        items_id: 11,
        season_equip_id: 519,
      },
      {
        equipment_id: 311,
        cn_name: '巨人杀手',
        en_name: 'Giant Slayer',
        items_id: 12,
        season_equip_id: 521,
      },
      {
        equipment_id: 312,
        cn_name: '海克斯科技枪',
        en_name: 'Hextech Gunblade',
        items_id: 13,
        season_equip_id: 523,
      },
      {
        equipment_id: 313,
        cn_name: '朔极之矛',
        en_name: 'Spear of Shojin',
        items_id: 14,
        season_equip_id: 525,
      },
      {
        equipment_id: 314,
        cn_name: '守护天使',
        en_name: 'Guardian Angel',
        items_id: 15,
        season_equip_id: 527,
      },
      {
        equipment_id: 315,
        cn_name: '饮血剑',
        en_name: 'Bloodthirster',
        items_id: 16,
        season_equip_id: 529,
      },
      {
        equipment_id: 316,
        cn_name: '基克的先驱',
        en_name: "Zeke's Herald",
        items_id: 17,
        season_equip_id: 531,
      },
      {
        equipment_id: 318,
        cn_name: '无尽之刃',
        en_name: 'Infinity Edge',
        items_id: 19,
        season_equip_id: 535,
      },
      {
        equipment_id: 319,
        cn_name: '疾射火炮',
        en_name: 'Rapid Firecannon',
        items_id: 22,
        season_equip_id: 537,
      },
      {
        equipment_id: 320,
        cn_name: '鬼索的狂暴之刃',
        en_name: "Guinsoo's Rageblade",
        items_id: 23,
        season_equip_id: 539,
      },
      {
        equipment_id: 321,
        cn_name: '斯塔缇克电刃',
        en_name: 'Statikk Shiv',
        items_id: 24,
        season_equip_id: 541,
      },
      {
        equipment_id: 354,
        cn_name: '泰坦的坚决',
        en_name: "Titan's Resolve",
        items_id: 25,
        season_equip_id: 543,
      },
      {
        equipment_id: 322,
        cn_name: '卢安娜的飓风',
        en_name: "Runaan's Hurricane",
        items_id: 26,
        season_equip_id: 545,
      },
      {
        equipment_id: 323,
        cn_name: '兹若特传送门',
        en_name: "Zz'Rot Portal",
        items_id: 27,
        season_equip_id: 547,
      },
      {
        equipment_id: 325,
        cn_name: '最后的轻语',
        en_name: 'Last Whisper',
        items_id: 29,
        season_equip_id: 551,
      },
      {
        equipment_id: 326,
        cn_name: '灭世者的死亡之帽',
        en_name: "Rabadon's Deathcap",
        items_id: 33,
        season_equip_id: 553,
      },
      {
        equipment_id: 328,
        cn_name: '钢铁烈阳之匣',
        en_name: 'Locket of the Iron Solari',
        items_id: 35,
        season_equip_id: 557,
      },
      {
        equipment_id: 329,
        cn_name: '离子火花',
        en_name: 'Ionic Spark',
        items_id: 36,
        season_equip_id: 559,
      },
      {
        equipment_id: 330,
        cn_name: '莫雷洛秘典',
        en_name: 'Morellonomicon',
        items_id: 37,
        season_equip_id: 561,
      },
      {
        equipment_id: 332,
        cn_name: '珠光护手',
        en_name: 'Jeweled Gauntlet',
        items_id: 39,
        season_equip_id: 565,
      },
      {
        equipment_id: 334,
        cn_name: '冰霜之心',
        en_name: 'Frozen Heart',
        items_id: 45,
        season_equip_id: 569,
      },
      {
        equipment_id: 335,
        cn_name: '能量圣杯',
        en_name: 'Chalice of Favor',
        items_id: 46,
        season_equip_id: 571,
      },
      {
        equipment_id: 336,
        cn_name: '救赎',
        en_name: 'Redemption',
        items_id: 47,
        season_equip_id: 573,
      },
      {
        equipment_id: 338,
        cn_name: '正义之手',
        en_name: 'Hand Of Justice',
        items_id: 49,
        season_equip_id: 577,
      },
      {
        equipment_id: 339,
        cn_name: '棘刺背心',
        en_name: 'Bramble Vest',
        items_id: 55,
        season_equip_id: 579,
      },
      {
        equipment_id: 410,
        cn_name: '石像鬼板甲',
        en_name: 'Gargoyle Stoneplate',
        items_id: 56,
        season_equip_id: 581,
      },
      {
        equipment_id: 409,
        cn_name: '日炎斗篷',
        en_name: 'Sunfire Cape',
        items_id: 57,
        season_equip_id: 583,
      },
      {
        equipment_id: 343,
        cn_name: '静止法衣',
        en_name: 'Shroud of Stillness',
        items_id: 59,
        season_equip_id: 587,
      },
      {
        equipment_id: 344,
        cn_name: '巨龙之爪',
        en_name: "Dragon's Claw",
        items_id: 66,
        season_equip_id: 589,
      },
      {
        equipment_id: 345,
        cn_name: '灵风',
        en_name: 'Zephyr',
        items_id: 67,
        season_equip_id: 591,
      },
      {
        equipment_id: 347,
        cn_name: '水银',
        en_name: 'Quicksilver',
        items_id: 69,
        season_equip_id: 595,
      },
      {
        equipment_id: 348,
        cn_name: '狂徒铠甲',
        en_name: "Warmog's Armor",
        items_id: 77,
        season_equip_id: 597,
      },
      {
        equipment_id: 350,
        cn_name: '伏击之爪',
        en_name: 'Trap Claw',
        items_id: 79,
        season_equip_id: 601,
      },
      {
        equipment_id: 351,
        cn_name: '自然之力',
        en_name: 'Force of Nature',
        items_id: 88,
        season_equip_id: 603,
      },
      {
        equipment_id: 353,
        cn_name: '窃贼手套',
        en_name: "Thief's Gloves",
        items_id: 99,
        season_equip_id: 607,
      },
      {
        equipment_id: 356,
        cn_name: '蓝霸符',
        en_name: 'Blue Buff',
        items_id: 44,
        season_equip_id: 567,
      },
      {
        equipment_id: 412,
        cn_name: '生命盔甲',
        en_name: '',
        items_id: 9001,
        season_equip_id: 412,
      },
      {
        equipment_id: 413,
        cn_name: '死亡之蔑',
        en_name: '',
        items_id: 9002,
        season_equip_id: 413,
      },
      {
        equipment_id: 414,
        cn_name: '魔蕴',
        en_name: '',
        items_id: 9003,
        season_equip_id: 414,
      },
      {
        equipment_id: 415,
        cn_name: '无尽之力',
        en_name: '',
        items_id: 9004,
        season_equip_id: 415,
      },
      {
        equipment_id: 416,
        cn_name: '永恒凛冬',
        en_name: '',
        items_id: 9005,
        season_equip_id: 416,
      },
      {
        equipment_id: 417,
        cn_name: '黑曜石切割者',
        en_name: '',
        items_id: 9006,
        season_equip_id: 417,
      },
      {
        equipment_id: 418,
        cn_name: '兰顿之圣所',
        en_name: '',
        items_id: 9007,
        season_equip_id: 418,
      },
      {
        equipment_id: 419,
        cn_name: '火箭助推铁拳',
        en_name: '',
        items_id: 9008,
        season_equip_id: 419,
      },
      {
        equipment_id: 420,
        cn_name: '金币收集者',
        en_name: '',
        items_id: 9009,
        season_equip_id: 420,
      },
      {
        equipment_id: 421,
        cn_name: '中娅悖论',
        en_name: '',
        items_id: 9010,
        season_equip_id: 421,
      },
      {
        equipment_id: 510,
        cn_name: '暗影大剑',
        en_name: '',
        items_id: 1001,
        season_equip_id: 510,
      },
      {
        equipment_id: 511,
        cn_name: '暗影之弓',
        en_name: '',
        items_id: 1002,
        season_equip_id: 511,
      },
      {
        equipment_id: 512,
        cn_name: '暗影大棒',
        en_name: '',
        items_id: 1003,
        season_equip_id: 512,
      },
      {
        equipment_id: 513,
        cn_name: '暗影之泪',
        en_name: '',
        items_id: 1004,
        season_equip_id: 513,
      },
      {
        equipment_id: 514,
        cn_name: '暗影锁子甲',
        en_name: '',
        items_id: 1005,
        season_equip_id: 514,
      },
      {
        equipment_id: 515,
        cn_name: '暗影斗篷',
        en_name: '',
        items_id: 1006,
        season_equip_id: 515,
      },
      {
        equipment_id: 516,
        cn_name: '暗影腰带',
        en_name: '',
        items_id: 1007,
        season_equip_id: 516,
      },
      {
        equipment_id: 517,
        cn_name: '暗影金铲铲',
        en_name: '',
        items_id: 1008,
        season_equip_id: 517,
      },
      {
        equipment_id: 518,
        cn_name: '暗影拳套',
        en_name: '',
        items_id: 1009,
        season_equip_id: 518,
      },
      {
        equipment_id: 520,
        cn_name: '腐蚀死亡之刃',
        en_name: '',
        items_id: 1011,
        season_equip_id: 520,
      },
      {
        equipment_id: 522,
        cn_name: '邪恶巨人杀手',
        en_name: '',
        items_id: 1012,
        season_equip_id: 522,
      },
      {
        equipment_id: 524,
        cn_name: '不朽海克斯科技枪刃',
        en_name: '',
        items_id: 1013,
        season_equip_id: 524,
      },
      {
        equipment_id: 526,
        cn_name: '幽影朔极之矛',
        en_name: '',
        items_id: 1014,
        season_equip_id: 526,
      },
      {
        equipment_id: 528,
        cn_name: '守护堕落天使',
        en_name: '',
        items_id: 1015,
        season_equip_id: 528,
      },
      {
        equipment_id: 530,
        cn_name: '饮险剑',
        en_name: '',
        items_id: 1016,
        season_equip_id: 530,
      },
      {
        equipment_id: 532,
        cn_name: '基克的阴森先驱',
        en_name: '',
        items_id: 1017,
        season_equip_id: 532,
      },
      {
        equipment_id: 536,
        cn_name: '黑暗无尽之刃',
        en_name: '',
        items_id: 1019,
        season_equip_id: 536,
      },
      {
        equipment_id: 538,
        cn_name: '疾射死亡火炮',
        en_name: '',
        items_id: 1022,
        season_equip_id: 538,
      },
      {
        equipment_id: 540,
        cn_name: '鬼索的祭祀狂暴之刃',
        en_name: '',
        items_id: 1023,
        season_equip_id: 540,
      },
      {
        equipment_id: 542,
        cn_name: '斯塔缇克电刺',
        en_name: '',
        items_id: 1024,
        season_equip_id: 542,
      },
      {
        equipment_id: 544,
        cn_name: '泰坦的复仇',
        en_name: '',
        items_id: 1025,
        season_equip_id: 544,
      },
      {
        equipment_id: 546,
        cn_name: '卢安娜的不驯飓风',
        en_name: '',
        items_id: 1026,
        season_equip_id: 546,
      },
      {
        equipment_id: 548,
        cn_name: '动荡兹若特传送门',
        en_name: '',
        items_id: 1027,
        season_equip_id: 548,
      },
      {
        equipment_id: 552,
        cn_name: '最终的轻语',
        en_name: '',
        items_id: 1029,
        season_equip_id: 552,
      },
      {
        equipment_id: 554,
        cn_name: '灭世者的腐蚀死亡之帽',
        en_name: '',
        items_id: 1033,
        season_equip_id: 554,
      },
      {
        equipment_id: 555,
        cn_name: '大天使之杖',
        en_name: '',
        items_id: 34,
        season_equip_id: 555,
      },
      {
        equipment_id: 556,
        cn_name: '不朽大恶魔之杖',
        en_name: '',
        items_id: 1034,
        season_equip_id: 556,
      },
      {
        equipment_id: 558,
        cn_name: '白银皎月之匣',
        en_name: '',
        items_id: 1035,
        season_equip_id: 558,
      },
      {
        equipment_id: 560,
        cn_name: '离子黑暗火花',
        en_name: '',
        items_id: 1036,
        season_equip_id: 560,
      },
      {
        equipment_id: 562,
        cn_name: '莫雷洛邪典',
        en_name: '',
        items_id: 1037,
        season_equip_id: 562,
      },
      {
        equipment_id: 566,
        cn_name: '祭祀拳套',
        en_name: '',
        items_id: 1039,
        season_equip_id: 566,
      },
      {
        equipment_id: 568,
        cn_name: '极暗蓝霸符',
        en_name: '',
        items_id: 1044,
        season_equip_id: 568,
      },
      {
        equipment_id: 570,
        cn_name: '冰霜黑暗之心',
        en_name: '',
        items_id: 1045,
        season_equip_id: 570,
      },
      {
        equipment_id: 572,
        cn_name: '恶意圣杯',
        en_name: '',
        items_id: 1046,
        season_equip_id: 572,
      },
      {
        equipment_id: 574,
        cn_name: '祭仪救赎',
        en_name: '',
        items_id: 1047,
        season_equip_id: 574,
      },
      {
        equipment_id: 578,
        cn_name: '复仇之手',
        en_name: '',
        items_id: 1049,
        season_equip_id: 578,
      },
      {
        equipment_id: 580,
        cn_name: '折光棘刺背心',
        en_name: '',
        items_id: 1055,
        season_equip_id: 580,
      },
      {
        equipment_id: 582,
        cn_name: '不朽石像鬼石板甲',
        en_name: '',
        items_id: 1056,
        season_equip_id: 582,
      },
      {
        equipment_id: 584,
        cn_name: '星蚀斗篷',
        en_name: '',
        items_id: 1057,
        season_equip_id: 584,
      },
      {
        equipment_id: 588,
        cn_name: '黑暗静止法衣',
        en_name: '',
        items_id: 1059,
        season_equip_id: 588,
      },
      {
        equipment_id: 590,
        cn_name: '折光巨龙之爪',
        en_name: '',
        items_id: 1066,
        season_equip_id: 590,
      },
      {
        equipment_id: 592,
        cn_name: '狂乱灵风',
        en_name: '',
        items_id: 1067,
        season_equip_id: 592,
      },
      {
        equipment_id: 596,
        cn_name: '腐蚀水银',
        en_name: '',
        items_id: 1069,
        season_equip_id: 596,
      },
      {
        equipment_id: 598,
        cn_name: '狂徒的祭仪铠甲',
        en_name: '',
        items_id: 1077,
        season_equip_id: 598,
      },
      {
        equipment_id: 602,
        cn_name: '复仇陷阱之爪',
        en_name: '',
        items_id: 1079,
        season_equip_id: 602,
      },
      {
        equipment_id: 604,
        cn_name: '黑暗之力',
        en_name: '',
        items_id: 1088,
        season_equip_id: 604,
      },
      {
        equipment_id: 608,
        cn_name: '诡术拳套',
        en_name: '',
        items_id: 1099,
        season_equip_id: 608,
      },
      {
        equipment_id: 533,
        cn_name: '神盾战士纹章',
        en_name: '',
        items_id: 18,
        season_equip_id: 533,
      },
      {
        equipment_id: 563,
        cn_name: '法师纹章',
        en_name: '',
        items_id: 38,
        season_equip_id: 563,
      },
      {
        equipment_id: 575,
        cn_name: '复苏者纹章',
        en_name: '',
        items_id: 48,
        season_equip_id: 575,
      },
      {
        equipment_id: 593,
        cn_name: '圣光卫士纹章',
        en_name: '',
        items_id: 68,
        season_equip_id: 593,
      },
      {
        equipment_id: 599,
        cn_name: '黎明使者纹章',
        en_name: '',
        items_id: 78,
        season_equip_id: 599,
      },
      {
        equipment_id: 605,
        cn_name: '刺客纹章',
        en_name: '',
        items_id: 89,
        season_equip_id: 605,
      },
      {
        equipment_id: 609,
        cn_name: '游侠纹章',
        en_name: '',
        items_id: 1190,
        season_equip_id: 609,
      },
      {
        equipment_id: 610,
        cn_name: '斗士纹章',
        en_name: '',
        items_id: 1193,
        season_equip_id: 610,
      },
      {
        equipment_id: 611,
        cn_name: '龙族纹章',
        en_name: '',
        items_id: 1191,
        season_equip_id: 611,
      },
      {
        equipment_id: 612,
        cn_name: '强袭炮手纹章',
        en_name: '',
        items_id: 1195,
        season_equip_id: 612,
      },
      {
        equipment_id: 613,
        cn_name: '秘术师纹章',
        en_name: '',
        items_id: 1197,
        season_equip_id: 613,
      },
      {
        equipment_id: 614,
        cn_name: '光明哨兵纹章',
        en_name: '',
        items_id: 1194,
        season_equip_id: 614,
      },
      {
        equipment_id: 615,
        cn_name: '骑士纹章',
        en_name: '',
        items_id: 1196,
        season_equip_id: 615,
      },
      {
        equipment_id: 616,
        cn_name: '神谕者纹章',
        en_name: '',
        items_id: 1192,
        season_equip_id: 616,
      },
      {
        equipment_id: 617,
        cn_name: '破败军团纹章',
        en_name: '',
        items_id: 1118,
        season_equip_id: 617,
      },
      {
        equipment_id: 618,
        cn_name: '复生亡魂纹章',
        en_name: '',
        items_id: 1168,
        season_equip_id: 618,
      },
      {
        equipment_id: 619,
        cn_name: '黑夜使者纹章',
        en_name: '',
        items_id: 1178,
        season_equip_id: 619,
      },
      {
        equipment_id: 606,
        cn_name: '丧尸纹章',
        en_name: '',
        items_id: 1189,
        season_equip_id: 620,
      },
      {
        equipment_id: 621,
        cn_name: '征服者纹章',
        en_name: '',
        items_id: 28,
        season_equip_id: 621,
      },
      {
        equipment_id: 622,
        cn_name: '铁甲卫士纹章',
        en_name: '',
        items_id: 58,
        season_equip_id: 622,
      },
      {
        equipment_id: 623,
        cn_name: '小恶魔纹章',
        en_name: '',
        items_id: 1128,
        season_equip_id: 623,
      },
      {
        equipment_id: 624,
        cn_name: '重骑兵纹章',
        en_name: '',
        items_id: 1158,
        season_equip_id: 624,
      },
      {
        equipment_id: 5001,
        cn_name: '光辉之刃',
        en_name: '',
        items_id: 2011,
        season_equip_id: 5001,
      },
      {
        equipment_id: 5002,
        cn_name: '恶魔杀手',
        en_name: '',
        items_id: 2012,
        season_equip_id: 5002,
      },
      {
        equipment_id: 5003,
        cn_name: '海克斯科技生命之刃',
        en_name: '',
        items_id: 2013,
        season_equip_id: 5003,
      },
      {
        equipment_id: 5004,
        cn_name: '希拉娜之矛',
        en_name: '',
        items_id: 2014,
        season_equip_id: 5004,
      },
      {
        equipment_id: 5005,
        cn_name: '守护大天使',
        en_name: '',
        items_id: 2015,
        season_equip_id: 5005,
      },
      {
        equipment_id: 5006,
        cn_name: '福佑饮血剑',
        en_name: '',
        items_id: 2016,
        season_equip_id: 5006,
      },
      {
        equipment_id: 5007,
        cn_name: '基克的调和',
        en_name: '',
        items_id: 2017,
        season_equip_id: 5007,
      },
      {
        equipment_id: 5008,
        cn_name: '天顶锋刃',
        en_name: '',
        items_id: 2019,
        season_equip_id: 5008,
      },
      {
        equipment_id: 5009,
        cn_name: '疾射光明火炮',
        en_name: '',
        items_id: 2022,
        season_equip_id: 5009,
      },
      {
        equipment_id: 5010,
        cn_name: '鬼索的清算',
        en_name: '',
        items_id: 2023,
        season_equip_id: 5010,
      },
      {
        equipment_id: 5011,
        cn_name: '斯塔缇克狂热',
        en_name: '',
        items_id: 2024,
        season_equip_id: 5011,
      },
      {
        equipment_id: 5012,
        cn_name: '泰坦的誓言',
        en_name: '',
        items_id: 2025,
        season_equip_id: 5012,
      },
      {
        equipment_id: 5013,
        cn_name: '卢安娜的风暴',
        en_name: '',
        items_id: 2026,
        season_equip_id: 5013,
      },
      {
        equipment_id: 5014,
        cn_name: '兹若特的干涉',
        en_name: '',
        items_id: 2027,
        season_equip_id: 5014,
      },
      {
        equipment_id: 5015,
        cn_name: '永恒轻语',
        en_name: '',
        items_id: 2029,
        season_equip_id: 5015,
      },
      {
        equipment_id: 5016,
        cn_name: '灭世者的飞升之帽',
        en_name: '',
        items_id: 2033,
        season_equip_id: 5016,
      },
      {
        equipment_id: 5017,
        cn_name: '阿福天使之杖',
        en_name: '',
        items_id: 2034,
        season_equip_id: 5017,
      },
      {
        equipment_id: 5018,
        cn_name: '巨神主峰之匣',
        en_name: '',
        items_id: 2035,
        season_equip_id: 5018,
      },
      {
        equipment_id: 5019,
        cn_name: '神圣离子火花',
        en_name: '',
        items_id: 2036,
        season_equip_id: 5019,
      },
      {
        equipment_id: 5020,
        cn_name: '莫雷洛圣典',
        en_name: '',
        items_id: 2037,
        season_equip_id: 5020,
      },
      {
        equipment_id: 5021,
        cn_name: '圣洁珠光护手',
        en_name: '',
        items_id: 2039,
        season_equip_id: 5021,
      },
      {
        equipment_id: 5022,
        cn_name: '圣蓝祝福',
        en_name: '',
        items_id: 2044,
        season_equip_id: 5022,
      },
      {
        equipment_id: 5023,
        cn_name: '圣金冰霜之心',
        en_name: '',
        items_id: 2045,
        season_equip_id: 5023,
      },
      {
        equipment_id: 5024,
        cn_name: '济世圣杯',
        en_name: '',
        items_id: 2046,
        season_equip_id: 5024,
      },
      {
        equipment_id: 5025,
        cn_name: '光明救赎',
        en_name: '',
        items_id: 2047,
        season_equip_id: 5025,
      },
      {
        equipment_id: 5026,
        cn_name: '绝对正义之拳',
        en_name: '',
        items_id: 2049,
        season_equip_id: 5026,
      },
      {
        equipment_id: 5027,
        cn_name: '瑰刺背心',
        en_name: '',
        items_id: 2055,
        season_equip_id: 5027,
      },
      {
        equipment_id: 5028,
        cn_name: '天神石板甲',
        en_name: '',
        items_id: 2056,
        season_equip_id: 5028,
      },
      {
        equipment_id: 5029,
        cn_name: '日光斗篷',
        en_name: '',
        items_id: 2057,
        season_equip_id: 5029,
      },
      {
        equipment_id: 5030,
        cn_name: '崇敬法衣',
        en_name: '',
        items_id: 2059,
        season_equip_id: 5030,
      },
      {
        equipment_id: 5031,
        cn_name: '女妖之爪',
        en_name: '',
        items_id: 2066,
        season_equip_id: 5031,
      },
      {
        equipment_id: 5032,
        cn_name: '寒风',
        en_name: '',
        items_id: 2067,
        season_equip_id: 5032,
      },
      {
        equipment_id: 5033,
        cn_name: '至速水银',
        en_name: '',
        items_id: 2069,
        season_equip_id: 5033,
      },
      {
        equipment_id: 5034,
        cn_name: '狂徒之傲',
        en_name: '',
        items_id: 2077,
        season_equip_id: 5034,
      },
      {
        equipment_id: 5035,
        cn_name: '女妖之沉默',
        en_name: '',
        items_id: 2079,
        season_equip_id: 5035,
      },
      {
        equipment_id: 5036,
        cn_name: '侠盗拳套',
        en_name: '',
        items_id: 2099,
        season_equip_id: 5036,
      },
    ],
  }
  const baseEquip = [
    '501',
    '502',
    '503',
    '504',
    '505',
    '506',
    '507',
    '508',
    '509',
  ]
  // make axios request from ulrArr
  const fetchAll = async () => {
    try {
      const res = await Promise.all([
        axios.get(`${baseUrl}${ulrArr[0]}?v=2757894`),
        axios.get(`${baseUrl}${ulrArr[1]}?v=2757894`),
        axios.get(`${baseUrl}${ulrArr[2]}?v=2757894`),
        axios.get(`${baseUrl}${ulrArr[3]}?v=2757894`),
        axios.get(
          `https://game.gtimg.cn/images/lol/act/img/tft/js/hex.js?v=9192538`
        ),
      ])
      const data = res.map((res) => res.data)
      // console.log(data.flat())
      const equipIdArr = ProcessEquipData(
        data[3].data,
        s6equip.s6,
        baseEquip
      ).reduce((acc, cur) => {
        acc.push(cur.equipId)
        return acc
      }, [] as string[])
      const leftOut = s6equip.s6.reduce((acc, cur) => {
        if (!equipIdArr.includes(`${cur.season_equip_id}`)) {
          acc.push(`${cur.season_equip_id}`)
        }
        return acc
      }, [] as string[])
      return {
        chessData: ProcessChessData(data[0].data),
        raceData: ProcessRawJobRaceData(data[1].data),
        jobData: ProcessRawJobRaceData(data[2].data),
        equipData: ProcessEquipData(data[3].data, s6equip.s6, baseEquip),
        hexData: ProcessHexData(data[4]),
      }
    } catch {
      throw Error('Promise failed')
    }
  }

  const data = await fetchAll()

  return data
}

// equipment_data: {
//   's7': '//game.gtimg.cn/images/lol/act/img/tft/js/equip.js?v=' + (Date.now() / 600000 >> 0),
//   // 's7': '//game.gtimg.cn/images/lol/act/img/tft/js/12.11-2022.S7/equip.js?v=' + (Date.now() / 600000 >> 0),
//   's6': '//game.gtimg.cn/images/lol/act/img/tft/js/12.4-2022.S6/equip.js?v=' + (Date.now() / 600000 >> 0),
//   's6': '//game.gtimg.cn/images/lol/act/img/tft/js/11.22-2021.S6/equip.js?v=' + (Date.now() / 600000 >> 0),
//   's5': '//game.gtimg.cn/images/lol/act/img/tft/js/11.15-2021.S5/equip.js?v=' + (Date.now() / 600000 >> 0),
//   's4': '//game.gtimg.cn/images/lol/act/img/tft/js/11.8-2021.S4/equip.js',
//   's3': '//game.gtimg.cn/images/lol/act/img/tft/js/10.18-2020.S3/equip.js',
//   's2': '//game.gtimg.cn/images/lol/act/img/tft/js/10.5-2020.S2/equip.js',
//   's1': '//game.gtimg.cn/images/lol/act/img/tft/js/9.21-2019.S1/equip.js'

// https://lol.qq.com/act/a20200224tft/staticJS-vue3/TFTEquipMap.json?v=2757896
