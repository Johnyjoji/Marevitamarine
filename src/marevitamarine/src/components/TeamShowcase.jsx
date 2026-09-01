import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TeamShowcase — Interactive team member grid with hover effects
 * Inspired by the myteam reference component
 * Photos arranged in staggered columns with synchronized hover states
 */

export default function TeamShowcase({ members = [] }) {
  const [hoveredId, setHoveredId] = useState(null);

  // Distribute members across 3 columns
  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14 select-none w-full max-w-6xl mx-auto">
      {/* Left: Photo Grid */}
      <div className="flex gap-3 flex-shrink-0 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[130px] h-[150px] sm:w-[155px] sm:h-[175px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 - Offset from top */}
        <div className="flex flex-col gap-3 mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[145px] h-[165px] sm:w-[172px] sm:h-[192px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 - Smaller offset */}
        <div className="flex flex-col gap-3 mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[136px] h-[156px] sm:w-[162px] sm:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* Right: Member Name List */}
      <div className="flex flex-col gap-5 pt-0 lg:pt-2 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * PhotoCard — Individual team member photo with hover effects
 */
function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <motion.div
      className={`overflow-hidden rounded-xl cursor-pointer flex-shrink-0 relative ${className}`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isDimmed ? 0.6 : 1,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-all duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.8)',
        }}
      />

      {/* Overlay on hover */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-transparent flex flex-col justify-end p-4"
          >
            <p className="text-white font-semibold text-sm">{member.name}</p>
            <p className="text-marine-400 text-xs font-mono uppercase tracking-wider">
              {member.role}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border highlight on active */}
      {isActive && (
        <div className="absolute inset-0 ring-2 ring-marine-400 ring-offset-2 ring-offset-navy-900 rounded-xl pointer-events-none" />
      )}
    </motion.div>
  );
}

/**
 * MemberRow — Name and role listing with interactive indicator
 */
function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <motion.div
      className="cursor-pointer"
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isDimmed ? 0.5 : 1,
        x: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Name + Indicator */}
      <div className="flex items-center gap-3">
        <motion.span
          className="rounded-md flex-shrink-0 bg-white"
          animate={{
            width: isActive ? '20px' : '16px',
            height: '12px',
            opacity: isActive ? 1 : 0.25,
          }}
          transition={{ duration: 0.3 }}
        />
        <span
          className={`text-lg font-semibold leading-none tracking-tight transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-white/80'
          }`}
        >
          {member.name}
        </span>
      </div>

      {/* Role */}
      <p className="mt-2 pl-[31px] text-[10px] font-medium uppercase tracking-[0.25em] text-navy-400">
        {member.role}
      </p>
    </motion.div>
  );
}
