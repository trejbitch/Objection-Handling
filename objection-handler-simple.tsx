src/components/ui/objection-handler-simple.tsx





"use client"

import { useState } from "react"
import { AlertCircle, UserPlus, Briefcase, DollarSign, Clock, ShieldCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type Objection = {
  title: string
  icon: React.ReactNode
  lines: string[]
}

const initialObjections: Objection[] = [
  {
    title: "Foreclosure-Related Objections",
    icon: <AlertCircle className="w-6 h-6" />,
    lines: [
      "I'm working with my bank to modify the loan, so I don't need your help.",
      "The bank said they would give me more time to catch up on payments.",
      "I don't believe you can really stop the foreclosure process.",
    ],
  },
  {
    title: "Creative Financing Objections",
    icon: <DollarSign className="w-6 h-6" />,
    lines: [
      "I don't understand seller financing - it sounds risky.",
      "I need all my money right away, not payments over time.",
      "How do I know you'll make the payments if I finance the sale?",
    ],
  },
  {
    title: "Agent Outreach Objections",
    icon: <UserPlus className="w-6 h-6" />,
    lines: [
      "I only work with buyers who can pay full retail price.",
      "My sellers expect their homes to go on the MLS.",
      "I have other investors I already work with.",
    ],
  },
  {
    title: "Wholesaling Objections",
    icon: <Briefcase className="w-6 h-6" />,
    lines: [
      "I don't want you to make a profit by reselling my house.",
      "Why don't you just buy it yourself if it's such a good deal?",
      "I've heard wholesaling is illegal in some states.",
    ],
  },
  {
    title: "General Price Objections",
    icon: <DollarSign className="w-6 h-6" />,
    lines: [
      "Your offer is too low - I need more money.",
      "Zillow says my house is worth more.",
      "I need to get back what I put into the house.",
    ],
  },
  {
    title: "Timing/Motivation Objections",
    icon: <Clock className="w-6 h-6" />,
    lines: [
      "I'm not in a hurry to sell right now.",
      "I want to wait until after the holidays.",
      "I need to find a new place before selling.",
    ],
  },
  {
    title: "Trust/Credibility Objections",
    icon: <ShieldCheck className="w-6 h-6" />,
    lines: [
      "I've never heard of you or your company.",
      "How do I know you're a legitimate investor?",
      "I want to check your references first.",
    ],
  },
  {
    title: "Custom Objections",
    icon: <FileText className="w-6 h-6" />,
    lines: [
      "I need to discuss this with my family first.",
      "I've had bad experiences with investors before.",
      "I'm not sure if this is the right decision.",
    ],
  },
]

function ObjectionSquare({
  objection,
  isCustom,
  onAddCustom,
}: { objection: Objection; isCustom: boolean; onAddCustom: () => void }) {
  return (
    <div className="bg-white rounded-[20px] shadow-md p-4 flex flex-col h-full">
      <div className="flex items-center mb-2">
        {objection.icon}
        <h3 className="ml-2 font-semibold">{objection.title}</h3>
      </div>
      <div className="bg-white border border-gray-200 rounded-[20px] p-4 mb-4 flex-grow">
        <ul className="list-disc pl-5 mb-2">
          {objection.lines.map((line, index) => (
            <li key={index} className="mb-1">
              {line}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">And many more...</p>
      </div>
      {isCustom && (
        <Button onClick={onAddCustom} variant="outline" className="mb-2 w-full">
          ADD YOUR OBJECTIONS
        </Button>
      )}
      <Button className="bg-[#5b06be] text-white rounded-[20px] w-full">START</Button>
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
    onSave(customObjection)
    setCustomObjection("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-[20px] font-['Montserrat']">
        <DialogHeader>
          <DialogTitle>Add Custom Objections</DialogTitle>
        </DialogHeader>
        <Input
          value={customObjection}
          onChange={(e) => setCustomObjection(e.target.value)}
          className="border-gray-200"
          placeholder="Enter your custom objection"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#5b06be] text-white" onClick={handleSave}>
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
      newObjections[7].lines = [newObjection, ...newObjections[7].lines.slice(0, 2)]
      return newObjections
    })
  }

  return (
    <div className="bg-white rounded-[20px] p-4 sm:p-6 md:p-8 font-['Montserrat'] w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {objections.map((objection, index) => (
          <ObjectionSquare
            key={index}
            objection={objection}
            isCustom={index === 7}
            onAddCustom={() => setIsModalOpen(true)}
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
