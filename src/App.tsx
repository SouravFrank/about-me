import { useState, useEffect } from 'react';
import { ThemeToggle, GoToTop, ArticlesSection, Footer, TechStack, HorizontalScroll, GradientBlobCursor, RewardsRecognition, ProjectSection, SectionWrapper, IntroSection, TimelineSection, SkillsSection, ContactSection, CVDownloadSection, HexagonPreloader, VisitorCounter, InteractiveBackground, ThemeHint, AIArsenalSection, AIProductsSection } from './components';
import { sectionData } from './data/sectionData';
import './styles/custom.css';
// import { fetchMetadata, fetchMultipleMetadata } from './utils/fetchMetadata';
import { ANALYTICS_CATEGORIES, trackEvent } from './utils/analytics';
import { TrackLinks } from './utils/trackLinks';

const THEME_HINT_KEY = 'theme-hint-dismissed-v1';

function App() {
  // Initialize from system preference (synchronously, before first paint)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [themeSource, setThemeSource] = useState<'system' | 'user'>('system');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isDark]);

  // Listen to system theme changes — only auto-update if user hasn't manually overridden
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (themeSource === 'system') setIsDark(e.matches);
    };
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, [themeSource]);

  // only one time fetching data
  // useEffect(() => {
    // fetchMetadata('https://www.linkedin.com/pulse/lynx-vs-flutter-react-native-cross-platform-war-just-got-sadhukhan-zeswf')
  // }, []);

  // For testing multiple URLs
  // const urls = [
  //   'https://www.linkedin.com/pulse/lynx-vs-flutter-react-native-cross-platform-war-just-got-sadhukhan-zeswf',
  //   'https://www.linkedin.com/pulse/vibe-coding-future-chill-programming-sourav-sadhukhan-lglrf',
  // ];

  // useEffect(() => {
  //   // Fetch metadata for multiple URLs
  //   fetchMultipleMetadata(urls);
  // }, [urls]);

  useEffect(() => {
    // Track page view when the app loads
    trackEvent('page_view_custom', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      dark_mode: isDark,
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    setThemeSource('user');
    try {
      localStorage.setItem(THEME_HINT_KEY, '1');
    } catch {
      /* ignore */
    }

    trackEvent('theme_change', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      new_theme: newTheme ? 'dark' : 'light',
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
            <div className={`relative transition-colors duration-300 ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`} style={{ position: 'relative' }}>
              <InteractiveBackground isDark={isDark} />
              <div className="relative z-10">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <ThemeHint isDark={isDark} detectedSource={!loading ? themeSource : null} />
              <GoToTop />

              <section id="about">
                <IntroSection />
              </section>

              <section id="timeline">
                <SectionWrapper isDark={isDark} titleBold={sectionData.timeline.titleBold} titleLight={sectionData.timeline.titleLight} description={sectionData.timeline.description}>
                  <TimelineSection />
                </SectionWrapper>
              </section>

              <section id="skills">
                <SkillsSection isDark={isDark} />
              </section>

              <section id="projects">
                <SectionWrapper isDark={isDark} titleBold={sectionData.projects.titleBold} titleLight={sectionData.projects.titleLight} description={sectionData.projects.description}>
                  <HorizontalScroll>
                    <ProjectSection />
                  </HorizontalScroll>
                </SectionWrapper>
              </section>

              <section id="articles">
                <SectionWrapper isDark={isDark} titleBold={sectionData.articles.titleBold} titleLight={sectionData.articles.titleLight} description={sectionData.articles.description}></SectionWrapper>
                <HorizontalScroll>
                  <ArticlesSection />
                </HorizontalScroll>
              </section>

              <section id="ai-arsenal">
                <AIArsenalSection isDark={isDark} />
              </section>

              <section id="ai-products">
                <AIProductsSection isDark={isDark} isAppLoaded={!loading} />
              </section>

              <section id="rewards">
                <RewardsRecognition isDark={isDark} />
              </section>

              <section id="contact">
                <ContactSection isDark={isDark} />
              </section>

              <section id="cv">
                <CVDownloadSection isDark={isDark} />
              </section>

              <TechStack isDark={isDark} />
              <VisitorCounter appId="portfolio-2025" />
              <Footer isDark={isDark} />
              </div>
            </div>
          </GradientBlobCursor>
        </div>
      </>
    </TrackLinks>
  );
}

export default App;
