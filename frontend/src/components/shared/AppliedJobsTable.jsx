import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead className='text-right'>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allAppliedJobs.length <= 0 ? <span>No Jobs Applied</span> :allAppliedJobs.map((appliedJob) => (
                    <TableRow key={appliedJob?._id}>
                        <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                        <TableCell>{appliedJob?.job?.title}</TableCell>
                        <TableCell className='text-right'><Badge className={`${appliedJob?.status === "Rejected" ? 'bg-red-400 : hover:bg-red-500' : appliedJob?.status === "Pending" ? 'bg-blue-400 hover:bg-blue-500' : 'bg-green-400 hover:bg-green-500'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobsTable
