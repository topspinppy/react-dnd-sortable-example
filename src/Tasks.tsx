import { Box, Grid, Stack, useColorMode, Text } from "@chakra-ui/react"
import { useCallback, useState } from "react";
import TaskCard from "./TaskCard";


const Tasks: React.FC = () => {
  const { colorMode } = useColorMode();
  const bg = { light: "teal.300", dark: "teal.600" }
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      attributeName: 'มีสาย/ไร้สาย',
    },
    {
      id: 2,
      attributeName: 'การเชื่อมต่อหูฟัง(Input)',
    },
    {
      id: 3,
      attributeName: 'ไมโครโฟน',
    },
    {
      id: 4,
      attributeName: 'ระดับการกันน้ำ',
    },
    {
      id: 5,
      attributeName: 'การเชื่อมต่อลำโพง',
    },
    {
      id: 6,
      attributeName: 'คุณสมบัติพิเศษ',
    },
    {
      id: 7,
      attributeName: 'ขั้วชาร์จ',
    },
    {
      id: 8,
      attributeName: 'ประเภทเคส',
    },
    {
      id: 9,
      attributeName: 'bit depth',
    },
  ])

  const handleMoveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    // console.log(dragIndex, hoverIndex)
    // console.log('dragIndex (ของที่ถูกลาก) ->',taskList[dragIndex])
    // console.log('hoverIndex (ปลายทางที่เอาไปวาง) ->',taskList[hoverIndex])

    const dragData = taskList[dragIndex]
    const hoverData = taskList[hoverIndex]
    const newArray = [...taskList]
    newArray[dragIndex] = hoverData
    newArray[hoverIndex] = dragData;

    console.log(newArray)
    setTaskList(newArray)
  }, [taskList])
  return (
    <Grid gap={6} templateColumns="repeat(2,1fr)" w="80vw" h="93vh" p={5}>
      <Box bg={bg[colorMode]} rounded="md" p={3}>
        <Stack spacing={3}>
          <Box>
            <Text fontSize="2xl" textAlign="center">
              Tasks
            </Text>
          </Box>
          {taskList.map((task, index) => (
            <TaskCard details={task.attributeName} key={task.id} id={task.id} index={index} moveTask={handleMoveTask}/>
          ))}
        </Stack>
      </Box>
      <Box></Box>
    </Grid>
  )
}

export default Tasks