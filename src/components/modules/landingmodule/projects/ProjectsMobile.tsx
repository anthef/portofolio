import { Card, Chips } from '@elements'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from '@hooks'
import { PROJECTS } from '@constants'
import { motion } from 'framer-motion'

const ProjectsMobile = () => {
  const [selectedTag, setSelectedTag] = useState<number>(0)
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS)
  const { width } = useWindowSize()

  useEffect(() => {
    if (selectedTag === 1) {
      setFilteredProjects(
        PROJECTS.filter(
          (project) => project.type === 'DS' || project.type === 'All'
        )
      )
    } else if (selectedTag === 2) {
      setFilteredProjects(
        PROJECTS.filter(
          (project) => project.type === 'SE' || project.type === 'All'
        )
      )
    } else {
      setFilteredProjects(PROJECTS)
    }
  }, [selectedTag])

  const displayedProjects =
    selectedTag === 0 ? filteredProjects : filteredProjects.slice(0, 2)
  const gridColumns =
    selectedTag === 0 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"

  return (
    <div
      id="projects"
      className="flex flex-col min-h-screen items-center justify-center gap-6 z-10 py-20 md:py-40 px-30"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        style={{
          backgroundImage: 'linear-gradient(to right, #348B96, #2A717A, #24475B, #24475B)',
          boxShadow: `
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 10px 15px rgba(0, 0, 0, 0.2),
            0 20px 25px rgba(0, 0, 0, 0.15),
            0 30px 35px rgba(0, 0, 0, 0.1)
          `,
          border: '2px solid #24475B',
          borderRadius: '9999px',
          outline: '3px solid rgba(36, 71, 91, 0.5)',
        }}
        className="
          px-6 py-3 
          backdrop-blur-lg 
          relative
        "
      >
        <h1 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-white">
          Projects
        </h1>
      </motion.div>

      <div className="flex flex-wrap gap-2 z-10 py-2 justify-center">
        <Chips
          enabled={selectedTag === 0}
          onClick={() => setSelectedTag(0)}
          text="All"
          color="#9BF6FF"
        />
        <Chips
          enabled={selectedTag === 1}
          onClick={() => setSelectedTag(1)}
          text={width > 768 ? 'Data Science' : 'DS'}
          color="#9BF6FF"
        />
        <Chips
          enabled={selectedTag === 2}
          onClick={() => setSelectedTag(2)}
          text={width > 768 ? 'Software Engineering' : 'SE'}
          color="#9BF6FF"
        />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`grid ${gridColumns} gap-x-10 gap-y-36 z-10 w-full max-w-7xl`}
      >
        {displayedProjects.map((project, index) => (
          <Card variant={3} key={index} props={project} />
        ))}
      </motion.div>

      {selectedTag !== 0 && filteredProjects.length > 2 && (
        <button
          onClick={() => setSelectedTag(0)} 
          className="mt-4 px-4 py-2 bg-[#23314B] text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default ProjectsMobile
