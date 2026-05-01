import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Info,
} from 'lucide-react'

const styles = {
  high: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    glow: 'hover:shadow-red-500/10',
  },

  medium: {
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    glow: 'hover:shadow-yellow-500/10',
  },

  info: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    glow: 'hover:shadow-blue-500/10',
  },
}

const icons = {
  correlation: TrendingUp,
  variance: AlertTriangle,
  recommendation: Brain,
  overview: Info,
}

export default function InsightCard({
  insight,
}) {

  const Icon =
    icons[insight.type] || Info

  const theme =
    styles[insight.severity] ||
    styles.info

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        ${theme.border}
        ${theme.bg}

        backdrop-blur-sm

        p-6

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-2xl

        ${theme.glow}
      `}
    >

      {/* Glow Accent */}
      <div className="
        absolute
        top-0
        right-0
        w-32
        h-32
        bg-white/5
        rounded-full
        blur-3xl
      " />

      <div className="
        relative
        flex
        items-start
        gap-4
      ">

        {/* Icon */}
        <div className="
          shrink-0
          p-3
          rounded-xl
          bg-black/20
          border
          border-white/10
        ">
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">

          <div className="
            flex
            items-center
            justify-between
            gap-4
            mb-3
          ">

            <h3 className="
              text-white
              font-semibold
              text-lg
            ">
              {insight.title}
            </h3>

            <span className="
              text-[10px]
              uppercase
              tracking-widest
              text-gray-400
              border
              border-white/10
              rounded-full
              px-2
              py-1
            ">
              {insight.severity}
            </span>

          </div>

          <p className="
            text-gray-300
            text-sm
            leading-relaxed
          ">
            {insight.message}
          </p>

        </div>

      </div>

    </div>
  )
}