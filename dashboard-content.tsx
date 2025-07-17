"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Bell, 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Flame,
  CloudRain,
  Map,
  Trees,
  AlertTriangle,
  Eye,
  Camera,
  Zap,
  CheckCircle2,
  AlertCircle,
  WifiOff
} from "lucide-react"
import FireRiskAnalysis from "./components/fire-risk-analysis"
import ForestMap from "./components/forest-map"

export default function DashboardContent() {
  const alertItems = [
    { time: "10:30", status: "紧急", type: "danger", content: "卡拉乡发现明火点，需立即处理" },
    { time: "10:25", status: "高危", type: "danger", content: "博窝乡烟雾浓度超标，疑似初期火情" },
    { time: "10:20", status: "中危", type: "warning", content: "无人机热成像发现可疑热点" },
    { time: "10:15", status: "", type: "info", content: "水洛乡防火巡查任务已完成" },
    { time: "10:10", status: "高危", type: "danger", content: "卫星监测发现新增热点" },
    { time: "10:05", status: "中危", type: "warning", content: "屋斯乡红外监测异常，派出巡查队伍" },
  ]

  const monitoringStatus = [
    { name: "防火监控点", status: "running", progress: 95 },
    { name: "无人机巡航", status: "running", progress: 92 },
    { name: "卫星热点监测", status: "running", progress: 88 },
    { name: "地面传感器网络", status: "running", progress: 96 },
  ]

  // 设备状态数据
  const equipmentStatus = [
    { name: "正常运行", value: 85, color: "bg-green-500", textColor: "text-green-400", icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
    { name: "维护中", value: 10, color: "bg-yellow-500", textColor: "text-yellow-400", icon: <AlertCircle className="w-4 h-4 text-yellow-400" /> },
    { name: "故障停机", value: 5, color: "bg-red-500", textColor: "text-red-400", icon: <WifiOff className="w-4 h-4 text-red-400" /> },
  ]

  return (
    <div className="flex gap-4 p-4 bg-black">
      {/* Left Sidebar */}
      <div className="w-80 flex flex-col h-full justify-between">
        <div className="space-y-3">
          {/* Metrics Cards */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">防火监控覆盖面积</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">15,680</span>
                    <span className="text-sm text-gray-300">公顷</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+8.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                  <Map className="w-6 h-6 text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">火情监测设备在线率</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">98.5</span>
                    <span className="text-sm text-gray-300">%</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+1.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">防火应急人员</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">78</span>
                    <span className="text-sm text-gray-300">人</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <span>+12</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 防火设备状态卡片 */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Activity className="w-5 h-5" />
                防火设备状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 py-2">
              {/* 总体运行率 */}
              <div className="text-center bg-gray-800/30 rounded-lg p-2">
                <div className="text-xl font-bold text-green-400">94.2%</div>
                <div className="text-sm text-gray-300">设备在线率</div>
              </div>

              {/* 状态分布 */}
              <div className="space-y-2">
                {equipmentStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-1 bg-gray-800/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-gray-300 text-xs">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${item.textColor}`}>{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 防火安全状态卡片 */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Shield className="w-5 h-5" />
                防火安全状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 py-2">
              {/* 安全天数突出显示 */}
              <div className="text-center bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                <div className="text-xl font-bold text-green-400">143</div>
                <div className="text-sm text-green-300">无火灾天数</div>
              </div>

              {/* 其他安全指标 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center bg-gray-800/20 rounded-lg p-1">
                  <div className="text-lg font-bold text-green-400">15</div>
                  <div className="text-xs text-gray-300">今日巡护次数</div>
                </div>
                <div className="text-center bg-gray-800/20 rounded-lg p-1">
                  <div className="text-lg font-bold text-green-400">28</div>
                  <div className="text-xs text-gray-300">设备巡检</div>
                </div>
              </div>

              {/* 安全等级 */}
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-1 text-center">
                <span className="text-red-400 font-medium">当前森林火险等级：高危</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Forest Fire Monitoring Map */}
        <Card className="bg-gray-900 border-gray-800 h-[60%]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-300">
              <Map className="w-5 h-5" />
              森林防火监控地图
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-56px)]">
            <ForestMap />
          </CardContent>
        </Card>

        {/* Fire Risk Analysis */}
        <Card className="bg-gray-900 border-gray-800 h-[37%] relative">
          <div className="absolute top-2 left-4 z-10">
            <div className="flex items-center gap-2 text-orange-300 font-semibold">
              <Flame className="w-5 h-5" />
              火险等级分布分析
            </div>
          </div>
          <CardContent className="p-0 pt-10 h-full overflow-auto">
            <FireRiskAnalysis />
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-4">
        {/* Alerts */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-red-300">
                <AlertTriangle className="w-5 h-5" />
                火情预警
              </CardTitle>
              <Badge variant="destructive" className="bg-red-600">
                3 紧急
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {alertItems.map((alert, index) => (
              <div key={index} className="flex flex-col p-2 bg-gray-800/50 rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.type === "danger"
                          ? "bg-red-400"
                          : alert.type === "warning"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                      }`}
                    />
                    <span className="text-sm text-white">{alert.time}</span>
                  </div>
                  {alert.status && (
                    <Badge
                      variant={alert.type === "danger" ? "destructive" : "secondary"}
                      className={alert.type === "danger" ? "bg-red-600" : "bg-yellow-600"}
                    >
                      {alert.status}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-200 pl-4">{alert.content}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fire Risk Monitoring */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-300">
              <Thermometer className="w-5 h-5" />
              火险气象监测
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-gray-300 font-medium">温度</span>
                </div>
                <div className="text-2xl font-bold text-red-300">32°C</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-300 font-medium">湿度</span>
                </div>
                <div className="text-2xl font-bold text-blue-300">28%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-300 font-medium">风速</span>
                </div>
                <div className="text-2xl font-bold text-cyan-300">5.7m/s</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CloudRain className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-300 font-medium">降水量</span>
                </div>
                <div className="text-2xl font-bold text-blue-300">0mm</div>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-center mb-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-gray-300 font-medium">火险指数</span>
                </div>
                <div className="text-2xl font-bold text-red-400">极高</div>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full" style={{ width: "92%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
