'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Card from './Card'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const { toast } = useToast()
  const createMeeting = async () => {
    if (!client || !user) return
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select date and time",
        })
        return
      }
      const id = crypto.randomUUID()
      const call = client.call('default', id)
      if (!call) throw new Error('Call not created')
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant Meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting created ",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting",
      })
    }
  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <Card
        img='/icons/add-meeting.svg'
        title="New Meeting"
        description="Start a new meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />
      <Card
        img='/icons/schedule.svg'
        title="Shedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-blue-1"
      />
      <Card
        img='/icons/recordings.svg'
        title="View Recording"
        description="Check your recordings"
        handleClick={() => setMeetingState('isJoinMeeting')}
        className="bg-purple-1"
      />
      <Card
        img='/icons/join-meeting.svg'
        title="Join Meeting"
        description="Via invite link"
        handleClick={() => setMeetingState('isJoinMeeting')}
        className="bg-yellow-1"
      />
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an Instant Meeting'
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList