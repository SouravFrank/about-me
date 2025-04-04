// Define the interface for article structure
interface Article {
  title: string;
  description: string;
  image: string;
  url: string;
}

// Export the articles array with proper typing
export const articles: Article[] = [
  {
    title: 'Building Blocks of Scalable Apps: React Meets Spring Boot',
    description: 'Learn to create modular apps with ReactJS frontend & Spring Boot backend. Follow this hands-on guide for APIs, authentication, task management and analytics.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQEtThezomJ2vw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732651395281?e=2147483647&v=beta&t=mMpqnTp5M--_dKS4tcIj8YueosUximiUbnPHDgYoxn0',
    url: 'https://www.linkedin.com/pulse/building-blocks-scalable-apps-react-meets-spring-boot-sadhukhan-1ag6f',
  },
  {
    title: 'Why Next.js 14 + .NET 8 Crush Microservices in 2025!',
    description: 'Build scalable microservices with Next.js 14 & .NET 8! Learn gRPC, RSCs, and K8s for top performance in 2025. Code-along guide for senior devs.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQEouxX86Wlfbw/article-cover_image-shrink_720_1280/B4DZVJL50cGcAM-/0/1740689617547?e=2147483647&v=beta&t=cKdaOCrxilVLFPjwM-DQ1ruUmqvIFBRMQOGh_TgneWM',
    url: 'https://www.linkedin.com/pulse/why-nextjs-14-net-8-crush-microservices-2025-sourav-sadhukhan-bqzaf/?trackingId=7/+vU5VdSDuIUYbd2VpyrQ==',
  },
  {
    title: 'LYNX vs. Flutter vs. React Native: The Cross-Platform War Just Got Personal! ⚔️🚀',
    description: 'Is LYNX the future of cross-platform development? See how it stacks up against Flutter & React Native with real-world benchmarks, code, and expert insights.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQFYlBJ0MXd4NQ/article-cover_image-shrink_720_1280/B4DZWgxO6tG4AI-/0/1742159018873?e=1749081600&v=beta&t=wM2hqaLDxtiIwkM15H387ex5VdFNjRkz7zQBQrYX6CU',
    url: 'https://www.linkedin.com/pulse/lynx-vs-flutter-react-native-cross-platform-war-just-got-sadhukhan-zeswf',
  },
  {
    title: 'Vibe Coding: The Future of Chill Programming',
    description: 'Explore Vibe Coding: AI tools like Cursor & Replit make coding chill for Gen Z devs in 2025. Get the hip-hop vibe, top resources, and start building!',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQHpaiJqnORUrw/article-cover_image-shrink_600_2000/B4DZW1JXsdHkAQ-/0/1742500891215?e=1749081600&v=beta&t=mCMY3ZgN4J6S3AxI4yYzPyWsqwRpWaA_IUnBLJMguS4',
    url: 'https://www.linkedin.com/pulse/vibe-coding-future-chill-programming-sourav-sadhukhan-lglrf/?trackingId=UjEHiundQ9+jUjL7+Uk2gQ==',
  },
  {
    title: 'React 19 Unboxed ⚛️',
    description: "Discover React 19's groundbreaking features: React Compiler, Server Components, streamlined form handling, web component integration, and more! #React19 #WebDev",
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQFIC2riA3tsCA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1713609088007?e=2147483647&v=beta&t=1OxjvwMv8vvBYxCy1KHfNW0VI_-NLeha5guWj2_xPHg',
    url: 'https://www.linkedin.com/pulse/react-19-unboxed-sourav-sadhukhan-wpz1f',
  },
  {
    title: 'Git Like a Pro: Advanced Commands and Use Cases to Save Your Team from Chaos 🚀',
    description: 'Master advanced Git commands, disaster recovery, and workflows for seamless team collaboration. Learn real-world solutions to handle conflicts, rollbacks & more',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQHUcB6hRK20Tw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1736701518436?e=2147483647&v=beta&t=VoGgDMJo-NayuTS6Ubw8DUfeGtClK54zYRQGVHu9ZhQ',
    url: 'https://www.linkedin.com/pulse/git-like-pro-advanced-commands-use-cases-save-your-team-sadhukhan-ufvkf',
  },
  {
    title: 'Full-Stack Magic: Building a React + Node.js Powerhouse for Seamless File Handling 🚀',
    description: 'Learn how to combine React.js and Node.js in a single codebase for seamless file handling, powerful APIs, and full-stack efficiency. Step-by-step guide included',
    image: 'https://media.licdn.com/dms/image/v2/D4E12AQFsJ1AfE_NtbA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734465919071?e=2147483647&v=beta&t=ADmvrnvhULiU3uU2jpjHcy1e6go28pa_L9DqzJVieM8',
    url: 'https://www.linkedin.com/pulse/full-stack-magic-building-react-nodejs-powerhouse-file-sadhukhan-jik4f',
  },
  {
    title: 'Going Micro: Microfrontends in React Native for Indian Apps',
    description: 'Discover how microfrontends can transform your React Native app, inspired by examples like Zomato, Flipkart, and Paytm. Build scalable, modular apps today!',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQFU_bBpi8h3gg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1731763916252?e=2147483647&v=beta&t=b-F3gZ7h9fgZ5WJO0hGMmtasjqu-LNYj59Epo6mOqgI',
    url: 'https://www.linkedin.com/pulse/going-micro-microfrontends-react-native-indian-apps-sourav-sadhukhan-axwpf',
  },

  {
    title: 'Discover the Technologies Behind Your Favorite Mobile Apps! 🪔',
    description: 'Explore the technology behind popular mobile apps like GPay, Instagram, and more. Learn why React Native, Flutter, and hybrid solutions lead in app development.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQFNyKR4u4pxOQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723575499552?e=2147483647&v=beta&t=3bpGPo9hRUbwAxLGY3uAghqXktFmcAS2MsDXbmRo4c8',
    url: 'https://www.linkedin.com/pulse/discover-technologies-behind-your-favorite-mobile-apps-sadhukhan-anfvf',
  },
  {
    title: 'Elevate Your Coding: The Art of Naming Variables and Functions',
    description: 'Elevate your code with top naming skills! Boost readability, maintainability, and wow-factor with descriptive names for variables and functions. Upgrade now!',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQF0Dg2HBDljUA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1719859009384?e=2147483647&v=beta&t=4ReoJODwi69DaIZ5TZduOQhYKujEM2ZmGTta2dQHGVU',
    url: 'https://www.linkedin.com/pulse/elevate-your-coding-art-naming-variables-functions-sourav-sadhukhan-bbabf',
  },
  {
    title: 'Microfrontend Architecture: The Future of Scalable Web Applications 🚀',
    description: 'Discover how microfrontend architecture can transform your web development with modular npm packages, independent deployments, and scalable solutions.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQHNObWk0ng3iw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1729608149260?e=2147483647&v=beta&t=eTOKOq3FhP7rmkwQoQXXmoL96lkg47F0uJrqJvMlY6A',
    url: 'https://www.linkedin.com/pulse/microfrontend-architecture-future-scalable-web-sourav-sadhukhan-mmixf',
  },
  {
    title: "Mastering S.O.L.I.D Principles in JavaScript: A Beginner's Guide 🚀",
    description: 'Master SOLID principles in JavaScript! Learn practical tips, beginner-friendly examples, and real-world applications for cleaner, maintainable code. #JavaScript',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQE7ha2Vy6ooTQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721997154609?e=2147483647&v=beta&t=UVzynZTs6fLCFuDF8qYca848J5b4L__rCLBEr6NISt4',
    url: 'https://www.linkedin.com/pulse/mastering-solid-principles-javascript-beginners-guide-sadhukhan-nv7lf',
  },
  {
    title: 'Master DRY, YAGNI & KISS: Frontend Code Principles Made Simple 🎭',
    description: 'Discover how DRY, YAGNI, and KISS principles simplify frontend development. Learn to write clean, maintainable JavaScript code while avoiding common pitfalls!',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQF4gTcfvFdn4g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1737751174713?e=2147483647&v=beta&t=pbREWbT8aZvuNybxXoRm6ORZzWVyEgvhTfCuWbQ9LqI',
    url: 'https://www.linkedin.com/pulse/master-dry-yagni-kiss-frontend-code-principles-made-simple-sadhukhan-buokf/?trackingId=/8sh8PO+f5vZ7I8WSTC3Tg==',
  },
  {
    title: 'Level up your dev workflow with these VS Code extensions!',
    description: 'Explore essential VS Code extensions like Prettier, GitHub Copilot, and more to enhance your coding efficiency and streamline your workflow.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQEZE0d9TujfXQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1711228332176?e=2147483647&v=beta&t=24QuKi_MLo0kD5qszxxfCGKHQKpgW9euKryF9yDeKFY',
    url: 'https://www.linkedin.com/pulse/level-up-your-dev-workflow-vs-code-extensions-sourav-sadhukhan-nbzxf',
  },
  {
    title: 'Mastering the Art of Refactoring: Transform Your Code, Transform Your Career!',
    description: 'Discover power of code refactoring with From Chaos to Clarity: The Ultimate Guide to Code Refactoring. Unlock cleaner, efficient, and maintainable code today',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQH_AzcE-cSt7Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1718820093349?e=2147483647&v=beta&t=TlL5nTB-FdnIzE9-pqjaV8AUrFXmDUTt6kzFKeM1NV8',
    url: 'https://www.linkedin.com/pulse/mastering-art-refactoring-transform-your-code-career-sourav-sadhukhan-fah0f',
  },
  {
    title: 'Microfrontends Part 2: Mastering the Next Level of Modular Web Architecture',
    description: 'Unleash the power of advanced microfrontend architectures! Explore techniques like event-driven communication, dynamic module federation, lazy loading & more.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQE_TGaZr2LrnQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1730233318583?e=2147483647&v=beta&t=kAmZvdU-VYmEt3HbgB8W9VivtPyAbtUrTTwNO9jH2mU',
    url: 'https://www.linkedin.com/pulse/microfrontends-part-2-mastering-next-level-modular-web-sadhukhan-yetvf',
  },
  {
    title: 'Explore Thunder Client🌩️: The Ultimate Alternative to Postman for Seamless API Testing in Visual Studio Code! 💻',
    description: 'Discover Thunder Client, the top Postman alternative for API testing in VS Code. Integrate, customize, and test APIs seamlessly with Thunder Client.',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQHDNZRqpQmZqQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721174423923?e=2147483647&v=beta&t=EnieXJFgw0Alv1g4ifTOCYX7XitrWFG0j2YaJLRYZQ0',
    url: 'https://www.linkedin.com/pulse/explore-thunder-client-ultimate-alternative-postman-api-sadhukhan-67ryf',
  },
];

export type { Article };
