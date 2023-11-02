import ChannelManager from "./_components/ChannelManager"
import Header from "./_components/Header"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <div className="p-4">
        <ChannelManager />
      </div>
    </main>
  )
}
