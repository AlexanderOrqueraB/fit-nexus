"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components_ui/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components_ui/ui/form"
import { Textarea } from "../components_ui/ui/textarea"


    const FormSchema = z.object({
      bio: z
        .string()
        .min(10, {
          message: "Bio must be at least 10 characters.",
        })
        .max(160, {
          message: "Bio must not be longer than 30 characters.",
        }),
    })

export function CustomForm() {



  return (
    <Textarea />

  )
}

export default CustomForm
