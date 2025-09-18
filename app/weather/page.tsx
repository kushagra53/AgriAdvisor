"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    windDirection: string
    pressure: number
    visibility: number
    uvIndex: number
    condition: string
    icon: React.ReactNode
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    icon: React.ReactNode
    precipitation: number
  }>
  hourly: Array<{
    time: string
    temperature: number
    condition: string
    icon: React.ReactNode
    precipitation: number
  }>
  alerts: Array<{
    type: "warning" | "info"
    title: string
    description: string
  }>
  agricultural: {
    soilMoisture: number
    growingDegreeDay: number
    evapotranspiration: number
    recommendations: string[]
  }
}

export default function WeatherPage() {
  const router = useRouter()
  const [location, setLocation] = useState("Current Location")
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      windDirection: "NW",
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      condition: "Partly Cloudy",
      icon: <Cloud className="h-6 w-6" />,
    },
    forecast: [
      {
        day: "Today",
        high: 30,
        low: 22,
        condition: "Partly Cloudy",
        icon: <Cloud className="h-5 w-5" />,
        precipitation: 10,
      },
      {
        day: "Tomorrow",
        high: 27,
        low: 19,
        condition: "Rainy",
        icon: <CloudRain className="h-5 w-5" />,
        precipitation: 80,
      },
      {
        day: "Wednesday",
        high: 32,
        low: 24,
        condition: "Sunny",
        icon: <Sun className="h-5 w-5" />,
        precipitation: 0,
      },
      {
        day: "Thursday",
        high: 29,
        low: 21,
        condition: "Partly Cloudy",
        icon: <Cloud className="h-5 w-5" />,
        precipitation: 20,
      },
      {
        day: "Friday",
        high: 26,
        low: 18,
        condition: "Rainy",
        icon: <CloudRain className="h-5 w-5" />,
        precipitation: 90,
      },
    ],
    hourly: [
      { time: "Now", temperature: 28, condition: "Cloudy", icon: <Cloud className="h-4 w-4" />, precipitation: 10 },
      { time: "2 PM", temperature: 30, condition: "Sunny", icon: <Sun className="h-4 w-4" />, precipitation: 0 },
      { time: "4 PM", temperature: 29, condition: "Cloudy", icon: <Cloud className="h-4 w-4" />, precipitation: 15 },
      { time: "6 PM", temperature: 27, condition: "Rain", icon: <CloudRain className="h-4 w-4" />, precipitation: 70 },
      { time: "8 PM", temperature: 25, condition: "Rain", icon: <CloudRain className="h-4 w-4" />, precipitation: 85 },
    ],
    alerts: [
      {
        type: "warning",
        title: "Heavy Rain Expected",
        description: "Rainfall of 25-40mm expected tomorrow evening. Consider postponing field activities.",
      },
      {
        type: "info",
        title: "Optimal Spraying Conditions",
        description: "Low wind conditions today make it ideal for pesticide application.",
      },
    ],
    agricultural: {
      soilMoisture: 75,
      growingDegreeDay: 18,
      evapotranspiration: 4.2,
      recommendations: [
        "Delay irrigation due to expected rainfall",
        "Good conditions for fungicide application today",
        "Monitor crops for disease after rain period",
        "Consider harvesting mature crops before rain",
      ],
    },
  })

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location")
        },
        () => {
          setLocation("Location unavailable")
        },
      )
    }
  }, [])

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: "Low", color: "text-green-600 bg-green-100" }
    if (uvIndex <= 5) return { level: "Moderate", color: "text-yellow-600 bg-yellow-100" }
    if (uvIndex <= 7) return { level: "High", color: "text-orange-600 bg-orange-100" }
    if (uvIndex <= 10) return { level: "Very High", color: "text-red-600 bg-red-100" }
    return { level: "Extreme", color: "text-purple-600 bg-purple-100" }
  }

  const uvLevel = getUVLevel(weatherData.current.uvIndex)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-serif font-bold">Weather Forecast</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <div className="space-y-2">
            {weatherData.alerts.map((alert, index) => (
              <Card
                key={index}
                className={alert.type === "warning" ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    )}
                    <div>
                      <h3 className="font-semibold text-sm">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Current Weather */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {weatherData.current.icon}
              Current Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">{weatherData.current.temperature}°C</div>
              <p className="text-muted-foreground">{weatherData.current.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{weatherData.current.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wind className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-semibold">
                    {weatherData.current.windSpeed} km/h {weatherData.current.windDirection}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Gauge className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="font-semibold">{weatherData.current.pressure} hPa</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="font-semibold">{weatherData.current.visibility} km</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">UV Index</span>
              <Badge className={uvLevel.color}>
                {weatherData.current.uvIndex} - {uvLevel.level}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Hourly Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
                  <p className="text-sm text-muted-foreground mb-2">{hour.time}</p>
                  <div className="flex justify-center mb-2">{hour.icon}</div>
                  <p className="font-semibold mb-1">{hour.temperature}°</p>
                  <p className="text-xs text-blue-600">{hour.precipitation}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-left">
                      <p className="text-sm font-medium">{day.day}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {day.icon}
                      <span className="text-sm text-muted-foreground">{day.condition}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <Droplets className="h-3 w-3" />
                      {day.precipitation}%
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{day.high}°</span>
                      <span className="text-muted-foreground ml-1">{day.low}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agricultural Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Agricultural Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Soil Moisture</span>
                  <span className="text-sm text-muted-foreground">{weatherData.agricultural.soilMoisture}%</span>
                </div>
                <Progress value={weatherData.agricultural.soilMoisture} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Growing Degree Day</p>
                  <p className="text-lg font-semibold">{weatherData.agricultural.growingDegreeDay}°C</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Evapotranspiration</p>
                  <p className="text-lg font-semibold">{weatherData.agricultural.evapotranspiration} mm</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Today's Recommendations</h4>
              <div className="space-y-2">
                {weatherData.agricultural.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Spacer for bottom navigation */}
      <div className="h-16"></div>
    </div>
  )
}
