import React, { useEffect, useState } from 'react'

import Scheduler, { AppointmentDragging } from 'devextreme-react/scheduler'

import axios from 'axios'
import query from 'devextreme/data/query'
import { useRef } from 'react'
import { moviesData } from './data'

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

  const onAppointmentFormOpening = (e) => {
    let movieInfo = getMovieById(e.appointmentData.movieId) || {}
    const { form } = e
    form.option('items', [
      {
        label: {
          text: 'Movie',
        },
        editorType: 'dxSelectBox',
        dataField: 'movieId',
        editorOptions: {
          items: moviesData,
          displayExpr: 'text',
          valueExpr: 'id',
          onValueChanged(args) {
            movieInfo = getMovieById(args.value)
            console.log(movieInfo)
          },
        },
      },
      {
        label: {
          text: 'Slot Name',
        },
        name: 'name',
        editorType: 'dxTextBox',
        editorOptions: {
          value: e.appointmentData.text,
          readOnly: true,
        },
      },
      {
        name: 'startDate',
        dataField: 'startDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
          readOnly: true,
        },
      },
      {
        name: 'endDate',
        dataField: 'endDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
          readOnly: true,
        },
      },
    ])
  }

  function getMovieById(id) {
    return query(moviesData).filter(['id', id]).toArray()[0]
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/schedule`).then((res) => {
      const schedules = res.data
      console.log(schedules)
      const formatData = []
      schedules.forEach((schedule) => {
        const formatSchedule = {
          text: schedule.slot.slotName,
          startDate: new Date(schedule.slot.timeStart),
          endDate: new Date(schedule.slot.timeEnd),
          id: schedule.scheduleID,
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
        crossScrollingEnabled={true}
        onAppointmentFormOpening={onAppointmentFormOpening}
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
