"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
  MapPin,
  Flame,
  Thermometer,
  CloudRain,
  Wind,
} from "lucide-react"

interface Event {
  id: string
  time: string
  type: "火灾" | "高温" | "烟雾" | "干旱" | "雷击"
  level: "严重" | "中度" | "轻微"
  description: string
  location: string
  status: "已处理" | "处理中" | "未处理"
}

export default function EventsPage() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      time: "2025-06-02 22:30:15",
      type: "火灾",
      level: "严重",
      description: "卡拉乡林区发现明火，火势正在蔓延",
      location: "木里县卡拉乡",
      status: "处理中",
    },
    {
      id: "2",
      time: "2025-06-02 22:25:30",
      type: "烟雾",
      level: "中度",
      description: "监测到大量烟雾，疑似火灾初期",
      location: "木里县博窝乡",
      status: "处理中",
    },
    {
      id: "3",
      time: "2025-06-02 22:20:45",
      type: "高温",
      level: "轻微",
      description: "区域温度异常升高，需密切监控",
      location: "木里县水洛乡",
      status: "未处理",
    },
    {
      id: "4",
      time: "2025-06-02 22:15:12",
      type: "干旱",
      level: "中度",
      description: "连续14天无降水，火险等级提升",
      location: "木里县屋斯乡",
      status: "处理中",
    },
    {
      id: "5",
      time: "2025-06-02 22:10:30",
      type: "雷击",
      level: "严重",
      description: "雷击引发树木燃烧，火势蔓延迅速",
      location: "木里县瓦厂林区",
      status: "已处理",
    },
    {
      id: "6",
      time: "2025-06-01 16:45:20",
      type: "烟雾",
      level: "轻微",
      description: "疑似农户用火产生烟雾，已确认非火灾",
      location: "木里县项脚乡",
      status: "已处理",
    },
    {
      id: "7",
      time: "2025-06-01 14:30:10",
      type: "高温",
      level: "中度",
      description: "区域温度达38°C，已超过预警阈值",
      location: "木里县彝海自然保护区",
      status: "已处理",
    },
    {
      id: "8",
      time: "2025-05-31 09:15:40",
      type: "火灾",
      level: "严重",
      description: "森林火灾，过火面积约2公顷",
      location: "木里县城周边林区",
      status: "已处理",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("全部")
  const [filterLevel, setFilterLevel] = useState("全部")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)

  // 打开事件详情对话框
  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "全部" || event.type === filterType
    const matchesLevel = filterLevel === "全部" || event.level === filterLevel
    return matchesSearch && matchesType && matchesLevel
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已处理":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "处理中":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "未处理":
        return <Info className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "严重":
        return "bg-red-600"
      case "中度":
        return "bg-yellow-600"
      case "轻微":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "火灾":
        return <Flame className="w-4 h-4 text-red-500" />
      case "高温":
        return <Thermometer className="w-4 h-4 text-orange-500" />
      case "烟雾":
        return <CloudRain className="w-4 h-4 text-gray-500" />
      case "干旱":
        return <Wind className="w-4 h-4 text-yellow-500" />
      case "雷击":
        return <AlertTriangle className="w-4 h-4 text-purple-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 页面标题 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">火情事件</h1>
          <p className="text-slate-400">查询和管理森林火情事件记录</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">今日事件</p>
                <p className="text-2xl font-bold">{events.filter(e => e.time.includes('2025-06-02')).length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">严重火情</p>
                <p className="text-2xl font-bold text-red-400">{events.filter((e) => e.level === "严重").length}</p>
              </div>
              <Flame className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">处理中</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {events.filter((e) => e.status === "处理中").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">已处理</p>
                <p className="text-2xl font-bold text-green-400">
                  {events.filter((e) => e.status === "已处理").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>事件列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="搜索事件描述或位置..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300 pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部类型</SelectItem>
                <SelectItem value="火灾">火灾</SelectItem>
                <SelectItem value="高温">高温</SelectItem>
                <SelectItem value="烟雾">烟雾</SelectItem>
                <SelectItem value="干旱">干旱</SelectItem>
                <SelectItem value="雷击">雷击</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部级别</SelectItem>
                <SelectItem value="严重">严重</SelectItem>
                <SelectItem value="中度">中度</SelectItem>
                <SelectItem value="轻微">轻微</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-700">时间</TableHead>
                <TableHead className="text-gray-700">类型</TableHead>
                <TableHead className="text-gray-700">级别</TableHead>
                <TableHead className="text-gray-700">描述</TableHead>
                <TableHead className="text-gray-700">位置</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className="border-gray-200">
                  <TableCell className="text-gray-700">{event.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(event.type)}
                      <span>{event.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(event.level)}>{event.level}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{event.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <span>{event.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => handleViewDetails(event)}
                    >
                      查看详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 事件详情对话框 */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader>
            <DialogTitle>事件详情</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedEvent.type)}
                    <span className="font-medium">{selectedEvent.type}事件</span>
                    <Badge className={getLevelColor(selectedEvent.level)}>{selectedEvent.level}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">{selectedEvent.time}</div>
                </div>
                <p className="mt-2 text-gray-700">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">位置</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">状态</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedEvent.status)}
                    <span>{selectedEvent.status}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border border-gray-200 rounded-md p-4 h-40">
                <p className="text-sm text-gray-500 mb-2">事件地图位置</p>
                <div className="bg-white border border-gray-300 rounded h-24 flex items-center justify-center">
                  <p className="text-gray-400">地图加载中...</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowEventDetails(false)}
                >
                  关闭
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
