import { UserButton } from '@clerk/nextjs'

import { ModeToggle } from '@/components/mode-toggle'

const HomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  )
}

export default HomePage
