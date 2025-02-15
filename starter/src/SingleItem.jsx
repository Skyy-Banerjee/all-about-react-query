import { useDeleteTask, useEditTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
  const { deleteTask, deleteTaskLoading } = useDeleteTask();
  const { editTask } = useEditTask(); 
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        //onChange={() => console.log('edit task')}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        //onClick={() => console.log('delete task')}
        onClick={() => deleteTask(item.id)}
        disabled={deleteTaskLoading}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
