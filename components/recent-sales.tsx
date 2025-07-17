import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>张</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">张明</p>
          <p className="text-sm text-muted-foreground">
            木里县卡拉乡巡护
          </p>
        </div>
        <div className="ml-auto font-medium">09:15</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>李</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">李强</p>
          <p className="text-sm text-muted-foreground">木里县水洛乡巡护</p>
        </div>
        <div className="ml-auto font-medium">10:30</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>王</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">王伟</p>
          <p className="text-sm text-muted-foreground">木里县博窝乡设备维护</p>
        </div>
        <div className="ml-auto font-medium">11:45</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>赵</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">赵红</p>
          <p className="text-sm text-muted-foreground">木里县屋斯乡巡护</p>
        </div>
        <div className="ml-auto font-medium">13:20</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>刘</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">刘军</p>
          <p className="text-sm text-muted-foreground">木里县瓦厂林区火情排查</p>
        </div>
        <div className="ml-auto font-medium">14:45</div>
      </div>
    </div>
  )
} 