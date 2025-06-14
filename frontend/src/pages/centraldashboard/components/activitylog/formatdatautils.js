// Function to get turbine name by ID
const getTurbineName = (turbineId, TURBINE_MAPPING) => {
  // Convert to number if it's a string
  const id = typeof turbineId === "string" ? Number.parseInt(turbineId) : turbineId
  const turbine = TURBINE_MAPPING.find((t) => t.turbine_id === id)
  return turbine ? turbine.name : `Turbine ${id}`
}

// Function to format ISO date to readable format
const formatDate = (isoDate) => {
  if (!isoDate) return null
  try {
    const date = new Date(isoDate)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  } catch (error) {
    console.error("Date formatting error:", error, "for date:", isoDate)
    return isoDate
  }
}

// Function to clean and transform JSON data based on table type
const cleanJsonData = (jsonData, tableType, TURBINE_MAPPING) => {
  if (!jsonData) return null

  try {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData
    const cleanedData = { ...data }

    console.log(`Cleaning ${tableType} data:`, cleanedData)

    switch (tableType) {
      case "performances":
        // Remove specific IDs
        delete cleanedData.id
        delete cleanedData.central_id

        // Convert turbine_id to turbine_name
        if (cleanedData.turbine_id) {
          console.log(`Converting turbine_id ${cleanedData.turbine_id} for performances`)
          cleanedData.turbine_name = getTurbineName(cleanedData.turbine_id, TURBINE_MAPPING)
          delete cleanedData.turbine_id
        }

        // Format dates
        if (cleanedData.performance_date) {
          cleanedData.performance_date = formatDate(cleanedData.performance_date)
        }
        if (cleanedData.created_at) {
          cleanedData.created_at = formatDate(cleanedData.created_at)
        }
        if (cleanedData.updated_at) {
          cleanedData.updated_at = formatDate(cleanedData.updated_at)
        }
        break

      case "alarms":
        // Remove specific IDs
        delete cleanedData.id
        delete cleanedData.central_id

        // Convert turbine_id to turbine_name
        if (cleanedData.turbine_id) {
          console.log(`Converting turbine_id ${cleanedData.turbine_id} for alarms`)
          cleanedData.turbine_name = getTurbineName(cleanedData.turbine_id, TURBINE_MAPPING)
          delete cleanedData.turbine_id
        }

        // Format dates
        if (cleanedData.happened_at) {
          cleanedData.happened_at = formatDate(cleanedData.happened_at)
        }
        if (cleanedData.resolved_at) {
          cleanedData.resolved_at = formatDate(cleanedData.resolved_at)
        }
        if (cleanedData.created_at) {
          cleanedData.created_at = formatDate(cleanedData.created_at)
        }
        break

      case "defective_equipement":
      case "defective_equipment":
        // Remove specific IDs
        delete cleanedData.id
        delete cleanedData.central_id

        // Convert turbine_id to turbine_name
        if (cleanedData.turbine_id) {
          console.log(`Converting turbine_id ${cleanedData.turbine_id} for defective equipment`)
          cleanedData.turbine_name = getTurbineName(cleanedData.turbine_id, TURBINE_MAPPING)
          delete cleanedData.turbine_id
        }

        // Format dates
        if (cleanedData.reported_at) {
          cleanedData.reported_at = formatDate(cleanedData.reported_at)
        }
        if (cleanedData.fixed_at) {
          cleanedData.fixed_at = formatDate(cleanedData.fixed_at)
        }
        if (cleanedData.created_at) {
          cleanedData.created_at = formatDate(cleanedData.created_at)
        }
        break

      case "maintenances":
        // Remove specific IDs
        delete cleanedData.id
        delete cleanedData.central_id
        delete cleanedData.related_item_id

        // Format dates
        if (cleanedData.start) {
          console.log(`Formatting maintenance start date: ${cleanedData.start}`)
          cleanedData.start = formatDate(cleanedData.start)
        }
        if (cleanedData.end) {
          cleanedData.end = formatDate(cleanedData.end)
        }
        if (cleanedData.created_at) {
          cleanedData.created_at = formatDate(cleanedData.created_at)
        }
        if (cleanedData.updated_at) {
          cleanedData.updated_at = formatDate(cleanedData.updated_at)
        }
        break

      default:
        console.log(`Unknown table type: ${tableType}`)
        // For unknown table types, just format common date fields
        if (cleanedData.created_at) {
          cleanedData.created_at = formatDate(cleanedData.created_at)
        }
        if (cleanedData.updated_at) {
          cleanedData.updated_at = formatDate(cleanedData.updated_at)
        }
        break
    }

    console.log(`Cleaned ${tableType} data:`, cleanedData)
    return cleanedData
  } catch (error) {
    console.error("Error cleaning JSON data:", error)
    return jsonData
  }
}

// Main function to transform activity data
const transformActivities = (activities, TURBINE_MAPPING) => {
  console.log("Starting transformation with turbines:", TURBINE_MAPPING)

  return activities.map((activity) => {
    const transformedActivity = { ...activity }

    // Format the main created_at date
    if (transformedActivity.created_at) {
      transformedActivity.created_at = formatDate(transformedActivity.created_at)
    }

    // Clean target table data
    if (transformedActivity.target_table_old_value) {
      console.log(`Processing target_table_old_value for ${transformedActivity.target_table}`)
      transformedActivity.target_table_old_value = cleanJsonData(
        transformedActivity.target_table_old_value,
        transformedActivity.target_table,
        TURBINE_MAPPING,
      )
    }

    if (transformedActivity.target_table_new_value) {
      console.log(`Processing target_table_new_value for ${transformedActivity.target_table}`)
      transformedActivity.target_table_new_value = cleanJsonData(
        transformedActivity.target_table_new_value,
        transformedActivity.target_table,
        TURBINE_MAPPING,
      )
    }

    // Clean consequence table data
    if (transformedActivity.consequence_table_old_value) {
      console.log(`Processing consequence_table_old_value for ${transformedActivity.consequence_table}`)
      transformedActivity.consequence_table_old_value = cleanJsonData(
        transformedActivity.consequence_table_old_value,
        transformedActivity.consequence_table,
        TURBINE_MAPPING,
      )
    }

    if (transformedActivity.consequence_table_new_value) {
      console.log(`Processing consequence_table_new_value for ${transformedActivity.consequence_table}`)
      transformedActivity.consequence_table_new_value = cleanJsonData(
        transformedActivity.consequence_table_new_value,
        transformedActivity.consequence_table,
        TURBINE_MAPPING,
      )
    }

    return transformedActivity
  })
}

export default transformActivities
