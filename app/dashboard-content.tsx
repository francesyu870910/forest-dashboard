"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Activity, CameraIcon, Cloud, Droplets, Flame, Thermometer, Wind } from "lucide-react"
import ForestMap from "@/components/forest-map"

export default function DashboardContent() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">森林监测总览</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">总览</TabsTrigger>
          <TabsTrigger value="fire-analysis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">防火分析</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">数据分析</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">报告</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">通知</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">监测覆盖面积</CardTitle>
                <CameraIcon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12,450 公顷</div>
                <p className="text-xs text-gray-500">
                  较上月 +2.5%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">设备在线率</CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">98.2%</div>
                <p className="text-xs text-gray-500">
                  较上周 +0.4%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">巡护人员</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">24 人</div>
                <p className="text-xs text-gray-500">
                  当前执勤中
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">无火灾天数</CardTitle>
                <Flame className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">45 天</div>
                <p className="text-xs text-gray-500">
                  历史最长 120 天
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">防火安全状态</CardTitle>
                <Flame className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">安全</div>
                <p className="text-xs text-gray-500">
                  所有区域正常
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">防火设备状态</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">正常运行</div>
                <p className="text-xs text-gray-500">
                  设备完好率 99.8%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">火险指数</CardTitle>
                <Flame className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">高危 (4.2)</div>
                <p className="text-xs text-gray-500">
                  建议加强巡逻和监测
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">最近巡护</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">今日 8 次</div>
                <p className="text-xs text-gray-500">
                  完成率 100%
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">森林监测地图</CardTitle>
                <CardDescription className="text-gray-500">
                  实时监测点位及火情分布
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden" style={{ height: "calc(100vh - 350px)", minHeight: "500px" }}>
                <ForestMap />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">环境监测</CardTitle>
                <CardDescription className="text-gray-500">
                  实时环境指标数据
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-900">温度</CardTitle>
                      <Thermometer className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">28.5°C</div>
                      <p className="text-xs text-gray-500">
                        较昨日 +1.2°C
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-900">湿度</CardTitle>
                      <Droplets className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">42%</div>
                      <p className="text-xs text-gray-500">
                        较昨日 -5%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-900">风速</CardTitle>
                      <Wind className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">3.2 m/s</div>
                      <p className="text-xs text-gray-500">
                        东南风
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-900">降水量</CardTitle>
                      <Cloud className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">0 mm</div>
                      <p className="text-xs text-gray-500">
                        近7天无降水
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="fire-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">火险等级分布</CardTitle>
                <CardDescription className="text-gray-500">
                  各区域火险等级占比
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">火险指数趋势</CardTitle>
                <CardDescription className="text-gray-500">
                  近30天火险指数变化趋势
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">防火安全状态</CardTitle>
                <CardDescription className="text-gray-500">
                  各区域防火安全状态
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">北区</p>
                      <p className="text-sm text-gray-500">低风险</p>
                    </div>
                    <div className="text-green-500 font-medium">安全</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">东区</p>
                      <p className="text-sm text-gray-500">中风险</p>
                    </div>
                    <div className="text-yellow-500 font-medium">注意</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">南区</p>
                      <p className="text-sm text-gray-500">低风险</p>
                    </div>
                    <div className="text-green-500 font-medium">安全</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">西区</p>
                      <p className="text-sm text-gray-500">高风险</p>
                    </div>
                    <div className="text-red-500 font-medium">警戒</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">火险预警记录</CardTitle>
                <CardDescription className="text-gray-500">
                  近期火险预警记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">历史火情统计</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">火险等级分布</CardTitle>
                <CardDescription className="text-gray-500">
                  各区域火险等级占比
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* 火险等级分布图表 */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
} 