import { useState, useEffect } from 'react';
import { ThemeToggle, GoToTop, ArticlesSection, Footer, TechStack, HorizontalScroll, GradientBlobCursor, RewardsRecognition, ProjectSection, SectionWrapper, IntroSection, TimelineSection, SkillsSection, ContactSection, CVDownloadSection, HexagonPreloader } from './components';
import { sectionData } from './data/sectionData';
import './styles/custom.css';
// import { fetchMetadata } from './utils/fetchMetadata';

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isDark]);

  // only one time fetching data
  // useEffect(() => {
  //   fetchMetadata('https://www.linkedin.com/pulse/master-dry-yagni-kiss-frontend-code-principles-made-simple-sadhukhan-buokf/?trackingId=%2F8sh8PO%2Bf5vZ7I8WSTC3Tg%3D%3D')
  // }, []);

  return (
    <>
      <div className={`transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <HexagonPreloader isDark={isDark} />
      </div>
      <div className={`min-h-screen transition-opacity duration-700 delay-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <GradientBlobCursor isDarkMode={isDark}>
          <div className={`transition-colors duration-300 ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
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

            <Footer isDark={isDark} />
          </div>
        </GradientBlobCursor>
      </div>
    </>
  );
}

export default App;
