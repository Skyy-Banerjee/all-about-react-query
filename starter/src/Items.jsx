import { useFetchTasks } from './reactQueryCustomHooks';
import SingleItem from './SingleItem';

const Items = () => {

  const { isLoading, isError, data } = useFetchTasks()

  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>
  }

  if (isError) {
    return <p style={{ marginTop: '1rem' }}>There was an error Skyy! ⚠️..</p>
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
