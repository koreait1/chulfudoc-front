'use client'
import { ImSpinner2 } from "react-icons/im"
import { useLinkStatus } from "next/link"

export default function LinkLoading() {
    const { pending } = useLinkStatus()
    return pending && <ImSpinner2 className="spinner" />
}