import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function ProductAbout({ description, heading }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="w-full mx-auto">
      <div className="rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-full
            flex items-center justify-between
            text-left
            py-3 sm:py-4
            px-2 sm:px-0
            border-b border-gray-200
            hover:bg-gray-50
            transition-colors
          "
        >
          <h2 className="
            text-lg sm:text-2xl
            font-semibold
            text-gray-900
            leading-snug
          ">
            {heading}
          </h2>

          <span className="ml-3 flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            )}
          </span>
        </button>

        {isOpen && (
          <div className="pt-3 sm:pt-4 pb-5 px-1 sm:px-0">
            <p className="
              text-sm sm:text-base
              text-gray-700
              leading-relaxed
            ">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
