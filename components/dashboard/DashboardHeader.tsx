"use client"

import { useState } from "react"
import { Search, Bell, HelpCircle, Filter, BarChart3, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  domain: string
  setDomain: (domain: string) => void
  isLoading: boolean
  onAnalyze: () => void
}

export function DashboardHeader({
  searchQuery,
  setSearchQuery,
  domain,
  setDomain,
  isLoading,
  onAnalyze
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SEOStrategy</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              Keywords
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              Content
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              Analytics
            </Button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Enter keyword (e.g., content strategy)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
                onKeyPress={(e) => e.key === "Enter" && onAnalyze()}
              />
            </div>
            <Input
              placeholder="Domain (optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-40"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Regions</DropdownMenuItem>
                <DropdownMenuItem>United States</DropdownMenuItem>
                <DropdownMenuItem>United Kingdom</DropdownMenuItem>
                <DropdownMenuItem>Canada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAnalyze} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Analyze
            </Button>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
