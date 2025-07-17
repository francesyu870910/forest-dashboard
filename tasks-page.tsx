"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  PlusCircle,
  MapPin,
  User,
  Flag,
  Flame,
  Shield,
  Eye,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignee: {
    name: string
    avatar: string
  }
  priority: "高" | "中" | "低"
  status: "已完成" | "进行中" | "待开始" | "已延期"
  dueDate: string
  progress: number
  location: string
  type: "日常巡护" | "火情排查" | "防火宣传" | "应急演练" | "设备维护"
}

export default function TasksPage() {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "卡拉乡林区日常巡护",
      description: "对卡拉乡林区进行日常巡护，检查是否有火灾隐患或违规用火行为",
      assignee: {
        name: "林志远",
        avatar: "/avatars/01.png",
      },
      priority: "高",
      status: "进行中",
      dueDate: "2025-06-03",
      progress: 65,
      location: "木里县卡拉乡-林区",
      type: "日常巡护",
    },
    {
      id: "2",
      title: "博窝乡林区火情排查",
      description: "针对博窝乡林区近期出现的烟雾报警进行实地排查确认",
      assignee: {
        name: "王树森",
        avatar: "/avatars/02.png",
      },
      priority: "高",
      status: "待开始",
      dueDate: "2025-06-03",
      progress: 0,
      location: "木里县博窝乡-林区",
      type: "火情排查",
    },
    {
      id: "3",
      title: "防火宣传进村入户",
      description: "前往周边村庄开展森林防火宣传教育活动，提高村民防火意识",
      assignee: {
        name: "张青山",
        avatar: "/avatars/03.png",
      },
      priority: "中",
      status: "已完成",
      dueDate: "2025-06-01",
      progress: 100,
      location: "木里县水洛乡-村落群",
      type: "防火宣传",
    },
    {
      id: "4",
      title: "屋斯乡防火监测设备维护",
      description: "对屋斯乡的温度传感器、烟雾探测器等设备进行例行检查和维护",
      assignee: {
        name: "李林峰",
        avatar: "/avatars/04.png",
      },
      priority: "中",
      status: "已延期",
      dueDate: "2025-05-30",
      progress: 20,
      location: "木里县屋斯乡-监测点",
      type: "设备维护",
    },
    {
      id: "5",
      title: "森林火灾应急演练",
      description: "组织防火人员开展森林火灾扑救应急演练，提高应急处置能力",
      assignee: {
        name: "赵森华",
        avatar: "/avatars/05.png",
      },
      priority: "高",
      status: "待开始",
      dueDate: "2025-06-05",
      progress: 0,
      location: "木里县城-训练场",
      type: "应急演练",
    },
    {
      id: "6",
      title: "高火险区域专项巡护",
      description: "针对持续高温天气，对高火险区域进行专项巡护检查",
      assignee: {
        name: "孙松涛",
        avatar: "/avatars/06.png",
      },
      priority: "高",
      status: "进行中",
      dueDate: "2025-06-04",
      progress: 45,
      location: "木里县瓦厂林区-东南部",
      type: "日常巡护",
    },
    {
      id: "7",
      title: "防火通道清理",
      description: "清理防火通道上的杂草、落叶等可燃物，确保通道畅通",
      assignee: {
        name: "周林海",
        avatar: "/avatars/07.png",
      },
      priority: "中",
      status: "进行中",
      dueDate: "2025-06-04",
      progress: 30,
      location: "木里县各防火通道",
      type: "日常巡护",
    },
    {
      id: "8",
      title: "无人机巡查系统维护",
      description: "对森林防火无人机巡查系统进行软硬件维护和升级",
      assignee: {
        name: "陈松林",
        avatar: "/avatars/08.png",
      },
      priority: "中",
      status: "待开始",
      dueDate: "2025-06-06",
      progress: 0,
      location: "木里县城-指挥中心",
      type: "设备维护",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("全部")
  const [filterStatus, setFilterStatus] = useState("全部")
  const [filterType, setFilterType] = useState("全部")
  const [showAddTask, setShowAddTask] = useState(false)
  const [showTaskDetails, setShowTaskDetails] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // 打开任务详情对话框
  const handleViewDetails = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetails(true)
  }

  // 打开新建任务对话框
  const handleAddTask = () => {
    setShowAddTask(true)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "全部" || task.priority === filterPriority
    const matchesStatus = filterStatus === "全部" || task.status === filterStatus
    const matchesType = filterType === "全部" || task.type === filterType
    return matchesSearch && matchesPriority && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已完成":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case "进行中":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "待开始":
        return <Calendar className="w-4 h-4 text-gray-400" />
      case "已延期":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-600"
      case "中":
        return "bg-yellow-600"
      case "低":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "日常巡护":
        return <Shield className="w-4 h-4 text-blue-500" />
      case "火情排查":
        return <Flame className="w-4 h-4 text-red-500" />
      case "防火宣传":
        return <User className="w-4 h-4 text-purple-500" />
      case "应急演练":
        return <Flag className="w-4 h-4 text-orange-500" />
      case "设备维护":
        return <RotateCcw className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">巡护任务</h1>
            <p className="text-slate-400">管理森林防火巡护任务</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddTask}>
          <PlusCircle className="w-4 h-4 mr-2" />
          新建任务
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">总任务数</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">已完成</p>
                <p className="text-2xl font-bold text-green-400">
                  {tasks.filter((t) => t.status === "已完成").length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">进行中</p>
                <p className="text-2xl font-bold text-blue-400">
                  {tasks.filter((t) => t.status === "进行中").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">已延期</p>
                <p className="text-2xl font-bold text-red-400">
                  {tasks.filter((t) => t.status === "已延期").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="搜索任务名称或描述..."
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
                <SelectItem value="日常巡护">日常巡护</SelectItem>
                <SelectItem value="火情排查">火情排查</SelectItem>
                <SelectItem value="防火宣传">防火宣传</SelectItem>
                <SelectItem value="应急演练">应急演练</SelectItem>
                <SelectItem value="设备维护">设备维护</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部优先级</SelectItem>
                <SelectItem value="高">高</SelectItem>
                <SelectItem value="中">中</SelectItem>
                <SelectItem value="低">低</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部状态</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="进行中">进行中</SelectItem>
                <SelectItem value="待开始">待开始</SelectItem>
                <SelectItem value="已延期">已延期</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-200">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-700">任务名称</TableHead>
                <TableHead className="text-gray-700">类型</TableHead>
                <TableHead className="text-gray-700">负责人</TableHead>
                <TableHead className="text-gray-700">优先级</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">截止日期</TableHead>
                <TableHead className="text-gray-700">进度</TableHead>
                <TableHead className="text-gray-700">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="border-gray-200">
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <span>{task.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignee.name.substring(1).replace(/\s+/g, '')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span>{task.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{task.dueDate}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{task.progress}%</div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => handleViewDetails(task)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 新建任务对话框 */}
      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>创建新任务</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">任务名称</Label>
              <Input id="title" placeholder="输入任务名称" className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">任务描述</Label>
              <Textarea
                id="description"
                placeholder="输入任务详细描述"
                className="bg-white border-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">任务类型</Label>
                <Select>
                  <SelectTrigger id="type" className="bg-white border-gray-300">
                    <SelectValue placeholder="选择任务类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="日常巡护">日常巡护</SelectItem>
                    <SelectItem value="火情排查">火情排查</SelectItem>
                    <SelectItem value="防火宣传">防火宣传</SelectItem>
                    <SelectItem value="应急演练">应急演练</SelectItem>
                    <SelectItem value="设备维护">设备维护</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">负责人</Label>
                <Select>
                  <SelectTrigger id="assignee" className="bg-white border-gray-300">
                    <SelectValue placeholder="选择负责人" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="林志远">林志远</SelectItem>
                    <SelectItem value="王树森">王树森</SelectItem>
                    <SelectItem value="张青山">张青山</SelectItem>
                    <SelectItem value="李林峰">李林峰</SelectItem>
                    <SelectItem value="赵森华">赵森华</SelectItem>
                    <SelectItem value="孙松涛">孙松涛</SelectItem>
                    <SelectItem value="周林海">周林海</SelectItem>
                    <SelectItem value="陈松林">陈松林</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">优先级</Label>
                <Select>
                  <SelectTrigger id="priority" className="bg-white border-gray-300">
                    <SelectValue placeholder="选择优先级" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="高">高</SelectItem>
                    <SelectItem value="中">中</SelectItem>
                    <SelectItem value="低">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">截止日期</Label>
                <Input
                  id="dueDate"
                  type="date"
                  placeholder="选择截止日期"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">任务地点</Label>
              <Input
                id="location"
                placeholder="输入任务执行地点"
                className="bg-white border-gray-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-100" onClick={() => setShowAddTask(false)}>
              取消
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddTask(false)}>
              创建任务
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 任务详情对话框 */}
      <Dialog open={showTaskDetails} onOpenChange={setShowTaskDetails}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader>
            <DialogTitle>任务详情</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedTask.type)}
                    <span className="font-medium">{selectedTask.title}</span>
                    <Badge className={getPriorityColor(selectedTask.priority)}>
                      {selectedTask.priority}优先级
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedTask.status)}
                    <span>{selectedTask.status}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">负责人</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                      <AvatarFallback>{selectedTask.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{selectedTask.assignee.name.substring(1).replace(/\s+/g, '')}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">截止日期</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{selectedTask.dueDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">任务地点</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedTask.location}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">任务进度</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${selectedTask.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-700 mt-1">{selectedTask.progress}% 完成</div>
              </div>

              <div className="bg-gray-100 border border-gray-200 rounded-md p-4 h-40">
                <p className="text-sm text-gray-500 mb-2">任务地点地图</p>
                <div className="bg-white border border-gray-300 rounded h-24 flex items-center justify-center">
                  <p className="text-gray-400">地图加载中...</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowTaskDetails(false)}
                >
                  关闭
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">更新进度</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
