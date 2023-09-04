
import { User } from '@/types'
import { create } from 'zustand'

interface UserStore {
  users: User[]
  setUsers: (users:User[]) => void
  removeUser: (id:string) => void
  editUser: (user:User) => void
}

const userStore =  create<UserStore>((set) => ({
  users:[],
  setUsers: (users:User[]) => set({ users }),
  removeUser: (id:string) => set((state:any) => ({ users: state.users.filter((user:User) => user.id !== id) })),
  editUser: (user:User) => set((state:any) => ({ users: state.users.map((u:User) => u.id === user.id ? user : u) })),
}))

export default userStore