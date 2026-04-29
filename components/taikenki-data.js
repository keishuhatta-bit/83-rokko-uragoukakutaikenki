/**
 * taikenki-data.js
 * 体験記データの一元管理ファイル
 * 人物を追加・編集するときはこのファイルだけ触ればOK
 */

export const TAIKENKI_DATA = [
  {
    id:       'k.n',
    initials: 'K.N',
    univ:     '熊本大学 医学部 医学科',
    type:     ['genshiyaku', 'rikei'],
    comment:  '熊本で待ってんで。',
    year:     '現役合格',
  },
  {
    id:       't.t1',
    initials: 'T.T',
    univ:     '大阪大学 医学部 医学科',
    type:     ['genshiyaku', 'rikei'],
    comment:  '阪医合格体験記',
    year:     '現役合格',
  },
  {
    id:       'mn',
    initials: 'M.N',
    univ:     '大阪大学 医学部',
    type:     ['genshiyaku', 'rikei'],
    comment:  '医学部は特別じゃない。毎日コツコツと積み上げた人が合格する、それだけです。',
    year:     '現役合格',
  },
  {
    id:       'ah',
    initials: 'A.H',
    univ:     '慶應義塾大学 法学部',
    type:     ['ronin', 'bunkei'],
    comment:  '私立文系は暗記勝負と思っていたけど、本質を理解することが一番の近道でした。',
    year:     '一浪合格',
  },
  {
    id:       'rk',
    initials: 'R.K',
    univ:     '早稲田大学 政治経済学部',
    type:     ['genshiyaku', 'bunkei'],
    comment:  '部活と勉強の両立は大変でしたが、時間の使い方を徹底的に工夫することで乗り越えました。',
    year:     '現役合格',
  },
  {
    id:       'to',
    initials: 'T.O',
    univ:     '東北大学 工学部',
    type:     ['genshiyaku', 'rikei'],
    comment:  '共通テストで失敗しても二次力があれば逆転できる。最後まで信じて走り続けてください。',
    year:     '現役合格',
  },
];