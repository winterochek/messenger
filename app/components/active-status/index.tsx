'use client'

import { useActiveChannel } from "@/app/hooks"


export default function ActiveStatus(){
    useActiveChannel()
    return null
}