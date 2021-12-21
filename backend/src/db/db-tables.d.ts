
// A generic address table
export interface Address {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  city: string
  zip: number
  address: string
  houseNumber?: string | null
}

// A cage in a room
export interface Cage {
  id?: number | null
  roomId: number
  createdAt: Date
  updatedAt: Date
  // Usually a number
  name: string
  description?: string | null
}

// Details about the capture of a cat
export interface CaptureCat {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  captureLocationId: number
  catId: number
  usedTrapId: number
  weather?: string | null
  temperatureC?: string | null
}

// Details about the capture location
export interface CaptureLocation {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  addressId: number
  description?: string | null
  areaDescription?: string | null
}

export interface Cat {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: string | null
  name: string
  chipId?: string | null
  vaccinatedAt?: string | null
  // The ID used before this system
  customId?: string | null
  // The cage the cat is in
  cageId?: number | null
  // If null; added by system
  addedByUserId?: number | null
  bornAt?: string | null
  profileImageId?: number | null
}

// Statistics about a cat (food/drink amount, health, etc.)
export interface CatStatistics {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  catId: number
  // Amount of water left (0-10)
  waterLeft?: number | null
  // Amount of food left (0-10)
  foodLeft?: number | null
  // Amount of urine in box (0-10)
  urineAmount?: number | null
  // Amount of feces in box (0-10)
  fecesAmount?: number | null
  // Viscosity of the feces (0 water - 10 hard)
  fecesViscosity?: number | null
}

// A log entry about the events of the day
export interface DailyLog {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  updateByUserId: number
  locationId: number
  content?: string | null
  // Array of user_id
  presentUsers: string
  // Array of cat_id
  taggedCats?: string | null
}

export interface Image {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  location: string
  // Array of cat_id
  catsInImage?: string | null
}

// Token required for signing up
export interface JoinToken {
  id: string
  // User that created this join token
  createdByUserId: number
  createdAt: Date
}

export interface Location {
  id?: number | null
  createdAt?: string | null
  updatedAt?: string | null
  name: string
  description?: string | null
  addressId: number
}

// A room in a location
export interface Room {
  id?: number | null
  locationId: number
  createdAt: Date
  updatedAt: Date
  name: string
  description?: string | null
}

// Details about a trap
export interface Trap {
  id?: number | null
  createdAt: Date
  updatedAt: Date
  name: string
  usable: boolean
  conditionDescription?: string | null
  // User currently responsible for this trap
  userId?: number | null
}

export interface User {
  id: number
  email: string
  passwordHash: string
  name: string
  // If null; added by system
  invitedByUserId?: number | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: string | null
}

export interface UserSession {
  // The serial ID of the token (for faster lookup)
  id: number
  // User owning this session
  userId: number
  // The UUID v4 token
  token: string
  deviceType?: string | null
  createdAt: Date
  // Seconds until expiry from created_at
  expiresAfterSeconds: number
}
