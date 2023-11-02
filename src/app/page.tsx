import ChannelManager from "./_components/ChannelManager"
import Header from "./_components/Header"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto mt-6">
        <ChannelManager />
      </div>
    </main>
  )
}
