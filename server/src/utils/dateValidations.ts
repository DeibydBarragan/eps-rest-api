import moment from 'moment'
import { getAllAppointmentsByDoctorId, getAllAppointmentsByPatientId } from '../services/appointment'

export const isInTheFuture = (value: Date) => {
  const date = moment(value, 'YYYY-MM-DD')
  const today = moment()
  const sixMonths = moment().add(6, 'months')

  if (date.isBefore(today)) throw new Error('Date must be in the future')

  if (date.isAfter(sixMonths)) throw new Error('Date must be less than 6 months from now')

  if (date.day() === 0) throw new Error('Date must not be a Sunday')

  return true
}

export const doctorIsAvailable = async (value: Date, hour:string, doctorId: string) => {
  const appointments = await getAllAppointmentsByDoctorId(doctorId)
  const date = moment(value + ' ' + hour, 'YYYY-MM-DD HH:mm')

  // Check if doctor is available on that date
  const doctorAppointments = appointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'day')
  })

  if (doctorAppointments.length >= 14) throw new Error('Doctor is not available on that date')

  // Check if doctor has an appointment at that time
  const doctorAppointments2 = doctorAppointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'minute')
  })

  if (doctorAppointments2.length > 0) throw new Error('Doctor already has an appointment at that time')

  return true
}

export const patientIsAvailable = async (value: Date, hour:string, patientId: string) => {
  const appointments = await getAllAppointmentsByPatientId(patientId)
  const date = moment(value + ' ' + hour, 'YYYY-MM-DD HH:mm')

  const patientAppointments = appointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'day')
  })

  if (patientAppointments.length > 0) {
    const patientAppointments2 = patientAppointments.filter((appointment) => {
      return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'minute')
    })

    if (patientAppointments2.length > 0) throw new Error('Patient already has an appointment at that time')
  }

  return true
}

export const validHour = (value: string) => {
  const time = value.split(':')
  const hours = parseInt(time[0])
  const minutes = parseInt(time[1])

  if (hours < 0 || hours > 23) throw new Error('Hour must be between "00:00" and "23:59"')

  if (minutes < 0 || minutes > 59) throw new Error('Minutes must be between "00" and "59"')

  if (minutes !== 0 && minutes !== 30) throw new Error('Hour must be in a 30 minutes format')

  return true
}