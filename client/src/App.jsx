import './App.css'
import { Footer, Loader, NavBar, Services, Transactions, Welcome } from './components'
export default function App() {
  return (
    <h1 className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />

      </div>
      <Services />
      <Transactions />
      <Footer />
    </h1>
  )
}