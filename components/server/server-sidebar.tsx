import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'
import ServerHeader from './server-header'

type ServerSidebarProps = {
  serverId: string
}

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile()
  if (!profile) return redirect('/')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  const textChannels = server?.channels.filter(
    (x) => x.type === ChannelType.TEXT
  )

  const audioChannels = server?.channels.filter(
    (x) => x.type === ChannelType.AUDIO
  )

  const videoChannels = server?.channels.filter(
    (x) => x.type === ChannelType.VIDEO
  )

  const members = server?.members.filter((x) => x.profileId !== profile.id)

  if (!server) {
    return redirect('/')
  }

  const role = server.members.find((x) => x.profileId === profile.id)?.role

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar
