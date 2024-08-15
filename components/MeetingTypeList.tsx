'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Card from './Card'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>()

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <Card
        img='/icons/add-meeting.svg'
        title="New Meeting"
        description="Start a new meeting"
        handleClick={() => setMeetingState('isJoinMeeting')}
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
    </section>
  )
}

export default MeetingTypeList