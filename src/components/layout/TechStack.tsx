import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../common';
import { Github } from 'lucide-react';

interface TechStackProps {
    isDark: boolean;
}

const techStack = [
    {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
        name: 'Vite',
        icon: 'https://vitejs.dev/logo.svg',
    },
    {
        name: 'Tailwind CSS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    },
    {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
        name: 'Framer Motion',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 15 }
    },
    hover: {
        scale: 1.1,
        y: -5,
        transition: { type: 'spring', stiffness: 300, damping: 14 }
    }
};

const githubCardVariants = {
    rest: { scale: 1, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: {
        scale: 1.05,
        boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3, ease: 'easeInOut' }
    },
};

const TechStack: React.FC<TechStackProps> = ({ isDark }) => {
    return (
        <SectionWrapper
            isDark={isDark}
            titleBold="Tech Spell: "
            titleLight="Our Secret Ingredients"
            description="Behold the chaotic cauldron of code that birthed this digital monstrosity! We tossed in a pinch of wizardry, a dash of stubborn frameworks, and a whole lot of caffeinated sarcasm—stirred with tools so trendy they’d make a hipster blush. This site? It’s the Frankenstein of tech, stitched together with these cursed ingredients."
        >
            <motion.div
                className="flex flex-wrap justify-center items-center gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {techStack.map((tech) => (
                    <motion.div
                        key={tech.name}
                        className="flex flex-col items-center"
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <motion.img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-16 h-16 md:w-20 md:h-20"
                        />
                        <motion.span
                            className="mt-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                        >
                            {tech.name}
                        </motion.span>
                    </motion.div>
                ))}
            </motion.div>

            {/* GitHub Card */}
            <motion.a
                href="https://github.com/SouravFrank/about-me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 mt-12 mb-16 mx-auto w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300"
                variants={githubCardVariants}
                whileHover="hover"
            >
                <span className="text-lg font-medium">View Source on GitHub</span>
                <Github size={24} className="text-gray-700 dark:text-gray-300" />
            </motion.a>
        </SectionWrapper>
    );
};

export default TechStack;