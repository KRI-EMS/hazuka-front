// 制作中止、画像アニメーション作成時再開or参考に

import BuildingViewer from "@/components/mainsite/building-viewer";
import { ComparisonByFloor } from "@/components/mainsite/floor-compared";

export default function Sl03() {
  return (
    <div className="relative flex-grow flex flex-row items-center justify-between gap-6">
      <div className="max-w-lg">
        <ComparisonByFloor />
        <div className="w-[470px] bg-white border rounded-lg shadow p-4 mt-4">
          <div className="text-sm font-medium text-muted-foreground">
            各階の割合に基づく内訳
          </div>
          <div className="text-2xl font-bold mt-1">42,710 kWh</div>
          <div className="text-xs text-muted-foreground mt-1">
            構造サンプル（変更可）
          </div>
        </div>
      </div>

      <div className="flex-grow h-full">
        <BuildingViewer />
      </div>
    </div>
  );
}
