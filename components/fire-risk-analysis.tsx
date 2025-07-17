"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Flame } from "lucide-react"

export default function FireRiskAnalysis() {
  // 模拟火险数据
  const departmentPersonnel = [
    { name: "防火指挥部", count: 15, color: "bg-blue-500" },
    { name: "安全监测部", count: 12, color: "bg-green-500" },
    { name: "设备维护部", count: 18, color: "bg-yellow-500" },
    { name: "防火巡查队", count: 25, color: "bg-purple-500" },
  ]

  const maxPersonnel = Math.max(...departmentPersonnel.map((d) => d.count))

  // 模拟监测区域数据
  const monitoringAreas = [
    { name: "卡拉乡林区", risk: "高风险", riskColor: "text-red-400", points: 5 },
    { name: "瓦厂林区", risk: "高风险", riskColor: "text-red-400", points: 6 },
    { name: "博窝乡林区", risk: "中风险", riskColor: "text-yellow-400", points: 4 },
    { name: "彝海自然保护区", risk: "中风险", riskColor: "text-yellow-400", points: 7 },
  ]

  return (
    <div className="space-y-6">
      {/* 主要内容区域 - 调整为两栏布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 防火力量分布 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-300">
              <Users className="w-5 h-5" />
              防火力量分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentPersonnel.map((dept, index) => {
                const percentage = (dept.count / maxPersonnel) * 100
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${dept.color}`}></div>
                      <span className="text-slate-300 text-sm">{dept.name}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${dept.color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    </div>
                    <span className="text-white font-medium text-sm">{dept.count}人</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 text-center">
              <span className="text-slate-300 text-sm">总计人员：</span>
              <span className="text-blue-300 font-medium ml-2">70人</span>
            </div>
          </CardContent>
        </Card>

        {/* 森林防火重点区域监测 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-300">
              <Flame className="w-5 h-5" />
              森林防火重点区域监测
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {monitoringAreas.map((area, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-orange-400">{area.name}</div>
                  <div className={`mt-1 text-sm font-medium ${area.riskColor}`}>{area.risk}</div>
                  <div className="text-xs text-slate-300 mt-1">监控点: {area.points}个</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}