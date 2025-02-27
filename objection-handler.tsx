src/components/ui/objection-handler.tsx






     

"use client"

import { useState } from "react"
import { AlertCircle, UserPlus, Briefcase, DollarSign, Clock, ShieldCheck, FileText, Plus, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/custom-dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import type React from "react"
import "@/app/dialog.css"
import Image from "next/image"

type Objection = {
  title: string
  icon: React.ReactNode
  lines: string[]
}

const initialObjections: Objection[] = [
  {
    title: "Foreclosure-Related Objections",
    icon: <AlertCircle className="w-8 h-8" />,
    lines: [
      "I'm working with my bank to modify the loan, so I don't need your help.",
      "The bank said they would give me more time to catch up on payments.",
      "I don't believe you can really stop the foreclosure process.",
      "We're planning to file for bankruptcy to stop the foreclosure.",
      "How do I know you're not trying to scam me like other investors?",
      "I don't want my neighbors to know I'm in foreclosure.",
      "I'd rather let the bank take the house than sell it for less than I owe.",
      "I'm waiting for housing prices to go back up before I sell.",
      "I've already received multiple foreclosure notices, but nothing has happened.",
      "My attorney advised me not to talk to investors.",
      "I don't trust anyone who says they can help with foreclosure.",
      "The government has programs to help homeowners like me.",
      "I'm going to refinance once my credit improves.",
      "My family member is going to help me catch up on payments.",
      "I'd rather work with a real estate agent than an investor.",
    ],
  },
  {
    title: "Creative Financing Objections",
    icon: <DollarSign className="w-8 h-8" />,
    lines: [
      "I don't understand seller financing - it sounds risky.",
      "I need all my money right away, not payments over time.",
      "How do I know you'll make the payments if I finance the sale?",
      "My mortgage company won't allow me to do owner financing.",
      "I've never heard of a lease option before - it sounds complicated.",
      "What happens if you don't make the payments on a subject-to deal?",
      "I don't want to be responsible for the mortgage if you don't pay.",
      "My lawyer said creative financing is illegal.",
      "I need to talk to my accountant about tax implications first.",
      "Why can't you just get a regular mortgage like everyone else?",
      "I don't want my name on any mortgage after I sell.",
      "The due-on-sale clause prevents me from selling this way.",
      "What if you damage the property during a lease option?",
      "I'd rather have a traditional sale with a title company.",
      "These creative terms sound too good to be true.",
    ],
  },
  {
    title: "Agent Outreach Objections",
    icon: <UserPlus className="w-8 h-8" />,
    lines: [
      "I only work with buyers who can pay full retail price.",
      "My sellers expect their homes to go on the MLS.",
      "I have other investors I already work with.",
      "Your referral fee structure isn't competitive enough.",
      "I need to see proof of funds before sharing off-market deals.",
      "How do I know you can close quickly when I bring you deals?",
      "My broker doesn't allow me to share pocket listings.",
      "I don't want to risk my reputation working with investors.",
      "What makes you different from other investors who contact me?",
      "I need to protect my commission on both sides of the deal.",
      "Your purchase criteria are too restrictive.",
      "I prefer working with conventional buyers over investors.",
      "You'll need to join our preferred investor program first.",
      "My distressed listings already have multiple investor offers.",
      "I don't have any off-market properties that meet your criteria.",
    ],
  },
  {
    title: "Wholesaling Objections",
    icon: <Briefcase className="w-8 h-8" />,
    lines: [
      "I don't want you to make a profit by reselling my house.",
      "Why don't you just buy it yourself if it's such a good deal?",
      "I've heard wholesaling is illegal in some states.",
      "Your earnest money deposit is too low.",
      "I want to meet your end buyer before agreeing to sell.",
      "The assignment fee you're making is too high.",
      "What if you can't find a buyer during the contract period?",
      "Other investors have offered me more money.",
      "I don't want my house shown to multiple investors.",
      "Your inspection period is too long.",
      "I need proof of funds before signing a contract.",
      "Your purchase agreement looks different from standard ones.",
      "I want to close faster than your timeline allows.",
      "Why should I sell to you instead of your end buyer directly?",
      "The wholesale price is too low compared to retail value.",
    ],
  },
  {
    title: "General Price Objections",
    icon: <DollarSign className="w-8 h-8" />,
    lines: [
      "Your offer is too low - I need more money.",
      "Zillow says my house is worth more.",
      "I need to get back what I put into the house.",
      "The neighbor's house sold for more last year.",
      "I want to wait for a better offer.",
      "Other investors have offered me more.",
      "I've done too many improvements to sell at that price.",
      "That's less than I paid for it originally.",
      "I need enough to pay off my mortgage.",
      "The tax assessment shows a higher value.",
      "Real estate websites show higher comparable sales.",
      "I can't afford to take a loss on the property.",
      "Your price doesn't account for the location.",
      "The market is getting better - I should wait.",
      "My house is worth more than the comparable sales.",
    ],
  },
  {
    title: "Timing/Motivation Objections",
    icon: <Clock className="w-8 h-8" />,
    lines: [
      "I'm not in a hurry to sell right now.",
      "I want to wait until after the holidays.",
      "I need to find a new place before selling.",
      "My kids are still in school this year.",
      "I'm waiting for spring when more buyers are looking.",
      "I need to make repairs first.",
      "I want to think about it for a few months.",
      "We're too emotionally attached to sell yet.",
      "I need to discuss it with family members first.",
      "The timing isn't right with my job situation.",
      "I want to wait until the market improves.",
      "I'm not sure if I really want to sell.",
      "We just started considering selling.",
      "I need more time to prepare for moving.",
      "I want to see what other offers I get first.",
    ],
  },
  {
    title: "Trust/Credibility Objections",
    icon: <ShieldCheck className="w-8 h-8" />,
    lines: [
      "I've never heard of you or your company.",
      "How do I know you're a legitimate investor?",
      "I want to check your references first.",
      "You don't have any online reviews.",
      "I need to verify your proof of funds.",
      "Your business seems too new.",
      "I prefer working with local investors.",
      "Your website doesn't look professional enough.",
      "I can't find much information about you online.",
      "Other investors have more experience than you.",
    ],
  },
  {
    title: "Custom Objections",
    icon: <FileText className="w-8 h-8" />,
    lines: [],
  },
]

function ObjectionSquare({
  objection,
  isCustom,
  onAddCustom,
  onRemoveObjection,
}: {
  objection: Objection
  isCustom: boolean
  onAddCustom: () => void
  onRemoveObjection: (index: number) => void
}) {
  const [showObjections, setShowObjections] = useState(false)

  const handleAddCustom = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddCustom()
  }

  const addCustomButton = (
    <Button
      onClick={handleAddCustom}
      variant="outline"
      className="w-full py-1 px-2 text-xs flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 rounded-[10px] border border-dashed border-gray-300 hover:border-[#5b06be] group"
>
      <Plus className="w-3 h-3 mr-1 text-gray-400 group-hover:text-[#5b06be] transition-colors duration-300" />
      Add Custom Objection
    </Button>
  )

  return (
<div className="bg-white rounded-[20px] border border-[#ddd] px-4 pt-4 pb-0 flex flex-col h-[250px] transition-all duration-300 hover:scale-[1.02] group">
    {/* Icon Container */}
      <div className="flex justify-center mb-2">
      <div className="w-16 h-16 bg-white rounded-[20px] border border-[#ddd] flex items-center justify-center transition-all duration-300 group-hover:scale-[1.02] overflow-hidden">
          {(() => {
            const iconMap: Record<string, string> = {
              "Foreclosure-Related Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317421/Foreclosure-Related_Objections_Icon_duha_jjovih.png",
              "Agent Outreach Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317420/Agent_Outreach_Objections_Icon_duha_qp4uvc.png",
              "Wholesaling Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317423/Wholesaling_Objections_Icon_ibqjtd.png",
              "General Price Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317421/General_Price_Objections_Icon_duha_kh7ipr.png",
              "Timing/Motivation Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317421/Timing_Motivation_Objections_Icon_duha_b9haz1.png",
              "Trust/Credibility Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317423/Trust_Credibility_Objections_Icon_duha_qsk3qs.png",
              "Custom Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317421/Custom_Objections_Icon_duha_rcenrf.png",
              "Creative Financing Objections":
                "https://res.cloudinary.com/drkudvyog/image/upload/v1739317420/Creative_Financing_Objections_Icon_duha_foivkz.png",
            }

            const iconUrl = iconMap[objection.title]

            return iconUrl ? (
              <Image
                src={iconUrl || "/placeholder.svg"}
                alt={`${objection.title} Icon`}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              objection.icon
            )
          })()}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-center font-semibold mb-1 min-h-[30px] flex items-center justify-center text-[14px]">
  {objection.title}
</h3>

      {/* Content Container */}
      <div
  className={`bg-gradient-to-br from-white via-gray-50 to-white border border-[#ddd] rounded-[15px] p-2 mb-1 h-[60px] flex flex-col justify-center items-stretch relative transition-all duration-300 hover:border-[#5b06be] hover:scale-[1.02] overflow-hidden ${!isCustom ? "cursor-pointer" : ""}`}
  onClick={!isCustom ? () => setShowObjections(true) : undefined}
      >
        {isCustom ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-1 px-0">
{addCustomButton}
  {objection.lines.length > 0 && (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        setShowObjections(true)
      }}
      variant="outline"
      className="w-full py-1 px-2 text-xs flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 rounded-[10px] border border-gray-300 hover:border-[#5b06be] group"
>
      <FileText className="w-3 h-3 mr-1 text-gray-400 group-hover:text-[#5b06be] transition-colors duration-300" />
      <span className="font-medium text-gray-600 group-hover:text-[#5b06be] transition-colors duration-300">
        See Your Objections ({objection.lines.length})
      </span>
    </Button>
  )}
</div>
        ) : (
<div className="w-full h-full flex flex-row items-center justify-center gap-2 relative">
<span className="text-[20px] font-bold text-[#5b06be]">{objection.lines.length}</span>
  <div className="flex items-center">
    <span className="text-sm text-gray-600">Objections</span>
    <Info className="w-4 h-4 ml-1 text-gray-600 transition-all duration-300 hover:scale-110" />
  </div>
</div>
        )}
      </div>

      {/* Start Button */}
<Button
className="bg-[#5b06be] hover:bg-[#5b06be] text-white rounded-[15px] w-full font-semibold text-base shadow-[0_0_20px_rgba(91,6,190,0.3)] transition-[font-size] duration-300 hover:text-lg mt-2"
onClick={() => {
          if (objection.lines.length < 3) {
            toast({
              title: "Not enough objections",
              description: "You need at least 3 objections to start. Please add more custom objections.",
              variant: "destructive",
            })
            onAddCustom()
          } else {
            window.location.href = "https://trainedbyai.com"
          }
        }}
      >
        START
      </Button>

      {/* Objections Popup */}
      <Dialog open={showObjections} onOpenChange={setShowObjections}>
      <DialogContent className="rounded-dialog bg-gradient-to-br from-white to-gray-50 font-['Montserrat'] p-4 sm:p-6 border border-[#ddd] sm:max-w-[90vw] w-[95vw]">
          <DialogHeader className="pb-3 mb-3 border-b border-gray-100">
            <div className="flex items-center justify-start gap-4">
              <DialogTitle className="text-2xl font-bold text-[#5b06be]">{objection.title}</DialogTitle>
              {isCustom && (
                <Button
                  onClick={onAddCustom}
                  variant="outline"
                  className="py-2 text-xs flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 rounded-[15px] border border-dashed border-gray-300 hover:border-[#5b06be] group"
                >
                  <Plus className="w-3 h-3 mr-1 text-gray-400 group-hover:text-[#5b06be] transition-colors duration-300" />
                  <span className="font-medium text-gray-600 group-hover:text-[#5b06be] transition-colors duration-300">
                    Add Custom Objection
                  </span>
                </Button>
              )}
            </div>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {objection.lines.map((line, index) => (
              <div
                key={index}
                className="flex items-start p-2 sm:p-3 rounded-[15px] bg-white border border-[#ddd] transition-all duration-300 group">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5b06be] text-white text-xs font-semibold mr-2 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-xs sm:text-sm leading-tight flex-grow">{line}</span>
                {isCustom && (
                  <button
                    onClick={() => onRemoveObjection(index)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CustomObjectionsModal({
  isOpen,
  onClose,
  onSave,
}: { isOpen: boolean; onClose: () => void; onSave: (objection: string) => void }) {
  const [customObjection, setCustomObjection] = useState("")

  const handleSave = () => {
    if (customObjection.trim()) {
      onSave(customObjection)
      setCustomObjection("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
<DialogContent className="bg-white rounded-[20px] font-['Montserrat'] border border-[#ddd]">
        <DialogHeader>
          <DialogTitle>Add Custom Objections</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mb-4">You need at least 3 objections to start.</p>
        <Input
          value={customObjection}
          onChange={(e) => setCustomObjection(e.target.value)}
          className="border-0 bg-white rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-[#5b06be] focus:outline-none transition-all duration-200"
          placeholder="Enter your custom objection"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} className="rounded-[15px]">
            Cancel
          </Button>
          <Button className="bg-[#5b06be] hover:bg-[#5b06be] text-white rounded-[15px]" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ObjectionHandler() {
  const [objections, setObjections] = useState(initialObjections)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddCustomObjection = (newObjection: string) => {
    setObjections((prev) => {
      const newObjections = [...prev]
      newObjections[7].lines = [newObjection, ...newObjections[7].lines]
      return newObjections
    })
    setIsModalOpen(false)
  }

  const handleRemoveObjection = (categoryIndex: number, objectionIndex: number) => {
    if (categoryIndex === 7) {
      setObjections((prev) => {
        const newObjections = [...prev]
        newObjections[categoryIndex].lines = newObjections[categoryIndex].lines.filter(
          (_, index) => index !== objectionIndex,
        )
        return newObjections
      })
    }
  }

  return (
<div className="bg-white p-2 sm:p-4 md:p-6 font-['Montserrat'] w-full mx-auto relative">
    <Button
        className="absolute right-4 top-4 bg-[#f8b922] hover:bg-[#f8b922]/90 text-white rounded-[15px] font-semibold shadow-[0_0_20px_rgba(248,185,34,0.3)] transition-all duration-300 hover:scale-105"
        onClick={() => (window.location.href = "https://trainedbyai.com/results")}
      >
        See Your Results
      </Button>
      <div className="text-center mb-4">
  <h2 className="text-black text-base font-bold">100 Common Real Estate Investment Objections</h2>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {objections.map((objection, index) => (
          <ObjectionSquare
            key={index}
            objection={objection}
            isCustom={index === 7}
            onAddCustom={() => setIsModalOpen(true)}
            onRemoveObjection={(objectionIndex) => handleRemoveObjection(index, objectionIndex)}
          />
        ))}
      </div>
      <CustomObjectionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCustomObjection}
      />
    </div>
  )
}
