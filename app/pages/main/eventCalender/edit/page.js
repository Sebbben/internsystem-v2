
"use client";

import { Box, Grid, Skeleton, Typography } from "@mui/material";
import prismaRequest from "@/app/middleware/prisma/prismaRequest";
import CustomTable from "@/app/components/CustomTable";
import { useEffect, useState } from "react";
import { PageBuilderSkeleton } from "@/app/components/sanity/PageBuilder";

const EVENT_TABLE_HEADERS = [
  {
    id: "id",
    type: "number",
    name: "ID",
    sortBy: "id",
    flex: 1,
  },
  {
    id: "title",
    type: "string",
    name: "Title",
    flex: 1,
  },
  {
    id: "description",
    type: "string",
    name: "Description",
    flex: 1,
  },
  {
    id: "date",
    type: "date",
    name: "Date",
    flex: 1,
  },
  {
    id: "location",
    type: "string",
    name: "Location",
    flex: 1,
  },
  {
    id: "size",
    type: "number",
    name: "Size",
    flex: 1,
  },

]



export default function EventCalenderPage() {

  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    prismaRequest({
      model: "events",
      method: "find",
      callback: (data) => {
        const rows = data.data.map((e) => {
          return {
            ...e
          }
        })
        console.log(rows)
        setEvents(rows)
      }
    })
  }, [refresh])
  
  return (
    <Box>
        <CustomTable
          headers={EVENT_TABLE_HEADERS}
          data={events}
          defaultFilterBy="id"
        />
      </Box>
  );
}
