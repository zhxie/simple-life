const TYPES_DICT: { [key: string]: string[] } = {
  gas: ['加油站', '其它能源站', '加气站', '充电站'],
  restaurant: ['中餐厅', '外国餐厅', '快餐厅', '休闲餐饮场所'],
  coffee: ['咖啡厅'],
  drink: ['茶艺馆', '冷饮店'],
  bakery: ['糕饼店', '甜品店'],
  plaza: ['商场'],
  cvs: ['便民商店/便利店'],
  supermarket: ['超级市场'],
  market: ['农副产品市场', '果品市场', '蔬菜市场', '水产海鲜市场'],
  hospital: ['综合医院'],
  pharmacy: ['综合医院', '药房'],
  subway: ['地铁站'],
  bus: ['公交车站'],
  bank: ['银行', '自动提款机']
};

const KEYWORDS_DICT: { [key: string]: string[] } = {
  kfc: ['KFC'],
  mc: ['麦当劳'],
  fastfood: ['KFC', '麦当劳', '汉堡王', '德克士'],
  drink: ['1点点', '茶百道', '古茗', '黑泷堂', '新时沏', '都可茶饮', '厝内小眷村', '蜜雪冰城', '喜茶', '小鹿茶'],
  coffee: ['星巴克', 'Costa', 'COSTACOFFEE', '瑞幸咖啡'],
  cvs: ['全家', '罗森', '7-ELEVEn', '喜士多', '十足', '华润万家便利店', 'Vango', '快客'],
  supermarket: ['沃尔玛', '世纪联华', '家乐福', '物美', '华润万家', 'Ole超市', 'blt supermarket'],
  market: ['盒马鲜生'],
  bank: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '招商银行']
};

class Types {
  static getType = (type: string) => {
    if (type in TYPES_DICT) {
      return TYPES_DICT[type];
    } else {
      return null;
    }
  };
}

class Keywords {
  static getKeyword = (keyword: string) => {
    if (keyword in KEYWORDS_DICT) {
      return KEYWORDS_DICT[keyword];
    } else {
      return null;
    }
  };
}

export { Types, Keywords };
