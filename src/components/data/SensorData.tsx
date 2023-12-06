"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FileIcon, TableIcon, ReaderIcon, UpdateIcon } from '@radix-ui/react-icons'

import ReactToPrint from 'react-to-print'
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/loading'

import { ExportToCsv } from '../exports/ExportToCsv'
import { ExportToExcel } from '../exports/ExportToExcel'
import { ExportToTxt } from '../exports/ExportToTxt'
import { handleUpdateData } from './UpdateData'
import { ExportAlertDialog } from '../exports/ExportAlertDialog'

interface SensorDataProps {
  sensorType: string
  endpoint: string
}

const SensorData: React.FC<SensorDataProps> = ({ sensorType, endpoint }) => {
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [selectedExportType, setSelectedExportType] = useState('')

  const [searchTerm, setSearchTerm] = useState('');



  const buttonExport = [
    { title: 'CSV', icon: <FileIcon />, export: () => ExportToCsv(data, 'sensor_data.csv'), style: 'gap-3 bg-green-400 hover:bg-green-600' },
    { title: 'Excel', icon: <TableIcon />, export: () => ExportToExcel(data, 'sensor_data.xlsx'), style: 'gap-3 bg-green-700 hover:bg-green-900' },
    { title: 'TXT', icon: <ReaderIcon />, export: () => ExportToTxt(data, 'sensor_data.txt'), style: 'gap-3 bg-stone-600 hover:bg-stone-800' }
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(endpoint)
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setError(result.error)
        }
      } catch (error) {
        setError('Error fetching data.')
      }
    }
    fetchData()
  }, [endpoint])

  const filteredData = data
    ? data.filter((row) =>
      Object.values(row).some(
        (value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    : [];


  return (
    <>
      <h1 className="text-4xl p-4 mb-6 font-bold text-center scroll-m-20 border-b tracking-tight first:mt-0">{`Sensor ${sensorType}`}</h1>
      <div ref={componentRef} className="flex flex-col min-h-screen overflow-x-auto">
        <div className="flex-grow overflow-x-auto">
          {error ? (
            <p>{error}</p>
          ) : data === null ? (
            <div className="flex justify-center items-center h-screen">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 py-2">
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant='outline'
                        className="gap-3"
                      >
                        <ReaderIcon />
                        Print
                      </Button>
                    )}
                    content={() => componentRef.current}
                    pageStyle={`@import url('globals.css')`}
                  />
                  <Button
                    className="gap-3 bg-yellow-500 hover:bg-yellow-700"
                    onClick={handleUpdateData}
                  >
                    <UpdateIcon />
                    Update Data
                  </Button>
                  <div>
                    <Input
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-md border my-3 bg-white" ref={componentRef}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      {data && Object.keys(data[0]).map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell>{rowIndex + 1}</TableCell>
                        {Object.values(row).map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{String(cell)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-row gap-2">
                {buttonExport.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => {
                        setIsExportDialogOpen(true)
                        setSelectedExportType(item.title)
                      }}
                      className={item.style}
                    >
                      {item.icon}
                      {item.title}
                    </Button>
                  )
                })}
              </div>

              <ExportAlertDialog
                isOpen={isExportDialogOpen}
                onCancel={() => setIsExportDialogOpen(false)}
                onExport={() => {
                  switch (selectedExportType) {
                    case 'CSV':
                      ExportToCsv(data, 'sensor_data.csv')
                      break
                    case 'Excel':
                      ExportToExcel(data, 'sensor_data.xlsx')
                      break
                    case 'TXT':
                      ExportToTxt(data, 'sensor_data.txt')
                      break
                    default:
                      break
                  }
                  setIsExportDialogOpen(false)
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SensorData
