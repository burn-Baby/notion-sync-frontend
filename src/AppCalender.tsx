import { FC, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import { addHours, startOfHour } from 'date-fns'
import { startOfWeek } from 'date-fns/startOfWeek'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

interface MyEvent extends Event {
  id: string
  status: 'confirmed' | 'pending' | 'cancelled';
  original?: MyEvent;
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const DnDCalendar = withDragAndDrop(Calendar)

const App: FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newStart, setNewStart] = useState("")
  const [newEnd, setNewEnd] = useState("")
  const [newStatus, setNewStatus] = useState<'confirmed' | 'pending' | 'cancelled'>('pending')
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null)


  const onEventResize = ({ event, start, end }: any) => {
    const updated = events.map(e =>
      e === event ? { ...e, start, end } : e
    )
    setEvents(updated)
  }

  const onEventDrop = ({ event, start, end }: any) => {
    const updated = events.map(e =>
      e === event ? { ...e, start, end } : e
    )
    setEvents(updated)
  }

  const handleAddEvent = () => {
    if (!newTitle || !newStart || !newEnd) {
      alert("Please fill all fields")
      return
    }

    const newEvent: MyEvent = {
      id: Date.now().toString(),
      title: newTitle,
      start: new Date(newStart),
      end: new Date(newEnd),
      status: newStatus
    }

    setEvents([...events, newEvent])
    setNewTitle("")
    setNewStart("")
    setNewEnd("")
    setNewStatus('confirmed')
  }

  const CustomEvent = ({ event }: { event: MyEvent }) => {
    return (
      <span style={{ textDecoration: event.status === 'confirmed' ? 'line-through' : 'none' }}>
        {event.title} ({event.status})
      </span>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          width: '300px',
          padding: '16px',
          margin: '20px',
          backgroundColor: '#2c2c2c',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <input
          type="text"
          placeholder="Event Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#444',
            color: 'white'
          }}
        />
        <input
          type="datetime-local"
          value={newStart}
          onChange={(e) => setNewStart(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#444',
            color: 'white'
          }}
        />
        <input
          type="datetime-local"
          value={newEnd}
          onChange={(e) => setNewEnd(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#444',
            color: 'white'
          }}
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as MyEvent['status'])}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#444',
            color: 'white'
          }}
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={handleAddEvent}
          style={{
            padding: '10px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Activity
        </button>
      </div>

      {selectedEvent && (
        <div style={{
          width: '300px',
          padding: '16px',
          margin: '20px',
          backgroundColor: '#2c2c2c',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h4>Edit Activity</h4>
          <input
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white'
            }}
            type="text"
            value={selectedEvent.title}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
          />
          <input
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white'
            }}
            type="datetime-local"
            value={new Date(selectedEvent.start).toISOString().slice(0, 16)}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, start: new Date(e.target.value) })
            }
          />
          <input
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white'
            }}
            type="datetime-local"
            value={new Date(selectedEvent.end).toISOString().slice(0, 16)}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, end: new Date(e.target.value) })
            }
          />
          <select
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white'
            }}
            value={selectedEvent.status}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, status: e.target.value as MyEvent['status'] })
            }
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => {
              setEvents((prev) =>
                prev.map((evt) =>
                  evt.id === selectedEvent.id ? selectedEvent : evt
                )
              )
              setSelectedEvent(null)
            }}
            style={{
              padding: '10px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
          <button onClick={() => setSelectedEvent(null)}>Cancel</button>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', margin: 20 }}>
        <DnDCalendar
          defaultView="day"
          views={['day']}
          events={events}
          localizer={localizer}
          resizable={false}
          onEventDrop={undefined}
          onEventResize={undefined}
          style={{ height: '100%' }}
          onSelectEvent={(event) => {
            setSelectedEvent({ ...event, original: event })
          }}

          eventPropGetter={(event: MyEvent) => {
            let bg = ''
            switch (event.status) {
              case 'confirmed':
                bg = '#4caf50'
                break
              case 'pending':
                bg = '#ff9800'
                break
              case 'cancelled':
                bg = '#f44336'
                break
            }
            return {
              style: {
                backgroundColor: bg,
                color: 'white',
              }
            }
          }}
          components={{
            event: CustomEvent
          }}
        />
      </div>
    </div>
  )
}

export default App
