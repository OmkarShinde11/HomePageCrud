import React from 'react'
import Banner from '../../ui/Banner'
import KeyDifferenciators from '../../ui/keyDifferenciators'
import CoreUsp from '../../ui/CoreUsp'
import Experties from '../../ui/Experties'
import Award from '../../ui/Award'
import Faq from '../../ui/Faq'
import Insurance from '../../ui/Insurance'

export default function Home() {
  return (
    <>
    <Banner/>
    <section className='w-[95%] m-auto py-8'>
      <KeyDifferenciators/>
      <CoreUsp/>
      <Experties/>
      <Award/>
      <Faq/>
      <Insurance/>
    </section>
    </>
  )
}
