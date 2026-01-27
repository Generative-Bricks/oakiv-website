/**
 * Centralized hours configuration for Oak IV services
 */

export const HOURS_CONFIG = {
  OPEN_HOUR: 8,
  REGULAR_CLOSE_HOUR: 17, // 5pm - end of regular hours
  AFTER_HOURS_CLOSE_HOUR: 21, // 9pm - final appointment
  AFTER_HOURS_FEE: 25,
}

export const HOURS_DISPLAY = {
  REGULAR: '8:00 AM - 5:00 PM',
  AFTER_HOURS: '5:00 PM - 9:00 PM',
  FULL_WITH_DAYS: 'Monday - Sunday: 8:00 AM - 9:00 PM',
  SHORT_WITH_DAYS: 'Mon - Sun: 8:00 AM - 9:00 PM',
}

export const AFTER_HOURS_MESSAGE = {
  WARNING_TITLE: 'After-Hours Appointment',
  WARNING_TEXT:
    'Appointments between 5:00 PM - 9:00 PM include a $25 after-hours service fee.',
  FEE_LABEL: 'After-Hours Fee',
}
