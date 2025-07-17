"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, TrendingUp, Activity, Flame, CloudRain, Wind, Users } from "lucide-react"

export default function FireRiskAnalysis() {
  // 模拟火险数据
  const dailyFireRisk = [
    { date: "06-01", value: 65, target: 50, day: "周六" },
    { date: "06-02", value: 72, target: 50, day: "周日" },
    { date: "06-03", value: 80, target: 50, day: "周一" },
    { date: "06-04", value: 78, target: 50, day: "周二" },
    { date: "06-05", value: 85, target: 50, day: "周三" },
    { date: "06-06", value: 92, target: 50, day: "周四" },
    { date: "06-07", value: 89, target: 50, day: "今日" },
  ]

  const equipmentStatus = [
    { name: "正常运行", value: 85, color: "bg-green-500", count: 24 },
    { name: "维护中", value: 10, color: "bg-yellow-500", count: 3 },
    { name: "故障停机", value: 5, color: "bg-red-500", count: 1 },
  ]

  const departmentPersonnel = [
    { name: "防火指挥部", count: 15, color: "bg-blue-500" },
    { name: "安全监测部", count: 12, color: "bg-green-500" },
    { name: "设备维护部", count: 18, color: "bg-yellow-500" },
    { name: "防火巡查队", count: 25, color: "bg-purple-500" },
  ]

  const maxPersonnel = Math.max(...departmentPersonnel.map((d) => d.count))

  return (
    <div className="space-y-6">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">89%</div>
              <div className="text-sm text-slate-300">今日火险指数</div>
              <div className="text-xs text-red-400 mt-1">↗ 较高风险</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">32°C</div>
              <div className="text-sm text-slate-300">平均气温</div>
              <div className="text-xs text-orange-400 mt-1">高温预警</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">28%</div>
              <div className="text-sm text-slate-300">平均湿度</div>
              <div className="text-xs text-yellow-400 mt-1">偏低</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-sm text-slate-300">今日火情</div>
              <div className="text-xs text-green-400 mt-1">安全</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 火险趋势图 */}
        <Card className="bg-slate-800 border-slate-700 card-compact">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-orange-300">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                <span>7日火险趋势</span>
              </div>
              <div className="text-sm text-slate-300">单位: %</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 chart-container">
              {/* 警戒线标注 */}
              <div className="flex justify-center mb-1">
                <div className="text-micro text-slate-300 flex items-center gap-1 bg-slate-700/50 px-2 py-0.5 rounded">
                  <span>警戒线:</span>
                  <span className="font-medium">50%</span>
                </div>
              </div>
              
              {/* 数值显示行 */}
              <div className="flex justify-between px-2">
                {dailyFireRisk.map((item, index) => {
                  const isToday = item.day === "今日"
                  
                  return (
                    <div key={`value-${index}`} className="w-10 text-center">
                      <div className={`text-micro ${isToday ? "text-orange-300 font-medium" : "text-slate-300"}`}>
                        {item.value}%
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* 调整后的柱状图 */}
              <div className="flex items-end justify-between h-36 bar-chart px-2">
                {dailyFireRisk.map((item, index) => {
                  const height = item.value
                  const isToday = item.day === "今日"
                  const isHighRisk = item.value >= 75
                  const isMediumRisk = item.value >= 50 && item.value < 75
                  
                  return (
                    <div key={index} className="flex flex-col items-center w-10">
                      {/* 柱子 */}
                      <div className="w-3 bg-slate-700 rounded-t bar" style={{ height: "100px" }}>
                        <div
                          className={`w-full rounded-t transition-all ${
                            isHighRisk ? "bg-red-400" : isMediumRisk ? "bg-orange-400" : "bg-green-400"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        
                        {/* 警戒线 */}
                        <div
                          className="absolute w-full border-t border-dashed border-red-500"
                          style={{ bottom: `${50}%` }}
                        />
                      </div>

                      {/* 只显示日期 */}
                      <div className="text-center mt-1">
                        <div className={`text-micro ${isToday ? "text-orange-300 font-medium" : "text-slate-300"}`}>
                          {item.date}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 图例 */}
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded"></div>
                  <span className="text-micro text-slate-300">低风险</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-orange-400 rounded"></div>
                  <span className="text-micro text-slate-300">中风险</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-400 rounded"></div>
                  <span className="text-micro text-slate-300">高风险</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-1 border-t border-dashed border-red-500"></div>
                  <span className="text-micro text-slate-300">警戒线</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 防火设备状态 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-300">
              <Activity className="w-5 h-5" />
              防火设备状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 总体运行率 */}
              <div className="text-center bg-slate-700/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">94.2%</div>
                <div className="text-sm text-slate-300">设备在线率</div>
              </div>

              {/* 状态分布 */}
              <div className="space-y-3">
                {equipmentStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-slate-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{item.count}台</div>
                      <div className="text-xs text-slate-300">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部辅助信息 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 防火力量分布 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
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

        {/* 防火安全状态 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-300">
              <Shield className="w-5 h-5" />
              防火安全状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 安全天数突出显示 */}
              <div className="text-center bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">143</div>
                <div className="text-sm text-green-300">无火灾天数</div>
              </div>

              {/* 其他安全指标 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center bg-slate-700/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-400">15</div>
                  <div className="text-xs text-slate-300">今日巡护次数</div>
                </div>
                <div className="text-center bg-slate-700/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-400">28</div>
                  <div className="text-xs text-slate-300">设备巡检</div>
                </div>
              </div>

              {/* 安全等级 */}
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center">
                <span className="text-green-400 font-medium">当前森林火险等级：高危</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
