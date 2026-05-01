import { useMemo, useState } from 'react'

import {
  Brain,
  Database,
  Sparkles,
  Search,
} from 'lucide-react'

import {
  useDatasets,
  useInsights,
} from '../hooks/useDatasets'

import InsightCard from '../components/ui/InsightCard'

export default function Insights() {

  const { data: datasets = [] } =
    useDatasets()

  const [selectedId, setSelectedId] =
    useState('')

  const [filter, setFilter] =
    useState('all')

  const [search, setSearch] =
    useState('')

  const {
    data: insights = [],
    isLoading,
  } = useInsights(selectedId)

  const highCount =
    insights.filter(
      i => i.severity === 'high'
    ).length

  const mediumCount =
    insights.filter(
      i => i.severity === 'medium'
    ).length

  const infoCount =
    insights.filter(
      i => i.severity === 'info'
    ).length

  const filteredInsights =
    useMemo(() => {

      return insights.filter(insight => {

        const matchesSeverity =
          filter === 'all'
            ? true
            : insight.severity === filter

        const matchesSearch =
          insight.title
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          insight.message
            .toLowerCase()
            .includes(search.toLowerCase())

        return (
          matchesSeverity &&
          matchesSearch
        )

      })

    }, [insights, filter, search])

  const filterButtons = [
    {
      key: 'all',
      label: 'All',
      count: insights.length,
    },

    {
      key: 'high',
      label: 'High',
      count: highCount,
    },

    {
      key: 'medium',
      label: 'Medium',
      count: mediumCount,
    },

    {
      key: 'info',
      label: 'Info',
      count: infoCount,
    },
  ]

  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-800
        bg-gradient-to-br
        from-gray-900
        via-gray-950
        to-black
        p-8
      ">

        {/* Glow */}
        <div className="
          absolute
          top-0
          right-0
          w-80
          h-80
          bg-blue-500/10
          rounded-full
          blur-3xl
        " />

        <div className="relative">

          <div className="
            flex
            items-center
            gap-4
            mb-5
          ">

            <div className="
              p-4
              rounded-2xl
              bg-blue-500/10
              border
              border-blue-500/20
            ">
              <Brain className="
                w-8
                h-8
                text-blue-400
              " />
            </div>

            <div>

              <h1 className="
                text-3xl
                font-bold
                text-white
              ">
                AI Insights
              </h1>

              <p className="
                text-gray-400
                mt-1
              ">
                Intelligent observations automatically generated from your datasets
              </p>

            </div>

          </div>

          {/* Summary Cards */}
          <div className="
            grid
            grid-cols-2
            md:grid-cols-5
            gap-4
            mt-8
          ">

            {/* Datasets */}
            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-3
              ">

                <Database className="
                  w-5
                  h-5
                  text-blue-400
                " />

                <span className="
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-gray-500
                ">
                  DATA
                </span>

              </div>

              <p className="
                text-2xl
                font-bold
                text-white
              ">
                {datasets.length}
              </p>

              <p className="
                text-gray-500
                text-sm
                mt-1
              ">
                Datasets
              </p>

            </div>

            {/* Total Insights */}
            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-3
              ">

                <Sparkles className="
                  w-5
                  h-5
                  text-purple-400
                " />

                <span className="
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-gray-500
                ">
                  AI
                </span>

              </div>

              <p className="
                text-2xl
                font-bold
                text-white
              ">
                {insights.length}
              </p>

              <p className="
                text-gray-500
                text-sm
                mt-1
              ">
                Insights
              </p>

            </div>

            {/* High */}
            <div className="
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              p-5
            ">

              <p className="
                text-2xl
                font-bold
                text-red-400
              ">
                {highCount}
              </p>

              <p className="
                text-gray-400
                text-sm
                mt-1
              ">
                High Priority
              </p>

            </div>

            {/* Medium */}
            <div className="
              rounded-2xl
              border
              border-yellow-500/20
              bg-yellow-500/10
              p-5
            ">

              <p className="
                text-2xl
                font-bold
                text-yellow-400
              ">
                {mediumCount}
              </p>

              <p className="
                text-gray-400
                text-sm
                mt-1
              ">
                Medium
              </p>

            </div>

            {/* Info */}
            <div className="
              rounded-2xl
              border
              border-blue-500/20
              bg-blue-500/10
              p-5
            ">

              <p className="
                text-2xl
                font-bold
                text-blue-400
              ">
                {infoCount}
              </p>

              <p className="
                text-gray-400
                text-sm
                mt-1
              ">
                Informational
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Dataset Selection */}
      <div className="
        bg-gray-900
        border
        border-gray-800
        rounded-2xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
          flex-wrap
          gap-4
        ">

          <div>

            <h2 className="
              text-white
              text-lg
              font-semibold
            ">
              Select Dataset
            </h2>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">
              Choose a dataset to generate intelligent insights
            </p>

          </div>

          <select
            value={selectedId}

            onChange={e =>
              setSelectedId(e.target.value)
            }

            className="
              bg-gray-950
              border
              border-gray-700
              text-gray-200

              rounded-xl

              px-4
              py-3

              min-w-[260px]

              focus:outline-none
              focus:border-blue-500

              transition-colors
            "
          >

            <option value="">
              Choose Dataset
            </option>

            {datasets.map(d => (

              <option
                key={d._id}
                value={d._id}
              >
                {d.name}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* Empty State */}
      {!selectedId && (

        <div className="
          rounded-3xl
          border
          border-dashed
          border-gray-800
          bg-gray-900/40
          p-20
          text-center
        ">

          <div className="
            inline-flex
            p-5
            rounded-3xl
            bg-blue-500/10
            border
            border-blue-500/20
            mb-6
          ">

            <Brain className="
              w-12
              h-12
              text-blue-400
            " />

          </div>

          <h2 className="
            text-2xl
            font-bold
            text-white
            mb-4
          ">
            Discover Intelligent Insights
          </h2>

          <p className="
            text-gray-500
            max-w-2xl
            mx-auto
            leading-relaxed
          ">
            Select a dataset to automatically uncover
            correlations, anomalies, variability
            and statistical intelligence.
          </p>

        </div>

      )}

      {/* Loading */}
      {selectedId && isLoading && (

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        ">

          {[1,2,3,4].map(i => (

            <div
              key={i}

              className="
                relative
                overflow-hidden

                h-44

                rounded-2xl

                border
                border-gray-800

                bg-gray-900
              "
            >

              <div className="
                absolute
                inset-0

                animate-pulse

                bg-gradient-to-r
                from-transparent
                via-white/5
                to-transparent
              " />

            </div>

          ))}

        </div>

      )}

      {/* Insights */}
      {selectedId && !isLoading && (

        <div className="space-y-6">

          {/* Toolbar */}
          <div className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-4
          ">

            {/* Filters */}
            <div className="
              flex
              flex-wrap
              gap-3
            ">

              {filterButtons.map(btn => (

                <button
                  key={btn.key}

                  onClick={() =>
                    setFilter(btn.key)
                  }

                  className={`
                    px-4
                    py-2

                    rounded-xl

                    border

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      filter === btn.key

                      ? `
                        bg-blue-500/20
                        border-blue-500/30
                        text-blue-300
                        shadow-lg
                        shadow-blue-500/10
                      `

                      : `
                        bg-gray-900
                        border-gray-800
                        text-gray-400
                        hover:text-white
                        hover:border-gray-700
                      `
                    }
                  `}
                >

                  {btn.label}

                  <span className="
                    ml-2
                    text-xs
                    opacity-70
                  ">
                    {btn.count}
                  </span>

                </button>

              ))}

            </div>

            {/* Search */}
            <div className="
              relative
              w-full
              xl:w-80
            ">

              <Search className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                w-4
                h-4

                text-gray-500
              " />

              <input
                type="text"

                value={search}

                onChange={e =>
                  setSearch(e.target.value)
                }

                placeholder="Search insights..."

                className="
                  w-full

                  bg-gray-900
                  border
                  border-gray-800

                  rounded-xl

                  pl-11
                  pr-4
                  py-3

                  text-gray-200
                  text-sm

                  placeholder:text-gray-500

                  focus:outline-none
                  focus:border-blue-500

                  transition-colors
                "
              />

            </div>

          </div>

          {/* Section Header */}
          <div>

            <h2 className="
              text-2xl
              font-bold
              text-white
            ">
              Generated Insights
            </h2>

            <p className="
              text-gray-500
              mt-1
            ">
              AI-generated observations and recommendations
            </p>

          </div>

          {/* Empty Filter State */}
          {filteredInsights.length === 0 && (

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-900
              p-16
              text-center
            ">

              <Search className="
                w-10
                h-10
                text-gray-600
                mx-auto
                mb-4
              " />

              <h3 className="
                text-white
                font-semibold
                text-lg
                mb-2
              ">
                No insights found
              </h3>

              <p className="
                text-gray-500
              ">
                Try changing filters or search terms
              </p>

            </div>

          )}

          {/* Cards */}
          {filteredInsights.length > 0 && (

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
            ">

              {filteredInsights.map(
                (insight, index) => (

                  <InsightCard
                    key={index}
                    insight={insight}
                  />

                )
              )}

            </div>

          )}

        </div>

      )}

    </div>
  )
}