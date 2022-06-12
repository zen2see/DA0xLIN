import React from 'react'
import styles from '../styles/Globals'
import Image from 'next/image'
import white from '../../public/assets/images/white.svg'
import illustrationintroT from '../../public/assets/images/illustrationintroT.svg'
import avatarAnisha from '../../public/assets/images/avatarAnisha.png'
import avatarAli from '../../public/assets/images/avatarAli.png'
import avatarRichard from '../../public/assets/images/avatarRichard.png'
import Script from 'next/script'

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

export const Header = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false)
  return (
    <>
      <nav className={`relative container mx-auto p-6`}
        style={{
          backgroundImage: "url(../../public/assets/banner.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
          backgroundPosition: "center",
        }}>
        {/* Flex container */}
        <div className={`flex items-center justify-between text-sm ${styles.blue100Text}`}>
          {/* Image */}
          <div className={`shrink-0 pt-2`}>
            <Image
              className={``}
              src={white}
              alt='logo'
              width={146}
              height={24}
            />
          </div>
          {/* Menu Items */}
          <div className={`hidden space-x-6 md:flex`}>
            <a href="#" className={`hover:text-red-300`}>Pricing</a>
            <a href="#" className={`hover:text-red-300`}>Product</a>
            <a href="#" className={`hover:text-red-300`}>Careers</a>
            <a href="#" className={`hover:text-red-300`}>Community</a>
            <a href="#" className={`hover:text-red-300`}>About Us</a>
          </div>
          {/* Button */}
          <a href="#" className={`py-2 px-3 hidden bg-red-500 rounded-full baseline hover:bg-indigo-500 minmd:block`}>
            Get Started
          </a>
          {/** Hamburger Icon */}
          <button className={`block hamburger focus:outline-none md:hidden`}
            id='menu-btn'
          >
            <span className={'hamburger-top'}></span>
            <span className={`hamburger-middle`}></span>
            <span className={'hamburger-bottom'}></span>
          </button>
          {/** Mobile Menu */}
          <div className={`md:hidden`}>
            <div className={`flex-col items-center py-8 mt-10 space-y-6 font-bold left-6 right-6 absolute hidden self-end z-10
            bg-gradient-to-b from-fucshia-800 to-indigo-700 ${styles.blue100Text} drop-shadow-md sm:w-auto sm:self-center`}
            >
              <a href="#" className={`hover:text-red-300`}>Pricing</a>
              <a href="#" className={`hover:text-red-300`}>Product</a>
              <a href="#" className={`hover:text-red-300`}>Careers</a>
              <a href="#" className={`hover:text-red-300`}>Community</a>
              <a href="#" className={`hover:text-red-300`}>About Us</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        {/* Flex Container */}
        <div className={`container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0
           md:space-y-0 md:flex-row ${styles.blue100Text}`}>
          {/** Left Item */}
          <div className={`flex flex-col mb-32 space-y-12 md:w-1/2`}>
            <h1 className={`max-w-md mt-10 text-4xl font-bold text-center md:text-5xl md:text-left`}>
              Bring everyone together to build better products
            </h1>
            <h1 className={`max-w-sm text-center pl-6 md:pl-0 md:text-left`}>
              Manage makes it simple for software teams to plan day-to-day task
              while keeping the larger team goals in view.
            </h1>
            <div className={`flex text-sm max-w-md justify-center md:justify-start ${styles.blue100Text}`}>
              <a href="#" className={`py-2 px-3 bg-red-500 rounded-full baseline hover:bg-indigo-500`}>
                Get Started
              </a>
            </div>
          </div>
          {/** Image */}
          <div className={`md:w-1/2`}>
            <Image
              className={``}
              src={illustrationintroT}
              alt='bbST'
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features'>
        {/* Flex container */}
        <div className={`container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row`}>
          {/* What's Different */}
          <div className={`flex flex-col space-y-12 md:w-1/2 ${styles.blue100Text}`}>
            <div className={`max-w-md text-4xl font-bold text-center md:text-left`}>
              What&lsquo;'s different about Manage?
            </div>
            <div className={`max-w-sm text-center pl-6 md:pl-0 md:text-left`}>
              Manage provides all the functionality your team needs, without the
              complexity.  Our software is tailor-made for modern digital product
              teams.
            </div>
          </div>

          {/**Numbered Lists */}
          <div className={`flex flex-col space-y-8 md:w-1/2 ${styles.blue100Text}`}>
            {/**List Item 1 */}
            <div className={`flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row`}>
              {/** Heading */}
              <div className={`rounded-l-full bg-red-400 md:bg-transparent`}>
                <div className={`flex items-center space-x-2`}>
                  <div className={`px-4 py-2 rounded-full md:py-1 bg-red-500`}>
                    01
                  </div>
                  <div className={`text-base font-bold md:mb-4 md:hidden`}>
                    Track company-wide progress
                  </div>
                </div>
              </div>
              <div className={``}>
                <div className={`hidden mb-4 text-lg font-bold md:block`}>
                  Track company-wide progress
                </div>
                <div className={``}>
                  See how your day-to-day tasks fit into the wider vision. Go from
                  tracking progress at the milest one level all the way done to the
                  smallest of details. Never lose sight of the bigger picture
                  again.
                </div>
              </div>
            </div>
            {/**List Item 2 */}
            <div className={`flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row`}>
              {/** Heading 2 */}
              <div className={`rounded-l-full bg-red-400 md:bg-transparent`}>
                <div className={`flex items-center space-x-2`}>
                  <div className={`px-4 py-2 rounded-full md:py-1 bg-red-500`}>
                    02
                  </div>
                  <div className={`text-base font-bold md:mb-4 md:hidden`}>
                    Advanced built-in reports
                  </div>
                </div>
              </div>
              <div className={``}>
                <div className={`hidden mb-4 text-lg font-bold md:block`}>
                  Advanced built-in reports
                </div>
                <div className={``}>
                  Set internal delivery estimates and track progress toward
                  company goals. Our customisable dashboard helps you build out
                  the reports you need to keep key stakeholders informed.
                </div>
              </div>
            </div>
            {/**List Item 3 */}
            <div className={`flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row`}>
              {/** Heading 3 */}
              <div className={`rounded-l-full bg-red-400 md:bg-transparent`}>
                <div className={`flex items-center space-x-2`}>
                  <div className={`px-4 py-2 rounded-full md:py-1 bg-red-500`}>
                    03
                  </div>
                  <div className={`text-base font-bold md:mb-4 md:hidden`}>
                    Everything you need in one place
                  </div>
                </div>
              </div>
              <div className={``}>
                <div className={`hidden mb-4 text-lg font-bold md:block`}>
                  Everything you need in one place
                </div>
                <div className={``}>
                  Stop jumping from one service to another to communicate, store
                  files, track tasks and share documents. Manage offers an
                  all-in-one team productivity solution.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** Testimonials */}
      <section id="testimonials">
        {/** Container to heading and testimonial blocks */}
        <div className={`max-w-6xl px-5 mx-auto mt-32 text-center ${styles.blue100Text}`}>
          {/** heading */}
          <div className={`text-4xl font-bold text-center`}>
            What&lsquo;'s Different About Manage?
          </div>
          {/** Testimonbials Container */}
          <div className={`flex flex-col mt-24 md:flex-row md:space-x-6 text-yellow-100`}>
            {/** Testimonial 1 */}
            <div className={`flex flex-col items-center p-6 space-y-6 rounded-lg bg-indigo-500 md:w-1/3`}>
              <Image
                className={`w-32 cursor-pointer`}
                src={avatarAnisha}
                alt='bbST'
                width={144}
                height={144}
              />
              <div className={`text-lg font-bold bg-indigo-500`}>Anisha Li</div>
              <div className={`text-sm pt-6 text-blue-100 bg-indigo-500`}>
                &quot;"Manage has supercharged our team&lsquo;'s workflow. The ability to
                maintain visibility on larger milestornes at all times keeps
                everyone motivated.&quot;"
              </div>
            </div>
            {/** Testimonial 2 */}
            <div className={`hidden flex-col items-center p-6 space-y-6 rounded-lg bg-indigo-500 md:flex md:w-1/3`}>
              <Image
                className={`w-32 cursor-pointer`}
                src={avatarAli}
                alt='bbST'
                width={144}
                height={144}
              />
              <div className={`text-lg font-bold bg-indigo-500`}>Anisha Li</div>
              <div className={`text-sm pt-6 text-blue-100 bg-indigo-500`}>
                “We have been able to cancel so many other subscriptions since
                using Manage. There is no more cross-channel confusion and
                everyone is much more focused.”
              </div>
            </div>
            {/** Testimonial 3 */}
            <div className={`hidden flex-col items-center p-6 space-y-6 rounded-lg bg-indigo-500 md:flex md:w-1/3`}>
              <Image
                className={`w-32 cursor-pointer`}
                src={avatarRichard}
                alt='bbST'
                width={144}
                height={144}
              />
              <div className={`text-lg font-bold bg-indigo-500`}>Anisha Li</div>
              <div className={`text-sm pt-6 text-blue-100 bg-indigo-500`}>
                &quot;“Manage has supercharged our team's workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated.&quot;”
              </div>
            </div>
          </div>
          {/* Button */}
          <div className={`my-16`}>
            <a href="#" className={`py-2 px-4 bg-red-500 rounded-full baseline hover:bg-indigo-500 minmd:block`}>
              Get Started
            </a>
          </div>
        </div>
      </section>
      {/** Final section  */}
      <section id='cta' className={`bg-gradient-to-b from-fucshia-800 to-indigo-700 ${styles.blue100Text}`}>
        {/** Flex Container */}
        <div className={`container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0`}>
          {/** Heading */}
          <div className={'text-5xl font-bold leading-tight text-center md:text-4xl md:max-w-xl md:text-left'}>
            Simplify how your team works today!
          </div>
          {/* Button */}
          <div className={`my-16 `}>
            <a href="#" className={`py-2 px-3 bg-red-500 rounded-full baseline hover:bg-indigo-500  minmd:block`}>
              Get Started
            </a>
          </div>
        </div>
      </section>
      <Script src='../utils/hamburger.js' />
    </>
  )
}

export default Header


