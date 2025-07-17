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
import { Users, Plus, Search, Edit, Trash2, Shield, UserCheck, UserX, Flame } from "lucide-react"

interface User {
  id: string
  username: string
  name: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  department: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "admin",
      name: "陈松林",
      role: "系统管理员",
      status: "active",
      lastLogin: "2025-06-02 22:15:30",
      department: "信息技术部",
    },
    {
      id: "2",
      username: "commander",
      name: "林志远",
      role: "防火总指挥",
      status: "active",
      lastLogin: "2025-06-02 21:45:12",
      department: "防火指挥部",
    },
    {
      id: "3",
      username: "supervisor1",
      name: "王树森",
      role: "火情监测员",
      status: "active",
      lastLogin: "2025-06-02 20:30:45",
      department: "安全监测部",
    },
    {
      id: "4",
      username: "operator2",
      name: "李林峰",
      role: "设备操作员",
      status: "inactive",
      lastLogin: "2025-06-01 18:20:15",
      department: "设备维护部",
    },
    {
      id: "5",
      username: "engineer1",
      name: "张青山",
      role: "技术工程师",
      status: "active",
      lastLogin: "2025-06-02 19:30:22",
      department: "防火技术部",
    },
    {
      id: "6",
      username: "leader1",
      name: "赵森华",
      role: "救援队长",
      status: "active",
      lastLogin: "2025-06-02 18:45:18",
      department: "应急救援队",
    },
    {
      id: "7",
      username: "patroller1",
      name: "孙松涛",
      role: "巡查队员",
      status: "active",
      lastLogin: "2025-06-02 17:20:35",
      department: "防火巡查队",
    },
    {
      id: "8",
      username: "analyst1",
      name: "周林海",
      role: "数据分析师",
      status: "active",
      lastLogin: "2025-06-02 16:15:42",
      department: "数据分析部",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    role: "",
    department: "",
    password: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      status: "active",
      lastLogin: "从未登录",
      department: newUser.department,
    }
    setUsers([...users, user])
    setNewUser({ username: "", name: "", role: "", department: "", password: "" })
    setIsAddDialogOpen(false)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">防火人员管理</h1>
              <p className="text-slate-400">管理森林防火监控系统用户账号和权限</p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 text-gray-900">
              <DialogHeader>
                <DialogTitle>添加新用户</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="bg-white border-gray-300"
                      placeholder="请输入用户名"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="bg-white border-gray-300"
                      placeholder="请输入姓名"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">角色</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="系统管理员">系统管理员</SelectItem>
                        <SelectItem value="防火总指挥">防火总指挥</SelectItem>
                        <SelectItem value="火情监测员">火情监测员</SelectItem>
                        <SelectItem value="技术工程师">技术工程师</SelectItem>
                        <SelectItem value="设备操作员">设备操作员</SelectItem>
                        <SelectItem value="救援队长">救援队长</SelectItem>
                        <SelectItem value="巡查队员">巡查队员</SelectItem>
                        <SelectItem value="数据分析师">数据分析师</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">部门</Label>
                    <Select
                      value={newUser.department}
                      onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                    >
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择部门" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="信息技术部">信息技术部</SelectItem>
                        <SelectItem value="防火指挥部">防火指挥部</SelectItem>
                        <SelectItem value="安全监测部">安全监测部</SelectItem>
                        <SelectItem value="设备维护部">设备维护部</SelectItem>
                        <SelectItem value="防火技术部">防火技术部</SelectItem>
                        <SelectItem value="应急救援队">应急救援队</SelectItem>
                        <SelectItem value="防火巡查队">防火巡查队</SelectItem>
                        <SelectItem value="数据分析部">数据分析部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">初始密码</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="请输入初始密码"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                    添加
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">总用户数</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">在线用户</p>
                  <p className="text-2xl font-bold text-green-400">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">离线用户</p>
                  <p className="text-2xl font-bold text-red-400">
                    {users.filter((u) => u.status === "inactive").length}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">防火指挥</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {users.filter((u) => u.role === "防火总指挥").length}
                  </p>
                </div>
                <Flame className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 用户列表 */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>防火人员列表</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索用户..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">用户名</TableHead>
                  <TableHead className="text-gray-700">姓名</TableHead>
                  <TableHead className="text-gray-700">角色</TableHead>
                  <TableHead className="text-gray-700">部门</TableHead>
                  <TableHead className="text-gray-700">状态</TableHead>
                  <TableHead className="text-gray-700">最后登录</TableHead>
                  <TableHead className="text-gray-700">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-200">
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "系统管理员" || user.role === "防火总指挥" ? "default" : "secondary"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status === "active" ? "在线" : "离线"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? (
                            <UserX className="w-4 h-4 text-red-400" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-400" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
