"use client"

interface SidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const categories = [
    { id: "dashboard", label: "Dashboard" },
    { id: "Room work", label: "Room work" },
    { id: "Electrical", label: "Electrical"},
    { id: "Carpenter", label: "Carpenter"},
    { id: "Washroom", label: "Washroom"},
    { id: "Vending", label: "Vending"},
  ]

  return (
    <div className="w-64 bg-cyan-600 text-white min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-cyan-600 font-bold text-sm">B</span>
        </div>
        <h1 className="text-lg font-semibold">Bit FeedBack Hub</h1>
        
      </div>

      <nav className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeCategory === category.id ? "bg-cyan-900 bg-opacity-50" : "hover:bg-cyan-900 hover:bg-opacity-50"
            }`}
          >
            <span className="mr-3">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
