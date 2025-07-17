"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import dynamic from 'next/dynamic';

const MonitoringMap = dynamic(() => import('@/components/ui/monitoring-map'), {
  ssr: false,
  loading: () => <div className="bg-slate-100 rounded-lg h-[500px] flex items-center justify-center"><p>地图加载中...</p></div>
});
import {
  Bell,
  Plus,
  Search,
  Edit,
  Trash2,
  Camera,
  MapPin,
  AlertTriangle,
  Eye,
  Power,
  Users,
  Car,
  Cog,
  Map,
  Thermometer,
  Flame,
  CloudRain,
  Wind,
  Video,
  Wifi,
  Satellite,
  Plane
} from "lucide-react"

interface MonitoringPoint {
  id: string
  name: string
  location: string
  deviceType: string
  status: "在线" | "离线" | "维护中"
  ipAddress: string
  lastActive: string
  monitoringType: string[]
  lat: number
  lng: number
}

interface MonitoringTask {
  id: string
  name: string
  type: "热点监测" | "烟雾监测" | "区域监测" | "环境监测"
  target: string
  location: string
  status: "活跃" | "暂停" | "已结束"
  startTime: string
  endTime: string
  priority: "高" | "中" | "低"
}

interface MonitoringRule {
  id: string
  name: string
  type: "温度规则" | "烟雾规则" | "区域规则" | "环境规则"
  condition: string
  action: string
  status: "启用" | "禁用"
  createdBy: string
  createdAt: string
}

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState("points")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // 监控点位数据
  const [monitoringPoints] = useState<MonitoringPoint[]>([
    {
      id: "1",
      name: "木里县城监控中心",
      location: "木里县城-指挥中心",
      deviceType: "高清摄像头",
      status: "在线",
      ipAddress: "192.168.1.101",
      lastActive: "2025-06-02 22:30:15",
      monitoringType: ["热成像", "可见光"],
      lat: 28.33,
      lng: 101.3
    },
    {
      id: "2",
      name: "卡拉乡监测站",
      location: "木里县卡拉乡",
      deviceType: "全景摄像头",
      status: "在线",
      ipAddress: "192.168.1.102",
      lastActive: "2025-06-02 22:28:45",
      monitoringType: ["热成像", "烟雾检测"],
      lat: 28.5,
      lng: 101.1
    },
    {
      id: "3",
      name: "博窝乡传感器组",
      location: "木里县博窝乡",
      deviceType: "多功能传感器",
      status: "离线",
      ipAddress: "192.168.1.103",
      lastActive: "2025-06-02 20:15:30",
      monitoringType: ["温度", "湿度", "风速"],
      lat: 28.1,
      lng: 101.5
    },
    {
      id: "4",
      name: "屋斯乡无人机站",
      location: "木里县屋斯乡",
      deviceType: "无人机基站",
      status: "维护中",
      ipAddress: "192.168.1.104",
      lastActive: "2025-06-02 18:45:20",
      monitoringType: ["无人机控制"],
      lat: 28.7,
      lng: 100.8
    },
    {
      id: "5",
      name: "水洛乡气象站",
      location: "木里县水洛乡",
      deviceType: "多功能传感器",
      status: "在线",
      ipAddress: "192.168.1.105",
      lastActive: "2025-06-02 22:15:40",
      monitoringType: ["温度", "湿度", "风速", "气压"],
      lat: 27.9,
      lng: 101.2
    },
    {
      id: "6",
      name: "瓦厂林区监控点",
      location: "木里县瓦厂林区",
      deviceType: "高清摄像头",
      status: "在线",
      ipAddress: "192.168.1.106",
      lastActive: "2025-06-02 22:05:12",
      monitoringType: ["热成像", "可见光", "烟雾检测"],
      lat: 28.4,
      lng: 101.6
    },
    {
      id: "7",
      name: "项脚乡监测站",
      location: "木里县项脚乡",
      deviceType: "全景摄像头",
      status: "在线",
      ipAddress: "192.168.1.107",
      lastActive: "2025-06-02 21:58:33",
      monitoringType: ["热成像", "烟雾检测"],
      lat: 28.2,
      lng: 100.7
    },
    {
      id: "8",
      name: "彝海自然保护区监控",
      location: "木里县彝海自然保护区",
      deviceType: "高清摄像头",
      status: "在线",
      ipAddress: "192.168.1.108",
      lastActive: "2025-06-02 22:20:25",
      monitoringType: ["热成像", "可见光"],
      lat: 28.6,
      lng: 101.4
    },
  ])

  // 监测任务数据
  const [monitoringTasks] = useState<MonitoringTask[]>([
    {
      id: "1",
      name: "卡拉乡高温区域监测",
      type: "热点监测",
      target: "温度异常区域",
      location: "木里县卡拉乡",
      status: "活跃",
      startTime: "2025-06-01 08:00:00",
      endTime: "2025-06-30 18:00:00",
      priority: "高",
    },
    {
      id: "2",
      name: "博窝乡烟雾检测任务",
      type: "烟雾监测",
      target: "烟雾异常",
      location: "木里县博窝乡",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-12-31 23:59:59",
      priority: "中",
    },
    {
      id: "3",
      name: "瓦厂林区干旱区域监测",
      type: "区域监测",
      target: "瓦厂林区高火险区域",
      location: "木里县瓦厂林区",
      status: "暂停",
      startTime: "2025-06-02 08:00:00",
      endTime: "2025-06-02 18:00:00",
      priority: "高",
    },
    {
      id: "4",
      name: "木里县全境气象监测",
      type: "环境监测",
      target: "气象数据",
      location: "木里县全境",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-12-31 23:59:59",
      priority: "中",
    },
    {
      id: "5",
      name: "彝海自然保护区监测",
      type: "区域监测",
      target: "生态环境",
      location: "木里县彝海自然保护区",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-12-31 23:59:59",
      priority: "高",
    },
    {
      id: "6",
      name: "水洛乡风速监测",
      type: "环境监测",
      target: "大风预警",
      location: "木里县水洛乡",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-09-30 23:59:59",
      priority: "中",
    }
  ])

  // 监测规则数据
  const [monitoringRules] = useState<MonitoringRule[]>([
    {
      id: "1",
      name: "木里县温度异常告警",
      type: "温度规则",
      condition: "当检测到温度超过45°C持续5分钟",
      action: "发送高级告警，启动无人机巡检",
      status: "启用",
      createdBy: "管理员",
      createdAt: "2025-05-15 10:30:00",
    },
    {
      id: "2",
      name: "木里县烟雾检测告警",
      type: "烟雾规则",
      condition: "当检测到烟雾浓度超过标准值",
      action: "发送中级告警，启动无人机确认",
      status: "启用",
      createdBy: "管理员",
      createdAt: "2025-05-20 14:15:00",
    },
    {
      id: "3",
      name: "卡拉乡火险预警",
      type: "区域规则",
      condition: "当区域火险指数达到高级",
      action: "发送高级告警，通知巡护人员加强巡查",
      status: "启用",
      createdBy: "安全主管",
      createdAt: "2025-05-25 09:45:00",
    },
    {
      id: "4",
      name: "博窝乡干旱天气预警",
      type: "环境规则",
      condition: "当连续7天无降水且温度超过30°C",
      action: "发送高级告警，提高火险等级",
      status: "启用",
      createdBy: "气象专家",
      createdAt: "2025-05-28 11:20:00",
    },
    {
      id: "5",
      name: "彝海自然保护区特殊监测",
      type: "区域规则",
      condition: "当保护区内探测到人类活动",
      action: "发送中级告警，通知护林员巡查",
      status: "启用",
      createdBy: "保护区主管",
      createdAt: "2025-05-30 09:15:00",
    },
  ])

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "在线":
      case "活跃":
      case "启用":
        return "bg-green-500"
      case "离线":
      case "暂停":
      case "禁用":
        return "bg-yellow-500"
      case "维护中":
      case "已结束":
        return "bg-slate-500"
      default:
        return "bg-slate-500"
    }
  }

  // 获取优先级颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-500"
      case "中":
        return "bg-yellow-500"
      case "低":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "热点监测":
      case "温度规则":
        return <Thermometer className="w-4 h-4" />
      case "烟雾监测":
      case "烟雾规则":
        return <Flame className="w-4 h-4" />
      case "区域监测":
      case "区域规则":
        return <Map className="w-4 h-4" />
      case "环境监测":
      case "环境规则":
        return <CloudRain className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  // 获取设备类型图标
  const getDeviceTypeIcon = (deviceType: string) => {
    switch (deviceType) {
      case "高清摄像头":
      case "全景摄像头":
        return <Video className="w-4 h-4" />
      case "多功能传感器":
        return <Thermometer className="w-4 h-4" />
      case "无人机基站":
        return <Plane className="w-4 h-4" />
      default:
        return <Cog className="w-4 h-4" />
    }
  }

  // 过滤监控点位
  const filteredPoints = monitoringPoints.filter(
    (point) =>
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.deviceType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 过滤监控任务
  const filteredTasks = monitoringTasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 过滤监控规则
  const filteredRules = monitoringRules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>森林监测点位管理</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="搜索..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> 添加监控点
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="points" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="points">监控点位</TabsTrigger>
              <TabsTrigger value="tasks">监测任务</TabsTrigger>
              <TabsTrigger value="rules">监测规则</TabsTrigger>
              <TabsTrigger value="map">地图视图</TabsTrigger>
            </TabsList>

            {/* 监控点位 */}
            <TabsContent value="points">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>设备名称</TableHead>
                    <TableHead>位置</TableHead>
                    <TableHead>设备类型</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>监测类型</TableHead>
                    <TableHead>最后活跃时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPoints.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDeviceTypeIcon(point.deviceType)}
                          <span>{point.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {point.location}
                        </div>
                      </TableCell>
                      <TableCell>{point.deviceType}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(point.status)} text-white border-0`}
                        >
                          {point.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {point.monitoringType.map((type, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-200 text-slate-700">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{point.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* 监测任务 */}
            <TabsContent value="tasks">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>监测目标</TableHead>
                    <TableHead>位置</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>优先级</TableHead>
                    <TableHead>时间范围</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          {task.type}
                        </div>
                      </TableCell>
                      <TableCell>{task.target}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {task.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(task.status)} text-white border-0`}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getPriorityColor(task.priority)} text-white border-0`}
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div>{task.startTime}</div>
                        <div>{task.endTime}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* 监测规则 */}
            <TabsContent value="rules">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>规则名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>触发条件</TableHead>
                    <TableHead>执行动作</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>{rule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          {rule.type}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{rule.condition}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{rule.action}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(rule.status)} text-white border-0`}
                        >
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.createdBy}</TableCell>
                      <TableCell className="text-xs">{rule.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* 地图视图 */}
            <TabsContent value="map">
              <div className="bg-slate-100 rounded-lg h-[500px]">
                <MonitoringMap points={monitoringPoints} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 添加监控点对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加新监控点</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名称
              </Label>
              <Input id="name" placeholder="监控点名称" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                位置
              </Label>
              <Input id="location" placeholder="监控点位置" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deviceType" className="text-right">
                设备类型
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择设备类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camera">高清摄像头</SelectItem>
                  <SelectItem value="panoramic">全景摄像头</SelectItem>
                  <SelectItem value="sensor">多功能传感器</SelectItem>
                  <SelectItem value="drone">无人机基站</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ip" className="text-right">
                IP地址
              </Label>
              <Input id="ip" placeholder="192.168.1.x" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">监测类型</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  热成像
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  可见光
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  烟雾检测
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  温度
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  湿度
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  风速
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                描述
              </Label>
              <Textarea id="desc" placeholder="监控点描述..." className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
