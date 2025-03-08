import { useState, useEffect } from 'react';
import { ThemeToggle, GoToTop, ArticlesSection, Footer, TechStack, HorizontalScroll, GradientBlobCursor, RewardsRecognition, ProjectSection, SectionWrapper, IntroSection, TimelineSection, SkillsSection, ContactSection, CVDownloadSection, HexagonPreloader, VisitorCounter } from './components';
import { sectionData } from './data/sectionData';
import './styles/custom.css';
// import { fetchMetadata } from './utils/fetchMetadata';
import { ANALYTICS_CATEGORIES, trackEvent } from './utils/analytics';
import { TrackLinks } from './utils/trackLinks';

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isDark]);

  // // only one time fetching data
  // useEffect(() => {
  //   fetchMetadata('https://www.linkedin.com/pulse/why-nextjs-14-net-8-crush-microservices-2025-sourav-sadhukhan-bqzaf/?trackingId=7%2F%2BvU5VdSDuIUYbd2VpyrQ%3D%3D')
  // }, []);

  useEffect(() => {
    // Track page view when the app loads
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      dark_mode: isDark
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    trackEvent('theme_change', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      new_theme: newTheme ? 'dark' : 'light'
    });
  };

  return (
    <TrackLinks>
      <>
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
          <HexagonPreloader isDark={isDark} />
        </div>
        <div className={`min-h-screen transition-opacity duration-700 delay-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <GradientBlobCursor isDarkMode={isDark}>
            <div className={`transition-colors duration-300 ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <GoToTop />


              <IntroSection />
              <SectionWrapper isDark={isDark} titleBold={sectionData.timeline.titleBold} titleLight={sectionData.timeline.titleLight} description={sectionData.timeline.description}>
                <TimelineSection />
              </SectionWrapper>

              <SkillsSection isDark={isDark} />

              <SectionWrapper isDark={isDark} titleBold={sectionData.projects.titleBold} titleLight={sectionData.projects.titleLight} description={sectionData.projects.description}>
                <HorizontalScroll>
                  <ProjectSection />
                </HorizontalScroll>
              </SectionWrapper>

              <SectionWrapper isDark={isDark} titleBold={sectionData.articles.titleBold} titleLight={sectionData.articles.titleLight} description={sectionData.articles.description}>
              </SectionWrapper>
              <HorizontalScroll>
                <ArticlesSection />
              </HorizontalScroll>

              <RewardsRecognition isDark={isDark} />
              <ContactSection isDark={isDark} />

              <CVDownloadSection isDark={isDark} />

              <TechStack isDark={isDark} />
              <VisitorCounter appId="portfolio-2025" />
              <Footer isDark={isDark} />
            </div>
          </GradientBlobCursor>
        </div>
      </>
    </TrackLinks>
  );
}

export default App;
