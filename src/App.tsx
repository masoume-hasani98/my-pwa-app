import { useEffect, useState } from 'react'
import { Bell, Calendar, Heart } from 'lucide-react'

export default function App() {
  const [reminderDate, setReminderDate] = useState('')
  const [saved, setSaved] = useState<string | null>(null)


  function requestNotificationPermission() {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }

  function showNotification(message: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(message, {
        icon: "/icon-192.png", // use your app icon (PWA manifest)
      });
    } else {
      alert(message); // fallback
    }
  }

  const save = () => {
    if (!reminderDate) return
    localStorage.setItem('skincare-reminder', reminderDate)
    setSaved(reminderDate)
  
    const savedDate = new Date(reminderDate)
    const today = new Date()
    const sameDay =
      savedDate.getFullYear() === today.getFullYear() &&
      savedDate.getMonth() === today.getMonth() &&
      savedDate.getDate() === today.getDate()
  
    if (sameDay) {
      showNotification("✨ Time to visit your dermatologist today!")
    } else {
      alert('Reminder saved: ' + savedDate.toLocaleDateString())
    }
  }
  
  
  useEffect(() => {
    requestNotificationPermission()
    const s = localStorage.getItem("skincare-reminder")
    if (s) {
      setSaved(s)
  
      // Check every minute
      const interval = setInterval(() => {
        const savedDate = new Date(s)
        const today = new Date()
        const sameDay =
          savedDate.getFullYear() === today.getFullYear() &&
          savedDate.getMonth() === today.getMonth() &&
          savedDate.getDate() === today.getDate()
  
        if (sameDay) {
          showNotification("✨ Reminder: Dermatologist appointment today!")
          clearInterval(interval) // only notify once
        }
      }, 60 * 1000)
  
      return () => clearInterval(interval)
    }
  }, [])
  
  return (
    // NOTE: if mobile address bar makes vertical centering look off, replace min-h-screen with min-h-[100dvh]
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 via-amber-50 to-teal-50 p-6">
      <div className="w-full max-w-sm rounded-3xl shadow-xl p-6 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center -mt-14 mb-4 shadow-md">
          <Heart className="w-10 h-10 text-pink-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Skincare Reminder</h1>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Gentle reminders to visit your dermatologist ✨
        </p>

        <div className="flex items-center gap-2 m-6">
          <Calendar className="w-5 h-5 text-teal-500 pb-4" />
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="flex-1 mt-4 rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <button
          onClick={save}
          className="w-full my-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600 transition"
        >
          <Bell className="w-4 h-4" /> Save Reminder
        </button>

        {saved && (
          <p className="mt-4 text-sm text-gray-700">
            📌 Next visit:{' '}
            <span className="font-semibold text-pink-600">
              {new Date(saved).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
