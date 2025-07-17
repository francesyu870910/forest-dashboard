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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Map, Plus, Search, Edit, Trash2, Users, Car, Cog, AlertTriangle, Upload, Eye, Flame } from "lucide-react"

interface PersonTarget {
  id: string
  name: string
  employeeId: string
  department: string
  position: string
  photo: string
  status: "在岗" | "休假" | "离职"
  lastSeen: string
  accessLevel: "高级" | "中级" | "基础"
}

interface VehicleTarget {
  id: string
  plateNumber: string
  vehicleType: string
  owner: string
  department: string
  status: "正常" | "维修" | "报废"
  lastSeen: string
}

interface EquipmentTarget {
  id: string
  equipmentId: string
  name: string
  type: string
  location: string
  status: "运行" | "维修" | "停用"
  lastCheck: string
}

export default function TargetsPage() {
  const [activeTab, setActiveTab] = useState("personnel")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // 人员目标库数据
  const [personnelTargets] = useState<PersonTarget[]>([
    {
      id: "1",
      name: "林志远",
      employeeId: "FP2024001",
      department: "防火指挥部",
      position: "防火总指挥",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 22:15:30",
      accessLevel: "高级",
    },
    {
      id: "2",
      name: "王树森",
      employeeId: "FP2024002",
      department: "安全监测部",
      position: "火情监测员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 21:45:12",
      accessLevel: "高级",
    },
    {
      id: "3",
      name: "陈松林",
      employeeId: "FP2024003",
      department: "信息技术部",
      position: "系统管理员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 20:30:45",
      accessLevel: "高级",
    },
    {
      id: "4",
      name: "张青山",
      employeeId: "FP2024004",
      department: "防火技术部",
      position: "技术工程师",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 19:15:22",
      accessLevel: "中级",
    },
    {
      id: "5",
      name: "李林峰",
      employeeId: "FP2024005",
      department: "设备维护部",
      position: "设备维修工",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 18:45:18",
      accessLevel: "中级",
    },
    {
      id: "6",
      name: "赵森华",
      employeeId: "FP2024006",
      department: "应急救援队",
      position: "救援队长",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 17:30:35",
      accessLevel: "中级",
    },
    {
      id: "7",
      name: "孙松涛",
      employeeId: "FP2024007",
      department: "防火巡查队",
      position: "巡查队员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 16:20:42",
      accessLevel: "基础",
    },
    {
      id: "8",
      name: "周林海",
      employeeId: "FP2024008",
      department: "数据分析部",
      position: "数据分析师",
      photo: "/placeholder.svg?height=40&width=40",
      status: "在岗",
      lastSeen: "2025-06-02 15:45:28",
      accessLevel: "中级",
    },
    {
      id: "9",
      name: "马青松",
      employeeId: "FP2023015",
      department: "防火巡查队",
      position: "前巡查员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "离职",
      lastSeen: "2025-06-01 18:20:15",
      accessLevel: "基础",
    },
    {
      id: "10",
      name: "吴山林",
      employeeId: "FP2023022",
      department: "设备维护部",
      position: "前维修工",
      photo: "/placeholder.svg?height=40&width=40",
      status: "休假",
      lastSeen: "2025-05-28 14:30:20",
      accessLevel: "基础",
    },
  ])

  // 车辆目标库数据
  const [vehicleTargets] = useState<VehicleTarget[]>([
    {
      id: "1",
      plateNumber: "川W·F001",
      vehicleType: "森林消防车",
      owner: "林志远",
      department: "防火指挥部",
      status: "正常",
      lastSeen: "2025-06-02 22:10:30",
    },
    {
      id: "2",
      plateNumber: "川W·F002",
      vehicleType: "水罐消防车",
      owner: "孙松涛",
      department: "应急救援队",
      status: "正常",
      lastSeen: "2025-06-02 21:45:15",
    },
    {
      id: "3",
      plateNumber: "川W·F003",
      vehicleType: "装载机",
      owner: "李林峰",
      department: "设备维护部",
      status: "维修",
      lastSeen: "2025-06-02 20:30:45",
    },
    {
      id: "4",
      plateNumber: "川W·F004",
      vehicleType: "防火宣传车",
      owner: "张青山",
      department: "防火技术部",
      status: "正常",
      lastSeen: "2025-06-02 19:20:22",
    },
    {
      id: "5",
      plateNumber: "川W·F005",
      vehicleType: "防火指挥车",
      owner: "王树森",
      department: "防火指挥部",
      status: "正常",
      lastSeen: "2025-06-02 18:15:38",
    },
    {
      id: "6",
      plateNumber: "川W·F006",
      vehicleType: "洒水车",
      owner: "赵森华",
      department: "应急救援队",
      status: "正常",
      lastSeen: "2025-06-02 17:30:12",
    },
    {
      id: "7",
      plateNumber: "川W·F007",
      vehicleType: "应急救援车",
      owner: "陈松林",
      department: "应急救援队",
      status: "正常",
      lastSeen: "2025-06-02 16:45:55",
    },
    {
      id: "8",
      plateNumber: "川W·F008",
      vehicleType: "巡护车",
      owner: "周林海",
      department: "防火巡查队",
      status: "正常",
      lastSeen: "2025-06-02 15:20:18",
    },
  ])

  // 设备目标库数据
  const [equipmentTargets] = useState<EquipmentTarget[]>([
    {
      id: "1",
      equipmentId: "FP-CM-001",
      name: "北部林地红外监控系统",
      type: "监控设备",
      location: "木里县北部-瞭望塔",
      status: "运行",
      lastCheck: "2025-06-02 20:00:00",
    },
    {
      id: "2",
      equipmentId: "FP-TS-001",
      name: "温湿度传感器网络",
      type: "传感设备",
      location: "卡拉乡-监测站",
      status: "运行",
      lastCheck: "2025-06-02 19:30:00",
    },
    {
      id: "3",
      equipmentId: "FP-SS-001",
      name: "烟雾传感器系统",
      type: "传感设备",
      location: "博窝乡-监测点",
      status: "维修",
      lastCheck: "2025-06-02 18:30:00",
    },
    {
      id: "4",
      equipmentId: "FP-DR-001",
      name: "防火无人机",
      type: "巡检设备",
      location: "屋斯乡-无人机站",
      status: "运行",
      lastCheck: "2025-06-02 17:45:00",
    },
    {
      id: "5",
      equipmentId: "FP-WS-001",
      name: "气象监测站",
      type: "监测设备",
      location: "水洛乡-气象站",
      status: "运行",
      lastCheck: "2025-06-02 16:20:00",
    },
    {
      id: "6",
      equipmentId: "FP-WP-001",
      name: "水泵系统",
      type: "灭火设备",
      location: "俄古沟-水源地",
      status: "运行",
      lastCheck: "2025-06-02 15:30:00",
    },
    {
      id: "7",
      equipmentId: "FP-PS-001",
      name: "应急供电系统",
      type: "电力设备",
      location: "木里县城-配电室",
      status: "运行",
      lastCheck: "2025-06-02 14:45:00",
    },
    {
      id: "8",
      equipmentId: "FP-MS-001",
      name: "火情预警中心",
      type: "监测设备",
      location: "木里县城-监控中心",
      status: "运行",
      lastCheck: "2025-06-02 13:20:00",
    },
    {
      id: "9",
      equipmentId: "FP-IR-002",
      name: "便携式热成像仪",
      type: "监测设备",
      location: "瓦厂林区-装备库",
      status: "停用",
      lastCheck: "2025-06-01 16:00:00",
    },
    {
      id: "10",
      equipmentId: "FP-FE-002",
      name: "备用灭火装备",
      type: "灭火设备",
      location: "木里县城-装备库",
      status: "停用",
      lastCheck: "2025-06-01 14:30:00",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "正常":
      case "运行":
      case "在岗":
        return "bg-green-600"
      case "离职":
      case "报废":
      case "停用":
        return "bg-red-600"
      case "休假":
      case "维修":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "高级":
        return "bg-red-600"
      case "中级":
        return "bg-yellow-600"
      case "基础":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredPersonnel = personnelTargets.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredVehicles = vehicleTargets.filter(
    (vehicle) =>
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEquipment = equipmentTargets.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">防火区域管理</h1>
            <p className="text-slate-400">管理森林防火监控系统的资源库</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              添加资源
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle>添加防火资源</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetType">资源类型</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="选择资源类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="personnel">防火人员</SelectItem>
                    <SelectItem value="vehicle">防火车辆</SelectItem>
                    <SelectItem value="equipment">防火设备</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">上传照片/图像</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">点击或拖拽上传图像</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">添加</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">防火人员</p>
                <p className="text-2xl font-bold">{personnelTargets.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">防火车辆</p>
                <p className="text-2xl font-bold">{vehicleTargets.length}</p>
              </div>
              <Car className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">防火设备</p>
                <p className="text-2xl font-bold">{equipmentTargets.length}</p>
              </div>
              <Cog className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">监控覆盖率</p>
                <p className="text-2xl font-bold text-green-400">92%</p>
              </div>
              <Map className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 目标库内容 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>防火资源库</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索资源..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300 pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="personnel" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                防火人员库
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                防火车辆库
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                防火设备库
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personnel" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">照片</TableHead>
                    <TableHead className="text-gray-900">姓名</TableHead>
                    <TableHead className="text-gray-900">工号</TableHead>
                    <TableHead className="text-gray-900">部门</TableHead>
                    <TableHead className="text-gray-900">职位</TableHead>
                    <TableHead className="text-gray-900">权限等级</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后签到</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonnel.map((person) => (
                    <TableRow key={person.id} className="border-gray-200">
                      <TableCell>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={person.photo || "/placeholder.svg"} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell className="font-mono text-sm">{person.employeeId}</TableCell>
                      <TableCell>{person.department}</TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>
                        <Badge className={getAccessLevelColor(person.accessLevel)}>{person.accessLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(person.status)}>{person.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{person.lastSeen}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="vehicles" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">车牌号</TableHead>
                    <TableHead className="text-gray-900">车辆类型</TableHead>
                    <TableHead className="text-gray-900">负责人</TableHead>
                    <TableHead className="text-gray-900">所属部门</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后巡检</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="border-gray-200">
                      <TableCell className="font-medium font-mono">{vehicle.plateNumber}</TableCell>
                      <TableCell>{vehicle.vehicleType}</TableCell>
                      <TableCell>{vehicle.owner}</TableCell>
                      <TableCell>{vehicle.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{vehicle.lastSeen}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="equipment" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">设备编号</TableHead>
                    <TableHead className="text-gray-900">设备名称</TableHead>
                    <TableHead className="text-gray-900">设备类型</TableHead>
                    <TableHead className="text-gray-900">部署位置</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后检查</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((equipment) => (
                    <TableRow key={equipment.id} className="border-gray-200">
                      <TableCell className="font-medium font-mono">{equipment.equipmentId}</TableCell>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>{equipment.type}</TableCell>
                      <TableCell>{equipment.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(equipment.status)}>{equipment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{equipment.lastCheck}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
