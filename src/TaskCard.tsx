import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import itemTypes from "./utils/itemType";

interface ITaskCard {
  details: string;
  id: string | number;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onClick?(details: string, id: number | string, index: number): void;
  getOriginalIndex: (id: number | string) => { index: number }
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface Item {
  id: number;
  index: number;
  originalIndex: number;
}

const TaskCard: React.FC<ITaskCard> = (props) => {
  const { details, id, index, moveTask, onClick, getOriginalIndex } = props;
  const ref = useRef<HTMLDivElement>(null);
  const originalIndex = getOriginalIndex(id).index
  const [{ isDragging }, drag] = useDrag<any, any, any>(
    {
      type: itemTypes.CARD,
      item: () => {
        return { id, index, originalIndex };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end(draggedItem: Item, monitor) {
        const { index, originalIndex } = draggedItem;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveTask(index, originalIndex)
        }
      },
    },
    [id, index, moveTask]
  );

  const [, drop] = useDrop<DragItem, void, { handlerId: any }>(
    {
      accept: itemTypes.CARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: DragItem, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveTask(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
      drop(item, monitor) {
        console.log("DROP: ", item);
        console.log("DROP: ", monitor.canDrop());
      },
    },
    [moveTask]
  );

  drag(drop(ref));
  return (
    <Box
      ref={ref}
      opacity={isDragging ? 0.5 : 1}
      bg="yellow.300"
      p="3"
      boxShadow="sm"
      onClick={() => onClick && onClick(details, id, index)}
    >
      {details}
    </Box>
  );
};

export default TaskCard;
