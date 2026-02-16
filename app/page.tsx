import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Problems from '@/components/Problems'
import Results from '@/components/Results'
import Process from '@/components/Process'
import CTA from '@/components/CTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-dark-bg text-text-primary overflow-hidden">
      <div className="header-wrapper">
        <Navbar />
      </div>
      <Hero />
      <About />
      <Problems />
      <Results />
      <Process />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
