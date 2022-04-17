import './App.css'
import { Footer, NavBar, Services, Transactions, Welcome } from './components'
export default function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}