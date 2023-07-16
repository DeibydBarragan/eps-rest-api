import moment from 'moment'
import {
  getAllAppointmentsByDoctorId,
  getAllAppointmentsByPatientId
} from '../services/appointment.services'

// Check if date is in the future
export const isInTheFuture = (value: Date): boolean => {
  const date = moment(value, 'YYYY-MM-DD')
  const today = moment()
  const sixMonths = moment().add(6, 'months')

  if (date.isBefore(today)) throw new Error('Date must be in the future')

  if (date.isAfter(sixMonths)) {
    throw new Error('Date must be less than 6 months from now')
  }

  if (date.day() === 0) throw new Error('Date must not be a Sunday')

  return true
}

// Check if doctor is available
export const doctorIsAvailable = async (
  value: string,
  hour: string,
  doctorId: string
): Promise<boolean> => {
  const appointments = await getAllAppointmentsByDoctorId(doctorId)
  const date = moment(`${value} ${hour}`, 'YYYY-MM-DD HH:mm')

  // Check if doctor is available on that date
  const doctorAppointments = appointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'day')
  })

  if (doctorAppointments.length >= 14) {
    throw new Error('Doctor is not available on that date')
  }

  // Check if doctor has an appointment at that time
  const doctorAppointments2 = doctorAppointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'minute')
  })

  if (doctorAppointments2.length > 0) {
    throw new Error('Doctor already has an appointment at that time')
  }

  return true
}

// Check if patient is available
export const patientIsAvailable = async (
  value: string,
  hour: string,
  patientId: string
): Promise<boolean> => {
  const appointments = await getAllAppointmentsByPatientId(patientId)
  const date = moment(`${value} ${hour}`, 'YYYY-MM-DD HH:mm')

  const patientAppointments = appointments.filter((appointment) => {
    return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'day')
  })

  if (patientAppointments.length > 0) {
    const patientAppointments2 = patientAppointments.filter((appointment) => {
      return moment(appointment.date, 'YYYY-MM-DD HH:mm').isSame(date, 'minute')
    })

    if (patientAppointments2.length > 0) {
      throw new Error('Patient already has an appointment at that time')
    }
  }

  return true
}

// Check if hour is valid
export const validHour = (value: string): boolean => {
  const time = value.split(':')
  const hours = parseInt(time[0])
  const minutes = parseInt(time[1])

  if (hours < 0 || hours > 23) {
    throw new Error('Hour must be between "00:00" and "23:59"')
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error('Minutes must be between "00" and "59"')
  }

  if (minutes !== 0 && minutes !== 30) {
    throw new Error('Hour must be in a 30 minutes format')
  }

  return true
}
