import React from 'react';
import '../components/Footer'; // Make sure to adjust the path if you have an external CSS file
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <main>
        <section>
          <h1>Shoo away the boredom and laziness</h1>
          <div className="bleed-canvas">
            <img className="moving-item1" src="https://www.freeiconspng.com/thumbs/hands-png/ipad-hand-gesture-png-12.png" alt="" />
            <img className="moving-item2" src="" alt="" />
            <img className="moving-item3" src="" alt="" />
            <img className="moving-item4" src="https://www.freeiconspng.com/thumbs/hands-png/ipad-hand-gesture-png-12.png" alt="" />
            <img className="moving-item5" src="" alt="" />
          </div>
        </section>
        <section>
          <p>
            Our goal is to bring the sense of accomplishement to a community
            <a href=""></a>
          </p>
          <div class="center-container">
          <img className="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FRibbon-Award.png&f=1&nofb=1&ipt=4c947c43d81fe4f8685dce0e7d3ac4b6575f08a5070c0afa72bcea2aeba87a5c&ipo=images" alt="" />
        </div>
        </section>
        <section>
          <h2>Register you may even win some awards on your journey</h2>
        </section>
        <section>
          
          <div className="spacing-box"></div>
          
          <div className="box">
            <div className="box__content">
              <p>
              Still not sure? How about reading about other peoples experiences to make your decision?
              </p>
            </div>
          </div>
          <div className="sticky">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F4%2FPeople-Download-PNG-Image.png&f=1&nofb=1&ipt=94b2023865e266f6e2f255d4546871538fcd2efbb7705a1a5f47458f90895a0f&ipo=images"
              alt=""
            />
          </div>
          <div className="box box--two">
            <div className="box__content">
              <p>
                <span className="logo"></span>
                <span>...</span>,,,.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="moving-item3--mini">
            <div>
              <svg
                className="bird"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... (rest of your SVG path) ... */}
              </svg>
            </div>
            <div>
              <a href="">
                <span className="logo"></span>
                Follow us here.
              </a>
            </div>
          </div>
          <div className="moving-item3--mini">
            <div>
              <svg
                className="bear"
                viewBox="0 0 969 955"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... (rest of your SVG path) ... */}
              </svg>
            </div>
            <div>
              <a href="">
                <span className="logo"></span>
                Merch.
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
