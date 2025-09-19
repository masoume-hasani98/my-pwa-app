import { useState, useEffect } from "react"
import { Bell, Calendar, Heart } from "lucide-react"

function App() {
  const [reminderDate, setReminderDate] = useState<string>("")
  const [savedReminder, setSavedReminder] = useState<string | null>(null)

  // Load saved reminder
  useEffect(() => {
    const stored = localStorage.getItem("skincare-reminder")
    if (stored) setSavedReminder(stored)
  }, [])

  const saveReminder = () => {
    if (reminderDate) {
      localStorage.setItem("skincare-reminder", reminderDate)
      setSavedReminder(reminderDate)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-teal-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Heart className="text-pink-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Skincare Reminder
        </h1>
        <p className="text-gray-500 mb-6">
          Stay on top of your skin health ✨  
          Don’t forget your dermatologist visit!
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-teal-500" />
          <input
            type="date"
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-pink-300 outline-none"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>

        <button
          onClick={saveReminder}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-pink-500 text-white font-medium rounded-xl shadow-md hover:bg-pink-600 transition"
        >
          <Bell className="w-5 h-5" />
          Save Reminder
        </button>

        {savedReminder && (
          <p className="mt-6 text-gray-700">
            📌 Your next dermatologist visit is set for{" "}
            <span className="font-semibold text-pink-600">
              {new Date(savedReminder).toDateString()}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default App
