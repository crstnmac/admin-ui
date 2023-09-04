'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { Users } from '@/types'
import { DataTable } from './data-table'
import { columns } from './columns'
import userStore from '@/store'

async function getUsers() {
  const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
  const users = await res.json()
  return users
}

function useUsers() {
  return useQuery<Users>({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}

export default function Home() {

  const { isFetching , ...queryInfo } = useUsers()
  const {users,setUsers} = userStore()

  useEffect(() => {
    if(queryInfo.isSuccess){
      setUsers(queryInfo.data)
    }
  },[queryInfo.isSuccess, queryInfo.data, setUsers])

  return (
    <main className="container mx-auto py-10">
      {
        queryInfo.isSuccess && (
          <DataTable data={users} columns={columns} />
        )
      }
    </main>
  )
}
