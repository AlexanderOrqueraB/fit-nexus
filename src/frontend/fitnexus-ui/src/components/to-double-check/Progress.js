import * as React from "react"

import { Progress } from "../../components_ui/ui/progress"

export function ProgressCustom() {
  const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])
 
  return <Progress value={progress} className="w-[60%]" />
}

export default ProgressCustom
