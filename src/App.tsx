import { useState, useEffect } from 'react';
import { ThemeToggle, GoToTop, ArticlesSection, Footer, HorizontalScroll, GradientBlobCursor, RewardsRecognition, ProjectSection, SectionWrapper, IntroSection, TimelineSection, SkillsSection, ContactSection, CVDownloadSection, HexagonPreloader } from './components';

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isDark]);

  return (
    <>
      {loading && <HexagonPreloader  isDark={isDark} />}
      <GradientBlobCursor isDarkMode={isDark}>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
          <GoToTop />

          <IntroSection />
          <TimelineSection />
          <SkillsSection isDark={isDark} />

          <SectionWrapper isDark={isDark} titleBold="Pioneering " titleLight="Industry Projects" description={'Explore my contributions to the industry through these projects, showcasing innovation and excellence.'}>
            <HorizontalScroll>
              <ProjectSection />
            </HorizontalScroll>
          </SectionWrapper>

          <SectionWrapper isDark={isDark} titleBold="Industry Insights " titleLight="My Articles" description="Explore the articles I have published, sharing insights and knowledge on various topics.">
            <HorizontalScroll>
              <ArticlesSection />
            </HorizontalScroll>
          </SectionWrapper>

          <RewardsRecognition isDark={isDark} />
          <ContactSection isDark={isDark} />

          <CVDownloadSection />
          <Footer isDark={isDark} />
        </div>
      </GradientBlobCursor>
    </>
  );
}

export default App;
