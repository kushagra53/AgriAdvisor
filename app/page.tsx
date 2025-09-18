"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Camera,
  MessageCircle,
  TrendingUp,
  MapPin,
  Sun,
  CloudRain,
  Leaf,
  Star,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Moon,
  SunMedium,
} from "lucide-react"

export default function HomePage() {
  const [location, setLocation] = useState<string>("Getting location...")
  const [darkMode, setDarkMode] = useState(false)

  // Sync dark mode class on document root
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [darkMode])

  const [weather, setWeather] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
  })
  const [bestCrops, setBestCrops] = useState([
    {
      name: "Tomatoes",
      suitability: 95,
      reason: "Perfect weather conditions",
      marketPrice: "₹45/kg",
      trend: "up",
      priceChange: "+12%",
    },
    {
      name: "Wheat",
      suitability: 88,
      reason: "Good soil moisture",
      marketPrice: "₹2,100/quintal",
      trend: "up",
      priceChange: "+5%",
    },
    {
      name: "Cotton",
      suitability: 82,
      reason: "Favorable temperature",
      marketPrice: "₹6,800/quintal",
      trend: "down",
      priceChange: "-3%",
    },
  ])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation("Current Location")
        },
        () => {
          setLocation("Location unavailable")
        },
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">AgriAdvisor</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle Button */}
            <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <SunMedium className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <Link href="/chat">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      {/* ... rest of your existing code unchanged ... */}
    </div>
  )
}
