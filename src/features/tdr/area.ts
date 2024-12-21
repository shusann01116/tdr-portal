import type { API_Facility } from "../official/types";
import { AREA_LIST } from "./const";
import type { Facility } from "./facility";

export interface Area {
  AreaID: string;
  AreaName: string;
}

const facilityIdAreaMap: Record<Area["AreaID"], API_Facility["FacilityID"][]> =
  {
    "1": ["151", "191", "908"], // ワールドバザール
    "2": ["152", "153", "154", "155", "156"], // アドベンチャーランド
    "3": ["157", "158", "159", "160", "161"], // ウエスタンランド
    "4": ["162", "163", "916", "917"], // クリッターカントリー
    "5": [
      "164",
      "165",
      "166",
      "167",
      "168",
      "169",
      "170",
      "171",
      "172",
      "173",
      "174",
      "197",
    ], // ファンタジーランド
    "6": ["175", "176", "178", "179", "180", "181", "194", "890", "909"], // トゥーンタウン
    "7": ["183", "189", "195", "196"], // トゥモローランド
    "8": ["219", "227", "228", "230", "244", "245"], // メディテレーニアンハーバー
    "9": ["218", "232", "233", "243", "246", "905"], // アメリカンウォーターフロント
    "10": ["231", "234", "247"], // ポートディスカバリー
    "11": ["222", "223", "242", "901", "902", "903", "904"], // ロストリバーデルタ
    "12": ["255", "256", "257", "258", "9000"], // ファンタジースプリングス
    "13": ["220", "226", "235", "236"], // アラビアンコースト
    "14": ["202", "221", "237", "238", "239", "240", "241"], // マーメイドラグーン
    "15": ["224"], // ミステリアスアイランド
  };

export const getAreaByFacilityId = (facilityId: string) => {
  return AREA_LIST.find((area) =>
    facilityIdAreaMap[area.AreaID].includes(facilityId),
  );
};

export const groupByArea = (
  facilities: Facility[],
): Record<string, Facility[]> => {
  return facilities.reduce(
    (acc, facility) => {
      const area = getAreaByFacilityId(facility.id) ?? {
        AreaID: "9999",
        AreaName: "その他",
      };

      acc[area.AreaID] = acc[area.AreaID] || [];
      acc[area.AreaID].push(facility);
      return acc;
    },
    {} as Record<string, Facility[]>,
  );
};
