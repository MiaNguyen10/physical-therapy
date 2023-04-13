import React, { useEffect, useState } from 'react'

import Scheduler, { AppointmentDragging } from 'devextreme-react/scheduler'

import axios from 'axios'
import moment from 'moment'
import { useRef } from 'react'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDate()

const currentDate = new Date(currentYear, currentMonth, currentDay)

const views = [{ type: 'day', intervalCount: 7 }]
const draggingGroupName = 'appointmentsGroup'

const Schedule = () => {
  const [appointmentList, setAppointmentList] = useState([])
  const config = useRef({
    allowAdding: false,
    allowDragging: false,
  })

  const onAppointmentRemove = (e) => {
    const index = appointmentList.indexOf(e.itemData)
    if (index >= 0) {
      appointmentList.splice(index, 1)
      setAppointmentList([...appointmentList])
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/schedule`).then((res) => {
      console.log(res.data)
      const schedules = res.data
      const formatData = []
      schedules.forEach((schedule) => {
        const formatDate = moment(schedule.day).format('YYYY-MM-DD')
        const formatTimeStart = moment(schedule.slot.timeStart).format(
          'HH:mm:ss'
        )
        const formatTimeEnd = moment(schedule.slot.timeEnd).format('HH:mm:ss')
        const formatSchedule = {
          text: schedule.slot.slotName,
          startDate: new Date(`${formatDate}T${formatTimeStart}`),
          endDate: new Date(`${formatDate}T${formatTimeEnd}`),
        }
        formatData.push(formatSchedule)
      })
      setAppointmentList(formatData)
    })
  }, [])

  return (
    <React.Fragment>
      <Scheduler
        timeZone=""
        id="scheduler"
        dataSource={appointmentList}
        views={views}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={5}
        allDayPanelMode="hidden"
        editing={config.current}
      >
        <AppointmentDragging
          group={draggingGroupName}
          onRemove={onAppointmentRemove}
        />
      </Scheduler>
    </React.Fragment>
  )
}

export default Schedule
