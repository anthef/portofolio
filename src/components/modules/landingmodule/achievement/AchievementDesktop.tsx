import { Card, Chips } from '@elements'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from '@hooks'
import { ACHIEVEMENTS } from '@constants'
import { motion } from 'framer-motion'

// Define the custom sorting order for medals
const medalRankOrder: Record<string, number> = {
  gold: 1,
  silver: 2,
  bronze: 3,
  '4th': 4,
  '5th': 5,
  'top-10': 6,
  unranked: 7,
}

const AchievementDesktop = () => {
  const [selectedTag, setSelectedTag] = useState<number>(0)
  const [filteredAchievement, setFilteredProjects] = useState(ACHIEVEMENTS)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc') // Ascending or Descending
  const { width } = useWindowSize()

  useEffect(() => {
    // Filter achievements based on selected tag (jenjang)
    let filtered = ACHIEVEMENTS
    if (selectedTag === 1) {
      filtered = ACHIEVEMENTS.filter(
        (achieve) => achieve.jenjang === 'university' || achieve.jenjang === 'All'
      )
    } else if (selectedTag === 2) {
      filtered = ACHIEVEMENTS.filter(
        (achieve) => achieve.jenjang === 'highschool' || achieve.jenjang === 'All'
      )
    } else if (selectedTag === 3) {
      filtered = ACHIEVEMENTS.filter(
        (achieve) => achieve.jenjang === 'middle' || achieve.jenjang === 'All'
      )
    } else if (selectedTag === 4) {
      filtered = ACHIEVEMENTS.filter(
        (achieve) => achieve.jenjang === 'elementary' || achieve.jenjang === 'All'
      )
    }

    // Sort filtered achievements based on medal rank and order (asc or desc)
    filtered.sort((a, b) => {
      const rankA = medalRankOrder[a.medal] ?? 7
      const rankB = medalRankOrder[b.medal] ?? 7
      return sortOrder === 'asc' ? rankA - rankB : rankB - rankA
    })

    // Set filtered and sorted achievements
    setFilteredProjects(filtered)
  }, [selectedTag, sortOrder])

  // Determine the projects to display based on selected tag
  const displayedProjects =
    selectedTag === 0 ? filteredAchievement : filteredAchievement.slice(0, 20)
  const gridColumns =
    selectedTag === 0 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"

  return (
    <div
      id="achievements"
      className="flex flex-col min-h-screen items-center justify-center gap-6 z-10 py-20 md:py-40 px-30"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        style={{
          backgroundImage: 'linear-gradient(to right, #348B96, #2A717A, #24475B, #24475B)',
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.15), 0 30px 35px rgba(0, 0, 0, 0.1)`,
          border: '2px solid #24475B',
          borderRadius: '9999px',
          outline: '3px solid rgba(36, 71, 91, 0.5)',
        }}
        className="px-6 py-3 backdrop-blur-lg relative"
      >
        <h1 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-white">
          Achievements
        </h1>
      </motion.div>

      {/* Filter Chips and Sort Button in the Same Row */}
      <div className="flex flex-wrap gap-2 z-10 py-2 justify-center items-center">
        <div className="flex gap-2">
          <Chips
            enabled={selectedTag === 0}
            onClick={() => setSelectedTag(0)}
            text="All"
            color="#9BF6FF"
          />
          <Chips
            enabled={selectedTag === 1}
            onClick={() => setSelectedTag(1)}
            text={width > 768 ? 'University' : 'Univ'}
            color="#9BF6FF"
          />
          <Chips
            enabled={selectedTag === 2}
            onClick={() => setSelectedTag(2)}
            text={width > 768 ? 'Highschool' : 'HS'}
            color="#9BF6FF"
          />
          <Chips
            enabled={selectedTag === 3}
            onClick={() => setSelectedTag(3)}
            text={width > 768 ? 'Middle' : 'Mid'}
            color="#9BF6FF"
          />
          <Chips
            enabled={selectedTag === 4}
            onClick={() => setSelectedTag(4)}
            text={width > 768 ? 'Elemantary' : 'Elem'}
            color="#9BF6FF"
          />
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="mt-4 md:ml-4 md:mt-0 md:px-4 md:py-2 px-4 py-2 border-2 border-[#9BF6FF] text-[#9BF6FF] rounded-full flex items-center justify-center gap-2"
        >
          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`grid ${gridColumns} gap-x-10 gap-y-36 z-10 w-full max-w-7xl`}
      >
        {displayedProjects.map((project, index) => (
          <Card variant={4} key={index} props={project} />
        ))}
      </motion.div>

      {selectedTag !== 0 && filteredAchievement.length > 20 && (
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

export default AchievementDesktop
