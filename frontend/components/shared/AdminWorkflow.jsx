'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterWhitelist from "./RegisterWhitelist";
import NextPhase from "./NextPhase";

const AdminWorkflow = ({ workflowStatus, phaseMapping, setWorkflowStatus }) => {


  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Admin Workflow</CardTitle>
        <CardDescription>Manage voting workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start gap-3">
          {/* Icône simple : un point */}
          <div className="flex-shrink-0 mt-1">
            <span className="block h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
          </div>
          <div>
            {/* Texte principal */}
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Current Workflow Stage:
            </p>
            {/* Texte secondaire */}
            <p className="text-base font-normal text-gray-700 dark:text-gray-400">
              {phaseMapping[workflowStatus]?.description || "Loading workflow stage..."}
            </p>
          </div>
        </div>
        {workflowStatus === 0 ? <RegisterWhitelist /> : null}
      </CardContent>
      {workflowStatus === 5 ? (
        null
      ) : (
        <CardFooter>
          <NextPhase
            workflowStatus={workflowStatus}
            setWorkflowStatus={setWorkflowStatus}
            phaseMapping={phaseMapping}
          />
        </CardFooter>
      )}
    </Card>
  )
}

export default AdminWorkflow