import type { Knex } from 'knex'
import type * as DB from './db-tables.js'

// https://knexjs.org/#typescript-support

declare module 'knex/types/tables' {
  type DefaultOmit = 'id' | 'createdAt' | 'updatedAt'
  interface Tables {
    address: Knex.CompositeTableType<
    // Base (Select, where, etc.)
    DB.Address,
    // Insert
    Omit<DB.Address, DefaultOmit>
    >

    cage: Knex.CompositeTableType<
    DB.Cage,
    Omit<DB.Cage, DefaultOmit>
    >

    captureCat: Knex.CompositeTableType<
    DB.CaptureCat,
    Omit<DB.CaptureCat, DefaultOmit>
    >

    captureLocation: Knex.CompositeTableType<
    DB.CaptureLocation,
    Omit<DB.CaptureLocation, DefaultOmit>
    >

    cat: Knex.CompositeTableType<
    DB.Cat,
    Omit<DB.Cat, DefaultOmit>
    >

    catStatistics: Knex.CompositeTableType<
    DB.CatStatistics,
    Omit<DB.CatStatistics, DefaultOmit>
    >

    dailyLog: Knex.CompositeTableType<
    DB.DailyLog,
    Omit<DB.DailyLog, DefaultOmit>
    >

    image: Knex.CompositeTableType<
    DB.Image,
    Omit<DB.Image, DefaultOmit>
    >

    joinToken: Knex.CompositeTableType<
    DB.JoinToken,
    Omit<DB.JoinToken, DefaultOmit>
    >

    location: Knex.CompositeTableType<
    DB.Location,
    Omit<DB.Location, DefaultOmit>
    >

    room: Knex.CompositeTableType<
    DB.Room,
    Omit<DB.Room, DefaultOmit>
    >

    trap: Knex.CompositeTableType<
    DB.Trap,
    Omit<DB.Trap, DefaultOmit>
    >

    user: Knex.CompositeTableType<
    DB.User,
    Omit<DB.User, DefaultOmit>
    >

    userSession: Knex.CompositeTableType<
    DB.UserSession,
    Omit<DB.UserSession, DefaultOmit>
    >
  }
}
