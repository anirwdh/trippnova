import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import FamilySVG from '../assets/svg/family';
import BeachSVG from '../assets/svg/Beach';
import WeekendSVG from '../assets/svg/Weekend';
import AdventureSVG from '../assets/svg/adventure';
import HoneymoonSVG from '../assets/svg/Honeymoon';
import PilgrimageSVG from '../assets/svg/Pilgrimage';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const autoScrollTimeout = useRef(null);
  // Trending destinations auto-scroll logic
  const trendingRef = useRef(null);
  const [trendingAutoScroll, setTrendingAutoScroll] = useState(true);
  const trendingAutoScrollTimeout = useRef(null);
  const cardWidth = 240; // width + gap
  const destinations = [
    { img: require('../assets/Images/Manali.jpg'), label: 'Manali' },
    { img: require('../assets/Images/kerala.jpg'), label: 'Kerala' },
    { img: require('../assets/Images/kedarkan.jpg'), label: 'Kedarkantha' },
    { img: require('../assets/Images/kashmir.jpg'), label: 'Kashmir' },
    { img: require('../assets/Images/Goa.jpg'), label: 'Goa' },
  ];
  // Duplicate for seamless loop
  const trendingList = [...destinations, ...destinations];
  // Add this state to the Home component:
  const [dealsHover, setDealsHover] = useState([false, false, false, false, false, false]);

  // THEME CAROUSEL AUTO-SCROLL
  const themeCarouselRef = useRef(null);
  const [themeAutoScroll, setThemeAutoScroll] = useState(true);
  const themeAutoScrollTimeout = useRef(null);

  useEffect(() => {
    const carousel = themeCarouselRef.current;
    if (!carousel) return;
    let scrollStep = 3.5; // Increased speed
    let scrollInterval;
    if (themeAutoScroll) {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += scrollStep;
        }
      }, 18); // Faster interval
    }
    return () => clearInterval(scrollInterval);
  }, [themeAutoScroll]);

  const handleThemeUserEngage = () => {
    setThemeAutoScroll(false);
    if (themeAutoScrollTimeout.current) clearTimeout(themeAutoScrollTimeout.current);
    themeAutoScrollTimeout.current = setTimeout(() => setThemeAutoScroll(true), 10000);
  };

  const handleUserEngage = () => {
    setAutoScroll(false);
    if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
    autoScrollTimeout.current = setTimeout(() => setAutoScroll(true), 10000);
  };

  useEffect(() => {
    const trending = trendingRef.current;
    if (!trending) return;
    let scrollStep = 4.5; // Increased speed
    let scrollInterval;
    const singleListWidth = trending.scrollWidth / 2;
    // On mount, set scrollLeft to the start of the first set (not 0)
    trending.scrollLeft = singleListWidth;
    if (trendingAutoScroll) {
      scrollInterval = setInterval(() => {
        if (trending.scrollLeft >= singleListWidth * 2) {
          trending.scrollLeft = trending.scrollLeft - singleListWidth;
        } else {
          trending.scrollLeft += scrollStep;
        }
      }, 12); // Faster interval
    }
    return () => clearInterval(scrollInterval);
  }, [trendingAutoScroll]);

  const handleTrendingUserEngage = () => {
    setTrendingAutoScroll(false);
    if (trendingAutoScrollTimeout.current) clearTimeout(trendingAutoScrollTimeout.current);
    trendingAutoScrollTimeout.current = setTimeout(() => setTrendingAutoScroll(true), 10000);
  };

  const scrollByCard = (dir) => {
    const trending = trendingRef.current;
    if (!trending) return;
    handleUserEngage();
    if (dir === 'left') {
      if (trending.scrollLeft <= 0) {
        trending.scrollLeft = trending.scrollWidth / 2;
      }
      trending.scrollLeft -= cardWidth;
    } else {
      if (trending.scrollLeft >= trending.scrollWidth / 2) {
        trending.scrollLeft = 0;
      }
      trending.scrollLeft += cardWidth;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardBg = scrolled ? { background: '#a78bfa', color: '#fff' } : { background: '#fff', color: '#444' };
  const cardTitle = scrolled ? { color: '#fff' } : { color: '#7c3aed' };

  // Theme carousel seamless loop: on mount, set scrollLeft to start of first set
  useEffect(() => {
    const carousel = themeCarouselRef.current;
    if (!carousel) return;
    const singleListWidth = carousel.scrollWidth / 2;
    carousel.scrollLeft = singleListWidth;
  }, []);

  // Theme carousel seamless loop: during auto-scroll, reset scrollLeft if at end
  useEffect(() => {
    const carousel = themeCarouselRef.current;
    if (!carousel) return;
    let scrollStep = 4; // Increased speed
    let scrollInterval;
    if (themeAutoScroll) {
      scrollInterval = setInterval(() => {
        const singleListWidth = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= singleListWidth * 2) {
          carousel.scrollLeft = carousel.scrollLeft - singleListWidth;
        } else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft = singleListWidth;
        } else {
          carousel.scrollLeft += scrollStep;
        }
      }, 20); // Faster interval
    }
    return () => clearInterval(scrollInterval);
  }, [themeAutoScroll]);

  // Hidden Gems Carousel State
  const hiddenGems = [
    { name: 'Ziro Valley', state: 'Arunachal Pradesh', img: require('../assets/Images/ziro.jpg') },
    { name: 'Spiti Valley', state: 'Himachal Pradesh', img: require('../assets/Images/spiti.jpg') },
    { name: 'Gir', state: 'Gujarat', img: require('../assets/Images/gir.jpeg') },
    { name: 'Chopta', state: 'Uttarakhand', img: require('../assets/Images/chopta.jpg') },
    { name: 'Jawai', state: 'Rajasthan', img: require('../assets/Images/jawai.jpg') },
  ];
  const [hiddenGemIdx, setHiddenGemIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHiddenGemIdx(idx => (idx + 1) % hiddenGems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hiddenGems.length]);

  // Hero Image Carousel State
  const heroImages = [
    require('../assets/Images/himac.jpg'),
    require('../assets/Images/kashmir.jpg'),
    require('../assets/Images/jaip.jpg'),
    require('../assets/Images/spiti.jpg'),
  ];
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImgIdx(idx => (idx + 1) % heroImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '90px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f3e8ff 50%, #dbeafe 100%)',
    }}>
      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '0 0 1rem 1rem', background: '#f3e8ff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, position: 'relative' }}>
          <img src={require('../assets/Images/logo.png')} alt="Trippnova Logo" style={{ width: 44, height: 44, objectFit: 'contain', display: 'block' }} />
          <span style={{ fontFamily: 'cursive', fontWeight: 700, fontSize: '0.95rem', color: '#000', marginTop: -2, lineHeight: 1, padding: 0, display: 'block' }}>Trippnova</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Home</a>
          <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Packages</a>
          <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Agencies</a>
          <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Contact Us</a>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ background: 'linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* Search Bar Section */}
      <section style={{ maxWidth: 900, margin: '40px auto 0 auto', background: '#e9d8fd', borderRadius: '2rem', boxShadow: '0 2px 12px #a78bfa22', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#134e23', marginBottom: '1.5rem', textAlign: 'center' }}>Where to?</h2>
        <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e9d8fd', width: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '3px solid #134e23', paddingBottom: 6, fontWeight: 600, color: '#134e23', cursor: 'pointer', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #a78bfa22', border: '2px solid #e9d8fd' }}>
              <img src={require('../assets/Images/logo.png')} alt="Search All" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>Search All</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#222', cursor: 'pointer', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #a78bfa22', border: '2px solid #e9d8fd' }}>
              <img src={require('../assets/Images/group.jpg')} alt="Group Departure" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>Group Departure</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#222', cursor: 'pointer', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #a78bfa22', border: '2px solid #e9d8fd' }}>
              <img src={require('../assets/Images/honeymoon.jpg')} alt="Honeymoon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>Honeymoon</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#222', cursor: 'pointer', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #a78bfa22', border: '2px solid #e9d8fd' }}>
              <img src={require('../assets/Images/adventure.jpg')} alt="Adventure" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>Adventure</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#222', cursor: 'pointer', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #a78bfa22', border: '2px solid #e9d8fd' }}>
              <img src={require('../assets/Images/holidays.jpg')} alt="Holidays" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>Holidays</span>
          </div>
        </div>
        <form style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, background: '#f6f6f6', borderRadius: '2rem', boxShadow: '0 2px 8px #a78bfa11', padding: '0.5rem 1rem' }}>
          <span role="img" aria-label="search" style={{ fontSize: 24, marginRight: 10, color: '#888' }}>🔍</span>
          <input type="text" placeholder="Enter your Dream Destination" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', padding: '0.7rem 0' }} />
          <button type="submit" style={{ marginLeft: 10, background: 'linear-gradient(90deg, #00e676 0%, #00c853 100%)', color: '#fff', border: 'none', borderRadius: '2rem', padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #00e67633' }}>Search</button>
        </form>
      </section>

      {/* Hero Section */}
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem 2rem 1rem', background: 'transparent' }}>
        <div style={{ flex: '1 1 350px', maxWidth: 600, padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#222' }}>Discover Your Perfect Travel Adventure Today</h1>
          <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '2rem' }}>
            Explore breathtaking destinations tailored to your interests. Whether you're seeking romance, adventure, or relaxation, we have the perfect package for you.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: '#a78bfa', color: '#fff', border: 'none', borderRadius: '1rem', padding: '0.7rem 2rem', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>Search</button>
            <button style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: '1rem', padding: '0.7rem 2rem', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>Explore</button>
          </div>
        </div>
        <div style={{ flex: '1 1 350px', maxWidth: 500, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ width: '100%', height: 0, paddingBottom: '66%', background: '#c4b5fd', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px #a78bfa55', position: 'relative', overflow: 'hidden' }}>
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hero ${idx}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '1.5rem',
                  opacity: idx === heroImgIdx ? 1 : 0,
                  transition: 'opacity 0.4s',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Trending Destinations Section */}
      <section style={{ margin: '3rem auto', maxWidth: 1300, padding: '2rem 1rem', position: 'relative' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textAlign: 'left' }}>Top Trending Destinations</h2>
        <p style={{ color: '#444', fontSize: '1.2rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          Explore the hottest travel spots around the globe.
        </p>
        {/* Left Arrow */}
        <button
          onClick={() => scrollByCard('left')}
          style={{ position: 'absolute', left: 0, top: '55%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px #a78bfa22', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <span style={{ fontSize: 24, color: '#7c3aed' }}>{'←'}</span>
        </button>
        {/* Right Arrow */}
        <button
          onClick={() => scrollByCard('right')}
          style={{ position: 'absolute', right: 0, top: '55%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px #a78bfa22', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <span style={{ fontSize: 24, color: '#7c3aed' }}>{'→'}</span>
        </button>
        <div
          ref={trendingRef}
          style={{
            display: 'flex',
            gap: '2.5rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: 8,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexWrap: 'nowrap',
          }}
        >
          {trendingList.map((dest, idx) => (
            <div
              key={idx}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220, flex: '0 0 auto', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
              onMouseDown={handleTrendingUserEngage}
              onTouchStart={handleTrendingUserEngage}
            >
              <img
                src={dest.img}
                alt={dest.label}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 32,
                  objectFit: 'cover',
                  marginBottom: 18,
                  boxShadow: '0 2px 12px #a78bfa22',
                  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                  cursor: 'pointer',
                }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <span style={{ fontWeight: 700, fontSize: '1.3rem', marginTop: 4 }}>{dest.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals You Can't Miss Section */}
      <section style={{ margin: '3rem auto', maxWidth: 1300, padding: '2rem 1rem 0 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textAlign: 'left' }}>Deals You Can't Miss</h2>
        <p style={{ color: '#444', fontSize: '1.2rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          Travel beyond boundaries with incredible savings
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '2rem',
          justifyContent: 'center',
        }}>
          {/* Kashmir */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 240, boxShadow: '0 2px 12px #a78bfa22', gridColumn: '1/2', gridRow: '1/2', background: 'none' }}
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 0 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 0 ? false : v))}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={require('../assets/Images/kashmir.jpg')} alt="Kashmir" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 240, transform: dealsHover[0] ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', willChange: 'transform', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 28, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>KASHMIR</div>
              <div style={{ fontSize: '1rem', marginTop: 2 }}>5 Nights / 6 Days</div>
            </div>
          </div>
          {/* Thailand (tall card) */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 500, boxShadow: '0 2px 12px #a78bfa22', gridColumn: '2/3', gridRow: '1/3', background: 'none' }}
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 1 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 1 ? false : v))}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={require('../assets/Images/himac.jpg')} alt="Thailand" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 500, transform: dealsHover[1] ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', willChange: 'transform', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 28, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>Shimla</div>
              <div style={{ fontSize: '1rem', marginTop: 2 }}>4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Goa (index 2) */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 240, boxShadow: '0 2px 12px #a78bfa22', gridColumn: '3/4', gridRow: '1/2', background: 'none' }}
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 2 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 2 ? false : v))}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={require('../assets/Images/Goa.jpg')} alt="Bali" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 240, transform: dealsHover[2] ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', willChange: 'transform', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 28, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>Goa</div>
              <div style={{ fontSize: '1rem', marginTop: 2 }}>4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Kerala (index 3) */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 240, boxShadow: '0 2px 12px #a78bfa22', gridColumn: '1/2', gridRow: '2/3', background: 'none' }}
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 3 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 3 ? false : v))}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={require('../assets/Images/kerala.jpg')} alt="Kerala" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 240, transform: dealsHover[3] ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', willChange: 'transform', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 28, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>KERALA</div>
              <div style={{ fontSize: '1rem', marginTop: 2 }}>4 Nights / 5 Days</div>
            </div>
          </div>
         
          {/* Singapore (index 4) */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 240, boxShadow: '0 2px 12px #a78bfa22', gridColumn: '3/4', gridRow: '2/3', background: 'none' }}
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 4 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 4 ? false : v))}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={require('../assets/Images/jaip.jpg')} alt="Singapore" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 240, transform: dealsHover[4] ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', willChange: 'transform', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 28, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>Jaipur</div>
              <div style={{ fontSize: '1rem', marginTop: 2 }}>3 Nights / 4 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Holidays By Theme Section */}
      <section style={{ margin: '3rem auto', maxWidth: 1300, padding: '2rem 1rem 0 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textAlign: 'left' }}>Explore Holidays By Theme</h2>
        <p style={{ color: '#444', fontSize: '1.2rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          Find your perfect getaway, tailored to your interests.
        </p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', minHeight: 180 }}>
          {/* Left Arrow (outside container) */}
          <button
            onClick={() => {
              handleThemeUserEngage();
              themeCarouselRef.current.scrollLeft -= 300;
            }}
            style={{ position: 'absolute', left: 'calc(50% - 480px)', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px #a78bfa22', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 24, color: '#7c3aed' }}>{'←'}</span>
          </button>
          <div style={{ width: '100%', maxWidth: 880, display: 'flex', alignItems: 'center', margin: '0 auto', position: 'relative' }}>
            {/* Carousel */}
            <div
              ref={themeCarouselRef}
              id="theme-carousel"
              style={{
                display: 'flex',
                gap: '2.5rem',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                padding: '1rem 0 2rem 0',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                maxWidth: 880,
                width: '100%',
                margin: '0 auto',
              }}
            >
              {/* Card Data */}
              {(() => {
                const themeOptions = [
                  {
                    title: 'Family Retreat',
                    subtitle: 'Explore Now',
                    icon: <FamilySVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Luxury',
                    subtitle: 'Explore Now',
                    icon: <BeachSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Weekend',
                    subtitle: 'Explore Now',
                    icon: <WeekendSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Honeymoon',
                    subtitle: 'Explore Now',
                    icon: <HoneymoonSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Adventure',
                    subtitle: 'Explore Now',
                    icon: <AdventureSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Beach',
                    subtitle: 'Explore Now',
                    icon: <BeachSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                  {
                    title: 'Pilgrimage',
                    subtitle: 'Explore Now',
                    icon: <PilgrimageSVG width={60} height={60} stroke="#3b82f6" />,
                  },
                ];
                const themeList = [...themeOptions, ...themeOptions];
                return (
                  <>
                    {themeList.map((theme, idx) => (
                      <div
                        key={theme.title + '-' + idx}
                        style={{
                          minWidth: 140,
                          minHeight: 140,
                          maxWidth: 160,
                          maxHeight: 160,
                          background: 'transparent',
                          border: '2px solid #3b82f6',
                          borderRadius: '50%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 12px #a78bfa11',
                          marginBottom: 8,
                          transition: 'background 0.2s, box-shadow 0.2s',
                          cursor: 'pointer',
                          position: 'relative',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.boxShadow = '0 4px 24px #fff2';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.boxShadow = '0 2px 12px #a78bfa11';
                        }}
                        onMouseDown={handleThemeUserEngage}
                        onTouchStart={handleThemeUserEngage}
                      >
                        <div style={{ marginBottom: 12 }}>{theme.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.89rem', color: '#222', marginBottom: 2, textAlign: 'center' }}>{theme.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#555', textAlign: 'center' }}>{theme.subtitle}</div>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
          {/* Right Arrow (outside container) */}
          <button
            onClick={() => {
              handleThemeUserEngage();
              themeCarouselRef.current.scrollLeft += 300;
            }}
            style={{ position: 'absolute', right: 'calc(50% - 480px)', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px #a78bfa22', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 24, color: '#7c3aed' }}>{'→'}</span>
          </button>
        </div>
      </section>

      {/* Explore The Hidden Gems Section */}
      <section style={{
        margin: '3rem auto',
        maxWidth: 1300,
        padding: '2rem 1rem',
        position: 'relative',
        borderRadius: 32,
        background: 'transparent',
        boxShadow: 'none',
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textAlign: 'left' }}>Explore The Hidden Gems</h2>
        <p style={{ color: '#444', fontSize: '1.2rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          Tap into the untapped tourist spots for amazing vacations.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 1000, borderRadius: 28, overflow: 'hidden', position: 'relative', boxShadow: '0 2px 12px #a78bfa22', background: '#eee', minHeight: 320 }}>
            <img src={hiddenGems[hiddenGemIdx].img} alt={hiddenGems[hiddenGemIdx].name} style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 48, bottom: 48, color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '2.2rem', letterSpacing: 1 }}>{hiddenGems[hiddenGemIdx].name}</div>
              <div style={{ fontSize: '1.2rem', marginTop: 2 }}>{hiddenGems[hiddenGemIdx].state}</div>
            </div>
          </div>
          {/* Pagination dots */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
            {hiddenGems.map((_, idx) => (
              <span key={idx} style={{ width: 18, height: 10, borderRadius: 8, background: idx === hiddenGemIdx ? '#64748b' : '#e5e7eb', display: 'inline-block', transition: 'background 0.2s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Booking With Us Section */}
      <section style={{
        margin: '3rem auto',
        maxWidth: 1050,
        padding: '2rem 1rem',
        background: '#e0e7ff',
        borderRadius: '2rem',
        boxShadow: '0 4px 32px 0 #a78bfa33, 0 1.5px 8px #a78bfa22',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <div style={{ width: '100%', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textAlign: 'center' }}>Benefits of Booking With Us</h2>
            <p style={{ color: '#444', fontSize: '1.1rem', marginBottom: 0, textAlign: 'center' }}>
              Discover the unrivalled benefits that promise memorable journeys all along.
            </p>
          </div>
          {[
            {
              icon: '🏖️',
              title: 'Customised Itineraries',
              desc: 'Enjoy our bespoke tour packages that can be tailored according to your preferences for personalised experience.'
            },
            {
              icon: '💸⬇️',
              title: 'Wallet-Friendly Prices',
              desc: 'Every traveller from worldwide can embark on unforgettable journeys with our unbeatable holiday package prices.'
            },
            {
              icon: '🔥%',
              title: 'Exciting Deals',
              desc: 'Our platform comprises perfect deals and discounts on all exclusive holiday packages to ensure value-for-money.'
            },
            {
              icon: '🧑‍💼💬',
              title: '24/7 Support',
              desc: 'Our customer support team is always available to assist you and resolve travel-related queries instantly.'
            }
          ].map((card, idx) => (
            <div
              key={card.title}
              style={{
                flex: '1 1 140px',
                minWidth: 140,
                maxWidth: 180,
                background: '#fff',
                border: '1.5px solid #c7d2fe',
                borderRadius: 18,
                padding: '1.1rem 0.7rem',
                boxShadow: '0 2px 8px #a78bfa11',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.boxShadow = '0 6px 24px #a78bfa33';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px #a78bfa11';
              }}
            >
              <span style={{ fontSize: 32, marginBottom: 10 }}>{card.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#444', fontSize: '0.92rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        background: '#f8fafc',
        borderTop: '1.5px solid #e5e7eb',
        marginTop: '3rem',
        padding: '3rem 1rem 1.5rem 1rem',
        color: '#222',
        fontSize: '1rem',
      }}>
        <div style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>About Trippnova</div>
            <div style={{ color: '#222', marginBottom: 6 }}>About Us</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Press</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Resources and Policies</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Careers</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Trust & Safety</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Contact us</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Trippnova Technology Blog</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Explore</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Write a review</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Add a Place</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Join</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Travellers' Choice</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Help Centre</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Travel Stories</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Do Business With Us</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Owners & DMO/CVB</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Business Advantage</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Sponsored Placements</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Access our Content API</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Get The App</div>
            <div style={{ color: '#222', marginBottom: 6 }}>iPhone App</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Android App</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Trippnova Sites</div>
            <div style={{ color: '#222', marginBottom: 6 }}>Book tours and attraction tickets on <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Viator</a></div>
          </div>
        </div>
        <div style={{
          maxWidth: 1300,
          margin: '2.5rem auto 0 auto',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.98rem',
          color: '#444',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>Trippnova</span>
            <span style={{ fontSize: 22, marginLeft: 4 }}>🌍</span>
            <span style={{ marginLeft: 12 }}>&copy; {new Date().getFullYear()} Trippnova LLC. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 8 }}>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Terms of Use</a>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Privacy and Cookies Statement</a>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Cookie consent</a>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Site Map</a>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Contact us</a>
            <a href="#" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Accessibility Statement</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
